import React from 'react';
import { NoteStackContext } from './NoteStackContext';

export const useNoteStack = () => {
  const ctx = React.useContext(NoteStackContext);
  if (!ctx) {
    throw new Error('useNoteStack must be used within a NoteStackProvider');
  }
  return ctx;
};
