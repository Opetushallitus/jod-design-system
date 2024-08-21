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
  <div className="ds-size-32 ds-ml-auto ds-select-none ds-font-bold" aria-hidden>
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
        className="ds-relative ds-flex ds-flex-col ds-gap-6 ds-rounded-lg ds-px-7 ds-pb-11 ds-pt-7 ds-tracking-widest"
        style={{ backgroundColor, color: textColor }}
      >
        <h1 className="ds-overflow ds-text-pretty ds-text-[36px] ds-font-semibold ds-leading-[50px]">{title}</h1>
        {content && <p className="ds-tracking-normal ds-leading-[27px] ds-font-medium ds-text-[18px]">{content}</p>}
        {actionContent && (
          <a
            href={href}
            className="ds-absolute ds-bottom-0 ds-right-7 ds-translate-y-2/4 ds-rounded-[40px] ds-outline-none ds-transition-transform hover:ds-scale-105 focus:ds-scale-105"
            onClick={handleLinkClick}
          >
            <div
              className="ds-flex ds-select-none ds-items-center ds-gap-4 ds-rounded-[40px] ds-bg-white ds-px-8 ds-py-[20px] ds-text-[28px] ds-font-bold ds-leading-[40px]"
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
        className="ds-flex ds-rounded-lg ds-outline-none ds-transition-transform hover:ds-scale-105 focus:ds-scale-105"
        onClick={handleLinkClick}
      >
        <div
          className="ds-relative ds-flex ds-flex-col ds-grow ds-gap-6 ds-rounded-lg ds-p-7 ds-pb-6 ds-tracking-widest ds-justify-between"
          style={{ backgroundColor, color: textColor }}
        >
          <h2 className="ds-overflow ds-text-pretty ds-text-[24px] ds-font-semibold ds-leading-[34px]">{title}</h2>
          {arrowVisible && <Arrow color={arrowColor} />}
        </div>
      </a>
    );
  }
};
