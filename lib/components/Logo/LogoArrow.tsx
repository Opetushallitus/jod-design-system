import { LogoProps } from './types';

interface LogoArrowProps extends LogoProps {
  fill: string;
}

const Arrow = ({ size, fill }: LogoArrowProps) => (
  <svg height={size} viewBox="0 0 56 64" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g transform="translate(-36.000000, -32.000000)" fill={fill} fillRule="nonzero">
        <g transform="translate(36.570318, 32.000000)">
          <path d="M13.0631425,22.6308563 L29.2973317,31.998485 L13.0631425,41.3721764 L13.0631425,22.6308563 Z M0,0 L0,64 L55.4296823,31.998485 L0,0 Z"></path>
        </g>
      </g>
    </g>
  </svg>
);

export const LogoArrowBlack = ({ size }: LogoArrowProps) => {
  return <Arrow fill="#000" size={size} />;
};

export const LogoArrowOrange = ({ size }: LogoArrowProps) => {
  return <Arrow fill="#EE7C45" size={size} />;
};

export const LogoArrowPink = ({ size }: LogoArrowProps) => {
  return <Arrow fill="#CD4EB3" size={size} />;
};

export const LogoArrowBlue = ({ size }: LogoArrowProps) => {
  return <Arrow fill="#339DDF" size={size} />;
};

export const LogoArrowTurquoise = ({ size }: LogoArrowProps) => {
  return <Arrow fill="#00A8B3" size={size} />;
};

export const LogoArrowWhite = ({ size }: LogoArrowProps) => {
  return <Arrow fill="#fff" size={size} />;
};
