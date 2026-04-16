import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { PopupList, PopupListItem } from './PopupList';

describe('PopupList', () => {
  const popuplist = (
    <PopupList testId="plist">
      <PopupListItem testId="plist-item-1">
        <a href="/foo">Item 1</a>
      </PopupListItem>
      <PopupListItem>
        <a href="/bar">Item 2</a>
      </PopupListItem>
      <PopupListItem>
        <a href="/baz">Item 3</a>
      </PopupListItem>
    </PopupList>
  );

  it('renders the PopupList component correctly', () => {
    const { container } = render(popuplist);
    expect(container.querySelector('[data-testid="plist"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="plist-item-1"]')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('has no a11y violations', async () => {
    const { container } = render(popuplist);
    expect(await axe(container)).toHaveNoViolations();
  });
});
