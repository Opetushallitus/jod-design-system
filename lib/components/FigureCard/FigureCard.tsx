export interface FigureCardProps {
  /** Content shown on the card */
  content: string | number;
  /** Caption shown on the card */
  caption: string;
}

/**
 * This is a card component for displaying a text figure with a caption.
 */
export const FigureCard = ({ content, caption }: FigureCardProps) => {
  return (
    <figure className="flex w-min flex-col-reverse items-center rounded-[10px] bg-jod-light px-[40px] py-[15px] font-bold">
      <figcaption className="text-[24px] leading-[26.4px] text-[#4D5358]">{caption}</figcaption>
      <span className="text-[80px] leading-[88px] text-jod-black">{content}</span>
    </figure>
  );
};
