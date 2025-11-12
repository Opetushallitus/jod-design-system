import React from 'react';
import { NoteStackContext, PermanentNoteStackElement, TemporaryNoteStackElement } from './NoteStackContext';
import { useCollapseOnScroll } from './utils';

export const NoteStackProvider = ({ children }: { children: React.ReactNode }) => {
  const [permanentNotes, setPermanentNotes] = React.useState<PermanentNoteStackElement[]>([]);
  const [temporaryNotes, setTemporaryNotes] = React.useState<TemporaryNoteStackElement[]>([]);

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

  return (
    <NoteStackContext.Provider
      value={{
        permanentNotes,
        setPermanentNotes: (notes) => {
          setPermanentNotes(notes);
        },
        addPermanentNote(note) {
          setPermanentNotes((prevNotes) => [...prevNotes, note]);
        },
        removePermanentNote: (id: string) => {
          setPermanentNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
        },

        temporaryNotes,
        setTemporaryNotes: (notes) => {
          setTemporaryNotes(notes);
        },
        addTemporaryNote(note) {
          setTemporaryNotes((prevNotes) => [...prevNotes, note]);
        },
        removeTemporaryNote: (id: string) => {
          setTemporaryNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
        },

        permanentNotesHeight,
        setPermanentNotesRef: (element) => {
          permanentNotesRef.current = element;
        },
        isCollapsed,
      }}
    >
      {children}
    </NoteStackContext.Provider>
  );
};
