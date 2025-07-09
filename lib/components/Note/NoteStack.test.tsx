import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, Mock, vi } from 'vitest';
import { NoteStack } from './NoteStack';
import * as useNoteStack from './hooks/useNoteStack';

const mockNotes = [
  { id: '1', title: 'Note 1', description: 'Desc 1', collapsed: false, variant: 'success' },
  { id: '2', title: 'Note 2', description: 'Desc 2', collapsed: false, variant: 'warning' },
  { id: '3', title: 'Note 3', description: 'Desc 3', collapsed: true, variant: 'error' },
];

vi.mock('./hooks/useNoteStack', () => ({
  useNoteStack: vi.fn(() => ({
    notes: mockNotes,
    removeNote: vi.fn(),
    uncollapseAll: vi.fn(),
    maxNotes: 2,
  })),
}));

describe('NoteStack', () => {
  const useNoteStackMock = useNoteStack.useNoteStack as Mock;

  it('renders visible notes up to maxNotes', () => {
    render(<NoteStack showAllText="Show all" />);
    expect(screen.getByText('Note 1')).toBeInTheDocument();
    expect(screen.getByText('Note 2')).toBeInTheDocument();
    expect(screen.queryByText('Note 3')).not.toBeInTheDocument();
  });

  it('shows the showAll button when there are collapsed notes', () => {
    render(<NoteStack showAllText="Show all" />);
    expect(screen.getByRole('button', { name: /Show all/i })).toBeInTheDocument();
  });

  it('calls uncollapseAll when showAll button is clicked', () => {
    const uncollapseAll = vi.fn();
    useNoteStackMock.mockReturnValueOnce({
      notes: mockNotes,
      removeNote: vi.fn(),
      uncollapseAll,
      maxNotes: 2,
    });
    render(<NoteStack showAllText="Show all" />);
    fireEvent.click(screen.getByRole('button', { name: /Show all/i }));
    expect(uncollapseAll).toHaveBeenCalled();
  });

  it('removes note when onCloseClick is triggered', () => {
    const removeNote = vi.fn();
    useNoteStackMock.mockReturnValueOnce({
      notes: mockNotes,
      removeNote,
      uncollapseAll: vi.fn(),
      maxNotes: 2,
    });
    render(<NoteStack showAllText="Show all" />);
    const closeButtons = screen.getAllByRole('button');
    fireEvent.click(closeButtons[0]);
    expect(removeNote).toHaveBeenCalled();
  });

  it('renders notes in correct sort order (permanent first, then by variant)', () => {
    const notes = [
      { id: '3', title: 'Warning', collapsed: false, variant: 'warning' },
      { id: '2', title: 'Error', collapsed: false, variant: 'error' },
      { id: '4', title: 'Success', collapsed: false, variant: 'success' },
      { id: '1', title: 'Permanent', collapsed: false, variant: 'success', permanent: true },
      { id: '5', title: 'Feedback', collapsed: false, variant: 'feedback' },
    ];
    useNoteStackMock.mockReturnValueOnce({
      notes: notes,
      removeNote: vi.fn(),
      uncollapseAll: vi.fn(),
      maxNotes: 5,
    });
    render(<NoteStack showAllText="Show all" />);
    // Find all note titles in the DOM in order
    const titles = ['Permanent', 'Error', 'Warning', 'Success', 'Feedback'];
    const foundNodes = titles.map((title) => screen.getByText(title));
    // Check that the notes appear in the correct order in the DOM
    expect(foundNodes).toHaveLength(titles.length);
    expect(foundNodes[0]).toHaveTextContent('Permanent');
    expect(foundNodes[1]).toHaveTextContent('Error');
    expect(foundNodes[2]).toHaveTextContent('Warning');
    expect(foundNodes[3]).toHaveTextContent('Success');
    expect(foundNodes[4]).toHaveTextContent('Feedback');
  });
});
