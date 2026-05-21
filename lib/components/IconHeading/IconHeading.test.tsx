import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';

import { JodCompass } from '../../icons';
import { IconHeading } from './IconHeading';

describe('IconHeading', () => {
  it('renders the component with correct title', () => {
    const title = 'Etsi mahdollisuuksia';
    const { container } = render(<IconHeading title={title} icon={<JodCompass />} />);
    const component = screen.getByRole('heading', { name: title });
    expect(component).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('has no a11y violations', async () => {
    const title = 'Etsi mahdollisuuksia';
    const { container } = render(<IconHeading title={title} icon={<JodCompass />} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
