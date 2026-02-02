export const CheckedIcon = ({ disabled }: { disabled: boolean }) => {
  const color = disabled ? 'ds:fill-inactive-gray' : 'ds:fill-accent';
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="ds:self-center"
    >
      <circle cx="8" cy="8" r="8" className={color} />
      <circle cx="8" cy="8" r="6" className="ds:fill-white" />
      <circle cx="8" cy="8" r="4" className={color} />
    </svg>
  );
};
