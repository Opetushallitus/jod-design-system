import React from 'react';
import { NoteProps } from '../Note';
import { DEFAULT_MAX_NOTES, NoteStackNote } from '../utils';
import { NoteStackContext } from './NoteStackContext';

interface NoteStackProviderProps {
  children: React.ReactNode;
  // Maximum number of notes
  maxNotes?: number;
}
export const NoteStackProvider = ({ children, maxNotes = DEFAULT_MAX_NOTES }: NoteStackProviderProps) => {
  const [notes, setNotes] = React.useState<NoteStackNote[]>([]);
  const idRef = React.useRef(0);

  // Sort function to sort notes by variant. Permanent notes always come first.
  const sortNotes = (a: NoteStackNote, b: NoteStackNote) => {
    const order: NoteProps['variant'][] = ['error', 'warning', 'success', 'feedback'];
    return a.permanent ? -1 : order.indexOf(a.variant) - order.indexOf(b.variant);
  };

  const addNote = React.useCallback(
    (note: Omit<NoteStackNote, 'id'>) => {
      const id = `note-${idRef.current++}`;
      setNotes((prev) => (notes.length < maxNotes ? [{ ...note, id }, ...prev] : prev).sort(sortNotes));
      return id;
    },
    [maxNotes, notes.length],
  );

  const removeNote = React.useCallback(
    (id: string) => {
      // If the note is permanent, do not remove it
      if (!notes.find((n) => n.id === id)?.permanent) {
        setNotes((prev) => prev.filter((n) => n.id !== id));
      }
    },
    [notes],
  );

  const uncollapseAll = React.useCallback(() => {
    setNotes((prev) => prev.map((n) => ({ ...n, collapsed: false })));
  }, []);

  // Collapse all non-permanent notes on scroll
  const collapseMapper = (collapsed: boolean) => (prev: NoteStackNote[]) =>
    prev.map((n) => (!n.permanent ? { ...n, collapsed } : n));

  React.useEffect(() => {
    const onScroll = () => {
      if (window.scrollY === 0) {
        // If at the top, uncollapse all notes
        setNotes(collapseMapper(false));
      } else {
        setNotes(collapseMapper(true));
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const memoizedValue = React.useMemo(
    () => ({ notes, addNote, removeNote, uncollapseAll, maxNotes }),
    [addNote, maxNotes, notes, removeNote, uncollapseAll],
  );

  return <NoteStackContext.Provider value={memoizedValue}>{children}</NoteStackContext.Provider>;
};
