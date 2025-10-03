import { LinkComponent } from './types';

export const DummyLink = ({ children, ...restProps }: LinkComponent) => (
  <a href="/#" {...restProps}>
    {children}
  </a>
);
export const DummyLangLink = ({ href, children, ...restProps }: LinkComponent & { href: string }) => (
  <a href={href} {...restProps}>
    {children}
  </a>
);
