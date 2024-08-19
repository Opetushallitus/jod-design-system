import { describe, expect, it } from 'vitest';
import { tidyClasses } from './utils';

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
      const input = '';
      const output = '';
      expect(tidyClasses(input)).toBe(output);
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
});
