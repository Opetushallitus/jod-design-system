import React from 'react';

/**
 * Calls `onChange` while rendering when any of `values` differs (by reference) from the previous render. Not on the
 * first render.
 *
 * Use it to adjust state when props change, instead of calling setState in an effect, which first renders the stale
 * state: https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
 * `onChange` may only set state of the component calling this hook.
 */
export const useOnChange = (values: readonly unknown[], onChange: () => void) => {
  const [previous, setPrevious] = React.useState(values);
  if (values.length !== previous.length || values.some((value, i) => value !== previous[i])) {
    setPrevious(values);
    onChange();
  }
};
