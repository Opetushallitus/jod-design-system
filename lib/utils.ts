export const tidyClasses = (css: string | string[]): string =>
  Array.isArray(css) ? tidyClasses(css.join(' ')) : css?.replace(/\s+/g, ' ').trim();
