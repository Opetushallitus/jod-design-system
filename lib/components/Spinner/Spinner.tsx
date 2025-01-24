import { tidyClasses as tc } from '../../utils';

export interface SpinnerProps {
  // Size in pixels
  size: number;
  // Color of the spinner
  color: 'white' | 'accent';
  // Optional CSS class names for the SVG element
  className?: string;
}
export const Spinner = ({ size = 24, color = 'white', className }: SpinnerProps) => {
  const fillClass = color === 'white' ? 'ds:fill-white' : 'ds:fill-accent';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={tc(['ds:animate-spin', className ?? ''])}
    >
      <path
        className={fillClass}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 12.0466C0 12.0466 0 12.0466 0 12.0466C0 5.39345 5.37258 0 12 0C18.6274 0 24 5.39345 24 12.0466C24 18.1898 19.4195 23.259 13.5 24V20.9566C17.7566 20.2397 21 16.5234 21 12.0466C21 7.05674 16.9706 3.01165 12 3.01165C7.02944 3.01165 3 7.05674 3 12.0466C3 12.0466 3 12.0466 3 12.0466H0Z"
      />
    </svg>
  );
};
