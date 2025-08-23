import { FloatingArrow, FloatingPortal, useMergeRefs } from '@floating-ui/react';
import React from 'react';
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
          className="ds:max-w-[292px] ds:rounded ds:bg-black ds:px-6 ds:py-5 ds:text-body-sm ds:font-arial ds:text-white ds:sm:text-body-md"
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
            className={props.arrowClassName ?? 'ds:fill-black'}
            width={ARROW_HEIGHT * 2}
            height={ARROW_HEIGHT}
            data-testid={dataTestId ? `${dataTestId}-arrow` : undefined}
          />
        </div>
      </FloatingPortal>
    );
  },
);
