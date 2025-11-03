import { Slider as ArkSlider, SliderValueChangeDetails as ArkValueChangeDetails } from '@ark-ui/react';

import { cx } from 'cva';
import React from 'react';
import { JodCircle } from '../../icons';

export interface RangeSliderValue {
  label: string;
  value: number;
}

export interface RangeSliderProps {
  /** Possible slider values */
  markers: RangeSliderValue[];
  /** On slider value change */
  onValueChange: (value: [number, number]) => void;
  /** Selected markers of the slider */
  value?: [number, number];
  /** Disabled state */
  disabled?: boolean;
  /** Data-testid attribute */
  testId?: string;
  /** Aria description for minimum slider value */
  minValueDescription: string;
  /** Aria description for maximum slider value */
  maxValueDescription: string;
}

type ThumbProps = Pick<RangeSliderProps, 'disabled' | 'testId'> & {
  index: number;
  value: RangeSliderValue;
  description: string;
};

const Thumb = ({ disabled, testId, index, value, description }: ThumbProps) => {
  return (
    <ArkSlider.Thumb
      index={index}
      className={cx('ds:absolute ds:-top-4 ds:flex ds:size-7 ds:justify-center ds:rounded-full ds:z-20', {
        'ds:bg-accent': !disabled,
        'ds:bg-inactive-gray': disabled,
      })}
      data-testid={testId ? `${testId}-thumb-${index}` : undefined}
      aria-valuenow={value.value}
      aria-valuetext={value.label}
      aria-label={value.label}
      aria-description={description}
    >
      <ArkSlider.HiddenInput />
    </ArkSlider.Thumb>
  );
};

const Marker = ({ label }: { label: string }) => (
  <div className="ds:relative">
    <JodCircle size={3} className="ds:text-inactive-gray" />
    <div className="ds:absolute ds:top-6 ds:left-1/2 ds:-translate-x-1/2 ds:text-menu ds:text-black ds:text-nowrap">
      {label}
    </div>
  </div>
);

/** Sliders allow users to quickly select a value within a range. They should be used when the upper and lower bounds to the range are invariable. */

export const RangeSlider = ({
  onValueChange,
  value,
  disabled,
  testId,
  markers,
  minValueDescription,
  maxValueDescription,
}: RangeSliderProps) => {
  const inputId = React.useId();

  // Internal value is only used to figure out which label to show for the thumbs for a11y
  const [internalValue, setInternalValue] = React.useState(value);

  const onValueChangeHandler = (details: ArkValueChangeDetails) => {
    onValueChange(details.value as [number, number]);
    setInternalValue(details.value as [number, number]);
  };

  const getThumbValue = (index: number): RangeSliderValue => {
    const fallbackValue = { label: index.toString(), value: index };

    if (value) {
      return markers.find((marker) => marker.value === value[index]) ?? fallbackValue;
    } else if (internalValue) {
      return markers.find((marker) => marker.value === internalValue[index]) ?? fallbackValue;
    } else {
      return fallbackValue;
    }
  };

  return (
    <div
      className={cx('ds:flex ds:h-[40px] ds:min-w-full ds:sm:min-w-[414px]', {
        'ds:text-inactive-gray ds:cursor-not-allowed': disabled,
      })}
    >
      <ArkSlider.Root
        thumbSize={{ width: 32, height: 32 }}
        // eslint-disable-next-line jsx-a11y/aria-proptypes
        aria-label={[getThumbValue(0).label, getThumbValue(1).label]}
        min={markers[0]?.value ?? 0}
        max={markers[markers.length - 1]?.value ?? 100}
        id={inputId}
        name={`range-slider-${inputId}`}
        className="ds:flex ds:flex-col ds:w-full ds:gap-3"
        onValueChange={onValueChangeHandler}
        value={value}
        defaultValue={value ?? [markers[0]?.value ?? 0, markers[markers.length - 1]?.value ?? 100]}
        disabled={disabled}
        data-testid={testId}
      >
        <div className="ds:content-center ds:w-full">
          <ArkSlider.Control className="ds:flex ds:grow ds:w-full">
            <ArkSlider.Track className="ds:flex ds:h-[10px] ds:grow ds:bg-white ds:rounded-sm">
              <ArkSlider.MarkerGroup
                className={cx('ds:z-10 ds:w-full ds:flex ds:items-center ds:justify-between', {
                  'ds:text-[#71A9CB]': !disabled,
                  'ds:text-inactive-gray': disabled,
                })}
              >
                {markers.map((marker) => (
                  <ArkSlider.Marker key={marker.value} value={marker.value}>
                    <Marker label={marker.label} />
                  </ArkSlider.Marker>
                ))}
              </ArkSlider.MarkerGroup>
              <ArkSlider.Range
                className={cx('ds:h-[10px] ds:rounded-md', {
                  'ds:bg-accent': !disabled,
                  'ds:bg-inactive-gray': disabled,
                })}
              />
            </ArkSlider.Track>
            <Thumb
              index={0}
              disabled={disabled}
              testId={testId}
              value={getThumbValue(0)}
              description={minValueDescription}
            />
            <Thumb
              index={1}
              disabled={disabled}
              testId={testId}
              value={getThumbValue(1)}
              description={maxValueDescription}
            />
          </ArkSlider.Control>
        </div>
      </ArkSlider.Root>
    </div>
  );
};
