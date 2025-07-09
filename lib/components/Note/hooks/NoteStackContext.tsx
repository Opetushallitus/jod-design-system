import React from 'react';
import { NoteStackNote } from '../utils';

export interface NoteStackContextType {
  notes: NoteStackNote[];
  maxNotes?: number;
  addNote: (note: Omit<NoteStackNote, 'id'>) => string;
  removeNote: (id: string) => void;
  uncollapseAll: () => void;
}
export const NoteStackContext = React.createContext<NoteStackContextType | undefined>(undefined);
