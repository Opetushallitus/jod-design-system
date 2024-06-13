import { DatePicker as ArkDatePicker, Portal, UseDatePickerContext } from '@ark-ui/react';
import React from 'react';
import { cx } from '../../cva';

const MIN_YEAR = 1900;
const MAX_YEAR = 2100;
const isInvalidYear = (year: number) => year < MIN_YEAR || year >= MAX_YEAR;

const tableCellClasses = 'p-4 hover:text-accent hover:underline focus:left-auto capitalize data-[selected]:font-bold';

const getDayCellClasses = (datePicker: UseDatePickerContext, day: UseDatePickerContext['focusedValue']) =>
  cx(tableCellClasses, {
    'disabled:text-inactive-gray disabled:cursor-not-allowed': datePicker.isUnavailable(day),
    'text-inactive-gray': datePicker.focusedValue.month !== day.month,
  });

const getYearCellClasses = (year: { label: string; value: number }) =>
  cx(tableCellClasses, {
    'disabled:text-inactive-gray disabled:cursor-not-allowed': isInvalidYear(year.value),
  });

const Header = () => (
  <ArkDatePicker.ViewControl className="mb-4 flex justify-between">
    <ArkDatePicker.PrevTrigger className="material-symbols-outlined">arrow_back</ArkDatePicker.PrevTrigger>

    <ArkDatePicker.ViewTrigger>
      <ArkDatePicker.RangeText className="capitalize" />
    </ArkDatePicker.ViewTrigger>

    <ArkDatePicker.NextTrigger className="material-symbols-outlined">arrow_forward</ArkDatePicker.NextTrigger>
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
      className="w-full"
      isDateUnavailable={(date) => isInvalidYear(date.year)}
    >
      <ArkDatePicker.Label className="mb-4 inline-block align-top text-form-label text-primary-gray">
        {label}
      </ArkDatePicker.Label>
      <ArkDatePicker.Control>
        <div className="flex w-full">
          <ArkDatePicker.Input
            ref={ref}
            name={name}
            placeholder={placeholder ? `(${placeholder})` : undefined}
            className="w-full rounded-l-[10px] border-y-[5px] border-l-[5px] border-border-gray bg-white p-[11px] text-primary-gray outline-none placeholder:text-secondary-gray"
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.value === '') {
                onChange({
                  target: { name, value: '' },
                } as React.ChangeEvent<HTMLInputElement>);
              }
            }}
            onBlur={onBlur}
          />
          <ArkDatePicker.Trigger className="material-symbols-outlined select-none rounded-r-[10px] border-y-[5px] border-r-[5px] border-border-gray bg-white p-[11px] text-secondary-gray">
            calendar_month
          </ArkDatePicker.Trigger>
        </div>
      </ArkDatePicker.Control>
      {help && (
        <div id={helpId} className="mt-2 block text-help text-secondary-3">
          {help}
        </div>
      )}
      <Portal>
        <ArkDatePicker.Positioner>
          <ArkDatePicker.Content className="z-50 rounded-[20px] border-[3px] border-secondary-gray bg-white p-4">
            <ArkDatePicker.View view="day">
              <ArkDatePicker.Context>
                {(datePicker) => (
                  <>
                    <Header />
                    <ArkDatePicker.Table>
                      <ArkDatePicker.TableHead>
                        <ArkDatePicker.TableRow>
                          {datePicker.weekDays.map((weekDay) => (
                            <ArkDatePicker.TableHeader key={weekDay.long} className="capitalize">
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
