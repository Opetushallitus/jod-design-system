import React from 'react';
import { NoteProps } from '../Note/Note';

export type PermanentNoteStackElement = Pick<NoteProps, 'title' | 'description' | 'variant' | 'readMoreComponent'> & {
  id?: string;
};
export type TemporaryNoteStackElement = Pick<NoteProps, 'title' | 'description' | 'variant' | 'readMoreComponent'> & {
  isCollapsed: boolean;
  id?: string;
};

export interface NoteStackContextType {
  permanentNotes: PermanentNoteStackElement[];
  setPermanentNotes: React.Dispatch<React.SetStateAction<PermanentNoteStackElement[]>>;
  addPermanentNote: (note: PermanentNoteStackElement) => void;
  removePermanentNote: (id: string) => void;

  temporaryNotes: TemporaryNoteStackElement[];
  setTemporaryNotes: React.Dispatch<React.SetStateAction<TemporaryNoteStackElement[]>>;
  addTemporaryNote: (note: TemporaryNoteStackElement) => void;
  removeTemporaryNote: (id: string) => void;

  permanentNotesHeight: number;
  setPermanentNotesRef: (element: HTMLDivElement | null) => void;

  isCollapsed: boolean;
}

export const NoteStackContext = React.createContext<NoteStackContextType | null>(null);
