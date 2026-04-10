#!/usr/bin/env bash
# Ensures third-party actions pinned in workflows reference a commit at least
# MIN_AGE_DAYS old (must not be younger than MIN_AGE_DAYS).
set -euo pipefail

MIN_AGE_DAYS="${MIN_AGE_DAYS:-7}"
CUTOFF_EPOCH="$(date -u -d "${MIN_AGE_DAYS} days ago" +%s)"

fail=0
while IFS= read -r line; do
  [[ "$line" =~ uses:[[:space:]]*([^#[:space:]]+) ]] || continue
  ref="${BASH_REMATCH[1]}"
  [[ "$ref" == ./* ]] && continue
  [[ "$ref" =~ ^([^/]+)/([^@]+)@([0-9a-f]{40})$ ]] || continue

  owner="${BASH_REMATCH[1]}"
  repo="${BASH_REMATCH[2]}"
  sha="${BASH_REMATCH[3]}"
  full_repo="${owner}/${repo}"

  commit_date=""
  if ! commit_date="$(gh api "repos/${full_repo}/commits/${sha}" -q .commit.committer.date 2>/dev/null)"; then
    echo "::error::${full_repo}@${sha:0:7}… — GitHub API call failed (could not get commit date)."
    fail=1
    continue
  fi
  if [[ -z "${commit_date}" ]]; then
    echo "::error::${full_repo}@${sha:0:7}… — empty response (commit.committer.date)."
    fail=1
    continue
  fi

  commit_epoch=""
  if ! commit_epoch="$(date -u -d "${commit_date}" +%s 2>/dev/null)"; then
    echo "::error::${full_repo}@${sha:0:7}… — failed to parse date (expected ISO-8601): ${commit_date}"
    fail=1
    continue
  fi

  if (( commit_epoch > CUTOFF_EPOCH )); then
    echo "::error::${full_repo}@${sha:0:7}… is too new (${commit_date}). Minimum age is ${MIN_AGE_DAYS} days."
    fail=1
  fi
done < <(grep -h 'uses:' .github/workflows/*.yml .github/workflows/*.yaml 2>/dev/null || true)

exit "${fail}"
