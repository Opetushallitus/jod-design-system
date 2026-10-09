import { Slider as ArkSlider, SliderValueChangeDetails as ArkValueChangeDetails } from '@ark-ui/react';
import { cx } from 'cva';
import React from 'react';

import { JodCircle } from '../../icons';

export interface RangeSliderValue {
  label: string;
  value: number;
  /** Text announced by screen readers when this value is selected. Defaults to label. */
  ariaValueText?: string;
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
  /** Accessible name for the minimum value thumb, e.g. "Minimum duration" */
  minValueDescription: string;
  /** Accessible name for the maximum value thumb, e.g. "Maximum duration" */
  maxValueDescription: string;
}

type ThumbProps = Pick<RangeSliderProps, 'disabled' | 'testId'> & {
  index: number;
};

const Thumb = ({ disabled, testId, index }: ThumbProps) => {
  return (
    <ArkSlider.Thumb
      index={index}
      className={cx('ds:absolute ds:-top-4 ds:flex ds:size-7 ds:justify-center ds:rounded-full ds:z-20', {
        'ds:bg-accent': !disabled,
        'ds:bg-inactive-gray': disabled,
      })}
      data-testid={testId}
    >
      <ArkSlider.HiddenInput />
    </ArkSlider.Thumb>
  );
};

const Marker = ({ label }: { label: string }) => (
  <div className="ds:relative">
    <JodCircle size={3} className="ds:text-inactive-gray" />
    <div
      className="ds:absolute ds:top-6 ds:left-1/2 ds:-translate-x-1/2 ds:text-menu ds:text-primary-gray ds:text-nowrap"
      // Selected values are announced through aria-valuetext
      aria-hidden
    >
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

  const onValueChangeHandler = (details: ArkValueChangeDetails) => {
    onValueChange(details.value as [number, number]);
  };

  const getAriaValueText = ({ value }: { value: number }) => {
    const marker = markers.find((m) => m.value === value);
    return marker ? (marker.ariaValueText ?? marker.label) : value.toString();
  };

  return (
    <div
      className={cx('ds:flex ds:h-8 ds:min-w-full ds:sm:min-w-[414px]', {
        'ds:text-inactive-gray ds:cursor-not-allowed': disabled,
      })}
    >
      <ArkSlider.Root
        thumbSize={{ width: 32, height: 32 }}
        aria-label={[minValueDescription, maxValueDescription]}
        getAriaValueText={getAriaValueText}
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
            <Thumb index={0} disabled={disabled} testId={testId ? `${testId}-thumb-min` : undefined} />
            <Thumb index={1} disabled={disabled} testId={testId ? `${testId}-thumb-max` : undefined} />
          </ArkSlider.Control>
        </div>
      </ArkSlider.Root>
    </div>
  );
};
