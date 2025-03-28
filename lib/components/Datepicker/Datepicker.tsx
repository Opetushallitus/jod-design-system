import {
  DatePicker as ArkDatePicker,
  DatePickerRootProps,
  DateValue,
  parseDate,
  Portal,
  useDatePicker,
  UseDatePickerContext,
} from '@ark-ui/react';
import React from 'react';
import { MdArrowBack, MdArrowForward, MdCalendarMonth } from 'react-icons/md';
import { cx } from '../../cva';
import { tidyClasses as tc } from '../../utils';
import { isInvalidYear, parseInputValue, verifyCalendarDate } from './utils';

const tableCellClasses = tc([
  'ds:flex',
  'ds:justify-center',
  'ds:items-center',
  'ds:align-center',
  'ds:text-body-sm',
  'ds:m-3',
  'ds:font-arial',
  'ds:size-[28px]',
  'ds:sm:size-[32px]',
  'ds:hover:underline',
  'ds:focus:left-auto ds:capitalize',
  'ds:data-selected:bg-secondary-1-50',
  'ds:data-selected:rounded-full',
]);

const getDayCellClasses = (datePicker: UseDatePickerContext, day: UseDatePickerContext['focusedValue']) =>
  cx(tableCellClasses, {
    'ds:disabled:text-inactive-gray ds:disabled:cursor-not-allowed': datePicker.isUnavailable(day),
    'ds:text-inactive-gray': datePicker.focusedValue.month !== day.month,
  });

const getYearCellClasses = (year: { label: string; value: number }) =>
  cx(tableCellClasses, {
    'ds:disabled:text-inactive-gray ds:disabled:cursor-not-allowed': isInvalidYear(year.value),
  });

const handleEnter = (e: React.KeyboardEvent<HTMLButtonElement>) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    e.currentTarget.click();
  }
};

const Header = () => (
  <ArkDatePicker.ViewControl className="ds:mb-4 ds:flex ds:justify-between">
    <ArkDatePicker.PrevTrigger className="ds:text-accent ds:px-3" onKeyDown={handleEnter}>
      <MdArrowBack size={24} />
    </ArkDatePicker.PrevTrigger>

    <ArkDatePicker.ViewTrigger onKeyDown={handleEnter}>
      <ArkDatePicker.RangeText className="ds:capitalize ds:font-bold" />
    </ArkDatePicker.ViewTrigger>

    <ArkDatePicker.NextTrigger className="ds:text-accent ds:px-3" onKeyDown={handleEnter}>
      <MdArrowForward size={24} />
    </ArkDatePicker.NextTrigger>
  </ArkDatePicker.ViewControl>
);

type ArkTranslationsInUse = Pick<
  Required<DatePickerRootProps>['translations'],
  'nextTrigger' | 'viewTrigger' | 'prevTrigger' | 'dayCell' | 'trigger'
>;

type RefCallback<T> = (instance: T | null) => void;

export interface DatepickerProps {
  /** Name of the input field */
  name?: string;
  /** Initial value, the internal format is 'yyyy-mm-dd' */
  value?: string;
  /** Callback for when the input field loses focus */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Callback for when the value of the input field changes */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Label text for input */
  label: string;
  /** Placeholder text, eg. "pp.kk.vvvv" */
  placeholder?: string;
  /** Help text to display below the input field */
  help?: string;
  /** Translations for the datepicker */
  translations: ArkTranslationsInUse;
  /** Ref for the input field */
  ref?: React.RefObject<HTMLInputElement> | RefCallback<HTMLInputElement>;
}

/** Datepicker component for selecting a date. */
export const Datepicker = ({
  value,
  name,
  label,
  placeholder,
  help,
  ref,
  onBlur,
  onChange,
  translations,
}: DatepickerProps) => {
  const helpId = React.useId();
  const timeZone = 'Europe/Helsinki';

  const arkTranslations: DatePickerRootProps['translations'] = {
    ...translations,
    // Not in use, but required to be defined for Ark-UI
    clearTrigger: '',
    content: '',
    monthSelect: '',
    placeholder: function (_locale: string): { year: string; month: string; day: string } {
      return { year: '', month: '', day: '' };
    },
    presetTrigger: function (_value: string[]): string {
      return '';
    },
    yearSelect: '',
  };

  let parsedValue;
  if (value) {
    parsedValue = [parseDate(value)];
  } else if (value === '') {
    parsedValue = [];
  } else {
    parsedValue = undefined;
  }
  const formatValue = (v: DateValue) => {
    const { day, month, year } = verifyCalendarDate(v);
    return `${day}.${month}.${year}`;
  };

  const datePicker = useDatePicker({
    translations: arkTranslations,
    onValueChange: (details) => {
      onChange({
        target: { name, value: details.value.toString() ?? '' },
      } as React.ChangeEvent<HTMLInputElement>);
    },
    value: parsedValue,
    locale: 'fi-FI',
    timeZone: timeZone,
    isDateUnavailable: (date) => isInvalidYear(date.year),
    parse: parseInputValue,
    format: formatValue,
  });

  return (
    <ArkDatePicker.RootProvider value={datePicker} className="ds:w-full">
      <ArkDatePicker.Label className="ds:mb-4 ds:inline-block ds:align-top ds:text-form-label ds:font-arial ds:text-black">
        {label}
      </ArkDatePicker.Label>
      <ArkDatePicker.Control>
        <div className="ds:flex ds:w-full">
          <ArkDatePicker.Input
            ref={ref}
            name={name}
            placeholder={placeholder}
            className="ds:w-full ds:rounded-l ds:border-y ds:border-l ds:border-border-gray ds:bg-white ds:p-5 ds:font-arial ds:text-black ds:outline-hidden ds:placeholder:text-inactive-gray"
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
              // Handle clearing the input field to allow clearing the datepicker value
              if (e.target.value === '') {
                onChange({
                  target: { name, value: '' },
                } as React.ChangeEvent<HTMLInputElement>);
              }
            }}
            onBlur={onBlur}
          />
          <ArkDatePicker.Trigger
            className="ds:rounded-r ds:border-y ds:border-r ds:border-border-gray ds:bg-white ds:p-5 ds:text-secondary-gray"
            type="button"
            onKeyDown={handleEnter}
            onClick={() => {
              const { value } = datePicker;
              if (value[0]) {
                datePicker.setValue([verifyCalendarDate(value[0])]);
              }
            }}
          >
            <MdCalendarMonth size={24} />
          </ArkDatePicker.Trigger>
        </div>
      </ArkDatePicker.Control>
      {help && (
        <div id={helpId} className="ds:mt-2 ds:block ds:text-help ds:text-secondary-gray ds:font-arial">
          {help}
        </div>
      )}
      <Portal>
        <ArkDatePicker.Positioner>
          <ArkDatePicker.Content className="ds:z-50 ds:rounded ds:shadow-border ds:bg-white ds:p-4">
            <ArkDatePicker.View view="day">
              <ArkDatePicker.Context>
                {(datePicker) => (
                  <>
                    <Header />
                    <ArkDatePicker.Table>
                      <ArkDatePicker.TableHead>
                        <ArkDatePicker.TableRow>
                          {datePicker.weekDays.map((weekDay) => (
                            <ArkDatePicker.TableHeader
                              key={weekDay.long}
                              className="ds:capitalize ds:size-[28px] ds:sm:size-[32px]"
                            >
                              {weekDay.short}
                            </ArkDatePicker.TableHeader>
                          ))}
                        </ArkDatePicker.TableRow>
                      </ArkDatePicker.TableHead>
                      <ArkDatePicker.TableBody>
                        {datePicker.weeks.map((week) => (
                          <ArkDatePicker.TableRow key={week[0].toDate(timeZone).toISOString()}>
                            {week.map((day) => (
                              <ArkDatePicker.TableCell key={day.day} value={day}>
                                <ArkDatePicker.TableCellTrigger className={getDayCellClasses(datePicker, day)} asChild>
                                  <button
                                    type="button"
                                    disabled={datePicker.isUnavailable(day)}
                                    className="ds:cursor-pointer"
                                  >
                                    {day.day}
                                  </button>
                                </ArkDatePicker.TableCellTrigger>
                              </ArkDatePicker.TableCell>
                            ))}
                          </ArkDatePicker.TableRow>
                        ))}
                      </ArkDatePicker.TableBody>
                    </ArkDatePicker.Table>
                  </>
                )}
              </ArkDatePicker.Context>
            </ArkDatePicker.View>
            <ArkDatePicker.View view="month">
              <ArkDatePicker.Context>
                {(datePicker) => (
                  <>
                    <Header />
                    <ArkDatePicker.Table>
                      <ArkDatePicker.TableBody>
                        {datePicker.getMonthsGrid({ columns: 4, format: 'short' }).map((months) => (
                          <ArkDatePicker.TableRow key={months[0].label}>
                            {months.map((month) => (
                              <ArkDatePicker.TableCell key={`_${month.label}`} value={month.value}>
                                <ArkDatePicker.TableCellTrigger className={tableCellClasses}>
                                  <button type="button" className="ds:cursor-pointer">
                                    {month.label}
                                  </button>
                                </ArkDatePicker.TableCellTrigger>
                              </ArkDatePicker.TableCell>
                            ))}
                          </ArkDatePicker.TableRow>
                        ))}
                      </ArkDatePicker.TableBody>
                    </ArkDatePicker.Table>
                  </>
                )}
              </ArkDatePicker.Context>
            </ArkDatePicker.View>
            <ArkDatePicker.View view="year">
              <ArkDatePicker.Context>
                {(datePicker) => (
                  <>
                    <Header />
                    <ArkDatePicker.Table>
                      <ArkDatePicker.TableBody>
                        {datePicker.getYearsGrid({ columns: 4 }).map((years) => (
                          <ArkDatePicker.TableRow key={years[0].label}>
                            {years.map((year) => (
                              <ArkDatePicker.TableCell key={`_${year.label}`} value={year.value}>
                                <ArkDatePicker.TableCellTrigger className={getYearCellClasses(year)} asChild>
                                  <button
                                    type="button"
                                    disabled={isInvalidYear(year.value)}
                                    className="ds:cursor-pointer"
                                  >
                                    {year.label}
                                  </button>
                                </ArkDatePicker.TableCellTrigger>
                              </ArkDatePicker.TableCell>
                            ))}
                          </ArkDatePicker.TableRow>
                        ))}
                      </ArkDatePicker.TableBody>
                    </ArkDatePicker.Table>
                  </>
                )}
              </ArkDatePicker.Context>
            </ArkDatePicker.View>
          </ArkDatePicker.Content>
        </ArkDatePicker.Positioner>
      </Portal>
    </ArkDatePicker.RootProvider>
  );
};
