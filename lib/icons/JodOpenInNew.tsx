import IconWrapper from './SvgWrapper';
import { IconProps } from './utils';

export const JodOpenInNew = (props: IconProps & { ariaLabel: string }) => {
  const { ariaLabel, ...rest } = props;
  return (
    <>
      <span className="ds:sr-only">{ariaLabel}</span>
      <IconWrapper {...rest} aria-hidden>
        <path
          d="M5.77778 20.2964C5.28889 20.2964 4.87022 20.1225 4.52178 19.7746C4.17393 19.4262 4 19.0075 4 18.5186V6.07416C4 5.58528 4.17393 5.16661 4.52178 4.81816C4.87022 4.47031 5.28889 4.29639 5.77778 4.29639H12V6.07416H5.77778V18.5186H18.2222V12.2964H20V18.5186C20 19.0075 19.8261 19.4262 19.4782 19.7746C19.1298 20.1225 18.7111 20.2964 18.2222 20.2964H5.77778ZM9.95556 15.5853L8.71111 14.3408L16.9778 6.07416H13.7778V4.29639H20V10.5186H18.2222V7.31861L9.95556 15.5853Z"
          fill="currentColor"
        />
      </IconWrapper>
    </>
  );
};
