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
  const collapseMapper = (collapsed: boolean) => (notes: NoteStackNote[]) =>
    notes.map((n) => (n.permanent ? { ...n, collapsed: false } : { ...n, collapsed }));

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
    // If any note is permanent, use error variant, otherwise use the last note's variant
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

  const buttonVisible = notes.length > 1 && collapsedCount > 0;

  return (
    <div className="ds:z-50 ds:flex ds:flex-col ds:absolute ds:w-full">
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
          style={{ marginRight: 24 }} // For some reason, tailwind's mr-6 doesn't work here
          className={tidyClasses([
            'ds:cursor-pointer',
            'ds:ml-auto',
            'ds:text-primary-gray',
            'ds:text-button-sm',
            'ds:px-6',
            'ds:rounded-b-md',
            'ds:transition-transform',
            'ds:duration-500',
            'ds:overflow-clip',
            'ds:py-3',
            buttonVisible ? 'ds:translate-y-0' : 'ds:-translate-y-full',
            getButtonColors(),
          ])}
          onClick={() => {
            resetCollapseState();
            uncollapseAll();
          }}
        >
          <span
            aria-hidden={!buttonVisible}
            className={cx('ds:transition-opacity ds:duration-500', {
              'ds:opacity-0': !buttonVisible,
              'ds:opacity-100': buttonVisible,
            })}
          >
            {`${showAllText} (${notes.length})`}
          </span>
        </button>
      )}
    </div>
  );
};
