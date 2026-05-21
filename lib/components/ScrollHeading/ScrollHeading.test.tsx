import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';

import { NoteStackProvider } from '../NavigationBar';
import { ScrollHeading } from './ScrollHeading';

describe('ScrollHeading', () => {
  it('renders with correct title', () => {
    const title = 'Katuporaaja';
    const { container } = render(
      <NoteStackProvider>
        <ScrollHeading title={title} heading="h1" className="ds:text-heading-1" />
      </NoteStackProvider>,
    );
    const component = screen.getByRole('heading', { name: title });
    expect(component).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders with correct id', () => {
    const title = 'Kesto';
    const { container } = render(
      <NoteStackProvider>
        <ScrollHeading title={title} heading="h2" className="ds:text-heading-2" id="id-123" />
      </NoteStackProvider>,
    );
    const component = screen.getByRole('heading', { name: title });
    expect(component.id).equal('id-123');
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders with appendix', () => {
    const title = 'Kesto';
    const appendix = 'Uusi';
    const { container } = render(
      <NoteStackProvider>
        <ScrollHeading title={title} heading="h2" className="ds:text-heading-2" appendix={appendix} />
      </NoteStackProvider>,
    );

    const text = `${title} — ${appendix}`;
    const component = screen.queryByText(text);
    expect(component).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('has no a11y violations', async () => {
    const title = 'Katuporaaja';
    const { container } = render(
      <NoteStackProvider>
        <ScrollHeading title={title} heading="h1" className="ds:text-heading-1" />
      </NoteStackProvider>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
