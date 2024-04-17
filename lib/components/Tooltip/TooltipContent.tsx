import React from 'react';
import { FloatingArrow, FloatingPortal, useMergeRefs } from '@floating-ui/react';
import { useTooltipContext, ARROW_HEIGHT } from './utils';

export const TooltipContent = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  function TooltipContent(props, propRef) {
    const tooltipContext = useTooltipContext();
    const ref = useMergeRefs([tooltipContext.refs.setFloating, propRef]);

    if (!tooltipContext.open) {
      return null;
    }

    return (
      <FloatingPortal>
        <div
          className="max-w-[292px] rounded-[20px] bg-primary-gray px-6 py-5 text-body-sm text-white sm:text-body-md"
          ref={ref}
          style={{
            ...tooltipContext.floatingStyles,
          }}
          {...tooltipContext.getFloatingProps(props)}
        >
          {props.children}
          <FloatingArrow
            ref={tooltipContext.arrowRef}
            context={tooltipContext.context}
            className="fill-primary-gray"
            width={ARROW_HEIGHT * 2}
            height={ARROW_HEIGHT}
          />
        </div>
      </FloatingPortal>
    );
  },
);
