import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MediaCard } from './MediaCard';

const mockTags = [
  { label: 'tag1', to: '#' },
  { label: 'tag2', to: '#' },
];
describe('MediaCard', () => {
  it('renders the MediaCard component with vertical variant', () => {
    render(
      <MediaCard
        variant="vertical"
        imageSrc="vertical.jpg"
        imageAlt="Image for the vertical"
        label="Vertical"
        description="Vertical description"
        tags={mockTags}
      />,
    );

    expect(screen.getByAltText('Image for the vertical')).toBeInTheDocument();
    expect(screen.getByText('Vertical')).toBeInTheDocument();
    expect(screen.getByText('Vertical description')).toBeInTheDocument();
    expect(screen.getByText('tag1')).toBeInTheDocument();
    expect(screen.getByText('tag2')).toBeInTheDocument();
  });

  it('renders the MediaCard component with horizontal variant', () => {
    vi.mock('../../hooks/useMediaQueries', () => ({
      useMediaQueries: vi.fn().mockReturnValue({ sm: true, md: false, lg: false, xl: false }),
    }));
    render(
      <MediaCard
        variant="horizontal"
        imageSrc="horizontal.jpg"
        imageAlt="Image for the horizontal"
        label="Horizontal"
        description="Horizontal description"
        tags={mockTags}
      />,
    );

    expect(screen.getByAltText('Image for the horizontal')).toBeInTheDocument();
    expect(screen.getByText('Horizontal')).toBeInTheDocument();
    expect(screen.getByText('Horizontal description')).toBeInTheDocument();
    expect(screen.getByText('tag1')).toBeInTheDocument();
    expect(screen.getByText('tag2')).toBeInTheDocument();
  });

  it('renders the MediaCard component with default vertical variant', () => {
    const { container } = render(
      <MediaCard
        imageSrc="default.jpg"
        imageAlt="Image for default"
        label="Default"
        description="Default description"
        tags={mockTags}
      />,
    );

    expect(screen.getByAltText('Image for default')).toBeInTheDocument();
    expect(screen.getByText('Default')).toBeInTheDocument();
    expect(screen.getByText('Default description')).toBeInTheDocument();
    expect(screen.getByText('tag1')).toBeInTheDocument();
    expect(screen.getByText('tag2')).toBeInTheDocument();

    expect(container.firstChild).toMatchSnapshot();
  });
});
