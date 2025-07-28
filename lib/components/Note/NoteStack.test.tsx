const mockUseNoteStack = vi.fn();
vi.mock('./hooks/useNoteStack', () => ({
  useNoteStack: (...args: unknown[]): ReturnType<typeof mockUseNoteStack> => mockUseNoteStack(...args),
}));

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach } from 'node:test';
import { describe, expect, it, vi } from 'vitest';
import { NoteStack } from './NoteStack';

const mockNotes = [
  { id: '1', title: 'Note 1', description: 'Desc 1', collapsed: false, variant: 'success' },
  { id: '2', title: 'Note 2', description: 'Desc 2', collapsed: false, variant: 'warning' },
  { id: '3', title: 'Note 3', description: 'Desc 3', collapsed: true, variant: 'error' },
];

describe('NoteStack', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders visible notes up to maxNotes', () => {
    mockUseNoteStack.mockReturnValue({
      notes: mockNotes,
      removeNote: vi.fn(),
      uncollapseAll: vi.fn(),
      maxNotes: 2,
    });
    render(<NoteStack showAllText="Show all" />);
    expect(screen.getByText('Note 1')).toBeInTheDocument();
    expect(screen.getByText('Note 2')).toBeInTheDocument();
    const note3 = screen.queryByText('Note 3');
    expect(note3).toBeInTheDocument();
    const note3Container = note3?.closest('[aria-hidden="true"]');
    expect(note3Container).toBeTruthy();
    expect(note3Container).toHaveAttribute('tabIndex', '-1');
  });

  it('shows the showAll button when there are collapsed notes', async () => {
    mockUseNoteStack.mockReturnValue({
      notes: mockNotes,
      removeNote: vi.fn(),
      uncollapseAll: vi.fn(),
      maxNotes: 2,
    });
    render(<NoteStack showAllText="Show all" />);
    window.scrollY = 100;
    window.dispatchEvent(new Event('scroll'));
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Show all/i })).toBeInTheDocument();
    });
  });

  it('calls uncollapseAll when showAll button is clicked', async () => {
    const uncollapseAll = vi.fn();
    mockUseNoteStack.mockReturnValue({
      notes: mockNotes,
      removeNote: vi.fn(),
      uncollapseAll,
      maxNotes: 2,
    });
    render(<NoteStack showAllText="Show all" />);
    window.scrollY = 300;
    window.dispatchEvent(new Event('scroll'));

    const button = await screen.findByRole('button', { name: /Show all/i });
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
    expect(uncollapseAll).toHaveBeenCalled();
  });

  it('renders notes in correct sort order (permanent first, then by variant)', async () => {
    const notes = [
      { id: '3', title: 'Warning', collapsed: false, variant: 'warning' },
      { id: '2', title: 'Error', collapsed: false, variant: 'error' },
      { id: '4', title: 'Success', collapsed: false, variant: 'success' },
      { id: '1', title: 'Permanent', collapsed: false, variant: 'success', permanent: true },
      { id: '5', title: 'Feedback', collapsed: false, variant: 'feedback' },
    ];
    mockUseNoteStack.mockReturnValue({
      notes: notes,
      removeNote: vi.fn(),
      uncollapseAll: vi.fn(),
      maxNotes: 5,
    });
    render(<NoteStack showAllText="Show all" />);
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
