import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { ContentCard } from './ContentCard';

describe('ContentCard', () => {
  const mockProps = {
    title: 'Test Title',
    description: 'Test Description',
    path: ['test', 'path'],
    tags: [
      { label: 'Tag1', to: '/tag1' },
      { label: 'Tag2', to: '/tag2' },
    ],
    dataTestId: 'contentcard',
  };

  test('renders basic content card without link component', () => {
    render(<ContentCard {...mockProps} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('test / path')).toBeInTheDocument();
    expect(screen.getByText('Tag1')).toBeInTheDocument();
    expect(screen.getByText('Tag2')).toBeInTheDocument();
    expect(screen.getByTestId('contentcard')).toBeInTheDocument();
  });

  test('renders with custom link component', () => {
    const MockLink = ({ children, to }: { children: React.ReactNode; to: string }) => (
      <a href={to} data-testid="mock-link">
        {children}
      </a>
    );

    render(<ContentCard {...mockProps} linkComponent={MockLink} to="/test-link" />);

    const linkElement = screen.getAllByTestId('mock-link')[0];
    expect(linkElement).toHaveAttribute('href', '/test-link');
  });

  test('renders with custom className', () => {
    const { container } = render(<ContentCard {...mockProps} className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  test('renders tags without link component', () => {
    render(<ContentCard {...mockProps} />);
    const tags = screen.getAllByRole('listitem');
    expect(tags).toHaveLength(2);
    expect(tags[0]).toHaveTextContent('Tag1');
    expect(tags[1]).toHaveTextContent('Tag2');
  });
});
