import { parseDate } from '@ark-ui/react';
import { CalendarDate } from '@internationalized/date';
import { afterEach } from 'node:test';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MAX_YEAR, MIN_YEAR, parseInputValue, verifyCalendarDate } from './utils';

describe('Datepicker utils', () => {
  const mockYear = 2024;
  const mockMonth = 6;
  const mockDay = 1;

  describe('parseInputValue', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date(mockYear, mockMonth - 1, mockDay, 12, 0, 0));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('parses valid date input correctly', () => {
      const validDate = '01.05.2024';
      const result = parseInputValue(validDate);
      expect(result).toEqual(new CalendarDate(2024, 5, 1));
    });

    it('parses valid date input with two-digit year correctly', () => {
      const validDate = '01.05.99';
      const result = parseInputValue(validDate);
      expect(result).toEqual(new CalendarDate(1999, 5, 1));
    });

    it('returns the current date for invalid input', () => {
      const invalidDate = 'invalid-date';
      const result = parseInputValue(invalidDate);
      expect(result?.year).toBe(mockYear);
      expect(result?.month).toBe(mockMonth);
      expect(result?.day).toBe(mockDay);
    });

    it('returns undefined for empty input', () => {
      const result = parseInputValue('');
      expect(result).toBeUndefined();
    });

    it('parses date input with different format correctly', () => {
      const validDate = '2024-05-01';
      const result = parseInputValue(validDate);
      expect(result).toEqual(parseDate(new Date(validDate)));
    });

    it('parses incomplete inputs', () => {
      expect(parseInputValue('1')).toEqual(parseDate(new Date('2001-01-01')));
      expect(parseInputValue('12')).toEqual(parseDate(new Date('2001-12-01')));
      expect(parseInputValue('12.')).toEqual(parseDate(new Date('2001-12-01')));
      expect(parseInputValue('12.9')).toEqual(parseDate(new Date('2001-12-9')));
      expect(parseInputValue('12.9.1')).toEqual(parseDate(new Date('1901-09-12')));
      expect(parseInputValue('12.9.19')).toEqual(parseDate(new Date('1919-09-12')));
      expect(parseInputValue('12.9.198')).toEqual(parseDate(new Date('1900-09-12')));
      expect(parseInputValue('12.9.1986')).toEqual(parseDate(new Date('1986-09-12')));
    });

    it('clamps year correctly if it is out of range', () => {
      const result = parseInputValue('01.05.3000');
      expect(result).toEqual(new CalendarDate(MAX_YEAR, 5, 1));
    });

    it('returns current date for NaN date', () => {
      const invalidDate = '2024-13-01';
      const result = parseInputValue(invalidDate);
      expect(result?.year).toBe(mockYear);
      expect(result?.month).toBe(mockMonth);
      expect(result?.day).toBe(mockDay);
    });
  });

  describe('verifyCalendarDate', () => {
    it('should return the same date if it is within valid range', () => {
      const input = new CalendarDate(2023, 6, 15);
      const result = verifyCalendarDate(input);
      expect(result).toEqual(input);
    });

    it('should clamp the year to MIN_YEAR if it is below the valid range', () => {
      const input = new CalendarDate(1, 6, 15);
      const result = verifyCalendarDate(input);
      expect(result.year).toBe(MIN_YEAR);
    });

    it('should clamp the year to MAX_YEAR if it is above the valid range', () => {
      const input = new CalendarDate(10000, 6, 15);
      const result = verifyCalendarDate(input);
      expect(result.year).toBe(MAX_YEAR);
    });

    it('should clamp the month to 1 if it is below 1', () => {
      const input = new CalendarDate(2023, 0, 15);
      const result = verifyCalendarDate(input);
      expect(result.month).toBe(1);
    });

    it('should clamp the month to 12 if it is above 12', () => {
      const input = new CalendarDate(2023, 13, 15);
      const result = verifyCalendarDate(input);
      expect(result.month).toBe(12);
    });

    it('should clamp the day to the last day of the month if it exceeds the number of days in the month', () => {
      const input = new CalendarDate(2023, 2, 31);
      const result = verifyCalendarDate(input);
      expect(result.day).toBe(28);
    });

    it('should handle leap years correctly', () => {
      const input = new CalendarDate(2024, 2, 29);
      const result = verifyCalendarDate(input);
      expect(result).toEqual(input);
    });

    it('should handle all edge cases simultaneously', () => {
      const input = new CalendarDate(-1, 13, 32);
      const result = verifyCalendarDate(input);
      expect(result).toEqual(new CalendarDate(MIN_YEAR, 12, 31));
    });
  });
});
