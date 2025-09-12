import IconWrapper from './SvgWrapper';
import { IconProps } from './utils';

export const JodCircle = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <circle cx="50%" cy="50%" r={props.size} fill="currentColor" />
    </IconWrapper>
  );
};
