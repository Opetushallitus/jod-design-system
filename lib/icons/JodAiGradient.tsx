import React from 'react';
import IconWrapper from './SvgWrapper';
import { IconProps } from './utils';

export const JodAiGradient = (props: IconProps) => {
  const id = React.useId();

  return (
    <IconWrapper {...props}>
      <defs>
        <radialGradient
          id={id}
          cx="-247.455"
          cy="462.916"
          fx="-247.455"
          fy="462.916"
          r="1"
          gradientTransform="matrix(0 10 10 0 -4617.162 2486.548)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#7275b7" />
          <stop offset="1" stopColor="#494a99" />
        </radialGradient>
      </defs>
      <g>
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm0 13.26-1.63 4.41-1.63-4.41-4.41-1.63L8.74 12l1.63-4.41L12 12l4.41 1.63L12 15.26Zm4.53-5.87L15.57 12l-.96-2.61L12 8.43l2.61-.96.96-2.61.96 2.61 2.61.96-2.61.96Z"
          fill={`url(#${id})`}
        />
      </g>
    </IconWrapper>
  );
};
