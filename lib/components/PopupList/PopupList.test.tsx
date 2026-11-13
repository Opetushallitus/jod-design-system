import { render } from '@testing-library/react';
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

  it('keeps a list passed as children instead of nesting it in another list', () => {
    const { container } = render(
      <PopupList testId="own-list">
        <ul>
          <li>
            <a href="/foo">
              <PopupListItem testId="own-item">Item 1</PopupListItem>
            </a>
          </li>
          <li>
            <a href="/bar">
              <PopupListItem>Item 2</PopupListItem>
            </a>
          </li>
        </ul>
      </PopupList>,
    );
    const root = container.querySelector('[data-testid="own-list"]')!;
    expect(root.tagName).toBe('DIV');
    expect(container.querySelectorAll('ul')).toHaveLength(1);
    expect(container.querySelectorAll('li')).toHaveLength(2);
    // Inside the consumer's own list items, PopupListItem must not render another <li>.
    expect(container.querySelector('[data-testid="own-item"]')!.tagName).toBe('DIV');
  });
});
