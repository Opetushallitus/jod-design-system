export interface ResultsCardProps {
  /** Value shown on the card */
  value: string | number;
  /** Label shown on the card */
  label: string;
}

/**
 * This is a card component for displaying a value with a label.
 */
export const ResultsCard = ({ value, label }: ResultsCardProps) => {
  return (
    <div className="flex w-min flex-col-reverse items-center rounded-[10px] bg-bg-gray px-8 py-5 font-bold">
      <span className="text-heading-4 text-black">{label}</span>
      <span className="text-[80px] leading-[110%] text-black">{value}</span>
    </div>
  );
};
