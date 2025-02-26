import { parseDate } from '@ark-ui/react';
import { CalendarDate, DateValue } from '@internationalized/date';
import { clamp } from '../../utils';

export const MIN_YEAR = 1900;
export const MAX_YEAR = 2100;
export const isInvalidYear = (year: number) => year < MIN_YEAR || year > MAX_YEAR;

/** Tries to parse the string value from Datepicker input into CalendarDate */
export const parseInputValue = (value?: string): DateValue | undefined => {
  if (value === '') {
    return;
  }
  if (value) {
    // Matches the format dd.mm.yyyy, should match after selecting a date from the calendar
    const dateRegex = /^([1-9]|0[1-9]|[12]\d|3[01])\.([1-9]|0[1-9]|1[0-2])\.(\d+)$/;
    const match = dateRegex.exec(value);

    if (match) {
      const [date, month, year] = [match[1], match[2], match[3]].map((v) => parseInt(v, 10));
      const fixedYear = year < 100 ? year + 1900 : year;
      const validYear = isInvalidYear(fixedYear) ? clamp(fixedYear, MIN_YEAR, MAX_YEAR) : fixedYear;
      return new CalendarDate(validYear, month, date);
    } else {
      // If no match, try to parse the value using the Ark Datepickers internal parseDate function
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        const parsed = parseDate(date);
        return new CalendarDate(parsed.year, parsed.month, parsed.day);
      }
    }
  }

  // Fallback to current date
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return new CalendarDate(year, month, day);
};

/**
 * Makes sure the internal DateValue is within the valid range and changes it if necessary
 * @param date DateValue that the ARK datepicker uses
 * @returns DateValue that is within the valid range
 */
export const verifyCalendarDate = (date: DateValue): CalendarDate => {
  const year = isInvalidYear(date.year) ? clamp(date.year, MIN_YEAR, MAX_YEAR) : date.year;
  const month = clamp(date.month, 1, 12);
  const day = clamp(date.day, 1, new Date(year, month, 0).getDate());
  return new CalendarDate(year, month, day);
};
