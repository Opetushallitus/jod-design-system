import React from 'react';
import { FloatingArrow, FloatingPortal, useMergeRefs } from '@floating-ui/react';
import { useTooltipContext } from './utils';

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
          className="max-w-[292px] rounded-2xl bg-primary-gray px-6 py-5 text-body-md text-white"
          ref={ref}
          style={{
            ...tooltipContext.floatingStyles,
          }}
          {...tooltipContext.getFloatingProps(props)}
        >
          {props.children}
          <FloatingArrow ref={tooltipContext.arrowRef} context={tooltipContext.context} className="fill-primary-gray" />
        </div>
      </FloatingPortal>
    );
  },
);
