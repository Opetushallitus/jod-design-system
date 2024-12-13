import {
  DatePicker as ArkDatePicker,
  DatePickerRootProps,
  parseDate,
  Portal,
  UseDatePickerContext,
} from '@ark-ui/react';
import React from 'react';
import { MdArrowBack, MdArrowForward, MdCalendarMonth } from 'react-icons/md';
import { cx } from '../../cva';
import { tidyClasses as tc } from '../../utils';

const MIN_YEAR = 1900;
const MAX_YEAR = 2100;
const isInvalidYear = (year: number) => year < MIN_YEAR || year >= MAX_YEAR;

const tableCellClasses = tc([
  'ds-flex',
  'ds-justify-center',
  'ds-items-center',
  'ds-align-center',
  'ds-text-body-sm',
  'ds-m-3',
  'ds-font-arial',
  'ds-size-[28px]',
  'sm:ds-size-[32px]',
  'hover:ds-underline',
  'focus:ds-left-auto ds-capitalize',
  'data-[selected]:ds-bg-secondary-1-50',
  'data-[selected]:ds-rounded-full',
]);

const getDayCellClasses = (datePicker: UseDatePickerContext, day: UseDatePickerContext['focusedValue']) =>
  cx(tableCellClasses, {
    'disabled:ds-text-inactive-gray disabled:ds-cursor-not-allowed': datePicker.isUnavailable(day),
    'ds-text-inactive-gray': datePicker.focusedValue.month !== day.month,
  });

const getYearCellClasses = (year: { label: string; value: number }) =>
  cx(tableCellClasses, {
    'disabled:ds-text-inactive-gray disabled:ds-cursor-not-allowed': isInvalidYear(year.value),
  });

const Header = () => (
  <ArkDatePicker.ViewControl className="ds-mb-4 ds-flex ds-justify-between">
    <ArkDatePicker.PrevTrigger className="ds-text-accent ds-px-3">
      <MdArrowBack size={24} />
    </ArkDatePicker.PrevTrigger>

    <ArkDatePicker.ViewTrigger>
      <ArkDatePicker.RangeText className="ds-capitalize ds-font-bold" />
    </ArkDatePicker.ViewTrigger>

    <ArkDatePicker.NextTrigger className="ds-text-accent ds-px-3">
      <MdArrowForward size={24} />
    </ArkDatePicker.NextTrigger>
  </ArkDatePicker.ViewControl>
);

type ArkTranslationsInUse = Pick<
  Required<DatePickerRootProps>['translations'],
  'nextTrigger' | 'viewTrigger' | 'prevTrigger' | 'dayCell' | 'trigger'
>;

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

  translations: ArkTranslationsInUse;
}
/** Datepicker component for selecting a date. */
export const Datepicker = React.forwardRef<HTMLInputElement, DatepickerProps>(function Datepicker(
  { value, name, label, placeholder, help, onBlur, onChange, translations }: DatepickerProps,
  ref,
) {
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

  return (
    <ArkDatePicker.Root
      onValueChange={(details) => {
        onChange({
          target: { name, value: details.valueAsString[0] ?? '' },
        } as React.ChangeEvent<HTMLInputElement>);
      }}
      value={value ? [parseDate(value)] : undefined}
      locale="fi-FI"
      timeZone={timeZone}
      className="ds-w-full"
      isDateUnavailable={(date) => isInvalidYear(date.year)}
      translations={arkTranslations}
    >
      <ArkDatePicker.Label className="ds-mb-4 ds-inline-block ds-align-top ds-text-form-label ds-font-arial ds-text-black">
        {label}
      </ArkDatePicker.Label>
      <ArkDatePicker.Control>
        <div className="ds-flex ds-w-full">
          <ArkDatePicker.Input
            ref={ref}
            name={name}
            placeholder={placeholder}
            className="ds-w-full ds-rounded-l ds-border-y ds-border-l ds-border-border-gray ds-bg-white ds-p-5 ds-font-arial ds-text-black ds-outline-none placeholder:ds-text-inactive-gray"
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
          <ArkDatePicker.Trigger className="ds-rounded-r ds-border-y ds-border-r ds-border-border-gray ds-bg-white ds-p-5 ds-text-secondary-gray">
            <MdCalendarMonth size={24} />
          </ArkDatePicker.Trigger>
        </div>
      </ArkDatePicker.Control>
      {help && (
        <div id={helpId} className="ds-mt-2 ds-block ds-text-help ds-text-secondary-gray ds-font-arial">
          {help}
        </div>
      )}
      <Portal>
        <ArkDatePicker.Positioner>
          <ArkDatePicker.Content className="ds-z-50 ds-rounded ds-shadow-border ds-bg-white ds-p-4">
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
                              className="ds-capitalize ds-size-[28px] sm:ds-size-[32px]"
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
                                  <button type="button" disabled={datePicker.isUnavailable(day)}>
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
                                  {month.label}
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
                                  <button type="button" disabled={isInvalidYear(year.value)}>
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
    </ArkDatePicker.Root>
  );
});
