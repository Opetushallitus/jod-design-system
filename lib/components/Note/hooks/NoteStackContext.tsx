import React from 'react';
import type { NewNoteStackItem, NoteStackNote } from '../utils';

export interface NoteStackContextType {
  notes: NoteStackNote[];
  maxNotes?: number;
  addNote: (note: NewNoteStackItem) => void;
  setNotes: React.Dispatch<React.SetStateAction<NoteStackNote[]>>;
  removeNote: (id: string) => void;
  uncollapseAll: () => void;
}
export const NoteStackContext = React.createContext<NoteStackContextType | undefined>(undefined);
