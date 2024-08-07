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
    <div className="flex h-[40px] rounded-[20px] bg-white justify-between">
      <span className="ml-5 flex items-center text-[12px] basis-1/4">{label}</span>
      <ArkSlider.Root
        id={inputId}
        name={`slider-${inputId}`}
        className="ml-5 mr-7 sm:mr-5 flex grow flex-col justify-center basis-3/4"
        onValueChange={onValueChangeHandler}
        onFocusChange={onFocusChangeHandler}
        value={[value]}
        step={25}
      >
        <ArkSlider.MarkerGroup className="z-10">
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
        <ArkSlider.Control className="flex">
          <ArkSlider.Track className="flex h-[5px] grow bg-bg-gray-2 rounded-[4px]">
            <ArkSlider.Range className="bg-accent h-[5px] rounded-[8px]" />
          </ArkSlider.Track>
          <ArkSlider.Thumb
            ref={refs.setReference}
            {...getReferenceProps()}
            index={0}
            className="absolute -top-[6px] flex size-[17px] justify-center rounded-full bg-accent z-20"
          />
        </ArkSlider.Control>
      </ArkSlider.Root>
      {focused && (
        <div
          ref={refs.setFloating}
          className="max-w-[292px] rounded-[8px] bg-black px-6 py-3 text-button-md text-white sm:text-body-md sm:font-arial"
          style={floatingStyles}
          {...getFloatingProps()}
        >
          {value}%
          <FloatingArrow
            ref={arrowRef}
            context={context}
            className="fill-black"
            width={ARROW_HEIGHT * 2}
            height={ARROW_HEIGHT}
          />
        </div>
      )}
    </div>
  );
};
