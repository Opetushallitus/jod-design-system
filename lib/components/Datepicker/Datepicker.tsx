import { DatePicker as ArkDatePicker, Portal, UseDatePickerContext } from '@ark-ui/react';
import React from 'react';
import { cx } from '../../cva';

const MIN_YEAR = 1900;
const MAX_YEAR = 2100;
const isInvalidYear = (year: number) => year < MIN_YEAR || year >= MAX_YEAR;

const tableCellClasses =
  'ds-m-3 ds-text-body-sm ds-size-[28px] sm:ds-size-[32px] hover:ds-underline focus:ds-left-auto ds-capitalize data-[selected]:ds-bg-secondary-1-50 data-[selected]:ds-rounded-full';

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
    <ArkDatePicker.PrevTrigger className="material-symbols-outlined ds-text-accent ds-font-semibold ds-px-3">
      arrow_back
    </ArkDatePicker.PrevTrigger>

    <ArkDatePicker.ViewTrigger>
      <ArkDatePicker.RangeText className="ds-capitalize ds-font-bold" />
    </ArkDatePicker.ViewTrigger>

    <ArkDatePicker.NextTrigger className="material-symbols-outlined ds-text-accent ds-font-semibold ds-px-3">
      arrow_forward
    </ArkDatePicker.NextTrigger>
  </ArkDatePicker.ViewControl>
);

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
}

/** Datepicker component for selecting a date. */
export const Datepicker = React.forwardRef<HTMLInputElement, DatepickerProps>(function Datepicker(
  { value, name, label, placeholder, help, onBlur, onChange }: DatepickerProps,
  ref,
) {
  const helpId = React.useId();
  return (
    <ArkDatePicker.Root
      onValueChange={(details) => {
        onChange({
          target: { name, value: details.valueAsString[0] ?? '' },
        } as React.ChangeEvent<HTMLInputElement>);
      }}
      value={value ? [value] : []}
      locale="fi-FI"
      timeZone="Europe/Helsinki"
      className="ds-w-full"
      isDateUnavailable={(date) => isInvalidYear(date.year)}
    >
      <ArkDatePicker.Label className="ds-mb-4 ds-inline-block ds-align-top ds-text-form-label ds-text-black">
        {label}
      </ArkDatePicker.Label>
      <ArkDatePicker.Control>
        <div className="ds-flex ds-w-full">
          <ArkDatePicker.Input
            ref={ref}
            name={name}
            placeholder={placeholder}
            className="ds-w-full ds-rounded-l ds-border-y ds-border-l ds-border-border-gray ds-bg-white ds-p-5 ds-text-black ds-outline-none placeholder:ds-text-inactive-gray placeholder:ds-font-poppins"
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.value === '') {
                onChange({
                  target: { name, value: '' },
                } as React.ChangeEvent<HTMLInputElement>);
              }
            }}
            onBlur={onBlur}
          />
          <ArkDatePicker.Trigger className="material-symbols-outlined ds-select-none ds-rounded-r ds-border-y ds-border-r ds-border-border-gray ds-bg-white ds-p-5 ds-text-secondary-gray">
            calendar_month
          </ArkDatePicker.Trigger>
        </div>
      </ArkDatePicker.Control>
      {help && (
        <div id={helpId} className="ds-mt-2 ds-block ds-text-help ds-text-secondary-gray">
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
                        {datePicker.weeks.map((week, i) => (
                          <ArkDatePicker.TableRow key={i}>
                            {week.map((day) => (
                              <ArkDatePicker.TableCell key={`${day.day}_${i}`} value={day}>
                                <ArkDatePicker.TableCellTrigger
                                  className={getDayCellClasses(datePicker, day)}
                                  disabled={datePicker.isUnavailable(day)}
                                >
                                  {day.day}
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
                        {datePicker.getMonthsGrid({ columns: 4, format: 'short' }).map((months, i) => (
                          <ArkDatePicker.TableRow key={i}>
                            {months.map((month) => (
                              <ArkDatePicker.TableCell key={month.label} value={month.value}>
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
                        {datePicker.getYearsGrid({ columns: 4 }).map((years, i) => (
                          <ArkDatePicker.TableRow key={`year_${i}`}>
                            {years.map((year) => (
                              <ArkDatePicker.TableCell key={year.label} value={year.value}>
                                <ArkDatePicker.TableCellTrigger
                                  className={getYearCellClasses(year)}
                                  disabled={isInvalidYear(year.value)}
                                >
                                  {year.label}
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
