import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Chatbot } from './Chatbot';
import { loadAiAgentFloat } from './loadAiAgentFloat';

vi.mock('./loadAiAgentFloat', () => ({
  loadAiAgentFloat: vi.fn(),
}));

const defaultProps = {
  agent: 'test-agent-123',
  language: 'en',
  agentIcon: 'https://example.com/icon.png',
  header: 'Chat with AI',
  openWindowText: 'Open Chat',
  agentName: 'Test Agent',
  errorMessage: 'Something went wrong',
  greeting: 'Hello! How can I help you?',
  textInputPlaceholder: 'Type your message...',
  textInputHelper: 'Press Enter to send',
  eraseChatHistory: 'Clear History',
  saveChatAsCsv: 'Save as CSV',
  close: 'Close',
};

describe('Chatbot', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, 'dispatchEvent');
  });

  it('renders without crashing', () => {
    render(<Chatbot {...defaultProps} />);
    expect(screen.getByText('Chat with AI')).toBeInTheDocument();
  });

  it('calls loadAiAgentFloat on mount', () => {
    render(<Chatbot {...defaultProps} />);
    expect(loadAiAgentFloat).toHaveBeenCalledOnce();
  });

  it('renders all prop values correctly', () => {
    render(<Chatbot {...defaultProps} />);

    expect(screen.getByText('Chat with AI')).toBeInTheDocument();
    expect(screen.getByText('Clear History')).toBeInTheDocument();
    expect(screen.getByText('Save as CSV')).toBeInTheDocument();
    expect(screen.getByText('Close')).toBeInTheDocument();
  });

  it('dispatches reset and view switch events when erase history button is clicked', () => {
    render(<Chatbot {...defaultProps} />);

    const eraseButton = screen.getByText('Clear History');
    fireEvent.click(eraseButton);

    expect(window.dispatchEvent).toHaveBeenCalledWith(new CustomEvent('ai-agent-reset-chat'));
    expect(window.dispatchEvent).toHaveBeenCalledWith(
      new CustomEvent('ai-agent-view-switch-change-view', {
        detail: { view: 0 },
      }),
    );
  });

  it('dispatches save chat event when save CSV button is clicked', () => {
    render(<Chatbot {...defaultProps} />);

    const saveButton = screen.getByText('Save as CSV');
    fireEvent.click(saveButton);

    expect(window.dispatchEvent).toHaveBeenCalledWith(new CustomEvent('ai-agent-save-chat'));
  });

  it('dispatches view switch event when close button is clicked', () => {
    render(<Chatbot {...defaultProps} />);

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    expect(window.dispatchEvent).toHaveBeenCalledWith(
      new CustomEvent('ai-agent-view-switch-change-view', {
        detail: { view: 0 },
      }),
    );
  });

  it('passes correct props to ai-agent-embed', () => {
    const { container } = render(<Chatbot {...defaultProps} />);

    const embedElement = container.querySelector('ai-agent-embed');
    expect(embedElement).toHaveAttribute('agent', 'test-agent-123');
    expect(embedElement).toHaveAttribute('language', 'en');
    expect(embedElement).toHaveAttribute('agentname', 'Test Agent');
    expect(embedElement).toHaveAttribute('greeting', 'Hello! How can I help you?');
    expect(embedElement).toHaveAttribute('textinputplaceholder', 'Type your message...');
  });

  it('emits data-testid when dataTestId is provided', () => {
    const { container } = render(<Chatbot {...defaultProps} dataTestId="chat" />);
    expect(container.querySelector('[data-testid="chat"]')).toBeInTheDocument();
  });
});
