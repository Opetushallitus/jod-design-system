import React from 'react';
import { cx } from '../../cva';
import { tidyClasses } from '../../utils';
import { Note } from './Note';
import { useNoteStack } from './hooks/useNoteStack';
import { DEFAULT_MAX_NOTES } from './utils';

export interface NoteStackProps {
  showAllText: string;
}

export const NoteStack = ({ showAllText }: NoteStackProps) => {
  const { notes, removeNote, uncollapseAll, maxNotes } = useNoteStack();
  const safeMaxNotes = typeof maxNotes === 'number' && !isNaN(maxNotes) ? maxNotes : DEFAULT_MAX_NOTES;
  const visibleNotes = notes.filter((n) => !n.collapsed).slice(0, safeMaxNotes);
  const collapsedCount = notes.filter((n) => n.collapsed).length;

  const getButtonColors = React.useCallback(() => {
    const variant = visibleNotes.at(-1)?.variant;

    return !variant
      ? ''
      : cx({
          'ds:bg-alert ds:text-white': variant === 'error',
          'ds:bg-warning ds:text-primary-gray': variant === 'warning',
          'ds:bg-success ds:text-primary-gray': variant === 'success',
          'ds:bg-secondary-gray ds:text-white': variant === 'feedback',
        });
  }, [visibleNotes]);

  return (
    <div className="ds:z-50 ds:flex ds:flex-col ds:relative">
      {visibleNotes.map((note) => (
        <Note
          key={note.id}
          {...note}
          onCloseClick={
            note.onCloseClick
              ? () => {
                  note.onCloseClick?.();
                  removeNote(note.id);
                }
              : () => removeNote(note.id)
          }
        />
      ))}
      {collapsedCount > 0 && visibleNotes.length > 0 && (
        <button
          className={tidyClasses([
            'ds:absolute',
            'ds:top-full',
            'ds:right-6',
            'ds:text-primary-gray',
            'ds:text-button-sm',
            'ds:px-6',
            'ds:py-2',
            'ds:rounded-b-md',
            getButtonColors(),
          ])}
          onClick={uncollapseAll}
        >
          {showAllText} ({notes.length})
        </button>
      )}
    </div>
  );
};
