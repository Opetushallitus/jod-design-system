import React from 'react';
import { cx } from '../../cva';
import { useCollapseOnScroll } from '../../hooks/useCollapseOnScroll';
import { tidyClasses } from '../../utils';
import { Note } from './Note';
import { useNoteStack } from './hooks/useNoteStack';
import { DEFAULT_MAX_NOTES, type NoteStackNote } from './utils';
export interface NoteStackProps {
  showAllText: string;
  onShowAllClick?: () => void;
}

export const NoteStack = ({ showAllText, onShowAllClick }: NoteStackProps) => {
  const { notes, setNotes, removeNote, uncollapseAll, maxNotes = DEFAULT_MAX_NOTES } = useNoteStack();
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
  }, [setNotes]);

  const onUncollapse = React.useCallback(() => {
    setNotes(notes.map((n, index) => (n.permanent ? { ...n, collapsed: false } : { ...n, collapsed: index > 0 })));
  }, [notes, setNotes]);

  const { resetCollapseState } = useCollapseOnScroll({
    onCollapse,
    onUncollapse,
    startupDelayMs: 500,
  });

  const getButtonColors = React.useCallback(() => {
    // If any note is permanent, use error variant, otherwise use the first note's variant
    const variant = notes.some((n) => n.permanent) ? 'error' : notes.at(0)?.variant;

    return !variant
      ? ''
      : cx({
          'ds:bg-alert ds:text-white': variant === 'error',
          'ds:bg-warning ds:text-primary-gray': variant === 'warning',
          'ds:bg-success ds:text-primary-gray': variant === 'success',
          'ds:bg-secondary-3 ds:text-primary-gray': variant === 'feedback',
        });
  }, [notes]);
  return (
    <div className="ds:z-50 ds:flex ds:flex-col">
      {notes.slice(0, maxNotes).map((note) => (
        <Note
          {...note}
          key={note.id}
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
          // For some reason, Tailwind classes related to these styles didn't have any effect.
          style={{
            marginRight: 24,
            transform: `scaleY(${buttonVisible ? 100 : 0}%)`,
            transformOrigin: 'top',
            transitionDelay: '100ms',
          }}
          className={tidyClasses([
            'ds:cursor-pointer',
            'ds:ml-auto',
            'ds:text-primary-gray',
            'ds:text-button-sm',
            'ds:px-6',
            'ds:rounded-b-md',
            'ds:duration-200',
            'ds:overflow-clip',
            'ds:py-3',
            'ds:absolute',
            'ds:top-full',
            'ds:right-0',
            'ds:transition-transform',
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
