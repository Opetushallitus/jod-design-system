import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CardCarousel, CardCarouselProps } from './CardCarousel';

const renderComponent = (props: Partial<CardCarouselProps> = {}) => {
  const defaultProps: CardCarouselProps = {
    items: [
      { id: '1', component: <div>Item 1</div> },
      { id: '2', component: <div>Item 2</div> },
      { id: '3', component: <div>Item 3</div> },
    ],
    itemWidth: 200,
    gap: 16,
    translations: {
      nextTrigger: 'Next',
      prevTrigger: 'Previous',
      indicator: (index) => `Page ${index + 1}`,
    },
  };

  return render(<CardCarousel {...defaultProps} {...props} />);
};

describe('CardCarousel', () => {
  it('renders the carousel items', () => {
    const { getByText } = renderComponent();
    expect(getByText('Item 1')).toBeInTheDocument();
    expect(getByText('Item 2')).toBeInTheDocument();
    expect(getByText('Item 3')).toBeInTheDocument();
  });

  it('navigates to the next page', () => {
    const { getByLabelText } = renderComponent();
    const nextButton = getByLabelText('Next');
    fireEvent.click(nextButton);
    expect(nextButton).not.toBeDisabled();
  });

  it('navigates to the previous page', () => {
    const { getByLabelText } = renderComponent();
    const prevButton = getByLabelText('Previous');
    fireEvent.click(prevButton);
    expect(prevButton).toBeDisabled();
  });

  it('disables the next button on the last page', () => {
    const { getByLabelText } = renderComponent();
    const nextButton = getByLabelText('Next');
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    expect(nextButton).toBeDisabled();
  });

  it('disables the previous button on the first page', () => {
    const { getByLabelText } = renderComponent();
    const prevButton = getByLabelText('Previous');
    expect(prevButton).toBeDisabled();
  });

  it('navigates to a specific page', () => {
    const { getByText } = renderComponent();
    const pageButton = getByText('Page 2');
    fireEvent.click(pageButton);
    expect(pageButton.parentElement).toHaveClass('ds:bg-accent');
  });

  it('handles enter key press for navigation', () => {
    const { getByLabelText } = renderComponent();
    const nextButton = getByLabelText('Next');
    fireEvent.keyDown(nextButton, { key: 'Enter' });
    fireEvent.keyDown(nextButton, { key: 'Enter' });
    expect(nextButton).toBeDisabled();
  });
});
