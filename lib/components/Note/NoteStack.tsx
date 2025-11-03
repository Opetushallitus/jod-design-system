import React from 'react';
import { cx } from '../../cva';
import { useCollapseOnScroll } from '../../hooks/useCollapseOnScroll';
import { getAccentBgClassForService, type ServiceVariant, tidyClasses } from '../../utils';
import { Note } from './Note';
import { useNoteStack } from './hooks/useNoteStack';
import { DEFAULT_MAX_NOTES, type NoteStackNote } from './utils';

type ServiceBarProps =
  | {
      /** Should the service bar be displayed under the navigation bar */
      showServiceBar: true;
      /** Service variant for styling */
      serviceBarVariant: ServiceVariant;
      /** Service bar title */
      serviceBarTitle?: string;
      /** Component to display on the right side of the service bar */
      serviceBarContent?: React.ReactNode;
    }
  | {
      showServiceBar?: false;
      serviceBarVariant?: never;
      serviceBarTitle?: never;
      serviceBarContent?: never;
    };
export type NoteStackProps = {
  showAllText: string;
  onShowAllClick?: () => void;
  showServiceBar?: boolean;
  serviceBarTitle?: string;
  serviceBarContent?: React.ReactNode;
  serviceVariant?: ServiceVariant;
} & ServiceBarProps;

export const NoteStack = ({
  showAllText,
  onShowAllClick,
  showServiceBar,
  serviceBarTitle,
  serviceBarContent,
  serviceVariant,
}: NoteStackProps) => {
  const { notes, setNotes, removeNote, uncollapseAll, maxNotes = DEFAULT_MAX_NOTES } = useNoteStack();
  const [serviceBarCollapsed, setServiceBarCollapsed] = React.useState(false);
  const allCollapsed = notes.every((n) => n.collapsed);
  const allUncollapsed = notes.every((n) => !n.collapsed);
  const hasUncollapsed = notes.some((n) => !n.collapsed);
  const buttonVisible = notes.length > 1 && hasUncollapsed && !allCollapsed && !allUncollapsed;

  // Initialization: collapse all but the first note
  React.useEffect(() => {
    setNotes((prev) => prev.map((n, index) => ({ ...n, collapsed: index > 0 })));
  }, [setNotes]);

  // Collapse all non-permanent notes on scroll
  const collapseMapper = (collapsed: boolean) => (notes: NoteStackNote[]) =>
    notes.map((n) => (n.permanent ? { ...n, collapsed: false } : { ...n, collapsed }));

  const onCollapse = React.useCallback(() => {
    setNotes(collapseMapper(true));
    setServiceBarCollapsed(true);
  }, [setNotes]);

  const onUncollapse = React.useCallback(() => {
    setNotes(notes.map((n, index) => (n.permanent ? { ...n, collapsed: false } : { ...n, collapsed: index > 0 })));
    setServiceBarCollapsed(false);
  }, [notes, setNotes]);

  const { resetCollapseState } = useCollapseOnScroll({
    onCollapse,
    onUncollapse,
    startupDelayMs: 500,
  });

  const getButtonColors = React.useCallback(() => {
    // If any note is permanent, use error variant, otherwise use the first note's variant
    const variant = notes.at(0)?.variant;

    return !variant
      ? ''
      : cx({
          'ds:bg-alert ds:text-white': variant === 'error',
          'ds:bg-warning ds:text-primary-gray': variant === 'warning',
          'ds:bg-success ds:text-primary-gray': variant === 'success',
          'ds:bg-secondary-3 ds:text-primary-gray': variant === 'feedback',
        });
  }, [notes]);

  const serviceBarContents = (
    <>
      {serviceBarTitle ? <span>{serviceBarTitle}</span> : null}
      {serviceBarContent ? <div>{serviceBarContent}</div> : null}
    </>
  );

  return (
    <div className="ds:flex ds:flex-col ds:absolute ds:w-full">
      {showServiceBar && (
        <div
          className={tidyClasses([
            'ds:w-full',
            'ds:flex',
            'ds:text-white',
            'ds:text-[12px]',
            'ds:sm:text-[14px]',
            'ds:transition-all',
            'ds:duration-300',
            'ds:h-8',
            serviceBarCollapsed ? 'ds:-translate-y-full ds:mt-2' : 'ds:translate-y-0',
            getAccentBgClassForService(serviceVariant || 'yksilo'),
          ])}
          data-testid="servicebar"
        >
          <div className="ds:flex ds:xl:container ds:mx-auto ds:items-center ds:justify-between ds:w-full ds:sm:px-9 ds:px-5">
            {serviceBarContents}
          </div>
        </div>
      )}

      {notes.slice(0, maxNotes).map((note) => (
        <Note
          {...note}
          key={note.id}
          className={serviceBarCollapsed ? 'ds:-translate-y-8' : ''}
          onCloseClick={() => {
            note.onCloseClick?.();
            removeNote(note.id);
          }}
        />
      ))}
      {notes.length > 1 && (
        <button
          aria-hidden={!buttonVisible}
          tabIndex={buttonVisible ? 0 : -1}
          className={tidyClasses([
            'ds:cursor-pointer',
            'ds:ml-auto',
            'ds:mr-6',
            'ds:text-primary-gray',
            'ds:text-button-sm',
            'ds:px-6',
            'ds:rounded-b-md',
            'ds:overflow-clip',
            'ds:absolute',
            'ds:py-3',
            'ds:top-full',
            'ds:right-0',
            'ds:transition-transform',
            'ds:duration-300',
            buttonVisible ? 'ds:scale-y-100' : 'ds:scale-y-0',
            serviceBarCollapsed ? 'ds:-translate-y-8' : '',
            'ds:origin-top',
            getButtonColors(),
          ])}
          onClick={() => {
            resetCollapseState();
            uncollapseAll();
            onShowAllClick?.();
          }}
        >
          <span aria-hidden={!buttonVisible}>{`${showAllText} (${notes.length})`}</span>
        </button>
      )}
    </div>
  );
};
