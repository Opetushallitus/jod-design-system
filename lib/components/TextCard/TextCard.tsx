export interface TextCardProps {
  /** Text shown on the card */
  text: string | number;
  /** Label shown on the card */
  label: string;
}

/**
 * This is a card component for displaying a text with a label.
 */
export const TextCard = ({ text, label }: TextCardProps) => {
  return (
    <div className="flex w-min flex-col-reverse items-center rounded-[10px] bg-jod-light px-[40px] py-[15px] font-bold">
      <span className="text-[24px] leading-[26.4px] text-[#4D5358]">{label}</span>
      <span className="text-[80px] leading-[88px] text-jod-black">{text}</span>
    </div>
  );
};
