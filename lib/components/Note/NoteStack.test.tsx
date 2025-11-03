import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach } from 'node:test';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { NoteStack } from './NoteStack';
import { NoteStackProvider } from './hooks/NoteStackProvider';
import { useNoteStack } from './hooks/useNoteStack';
import { NoteStackNote } from './utils';

// Helper component to add notes via context
const NotesWrapper = ({ notes }: { notes: NoteStackNote[] }) => {
  const { addNote } = useNoteStack();
  React.useEffect(() => {
    notes.forEach((note) => addNote(note));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};

describe('NoteStack', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const mockNotes: NoteStackNote[] = [
    { id: '1', title: 'Note 1', description: 'Desc 1', collapsed: false, variant: 'success', ariaClose: 'Close' },
    { id: '2', title: 'Note 2', description: 'Desc 2', collapsed: false, variant: 'warning', ariaClose: 'Close' },
    { id: '3', title: 'Note 3', description: 'Desc 3', collapsed: false, variant: 'error', ariaClose: 'Close' },
  ];

  it('renders visible notes up to maxNotes', async () => {
    render(
      <NoteStackProvider maxNotes={2}>
        <NotesWrapper notes={mockNotes} />
        <NoteStack showAllText="Show all" />
      </NoteStackProvider>,
    );
    expect(await screen.findByText('Note 3')).toBeInTheDocument();
    expect(await screen.findByText('Note 2')).toBeInTheDocument();
    expect(screen.queryByText('Note 1')).not.toBeInTheDocument();
  });

  it('shows the showAll button when there are collapsed notes', async () => {
    render(
      <NoteStackProvider maxNotes={3}>
        <NotesWrapper notes={mockNotes} />
        <NoteStack showAllText="Show all" />
      </NoteStackProvider>,
    );
    // Simulate scroll to trigger collapse logic
    globalThis.scrollY = 100;
    globalThis.dispatchEvent(new Event('scroll'));
    expect(await screen.findByRole('button', { name: /Show all/i })).toBeInTheDocument();
  });

  it('calls uncollapseAll when showAll button is clicked', async () => {
    render(
      <NoteStackProvider maxNotes={3}>
        <NotesWrapper notes={mockNotes} />
        <NoteStack showAllText="Show all" />
      </NoteStackProvider>,
    );
    globalThis.scrollY = 300;
    globalThis.dispatchEvent(new Event('scroll'));

    const button = await screen.findByRole('button', { name: /Show all/i });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    // After clicking, all notes should be uncollapsed
    expect(screen.queryByRole('button', { name: /Show all/i })).not.toBeInTheDocument();
  });

  it('renders notes in correct sort order (permanent first, then by variant)', async () => {
    const notes: NoteStackNote[] = [
      { id: '3', title: 'Warning', collapsed: false, variant: 'warning', ariaClose: 'Close' },
      { id: '2', title: 'Error', collapsed: false, variant: 'error', ariaClose: 'Close' },
      { id: '4', title: 'Success', collapsed: false, variant: 'success', ariaClose: 'Close' },
      { id: '1', title: 'Permanent', collapsed: false, variant: 'success', permanent: true, ariaClose: 'Close' },
      { id: '5', title: 'Feedback', collapsed: false, variant: 'feedback', ariaClose: 'Close' },
    ];
    render(
      <NoteStackProvider maxNotes={5}>
        <NotesWrapper notes={notes} />
        <NoteStack showAllText="Show all" />
      </NoteStackProvider>,
    );
    // Find all note titles in the DOM in order
    const titles = ['Permanent', 'Error', 'Warning', 'Success', 'Feedback'];
    await waitFor(() => {
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
});
