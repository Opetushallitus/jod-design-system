// oxlint-disable vitest/require-mock-type-parameters
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Accordion } from './Accordion';

describe('Accordion', () => {
  const title = 'Accordion Title';

  it('renders accordion with open state by default', () => {
    const { container } = render(
      <Accordion title={title}>
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

  it('closes accordion when expand button is clicked', async () => {
    render(
      <Accordion title={title}>
        <div>Content to be gone</div>
      </Accordion>,
    );

    const expandButton = screen.getByRole('button');
    fireEvent.click(expandButton);

    const accordionContent = screen.queryByText('Content to be gone');

    // Wait for the animation to finish and content to be removed from the DOM
    await waitFor(() => {
      expect(accordionContent).not.toBeInTheDocument();
    });
  });

  it('calls fetchData only once when opening and shows spinner while loading', async () => {
    const fetchData = vi.fn(() => new Promise((resolve) => setTimeout(resolve, 50)));

    render(
      <Accordion title="With fetch" fetchData={fetchData as () => Promise<void>}>
        <div>Fetched content</div>
      </Accordion>,
    );

    // Accordion is open by default, so close it first
    const expandButton = screen.getByRole('button');
    fireEvent.click(expandButton);

    // Now open it, triggering fetchData
    fireEvent.click(expandButton);

    expect(fetchData).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    // Content should not be visible while loading
    expect(screen.queryByText('Fetched content')).not.toBeInTheDocument();

    // Wait for fetchData to resolve and spinner to disappear
    await screen.findByText('Fetched content');

    // Wait for the animation to finish and content to be removed from the DOM
    await waitFor(() => {
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    });

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
      <Accordion title="Async" fetchData={fetchData}>
        <div>Async content</div>
      </Accordion>,
    );

    // Close and open to trigger fetchData
    const expandButton = screen.getByRole('button');
    fireEvent.click(expandButton); // close
    fireEvent.click(expandButton); // open

    // Spinner should be visible, content should not
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.queryByText('Async content')).not.toBeInTheDocument();

    // Resolve fetchData
    resolveFetch!();
    // Wait for content to appear
    await screen.findByText('Async content');
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
  });

  it('announces loading in a persistent status region', async () => {
    let resolveFetch: () => void;
    const fetchData = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          resolveFetch = resolve;
        }),
    );
    render(
      <Accordion title="Async" fetchData={fetchData} loadingText="Ladataan" initialState={false}>
        <div>Async content</div>
      </Accordion>,
    );

    // Status region exists before loading starts, so screen readers pick up the change
    const status = screen.getByRole('status');
    expect(status).toBeEmptyDOMElement();

    // Status region is outside the button
    const expandButton = screen.getByRole('button');
    expect(expandButton).not.toContainElement(status);

    fireEvent.click(expandButton);
    expect(status).toHaveTextContent('Ladataan');

    resolveFetch!();
    await screen.findByText('Async content');
    expect(status).toBeEmptyDOMElement();
  });

  it('does not render a status region without fetchData', () => {
    render(<Accordion title={title}>Content</Accordion>);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('emits data-testid on the toggle button when testId is provided', () => {
    render(
      <Accordion title="ID Title" testId="acc">
        <div>Child</div>
      </Accordion>,
    );
    expect(screen.getByTestId('acc-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('acc-trigger')).toBeInTheDocument();
    expect(screen.getByTestId('acc-title')).toBeInTheDocument();
    expect(screen.getByTestId('acc-content')).toBeInTheDocument();
  });

  it('resets to the initial state when the children change', async () => {
    const { rerender } = render(
      <Accordion title={title} animated={false}>
        <div>First content</div>
      </Accordion>,
    );
    fireEvent.click(screen.getByRole('button', { name: title }));
    await waitFor(() => expect(screen.queryByText('First content')).not.toBeInTheDocument());

    rerender(
      <Accordion title={title} animated={false}>
        <div>Second content</div>
      </Accordion>,
    );
    expect(screen.getByRole('button', { name: title })).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Second content')).toBeInTheDocument();
  });

  it('keeps the toggled state when re-rendered with the same children', async () => {
    const children = <div>Same content</div>;
    const { rerender } = render(
      <Accordion title={title} animated={false}>
        {children}
      </Accordion>,
    );
    fireEvent.click(screen.getByRole('button', { name: title }));
    await waitFor(() => expect(screen.queryByText('Same content')).not.toBeInTheDocument());

    rerender(
      <Accordion title={title} animated={false}>
        {children}
      </Accordion>,
    );
    expect(screen.getByRole('button', { name: title })).toHaveAttribute('aria-expanded', 'false');
  });

  it('stays closed when fetchData fails and retries on the next click', async () => {
    const fetchData = vi.fn<() => Promise<void>>().mockRejectedValueOnce(new Error('failed')).mockResolvedValue();
    render(
      <Accordion
        title={title}
        fetchData={fetchData}
        loadingText="Loading"
        errorText="Loading failed"
        initialState={false}
        animated={false}
      >
        <div>Fetched content</div>
      </Accordion>,
    );
    const button = screen.getByRole('button', { name: title });

    fireEvent.click(button);
    await waitFor(() => expect(fetchData).toHaveBeenCalledTimes(1));
    // The error is shown and announced in the status region.
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Loading failed'));
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    expect(button).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(button);
    await waitFor(() => expect(screen.getByText('Fetched content')).toBeInTheDocument());
    expect(fetchData).toHaveBeenCalledTimes(2);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('status')).toBeEmptyDOMElement();
  });

  it('starts closed with fetchData even when initialState is true, and fetches on the first click', async () => {
    const fetchData = vi.fn<() => Promise<void>>().mockResolvedValue();
    render(
      <Accordion title={title} fetchData={fetchData} animated={false}>
        <div>Fetched content</div>
      </Accordion>,
    );
    const button = screen.getByRole('button', { name: title });
    expect(button).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(button);
    await waitFor(() => expect(screen.getByText('Fetched content')).toBeInTheDocument());
    expect(fetchData).toHaveBeenCalledTimes(1);
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });
});
