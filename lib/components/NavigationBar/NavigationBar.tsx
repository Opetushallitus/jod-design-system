import React from 'react';
import { useMediaQueries } from '../../hooks/useMediaQueries';
import { cx, Note } from '../../main';
import { getAccentBgClassForService, getAccentBorderClassForService, type ServiceVariant } from '../../utils';
import { LogoIconRgb } from '../Logo/LogoIcon';
import { LogoRgb } from '../Logo/LogoRgb';
import { getBgClassForNoteVariant } from '../Note/utils';
import { useNoteStack } from './useNoteStack';

const MAX_Z_INDEX = 9;

export interface NavigationBarLinkProps {
  className?: string;
  role?: string;
  title?: string;
  children: React.ReactNode;
}

export type NavigationBarLink = React.ComponentType<NavigationBarLinkProps>;

export interface NavigationBarProps {
  /** Place for menu opener button */
  menuComponent?: React.ReactNode;
  /** For language selection button **/
  languageButtonComponent?: React.ReactNode;
  /** For user logout button **/
  userButtonComponent?: React.ReactNode;
  /** For navigation link component */
  renderLink: React.ComponentType<{
    to: object | string;
    className?: string;
    children: React.ReactNode;
  }>;
  logo: {
    to: object | string;
    language: string;
    srText: string;
  };
  /** HTML Element refs */
  refs?: {
    langMenuButtonRef: React.Ref<HTMLLIElement>;
  };
  /** Service variant for styling */
  serviceBarVariant: ServiceVariant;
  /** Service bar title */
  serviceBarTitle?: string;
  /** Component to display on the right side of the service bar */
  serviceBarContent?: React.ReactNode;
  /** Object containing translations */
  translations: {
    showAllNotesLabel: string;
    ariaLabelCloseNote: string;
  };
  /** Test id for querying in tests */
  testId?: string;
}

const setNotesCollapsedValue = <T extends { isCollapsed: boolean }>(notes: (() => T)[], isCollapsed: boolean) => {
  return notes.map((n) => () => ({ ...n(), isCollapsed }));
};

/**
 * This component is a navigation bar that displays a logo, and an avatar.
 */
export const NavigationBar = ({
  menuComponent,
  languageButtonComponent,
  userButtonComponent,
  renderLink: Link,
  logo,
  refs,
  serviceBarVariant,
  serviceBarTitle,
  serviceBarContent,
  translations,
  testId,
}: NavigationBarProps) => {
  const { sm, lg, xl } = useMediaQueries();
  const { permanentNotes, temporaryNotes, setTemporaryNotes, permanentNotesHeight, setPermanentNotesRef, isCollapsed } =
    useNoteStack();

  const permanentNotesRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!permanentNotesRef.current) {
      return;
    }
    setPermanentNotesRef(permanentNotesRef.current);
  }, [permanentNotesRef, setPermanentNotesRef]);

  React.useEffect(() => {
    if (isCollapsed) {
      setTemporaryNotes((prevNotes) => setNotesCollapsedValue(prevNotes, isCollapsed));
    } else {
      setTemporaryNotes((prevNotes) => {
        if (prevNotes.length === 0) {
          return prevNotes;
        }
        const [first, ...rest] = prevNotes;
        return [() => ({ ...first(), isCollapsed }), ...rest];
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCollapsed]);

  const isAnyTemporaryNoteCollapsed = React.useMemo(() => {
    return temporaryNotes.some((n) => n().isCollapsed);
  }, [temporaryNotes]);

  return (
    <>
      <div
        className={`ds:min-w-min ds:bg-white ds:font-poppins ds:text-menu ds:relative ds:z-10 ds:shadow-border ds:border-b-4 ${getAccentBorderClassForService(serviceBarVariant)}`}
        data-testid={testId}
      >
        <nav
          role="navigation"
          className="ds:flex ds:items-center ds:justify-between ds:gap-5 ds:mx-auto ds:h-11 ds:px-5 ds:py-3 ds:font-semibold ds:xl:container"
          data-testid={testId ? `${testId}-nav` : undefined}
        >
          <div>
            <div className="ds:flex ds:grow ds:justify-center ds:items-center ds:flex-direction-row">
              <Link to={logo.to}>
                <div
                  className="ds:inline-flex ds:select-none ds:items-center ds:p-3"
                  data-testid={testId ? `${testId}-logo` : undefined}
                >
                  {sm ? <LogoRgb language={logo.language} size={26} /> : <LogoIconRgb size={39} />}
                  <span className="ds:sr-only">{logo.srText}</span>
                </div>
              </Link>
              <div className="ds:flex ds:items-center ds:bg-secondary-3 ds:rounded ds:px-3 ds:mx-2 ds:h-6 ds:text-[12px]">
                {'Beta'}
              </div>
              {(lg || xl) && <div className="ds:text-secondary-gray ds:font-normal ds:ml-2">{'Testausversio'}</div>}
            </div>
          </div>
          <div className="ds:flex ds:items-center">
            <ul
              className="ds:inline-flex ds:items-center ds:gap-5 ds:sm:gap-7 ds:ml-auto"
              data-testid={testId ? `${testId}-actions` : undefined}
            >
              {languageButtonComponent && <li ref={refs?.langMenuButtonRef}>{languageButtonComponent}</li>}
              {userButtonComponent && <li>{userButtonComponent}</li>}
              {menuComponent && <li>{menuComponent}</li>}
            </ul>
          </div>
        </nav>
      </div>

      <div
        className="ds:relative ds:h-[36px]"
        style={{ height: `${permanentNotesHeight}px` }}
        data-testid={testId ? `${testId}-service-bar-and-notes-wrapper` : undefined}
      >
        <div
          className={cx(
            'ds:absolute ds:w-full ds:transition-[top] ds-duration-300',
            isCollapsed ? 'ds:-top-[36px]' : 'ds:top-0',
          )}
        >
          <div
            className={cx(
              `ds:flex ${getAccentBgClassForService(serviceBarVariant)} ds:text-white ds:sm:text-[14px] ds:text-[12px] ds:h-[36px]`,
            )}
            data-testid={testId ? `${testId}-service-bar` : undefined}
          >
            <div className="ds:flex ds:xl:container ds:mx-auto ds:items-center ds:justify-between ds:w-full ds:sm:px-9 ds:px-5">
              {serviceBarTitle ? <span>{serviceBarTitle}</span> : null}
              {serviceBarContent ? <div>{serviceBarContent}</div> : null}
            </div>
          </div>
          <div ref={permanentNotesRef} data-testid={testId ? `${testId}-permanent-notes` : undefined}>
            {permanentNotes.map((note) => {
              const { title, description, variant, readMoreComponent } = note();
              return (
                <Note
                  key={title}
                  variant={variant}
                  title={title}
                  description={description}
                  permanent={true}
                  readMoreComponent={readMoreComponent}
                  ariaClose={translations.ariaLabelCloseNote}
                  zIndex={MAX_Z_INDEX}
                  className="ds:relative"
                />
              );
            })}
          </div>
          {temporaryNotes.map((note) => {
            const { title, description, variant, readMoreComponent, isCollapsed } = note();
            return (
              <Note
                key={title}
                variant={variant}
                title={title}
                description={description}
                permanent={false}
                onCloseClick={() => setTemporaryNotes(temporaryNotes.filter((n) => n !== note))}
                readMoreComponent={readMoreComponent}
                ariaClose={translations.ariaLabelCloseNote}
                zIndex={MAX_Z_INDEX - temporaryNotes.indexOf(note) - 1}
                isCollapsed={isCollapsed}
                className="ds:relative"
              />
            );
          })}
          {temporaryNotes.length > 0 && (
            <div
              className={cx(
                'ds:flex ds:flex-row-reverse ds:xl:container ds:mx-auto ds:w-full ds:transition-[margin] ds:duration-300',
                isAnyTemporaryNoteCollapsed && !isCollapsed ? 'ds:mt-0' : 'ds:-mt-7',
              )}
              style={{
                zIndex: temporaryNotes.length + 1,
              }}
            >
              <button
                className={cx(
                  'ds:px-6 ds:py-2 ds:h-7 ds:rounded-b-md ds:cursor-pointer ds:group ds:mr-6',
                  getBgClassForNoteVariant(temporaryNotes[0]().variant),
                  'ds:text-button-sm',
                )}
                onClick={() => setTemporaryNotes((prevNotes) => setNotesCollapsedValue(prevNotes, false))}
                inert={!isAnyTemporaryNoteCollapsed}
              >
                <span className="ds:group-hover:underline">{translations.showAllNotesLabel}</span> (
                {permanentNotes.length + temporaryNotes.length})
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
