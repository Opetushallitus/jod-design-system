import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';

import { MainLayout } from './MainLayout';

describe('MainLayout', () => {
  it('renders the component with correct title', () => {
    const { container } = render(
      <MainLayout breadcrumbComponent={null}>
        <div>Test content</div>
      </MainLayout>,
    );
    const component = screen.getByRole('main');
    expect(component).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <MainLayout breadcrumbComponent={null}>
        <div>Test content</div>
      </MainLayout>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
