import { MdArrowForward } from 'react-icons/md';
import { cx } from '../../cva';
import { Button } from '../Button/Button';

type ActionButtonProps =
  | {
      to: object | string;
      LinkComponent: React.ComponentType<{
        to: object | string;
        className?: string;
        children: React.ReactNode;
      }>;
      buttonLabel: string;
      buttonVariant?: React.ComponentProps<typeof Button>['variant'];
      onClick?: never;
    }
  | {
      onClick: () => void;
      buttonLabel: string;
      buttonVariant?: React.ComponentProps<typeof Button>['variant'];
      to?: never;
      LinkComponent?: never;
    }
  | {
      onClick?: never;
      to?: never;
      LinkComponent?: never;
      buttonLabel?: never;
      buttonVariant?: never;
    };

export type HeroCardProps = {
  /** Title text shown on the card */
  title: string;
  /** Content text shown on the card */
  content?: string;
  /** Background color of the card */
  backgroundColor?: string;
  /** Size of the card. Lg is default. */
  size?: 'lg' | 'sm';
} & ActionButtonProps;

/** Cards group information into flexible containers that allow users to browse a collection of related items and actions. */
export const HeroCard = ({
  to,
  LinkComponent,
  buttonVariant = 'white',
  title,
  content,
  backgroundColor = '#006DB3',
  size = 'lg',
  buttonLabel,
  onClick,
}: HeroCardProps) => {
  const headingClassNames = cx('ds:text-pretty ds:mr-9', {
    'ds:text-hero-mobile ds:sm:text-hero': size === 'lg',
    'ds:text-heading-2-mobile ds:sm:text-heading-2': size === 'sm',
  });
  const shouldRenderButton = buttonLabel && ((to && LinkComponent) || onClick);

  return (
    <div
      className="ds:flex ds:flex-col ds:gap-4 ds:rounded-lg ds:p-6 ds:justify-between ds:text-white ds:hyphens-auto"
      style={{ backgroundColor }}
    >
      <h2 className={headingClassNames}>{title}</h2>
      {content && <p className="ds:text-pretty ds:text-body-lg-mobile ds:sm:text-body-lg">{content}</p>}

      {shouldRenderButton && (
        <Button
          {...(to &&
            LinkComponent && {
              // eslint-disable-next-line react/no-unstable-nested-components
              LinkComponent: ({ children }: { children: React.ReactNode }) => (
                <div>
                  <LinkComponent className="ds:group ds:outline-hidden" to={to}>
                    {children}
                  </LinkComponent>
                </div>
              ),
            })}
          {...(onClick && { onClick })}
          variant={buttonVariant}
          size="md"
          label={buttonLabel}
          iconSide="right"
          className="ds:mt-4 ds:w-fit ds:group-focus:underline ds:group-focus:text-accent"
          icon={<MdArrowForward size={24} />}
        />
      )}
    </div>
  );
};
