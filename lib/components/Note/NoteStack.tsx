import React from 'react';
import { cx } from '../../cva';
import { tidyClasses } from '../../utils';
import { Note } from './Note';
import { useNoteStack } from './hooks/useNoteStack';

export interface NoteStackProps {
  showAllText: string;
}

export const NoteStack = ({ showAllText }: NoteStackProps) => {
  const { notes, removeNote, uncollapseAll } = useNoteStack();

  const collapsedCount = notes.filter((n) => n.collapsed).length;
  const [buttonVisible, setButtonVisible] = React.useState(false);

  React.useEffect(() => {
    if (collapsedCount > 0) {
      setButtonVisible(false);
      setTimeout(() => {
        setButtonVisible(true);
      }, 150);
    } else {
      setButtonVisible(true);
      setTimeout(() => {
        setButtonVisible(false);
      }, 150);
    }
  }, [collapsedCount]);

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
      {notes.map((note) => (
        <Note
          key={note.id}
          collapsed={note.collapsed}
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
      {collapsedCount > 0 && buttonVisible && (
        <button
          className={tidyClasses([
            'ds:cursor-pointer',
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
