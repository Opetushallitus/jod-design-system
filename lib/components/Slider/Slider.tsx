import {
  SliderFocusChangeDetails as ArkFocusChangeDetails,
  Slider as ArkSlider,
  SliderValueChangeDetails as ArkValueChangeDetails,
} from '@ark-ui/react';
import {
  FloatingArrow,
  arrow,
  autoUpdate,
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import React from 'react';

const ARROW_HEIGHT = 12;
const GAP = 8;

export interface SliderProps {
  /** Label */
  label: string;
  /** On slider value change */
  onValueChange: (value: number) => void;
  /** Current value of the slider */
  value: number;
}

const Marker = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" viewBox="0 0 5 5" fill="none">
      <circle cx="2.5" cy="2.5" r="1.5" fill="#71A9CB" />
    </svg>
  );
};

/** Sliders allow users to quickly select a value within a range. They should be used when the upper and lower bounds to the range are invariable. */
export const Slider = ({ label, onValueChange, value }: SliderProps) => {
  const inputId = React.useId();
  const [focused, setFocused] = React.useState(false);
  const arrowRef = React.useRef(null);
  const { refs, floatingStyles, context } = useFloating({
    open: focused,
    middleware: [
      offset(ARROW_HEIGHT + GAP),
      flip(),
      shift(),
      arrow({
        element: arrowRef,
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, {
    role: 'tooltip',
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role]);

  const onValueChangeHandler = (details: ArkValueChangeDetails) => {
    onValueChange(details.value[0]);
  };

  const onFocusChangeHandler = (details: ArkFocusChangeDetails) => {
    setFocused(details.focusedIndex === 0);
  };

  return (
    <div className="ds-flex ds-h-[40px] ds-rounded-[20px] ds-bg-white ds-justify-between">
      <span className="ds-ml-5 ds-flex ds-items-center ds-text-[12px] ds-basis-1/4">{label}</span>
      <ArkSlider.Root
        id={inputId}
        name={`slider-${inputId}`}
        className="ds-ml-5 ds-mr-7 sm:ds-mr-5 ds-flex ds-grow ds-flex-col ds-justify-center ds-basis-3/4"
        onValueChange={onValueChangeHandler}
        onFocusChange={onFocusChangeHandler}
        value={[value]}
        step={25}
      >
        <ArkSlider.MarkerGroup className="ds-z-10">
          <ArkSlider.Marker value={0}>
            <Marker />
          </ArkSlider.Marker>
          <ArkSlider.Marker value={25}>
            <Marker />
          </ArkSlider.Marker>
          <ArkSlider.Marker value={50}>
            <Marker />
          </ArkSlider.Marker>
          <ArkSlider.Marker value={75}>
            <Marker />
          </ArkSlider.Marker>
          <ArkSlider.Marker value={100}>
            <Marker />
          </ArkSlider.Marker>
        </ArkSlider.MarkerGroup>
        <ArkSlider.Control className="ds-flex">
          <ArkSlider.Track className="ds-flex ds-h-[5px] ds-grow ds-bg-bg-gray-2 ds-rounded-[4px]">
            <ArkSlider.Range className="ds-bg-accent ds-h-[5px] ds-rounded-[8px]" />
          </ArkSlider.Track>
          <ArkSlider.Thumb
            ref={refs.setReference}
            {...getReferenceProps()}
            index={0}
            className="ds-absolute -ds-top-[6px] ds-flex ds-size-[17px] ds-justify-center ds-rounded-full ds-bg-accent ds-z-20"
          />
        </ArkSlider.Control>
      </ArkSlider.Root>
      {focused && (
        <div
          ref={refs.setFloating}
          className="ds-max-w-[292px] ds-rounded-[8px] ds-bg-black ds-px-6 ds-py-3 ds-text-button-md ds-text-white sm:ds-text-body-md ds-font-arial"
          style={floatingStyles}
          {...getFloatingProps()}
        >
          {value}%
          <FloatingArrow
            ref={arrowRef}
            context={context}
            className="ds-fill-black"
            width={ARROW_HEIGHT * 2}
            height={ARROW_HEIGHT}
          />
        </div>
      )}
    </div>
  );
};
