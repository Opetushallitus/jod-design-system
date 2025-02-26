import { describe, expect, it } from 'vitest';
import { clamp, tidyClasses } from './utils';

describe('utils', () => {
  describe('tidyClasses', () => {
    it('should replace multiple whitespaces with a single whitespace', () => {
      const input = 'text-button-lg   bg-accent text-white       bg-bg-gray-2       ';
      expect(tidyClasses(input)).toBe('text-button-lg bg-accent text-white bg-bg-gray-2');
    });

    it('should trim leading and trailing whitespaces', () => {
      const input = '   mb-0 p-0   ';
      expect(tidyClasses(input)).toBe('mb-0 p-0');
    });

    it('cleans up wacky template literals', () => {
      const input = `
        mb-0
        p-0


        foo-bar

    
        appearance-none
        
      `;
      expect(tidyClasses(input)).toBe('mb-0 p-0 foo-bar appearance-none');
    });

    it('should handle empty strings', () => {
      expect(tidyClasses('')).toBe('');
    });

    it('should handle strings with no extra whitespaces', () => {
      const input = 'bg-gray text-white font-poppins';
      expect(tidyClasses(input)).toBe(input);
    });

    it('works with arrays', () => {
      const input = ['', '    bg-gray', `text-white        `, '   font-poppins  '];
      expect(tidyClasses(input)).toBe('bg-gray text-white font-poppins');
    });
  });

  describe('clamp', () => {
    it('should return the value if it is within the range', () => {
      expect(clamp(5, 1, 10)).toBe(5);
    });

    it('should return the minimum value if the value is less than the minimum', () => {
      expect(clamp(0, 1, 10)).toBe(1);
    });

    it('should return the maximum value if the value is greater than the maximum', () => {
      expect(clamp(15, 1, 10)).toBe(10);
    });

    it('should handle negative ranges correctly', () => {
      expect(clamp(-5, -10, -1)).toBe(-5);
      expect(clamp(-15, -10, -1)).toBe(-10);
      expect(clamp(0, -10, -1)).toBe(-1);
    });

    it('should handle edge cases where value is exactly min or max', () => {
      expect(clamp(1, 1, 10)).toBe(1);
      expect(clamp(10, 1, 10)).toBe(10);
    });
  });
});
