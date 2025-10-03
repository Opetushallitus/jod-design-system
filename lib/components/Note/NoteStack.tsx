import React from 'react';
import { cx } from '../../cva';
import { useCollapseOnScroll } from '../../hooks/useCollapseOnScroll';
import { tidyClasses } from '../../utils';
import { Note } from './Note';
import { useNoteStack } from './hooks/useNoteStack';
import { DEFAULT_MAX_NOTES, type NoteStackNote } from './utils';

export interface NoteStackProps {
  showAllText: string;
}

export const NoteStack = ({ showAllText }: NoteStackProps) => {
  const { notes, setNotes, removeNote, uncollapseAll, maxNotes = DEFAULT_MAX_NOTES } = useNoteStack();
  const collapsedCount = notes.filter((n) => n.collapsed).length;

  // Collapse all non-permanent notes on scroll
  const collapseMapper = (collapsed: boolean) => (prev: NoteStackNote[]) =>
    prev.map((n) => (n.permanent ? { ...n, collapsed: false } : { ...n, collapsed }));

  const onCollapse = React.useCallback(() => {
    setNotes(collapseMapper(true));
  }, [setNotes]);

  const onUncollapse = React.useCallback(() => {
    setNotes(collapseMapper(false));
  }, [setNotes]);

  const { resetCollapseState } = useCollapseOnScroll({
    onCollapse,
    onUncollapse,
  });

  const getButtonColors = React.useCallback(() => {
    // If any note is permanent, use error  variant, otherwise use the last note's variant
    const variant = notes.some((n) => n.permanent) ? 'error' : notes.at(-1)?.variant;

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
    <div className="ds:z-50 ds:flex ds:flex-col ds:relative">
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
      {collapsedCount > 0 && notes.length > 1 && (
        <button
          aria-hidden={collapsedCount === 0}
          tabIndex={collapsedCount === 0 ? -1 : 0}
          className={tidyClasses([
            'ds:cursor-pointer',
            'ds:absolute',
            'ds:top-full',
            'ds:right-6',
            'ds:text-primary-gray',
            'ds:text-button-sm',
            'ds:px-6',
            'ds:rounded-b-md',
            collapsedCount > 0 ? 'ds:py-2 ds:h-7' : 'ds:py-0 ds:h-0',
            getButtonColors(),
          ])}
          onClick={() => {
            resetCollapseState();
            uncollapseAll();
          }}
        >
          <span>{`${showAllText} (${notes.length})`}</span>
        </button>
      )}
    </div>
  );
};
