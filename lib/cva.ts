import { type ClassValue, cx as cvaCx } from 'cva';
import { defineConfig } from 'cva/config';
import { twMerge } from 'tailwind-merge';

export const { cva, cx } = defineConfig({
  cx: (...inputs: ClassValue[]) => twMerge(cvaCx(...inputs)),
});
