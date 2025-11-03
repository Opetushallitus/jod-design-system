import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DiscussionCard } from './DiscussionCard';

describe('DiscussionCard data-testid', () => {
  it('renders root and subpart test ids', () => {
    render(
      <DiscussionCard
        message="Hello"
        author="Jane Doe"
        date="2024-01-01"
        likes={3}
        onClickComment={vi.fn()}
        onClickLike={vi.fn()}
        testId="disc"
      />,
    );

    expect(screen.getByTestId('disc')).toBeInTheDocument();
    expect(screen.getByTestId('disc-message')).toBeInTheDocument();
    expect(screen.getByTestId('disc-comment')).toBeInTheDocument();
    expect(screen.getByTestId('disc-like')).toBeInTheDocument();
    expect(screen.getByTestId('disc-likes')).toBeInTheDocument();
  });
});
