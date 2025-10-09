import React from 'react';
import { NoteStackContext, type NoteStackContextType } from './NoteStackContext';

export const useNoteStack = (): NoteStackContextType => {
  const ctx = React.useContext(NoteStackContext);
  if (!ctx) {
    throw new Error('useNoteStack must be used within a NoteStackProvider');
  }
  return ctx;
};
