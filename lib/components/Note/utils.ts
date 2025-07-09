import { NoteProps } from './Note';

export interface NoteStackNote extends NoteProps {
  id: string;
  collapsed?: boolean;
}

export const DEFAULT_MAX_NOTES = 3;
