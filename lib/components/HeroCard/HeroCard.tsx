export interface HeroCardProps {
  /** Title text shown on the card */
  title: string;
  /** Content text shown on the card */
  content?: string;
  /** Action content shown on the card */
  actionContent?: string;
  /** Background color of the card */
  backgroundColor?: string;
  /** Link to page */
  href?: string;
  /** Text color */
  textColor?: string;
  /** Size of the card. Lg is default. */
  size?: 'lg' | 'sm';
  /** Arrow visibility. By default it's true if href or actionContent is present. */
  arrowVisible?: boolean;
  /** Arrow color. Defaults to text color */
  arrowColor?: string;
  /** Override the default link click event handling */
  onClick?: () => void;
}

const Arrow = ({ color }: { color: string }) => (
  <div className="size-32 ml-auto select-none font-bold" aria-hidden>
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M30 38L27.15 35.2L36.35 26H4V22H36.35L27.2 12.8L30 10L44 24L30 38Z" fill={color} />
    </svg>
  </div>
);

/** Cards group information into flexible containers that allow users to browse a collection of related items and actions. */
export const HeroCard = ({
  title,
  content,
  actionContent,
  backgroundColor = '#444BACF2',
  href,
  textColor = '#FFF',
  arrowColor = textColor,
  arrowVisible = !!href || !!actionContent,
  size = 'lg',
  onClick,
}: HeroCardProps) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      e?.preventDefault?.();
      onClick();
    }
  };

  if (size === 'lg') {
    return (
      <div
        className="font-poppins relative flex flex-col gap-6 rounded-lg px-7 pb-11 pt-7 tracking-widest"
        style={{ backgroundColor, color: textColor }}
      >
        <h1 className="overflow text-pretty text-[36px] font-semibold leading-[50px]">{title}</h1>
        {content && <p className="tracking-normal leading-[27px] font-medium text-[18px]">{content}</p>}
        {actionContent && (
          <a
            href={href}
            className="absolute bottom-0 right-7 translate-y-2/4 rounded-[40px] outline-none transition-transform hover:scale-105 focus:scale-105"
            onClick={handleLinkClick}
          >
            <div
              className="flex select-none items-center gap-4 rounded-[40px] bg-white px-8 py-[20px] text-[28px] font-bold leading-[40px]"
              style={{ color: backgroundColor }}
            >
              {actionContent}
              {arrowVisible && <Arrow color={arrowColor} />}
            </div>
          </a>
        )}
        {!actionContent && arrowVisible && <Arrow color={arrowColor} />}
      </div>
    );
  }

  if (size === 'sm') {
    return (
      <a
        href={href}
        className="flex rounded-lg outline-none transition-transform hover:scale-105 focus:scale-105"
        onClick={handleLinkClick}
      >
        <div
          className="font-poppins relative flex flex-col grow gap-6 rounded-lg p-7 pb-6 tracking-widest justify-between"
          style={{ backgroundColor, color: textColor }}
        >
          <h2 className="overflow text-pretty text-[24px] font-semibold leading-[34px]">{title}</h2>
          {arrowVisible && <Arrow color={arrowColor} />}
        </div>
      </a>
    );
  }
};
