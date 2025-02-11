import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MediaCard } from './MediaCard';

describe('MediaCard', () => {
  it('renders the MediaCard component with vertical variant', () => {
    render(
      <MediaCard
        imageSrc="vertical.jpg"
        imageAlt="Image for the vertical"
        label="Vertical"
        description="Vertical description"
        tags={['tag1', 'tag2']}
      />,
    );

    expect(screen.getByAltText('Image for the vertical')).toBeInTheDocument();
    expect(screen.getByText('Vertical')).toBeInTheDocument();
    expect(screen.getByText('Vertical description')).toBeInTheDocument();
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
        tags={['tag1', 'tag2']}
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
