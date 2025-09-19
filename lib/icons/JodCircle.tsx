import IconWrapper from './SvgWrapper';
import { IconProps } from './utils';

export const JodCircle = (props: IconProps) => {
  const size = props.size && !isNaN(Number(props.size)) ? Number(props.size) : 24;
  const radius = size / 2;
  return (
    <IconWrapper {...props} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={radius} cy={radius} r={radius} fill="currentColor" />
    </IconWrapper>
  );
};
