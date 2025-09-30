import { FloatingArrow, FloatingPortal, useMergeRefs } from '@floating-ui/react';
import React from 'react';
import { tidyClasses } from '../../utils';
import { ARROW_HEIGHT, useTooltipContext } from './utils';

type TooltipContentProps = React.HTMLProps<HTMLDivElement> & {
  arrowClassName?: string;
  dataTestId?: string;
};
export const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  function TooltipContent(props, propRef) {
    const tooltipContext = useTooltipContext();
    const ref = useMergeRefs([tooltipContext.refs.setFloating, propRef]);

    if (!tooltipContext.open) {
      return null;
    }

    const { dataTestId, ...rest } = props;

    return (
      <FloatingPortal>
        <div
          className={tidyClasses([
            'ds:max-w-[280px]',
            'ds:sm:max-w-[320px]',
            'ds:rounded',
            'ds:p-4',
            'ds:bg-primary-gray',
            'ds:text-body-xs',
            'ds:font-arial',
            'ds:text-white',
            'ds:z-50',
          ])}
          ref={ref}
          style={{
            ...tooltipContext.floatingStyles,
          }}
          data-testid={dataTestId}
          {...tooltipContext.getFloatingProps(rest)}
        >
          {props.children}
          <FloatingArrow
            ref={tooltipContext.arrowRef}
            context={tooltipContext.context}
            className={props.arrowClassName ?? 'ds:fill-primary-gray'}
            width={ARROW_HEIGHT * 2}
            height={ARROW_HEIGHT}
            data-testid={dataTestId ? `${dataTestId}-arrow` : undefined}
          />
        </div>
      </FloatingPortal>
    );
  },
);
