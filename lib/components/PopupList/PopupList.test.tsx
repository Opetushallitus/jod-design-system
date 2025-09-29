import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PopupList, PopupListItem } from './PopupList';

describe('PopupList', () => {
  it('renders the PopupList component correctly', () => {
    const { container } = render(
      <PopupList dataTestId="plist">
        <PopupListItem dataTestId="plist-item-1">
          <a href="/foo">Item 1</a>
        </PopupListItem>
        <PopupListItem>
          <a href="/bar">Item 2</a>
        </PopupListItem>
        <PopupListItem>
          <a href="/baz">Item 3</a>
        </PopupListItem>
      </PopupList>,
    );
    expect(container.querySelector('[data-testid="plist"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="plist-item-1"]')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
