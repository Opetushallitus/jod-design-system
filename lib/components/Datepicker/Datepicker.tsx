import { DatePicker as ArkDatePicker, Portal, UseDatePickerContext } from '@ark-ui/react';
import { cx } from '../../cva';

const MIN_YEAR = 1900;
const MAX_YEAR = 2100;
const isInvalidYear = (year: number) => year < MIN_YEAR || year > MAX_YEAR;

const tableCellClasses = 'p-4 hover:text-accent hover:underline focus:left-auto focus:underline capitalize';

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
  /** Label text for input */
  label: string;
  /** Placeholder text, eg. "pp.kk.vvvv" */
  placeholder: string;
  /** Initial value, the internal format is ['yyyy-mm-dd'] */
  value?: string[];
  /** Callback value for when the value has been changed. Triggers on blur and on calendar click */
  onValueChange?: (value: ArkDatePicker.ValueChangeDetails) => void;
}
export const Datepicker = ({ value, label, placeholder, onValueChange }: DatepickerProps) => {
  return (
    <ArkDatePicker.Root
      onValueChange={onValueChange}
      value={value}
      locale="fi-FI"
      className="inline-block"
      isDateUnavailable={(date) => isInvalidYear(date.year)}
    >
      <ArkDatePicker.Label className="mb-4 inline-block align-top text-form-label text-primary-gray">
        {label}
      </ArkDatePicker.Label>
      <ArkDatePicker.Control>
        <div className="inline-flex rounded-[10px] border-[5px] border-border-gray bg-white p-[11px] text-primary-gray">
          <ArkDatePicker.Input
            placeholder={`(${placeholder})`}
            className="outline-none placeholder:text-secondary-gray"
          />
          <ArkDatePicker.Trigger className="material-symbols-outlined ml-auto">calendar_month</ArkDatePicker.Trigger>
        </div>
      </ArkDatePicker.Control>
      <Portal>
        <ArkDatePicker.Positioner>
          <ArkDatePicker.Content className="rounded-[20px] border-[3px] border-[#767676] bg-white p-4">
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
};
