import type { NoteProps } from './Note';

export type NoteStackNote = NoteProps & {
  id: string;
};

export type NewNoteStackItem = NoteProps & {
  id?: string;
};

export const DEFAULT_MAX_NOTES = 3;
