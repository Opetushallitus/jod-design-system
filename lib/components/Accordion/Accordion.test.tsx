import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { Accordion } from './Accordion';

describe('Accordion', () => {
  const title = 'Accordion Title';
  const lang = 'en';

  test('renders accordion with open state by default', () => {
    const { container } = render(
      <Accordion title={title} lang={lang}>
        <div>Default content</div>
      </Accordion>,
    );

    const accordionTitle = screen.getByText(title);
    const expandButton = screen.getByRole('button');
    const accordionContent = screen.queryByText('Default content');

    expect(accordionTitle).toBeInTheDocument();
    expect(expandButton).toBeInTheDocument();
    expect(accordionContent).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('closes accordion when expand button is clicked', () => {
    render(
      <Accordion title={title} lang={lang}>
        <div>Content to be gone</div>
      </Accordion>,
    );

    const expandButton = screen.getByRole('button');
    fireEvent.click(expandButton);

    const accordionContent = screen.queryByText('Content to be gone');
    expect(accordionContent).not.toBeInTheDocument();
  });
});
