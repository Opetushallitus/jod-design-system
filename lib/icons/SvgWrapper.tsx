import { IconProps } from './utils';

const IconWrapper = ({ size, className, color, children, ...svgProps }: IconProps) => {
  return (
    <svg
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
