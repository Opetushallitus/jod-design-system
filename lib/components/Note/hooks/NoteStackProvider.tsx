import React from 'react';
import type { NoteProps } from '../Note';
import { DEFAULT_MAX_NOTES, type NewNoteStackItem, type NoteStackNote } from '../utils';
import { NoteStackContext } from './NoteStackContext';

export interface NoteStackProviderProps {
  children: React.ReactNode;
  maxNotes?: number;
}
export const NoteStackProvider = ({ children, maxNotes = DEFAULT_MAX_NOTES }: NoteStackProviderProps) => {
  const [notes, setNotes] = React.useState<NoteStackNote[]>([]);
  const idRef = React.useRef(0);
  const queueRef = React.useRef<NoteStackNote[]>([]);
  const processingRef = React.useRef(false);

  // Sort function to sort notes by variant. Permanent notes always come first.
  const sortNotes = (a: NoteStackNote, b: NoteStackNote) => {
    const order: NoteProps['variant'][] = ['error', 'warning', 'success', 'feedback'];
    return a.permanent ? -1 : order.indexOf(a.variant) - order.indexOf(b.variant);
  };

  // Add notes using a queue system to effectively prevent duplicates
  const processQueue = React.useCallback(() => {
    if (processingRef.current === true || queueRef.current.length === 0) {
      return;
    }
    processingRef.current = true;

    while (queueRef.current.length > 0) {
      const nextNote = queueRef.current.shift();
      setNotes((prevNotes) => {
        if (!nextNote?.id || prevNotes.some((n) => n.id === nextNote.id)) {
          return prevNotes;
        }
        return [...prevNotes, nextNote].sort(sortNotes).map((note, index) => ({
          ...note,
          collapsed: note.permanent ? false : index > 0,
        }));
      });
    }

    processingRef.current = false;
  }, []);

  const addNote = React.useCallback(
    (note: NewNoteStackItem) => {
      if (notes.length >= maxNotes) {
        return;
      }
      const id = note.id ?? `ds-note-${idRef.current}`;
      queueRef.current.push({ ...note, id });
      processQueue();

      idRef.current += 1;
    },
    [maxNotes, notes.length, processQueue],
  );

  const removeNote = React.useCallback((id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const uncollapseAll = React.useCallback(() => {
    setNotes((prev) => prev.map((n) => ({ ...n, collapsed: false })));
  }, []);

  const memoizedValue = React.useMemo(
    () => ({ notes, setNotes, addNote, removeNote, uncollapseAll, maxNotes }),
    [addNote, maxNotes, notes, removeNote, uncollapseAll],
  );

  return <NoteStackContext.Provider value={memoizedValue}>{children}</NoteStackContext.Provider>;
};
