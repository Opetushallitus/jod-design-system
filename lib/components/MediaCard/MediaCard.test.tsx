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
        dataTestId="m"
      />,
    );

    expect(screen.getByAltText('Image for the vertical')).toBeInTheDocument();
    expect(screen.getByText('Vertical')).toBeInTheDocument();
    expect(screen.getByText('Vertical description')).toBeInTheDocument();
    expect(screen.getByText('tag1')).toBeInTheDocument();
    expect(screen.getByText('tag2')).toBeInTheDocument();

    // data-testid assertions
    expect(screen.getByTestId('m')).toBeInTheDocument();
    expect(screen.getByTestId('m-link')).toBeInTheDocument();
    expect(screen.getByTestId('m-label')).toBeInTheDocument();
    expect(screen.getByTestId('m-description')).toBeInTheDocument();
    expect(screen.getByTestId('m-tags')).toBeInTheDocument();
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
        dataTestId="mh"
      />,
    );

    expect(screen.getByAltText('Image for the horizontal')).toBeInTheDocument();
    expect(screen.getByText('Horizontal')).toBeInTheDocument();
    expect(screen.getByText('Horizontal description')).toBeInTheDocument();
    expect(screen.getByText('tag1')).toBeInTheDocument();
    expect(screen.getByText('tag2')).toBeInTheDocument();

    // data-testid assertions
    expect(screen.getByTestId('mh')).toBeInTheDocument();
    expect(screen.getByTestId('mh-link')).toBeInTheDocument();
    expect(screen.getByTestId('mh-label')).toBeInTheDocument();
    expect(screen.getByTestId('mh-description')).toBeInTheDocument();
    expect(screen.getByTestId('mh-tags')).toBeInTheDocument();
    expect(screen.getByTestId('mh-footer')).toBeInTheDocument();
  });

  it('renders the MediaCard component with default vertical variant', () => {
    const { container } = render(
      <MediaCard
        imageSrc="default.jpg"
        imageAlt="Image for default"
        label="Default"
        description="Default description"
        tags={mockTags}
        dataTestId="md"
      />,
    );

    expect(screen.getByAltText('Image for default')).toBeInTheDocument();
    expect(screen.getByText('Default')).toBeInTheDocument();
    expect(screen.getByText('Default description')).toBeInTheDocument();
    expect(screen.getByText('tag1')).toBeInTheDocument();
    expect(screen.getByText('tag2')).toBeInTheDocument();

    expect(container.firstChild).toMatchSnapshot();
  });

  it('emits data-testid attributes when dataTestId is provided (vertical)', () => {
    render(
      <MediaCard
        imageSrc="default.jpg"
        imageAlt="Image for default"
        label="Default"
        description="Default description"
        tags={mockTags}
        dataTestId="md"
      />,
    );

    expect(screen.getByTestId('md')).toBeInTheDocument();
    expect(screen.getByTestId('md-link')).toBeInTheDocument();
    expect(screen.getByTestId('md-label')).toBeInTheDocument();
    expect(screen.getByTestId('md-description')).toBeInTheDocument();
    expect(screen.getByTestId('md-tags')).toBeInTheDocument();
  });
});
