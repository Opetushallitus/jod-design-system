import { useMediaQueries } from '../../hooks/useMediaQueries';

export interface HeroCardProps {
  to?: object | string;
  linkComponent?: React.ComponentType<{
    to: object | string;
    className?: string;
    children: React.ReactNode;
  }>;
  /** Title text shown on the card */
  title: string;
  /** Content text shown on the card */
  content?: string;
  /** Action content shown on the card */
  actionContent?: string;
  /** Background color of the card */
  backgroundColor?: string;
  /** Text color */
  textColor?: string;
  /** Size of the card. Lg is default. */
  size?: 'lg' | 'sm';
  /** Arrow visibility. By default it's true if to or actionContent is present. */
  arrowVisible?: boolean;
  /** Arrow color. Defaults to text color */
  arrowColor?: string;
}

const Arrow = ({ color }: { color: string }) => (
  <div className="sm:ds-ml-auto" aria-hidden>
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M30 38L27.15 35.2L36.35 26H4V22H36.35L27.2 12.8L30 10L44 24L30 38Z" fill={color} />
    </svg>
  </div>
);

const ArrowSmall = ({ color }: { color: string }) => (
  <div className="sm:ds-ml-auto" aria-hidden>
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path
        d="M20.0003 25.3327L18.1003 23.466L24.2337 17.3327H2.66699V14.666H24.2337L18.1337 8.53268L20.0003 6.66602L29.3337 15.9993L20.0003 25.3327Z"
        fill={color}
      />
    </svg>
  </div>
);

/** Cards group information into flexible containers that allow users to browse a collection of related items and actions. */
export const HeroCard = ({
  to,
  linkComponent: Link,
  title,
  content,
  actionContent,
  backgroundColor = '#444BACF2',
  textColor = '#FFF',
  arrowColor = textColor,
  arrowVisible = !!to || !!actionContent,
  size = 'lg',
}: HeroCardProps) => {
  const { sm } = useMediaQueries();

  if (size === 'lg') {
    return (
      <div
        className="ds-relative ds-flex ds-flex-col ds-gap-6 ds-rounded-lg ds-p-5 sm:ds-px-7 sm:ds-pb-11 sm:ds-pt-7 ds-tracking-widest"
        style={{ backgroundColor, color: textColor }}
      >
        <h1 className="ds-overflow ds-text-pretty ds-text-[22px] ds-font-semibold ds-leading-[30px] sm:ds-leading-[50px] sm:ds-text-[36px]">
          {title}
        </h1>
        {sm && content && (
          <p className="ds-tracking-normal ds-leading-[27px] ds-font-medium ds-text-[18px]">{content}</p>
        )}
        {actionContent && Link && to && (
          <Link
            to={to}
            className="ds-absolute ds-bottom-0 ds-right-7 ds-translate-y-2/4 ds-rounded-[40px] ds-outline-none ds-transition-transform hover:ds-scale-105 focus:ds-scale-105"
          >
            <div
              className="ds-flex ds-select-none ds-items-center ds-gap-4 ds-rounded-[40px] ds-bg-white ds-px-8 ds-py-[20px] ds-text-[28px] ds-font-bold ds-leading-[40px]"
              style={{ color: backgroundColor }}
            >
              {actionContent}
              {arrowVisible && <Arrow color={arrowColor} />}
            </div>
          </Link>
        )}
        {!actionContent && arrowVisible && <Arrow color={arrowColor} />}
      </div>
    );
  }

  if (size === 'sm') {
    return Link && to ? (
      <Link
        to={to}
        className="ds-flex ds-rounded-lg ds-outline-none ds-transition-transform hover:ds-scale-105 focus:ds-scale-105"
      >
        <div
          className="ds-relative ds-flex ds-flex-row sm:ds-flex-col ds-items-center sm:ds-items-start ds-grow ds-gap-3 sm:ds-gap-6 ds-rounded-lg ds-p-5 sm:ds-p-7 sm:ds-pb-6 ds-tracking-widest ds-justify-between"
          style={{ backgroundColor, color: textColor }}
        >
          <div className="ds-flex ds-flex-col gap-4">
            <h2 className="ds-overflow ds-text-pretty ds-text-[22px] sm:ds-text-[24px] ds-font-semibold ds-leading-[30px] sm:ds-leading-[34px]">
              {title}
            </h2>
            {content && <p className="ds-tracking-normal ds-leading-[27px] ds-font-medium ds-text-[18px]">{content}</p>}
          </div>
          {arrowVisible && sm ? <Arrow color={arrowColor} /> : <ArrowSmall color={arrowColor} />}
        </div>
      </Link>
    ) : (
      <div
        className="ds-relative ds-flex ds-flex-row sm:ds-flex-col ds-items-center sm:ds-items-start ds-grow ds-gap-3 sm:ds-gap-6 ds-rounded-lg ds-p-5 sm:ds-p-7 sm:ds-pb-6 ds-tracking-widest ds-justify-between"
        style={{ backgroundColor, color: textColor }}
      >
        <div className="ds-flex ds-flex-col gap-4">
          <h2 className="ds-overflow ds-text-pretty ds-text-[22px] sm:ds-text-[24px] ds-font-semibold ds-leading-[30px] sm:ds-leading-[34px]">
            {title}
          </h2>
          {content && <p className="ds-tracking-normal ds-leading-[27px] ds-font-medium ds-text-[18px]">{content}</p>}
        </div>
        {arrowVisible && sm ? <Arrow color={arrowColor} /> : <ArrowSmall color={arrowColor} />}
      </div>
    );
  }
};
