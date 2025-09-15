import React from 'react';
import IconWrapper from './SvgWrapper';
import { IconProps } from './utils';

export const JodAi = (props: IconProps) => {
  const id = React.useId();

  return (
    <IconWrapper {...props}>
      <g clipPath={`url(#clip_${id})`}>
        <path
          d="M12.1094 2.60156C6.58938 2.60156 2.10938 7.08156 2.10938 12.6016C2.10938 18.1216 6.58938 22.6016 12.1094 22.6016C17.6294 22.6016 22.1094 18.1216 22.1094 12.6016C22.1094 7.08156 17.6294 2.60156 12.1094 2.60156ZM12.1094 15.8616L10.4794 20.2716L8.84937 15.8616L4.43937 14.2316L8.84937 12.6016L10.4794 8.19156L12.1094 12.6016L16.5194 14.2316L12.1094 15.8616ZM16.6394 9.99156L15.6794 12.6016L14.7194 9.99156L12.1094 9.03156L14.7194 8.07156L15.6794 5.46156L16.6394 8.07156L19.2494 9.03156L16.6394 9.99156Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id={`clip_${id}`}>
          <rect width={props.size ?? 24} height={props.size ?? 24} fill="currentColor" />
        </clipPath>
      </defs>
    </IconWrapper>
  );
};
