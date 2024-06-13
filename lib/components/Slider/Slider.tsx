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
  /** Label for tooltip */
  label: string;
  /** Icon shown on the button */
  icon: string;
  /** On slider value change */
  onValueChange: (value: number) => void;
  /** Current value of the slider */
  value: number;
}

const getThumbClassName = (focused: boolean, value: number) => {
  return focused ? `${value === 0 ? 'bg-[#DB2C35]' : 'bg-[#25A249]'} ` : 'bg-secondary-gray';
};

const getThumbBackgroundColor = (focused: boolean, value: number) => {
  const lightColorSaturation = 41;
  const lightColorLightness = 85;
  const darkColorSaturation = 63;
  const darkColorLightness = 39;

  const saturation = lightColorSaturation + ((darkColorSaturation - lightColorSaturation) * value) / 100;
  const lightness = lightColorLightness + ((darkColorLightness - lightColorLightness) * value) / 100;

  return focused && value !== 0 ? `hsl(137 ${saturation}% ${lightness}%)` : undefined;
};

export const Slider = ({ label, icon, onValueChange, value }: SliderProps) => {
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

  const thumbClassName = getThumbClassName(focused, value);
  const thumbColorBackgroundColor = getThumbBackgroundColor(focused, value);

  return (
    <div className="flex h-[63px] w-full rounded-[100px] bg-bg-gray">
      <span
        className={`m-2 size-[55px] rounded-full ${focused ? 'bg-accent' : 'bg-white'} flex items-center justify-center ${focused ? 'text-white' : 'text-primary-gray'} material-symbols-outlined select-none`}
        aria-hidden
      >
        <span className="flex items-center justify-center text-[37px]">{icon}</span>
      </span>
      <ArkSlider.Root
        id={inputId}
        name={`slider-${inputId}`}
        className="ml-3 mr-5 flex grow flex-col justify-center"
        onValueChange={onValueChangeHandler}
        onFocusChange={onFocusChangeHandler}
        value={[value]}
      >
        <ArkSlider.Control className="flex">
          <ArkSlider.Track className="flex h-[3px] grow bg-white">
            <ArkSlider.Range className="" />
          </ArkSlider.Track>
          <ArkSlider.Thumb
            ref={refs.setReference}
            {...getReferenceProps()}
            index={0}
            style={thumbColorBackgroundColor ? { backgroundColor: thumbColorBackgroundColor } : undefined}
            className={`absolute -top-[11px] flex size-[24px] justify-center rounded-full border-[3px] border-white ${thumbClassName}`.trim()}
          />
        </ArkSlider.Control>
      </ArkSlider.Root>
      {focused && (
        <div
          ref={refs.setFloating}
          className="max-w-[292px] rounded-[20px] bg-primary-gray px-[20px] py-2 text-button-md text-white sm:text-body-md"
          style={floatingStyles}
          {...getFloatingProps()}
        >
          {label} {value}%
          <FloatingArrow
            ref={arrowRef}
            context={context}
            className="fill-primary-gray"
            width={ARROW_HEIGHT * 2}
            height={ARROW_HEIGHT}
          />
        </div>
      )}
    </div>
  );
};
