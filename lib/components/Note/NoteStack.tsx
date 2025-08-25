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
  const [ignoreScroll, setIgnoreScroll] = React.useState(false);
  const collapsedCount = notes.filter((n) => n.collapsed).length;

  const onCollapse = React.useCallback(() => {
    setNotes(collapseMapper(true));
  }, [setNotes]);

  const onUncollapse = React.useCallback(() => {
    setNotes(collapseMapper(false));
  }, [setNotes]);

  // Collapse all non-permanent notes on scroll
  const collapseMapper = (collapsed: boolean) => (prev: NoteStackNote[]) =>
    prev.map((n) => (n.permanent ? { ...n, collapsed: false } : { ...n, collapsed }));

  useCollapseOnScroll({
    onCollapse,
    onUncollapse,
    ignoreScroll,
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
          'ds:bg-secondary-gray ds:text-white': variant === 'feedback',
        });
  }, [notes]);

  return (
    <div className="ds:z-50 ds:flex ds:flex-col ds:relative">
      {notes.slice(0, maxNotes).map((note) => (
        <Note
          key={note.id}
          collapsed={note.collapsed}
          {...note}
          onCloseClick={() => {
            note.onCloseClick?.();
            removeNote(note.id);
          }}
        />
      ))}

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
          'ds:transition-[height]',
          'ds:duration-100',
          collapsedCount > 0 ? 'ds:py-2 ds:h-7' : 'ds:py-0 ds:h-0',
          getButtonColors(),
        ])}
        onClick={() => {
          // Scroll events need to be ignored for the duration of the collapse animation
          // to prevent instant uncollapsing when scrollY > 0
          setIgnoreScroll(true);
          uncollapseAll();
          setTimeout(() => {
            setIgnoreScroll(false);
          }, 200);
        }}
      >
        <span className={collapsedCount === 0 ? 'ds:hidden' : ''}>{`${showAllText} (${notes.length})`}</span>
      </button>
    </div>
  );
};
