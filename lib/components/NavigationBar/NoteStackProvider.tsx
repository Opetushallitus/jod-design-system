import React from 'react';
import { NoteStackContext, PermanentNoteStackElement, TemporaryNoteStackElement } from './NoteStackContext';
import { useCollapseOnScroll } from './utils';

const addOrUpdateNote = <T extends { id?: string }>(noteFns: (() => T)[], noteFn: () => T): (() => T)[] => {
  if (!noteFn().id) {
    return [...noteFns, noteFn];
  }
  const noteIndex = noteFns.findIndex((n) => n().id === noteFn().id);
  if (noteIndex >= 0) {
    const newNotes = [...noteFns];
    newNotes[noteIndex] = noteFn;
    return newNotes;
  } else {
    return [...noteFns, noteFn];
  }
};

const removeNote = <T extends { id?: string }>(noteFns: (() => T)[], id: string): (() => T)[] => {
  return noteFns.filter((noteFn) => noteFn().id !== id);
};

export const NoteStackProvider = ({ children }: { children: React.ReactNode }) => {
  const [permanentNotes, setPermanentNotes] = React.useState<(() => PermanentNoteStackElement)[]>([]);
  const [temporaryNotes, setTemporaryNotes] = React.useState<(() => TemporaryNoteStackElement)[]>([]);

  const permanentNotesRef = React.useRef<HTMLDivElement | null>(null);
  const [permanentNotesHeight, setPermanentNotesHeight] = React.useState(0);
  React.useEffect(() => {
    if (!permanentNotesRef.current) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setPermanentNotesHeight(entry.contentRect.height);
      }
    });
    observer.observe(permanentNotesRef.current);
    return () => observer.disconnect();
  }, [permanentNotesRef]);

  const isCollapsed = useCollapseOnScroll();

  const setPermanentNotesRef = React.useCallback((element: HTMLDivElement | null) => {
    permanentNotesRef.current = element;
  }, []);

  const addTemporaryNote = React.useCallback((note: () => TemporaryNoteStackElement) => {
    setTemporaryNotes((prevNotes) => addOrUpdateNote(prevNotes, note));
  }, []);

  const removeTemporaryNote = React.useCallback((id: string) => {
    setTemporaryNotes((prevNotes) => removeNote(prevNotes, id));
  }, []);

  const addPermanentNote = React.useCallback((note: () => PermanentNoteStackElement) => {
    setPermanentNotes((prevNotes) => addOrUpdateNote(prevNotes, note));
  }, []);

  const removePermanentNote = React.useCallback((id: string) => {
    setPermanentNotes((prevNotes) => removeNote(prevNotes, id));
  }, []);

  const contextValue = React.useMemo(
    () => ({
      permanentNotes,
      setPermanentNotes,
      addPermanentNote,
      removePermanentNote,
      temporaryNotes,
      setTemporaryNotes,
      addTemporaryNote,
      removeTemporaryNote,
      permanentNotesHeight,
      setPermanentNotesRef,
      isCollapsed,
    }),
    [
      permanentNotes,
      addPermanentNote,
      removePermanentNote,
      temporaryNotes,
      addTemporaryNote,
      removeTemporaryNote,
      permanentNotesHeight,
      setPermanentNotesRef,
      isCollapsed,
    ],
  );

  return <NoteStackContext.Provider value={contextValue}>{children}</NoteStackContext.Provider>;
};
