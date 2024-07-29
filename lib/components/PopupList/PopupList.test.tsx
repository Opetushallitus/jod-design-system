import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PopupList, PopupListItem } from './PopupList';

describe('PopupList', () => {
  it('renders the PopupList component correctly', () => {
    const { container } = render(
      <PopupList>
        <PopupListItem>
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

    expect(container).toMatchSnapshot();
  });
});
