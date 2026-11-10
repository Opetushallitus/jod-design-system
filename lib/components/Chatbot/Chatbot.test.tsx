import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { Chatbot } from './Chatbot';

const SCRIPT_SRC = 'https://okm-ps32.aiagent.fi/chat/AIAgentChatComponent.js';

/** Simulates the third-party script appending (or re-creating) its root element */
const appendChatbotRoot = () => {
  document.getElementById('ai-agent-component-root')?.remove();
  const root = document.createElement('span');
  root.id = 'ai-agent-component-root';
  document.body.appendChild(root);
  return root;
};

describe('Chatbot', () => {
  afterEach(() => {
    document.getElementById('ai-agent-component-root')?.remove();
  });

  it('loads the chatbot script and removes it on unmount', () => {
    const { unmount } = render(<Chatbot ariaLabel="Neuvontabotti" />);
    expect(document.querySelector(`script[src="${SCRIPT_SRC}"]`)).toBeInTheDocument();
    unmount();
    expect(document.querySelector(`script[src="${SCRIPT_SRC}"]`)).not.toBeInTheDocument();
  });

  it('labels a chatbot root that already exists', () => {
    appendChatbotRoot();
    render(<Chatbot ariaLabel="Neuvontabotti" />);
    expect(screen.getByRole('region', { name: 'Neuvontabotti' })).toBe(
      document.getElementById('ai-agent-component-root'),
    );
  });

  it('labels the chatbot root when the script appends or re-creates it', async () => {
    render(<Chatbot ariaLabel="Neuvontabotti" />);

    const first = appendChatbotRoot();
    await waitFor(() => expect(screen.getByRole('region', { name: 'Neuvontabotti' })).toBe(first));

    const recreated = appendChatbotRoot();
    await waitFor(() => expect(screen.getByRole('region', { name: 'Neuvontabotti' })).toBe(recreated));
  });

  it('updates the label when ariaLabel changes', () => {
    appendChatbotRoot();
    const { rerender } = render(<Chatbot ariaLabel="Neuvontabotti" />);
    rerender(<Chatbot ariaLabel="Advisory bot" />);
    expect(screen.getByRole('region', { name: 'Advisory bot' })).toBeInTheDocument();
  });

  it('stops labelling after unmount', async () => {
    const { unmount } = render(<Chatbot ariaLabel="Neuvontabotti" />);
    unmount();
    const root = appendChatbotRoot();
    // Give a MutationObserver (if one were still attached) a chance to run
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(root).not.toHaveAttribute('aria-label');
  });
});
