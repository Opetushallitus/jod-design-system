import { IconProps } from './utils';

const IconWrapper = ({ size, className, color, children, ...svgProps }: IconProps) => {
  // Icons are decorative by default and hidden from assistive technology. An icon given a
  // name (aria-label or aria-labelledby) is exposed as an image instead. Explicit props
  // (e.g. role="presentation") still win, as they are spread last.
  const labelled = !!(svgProps['aria-label'] || svgProps['aria-labelledby']);
  return (
    <svg
      aria-hidden={labelled ? undefined : true}
      role={labelled ? 'img' : undefined}
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      width={size && !isNaN(Number(size)) ? String(size) : '24'}
      height={size && !isNaN(Number(size)) ? String(size) : '24'}
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox={svgProps.viewBox ?? '0 0 24 24'}
      className={className}
      style={{ color, ...svgProps.style }}
      {...svgProps}
    >
      {children}
    </svg>
  );
};

export default IconWrapper;
