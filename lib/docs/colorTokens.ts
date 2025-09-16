export const SCALE = ['', '75', '50', '25'];
export const LIGHT = ['light-1', 'light-2', 'light-3'];
export const DARK = ['dark', 'dark-2'];

const GROUP_ORDER = [
  'accent',
  'secondary-1',
  'secondary-2',
  'secondary-3',
  'secondary-4',
  'secondary-5',
  'white',
  'black',
  'primary-gray',
  'secondary-gray',
  'inactive-gray',
  'border-gray',
  'bg-gray',
  'bg-gray-2',
  'warning',
  'alert',
  'alert-text',
  'success',
  'todo',
  'tag',
];

const VARIANT_ORDER = ['', '75', '50', '25', 'light-1', 'light-2', 'light-3', 'dark', 'dark-2', '2'];

interface VariantItem {
  name: string;
  variant: string;
  value: string;
}
interface GroupEntry {
  group: string;
  items: VariantItem[];
}

const VARIANT_PRIORITY = new Map(VARIANT_ORDER.map((v, i) => [v, i]));

// eslint-disable-next-line sonarjs/slow-regex
const COLOR_VAR_REGEX = /--color-([a-z0-9-]+):\s*([^;]+);/gi;

function parseToken(name: string): { base: string; variant: string } {
  if (name.startsWith('tag-')) return { base: 'tag', variant: name.slice(4) };
  const patterns = [/^(.*)-(light-\d+)$/, /^(.*)-(dark(?:-2)?)$/, /^(.*)-(25|50|75)$/, /^(.*-text)-(2)$/];
  for (const r of patterns) {
    const m = new RegExp(r).exec(name);
    if (m) {
      return { base: m[1], variant: m[2] };
    }
  }
  return { base: name, variant: '' };
}

export function extractRawColorTokens(themeSource: string): Record<string, string> {
  const out: Record<string, string> = {};
  let m: RegExpExecArray | null;
  while ((m = COLOR_VAR_REGEX.exec(themeSource))) {
    out[m[1]] = m[2].trim();
  }
  return out;
}

export function buildGroups(raw: Record<string, string>): GroupEntry[] {
  const groups: Record<string, VariantItem[]> = {};
  for (const [full, value] of Object.entries(raw)) {
    const { base, variant } = parseToken(full);
    let list = groups[base];
    if (!list) {
      list = [];
      groups[base] = list;
    }
    list.push({ name: full, variant, value });
  }

  const ordered = Object.entries(groups)
    .sort((a, b) => {
      const ia = GROUP_ORDER.indexOf(a[0]);
      const ib = GROUP_ORDER.indexOf(b[0]);
      if (ia !== -1 && ib !== -1) {
        return ia - ib;
      }
      if (ia !== -1) {
        return -1;
      }
      if (ib !== -1) {
        return 1;
      }
      return a[0].localeCompare(b[0]);
    })
    .map(([group, items]) => ({
      group,
      items: items.slice().sort((a, b) => {
        const ia = VARIANT_PRIORITY.get(a.variant) ?? 999;
        const ib = VARIANT_PRIORITY.get(b.variant) ?? 999;
        if (ia !== ib) {
          return ia - ib;
        }
        return a.variant.localeCompare(b.variant);
      }),
    }));

  return ordered;
}

export function collectVariants(variants: string[], items: VariantItem[]): Record<string, string> | null {
  const out: Record<string, string> = {};
  for (const v of variants) {
    const found = items.find((i) => i.variant === v);
    if (found) {
      out[found.name] = found.value;
    }
  }
  return Object.keys(out).length ? out : null;
}

export function partitionLeftovers(items: VariantItem[]): {
  scale: Record<string, string> | null;
  light: Record<string, string> | null;
  dark: Record<string, string> | null;
  leftovers: VariantItem[];
} {
  const scale = collectVariants(SCALE, items);
  const light = collectVariants(LIGHT, items);
  const dark = collectVariants(DARK, items);
  const shown = new Set([...SCALE, ...LIGHT, ...DARK]);
  const leftovers = items.filter((i) => !shown.has(i.variant));
  return { scale, light, dark, leftovers };
}

export function getOrderedColorGroups(themeSource: string) {
  const raw = extractRawColorTokens(themeSource);
  return buildGroups(raw);
}
