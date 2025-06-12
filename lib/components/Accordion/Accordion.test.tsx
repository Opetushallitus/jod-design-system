import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Accordion } from './Accordion';

describe('Accordion', () => {
  const title = 'Accordion Title';
  const lang = 'en';

  it('renders accordion with open state by default', () => {
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

  it('closes accordion when expand button is clicked', () => {
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

it('calls fetchData only once when opening and shows spinner while loading', async () => {
  const fetchData = vi.fn(() => new Promise((resolve) => setTimeout(resolve, 50)));

  render(
    <Accordion title="With fetch" lang="en" fetchData={fetchData as () => Promise<void>}>
      <div>Fetched content</div>
    </Accordion>,
  );

  // Accordion is open by default, so close it first
  const expandButton = screen.getByRole('button');
  fireEvent.click(expandButton);

  // Now open it, triggering fetchData
  fireEvent.click(expandButton);

  expect(fetchData).toHaveBeenCalledTimes(1);
  expect(screen.getByRole('alert')).toBeInTheDocument(); // Spinner

  // Content should not be visible while loading
  expect(screen.queryByText('Fetched content')).not.toBeInTheDocument();

  // Wait for fetchData to resolve and spinner to disappear
  await screen.findByText('Fetched content');
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();

  // Close and reopen: fetchData should not be called again
  fireEvent.click(expandButton); // close
  fireEvent.click(expandButton); // open
  expect(fetchData).toHaveBeenCalledTimes(1);
});

it('renders children only after fetchData resolves and accordion is open', async () => {
  let resolveFetch: () => void;
  const fetchData = vi.fn(
    () =>
      new Promise<void>((resolve) => {
        resolveFetch = resolve;
      }),
  );
  render(
    <Accordion title="Async" lang="en" fetchData={fetchData}>
      <div>Async content</div>
    </Accordion>,
  );

  // Close and open to trigger fetchData
  const expandButton = screen.getByRole('button');
  fireEvent.click(expandButton); // close
  fireEvent.click(expandButton); // open

  // Spinner should be visible, content should not
  expect(screen.getByRole('alert')).toBeInTheDocument();
  expect(screen.queryByText('Async content')).not.toBeInTheDocument();

  // Resolve fetchData
  resolveFetch!();
  // Wait for content to appear
  await screen.findByText('Async content');
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
});
