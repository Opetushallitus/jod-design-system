import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import userEvent from '@testing-library/user-event';
import { RateAiContentCard } from './RateAiContentCard';

const translations = {
  card: {
    title: 'Help us improve',
    aiLabel: 'AI generated content',
    content: 'Was this response helpful?',
    likeLabel: 'Like content',
    dislikeLabel: 'Dislike content',
  },
  modal: {
    close: 'Cancel',
    send: 'Send feedback',
    sending: 'Sending…',
    title: 'Tell us more',
    description: 'What went wrong with the answer?',
    placeholder: 'Type your feedback here',
  },
} as const;

describe('RateAiContentCard', () => {
  it('renders the provided texts and buttons', () => {
    render(<RateAiContentCard translations={translations} onSubmit={vi.fn()} />);
    expect(screen.getByRole('heading', { level: 2, name: translations.card.title })).toBeInTheDocument();
    expect(screen.getByText(translations.card.content)).toBeInTheDocument();
    expect(screen.getByLabelText(translations.card.aiLabel)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: translations.card.likeLabel })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: translations.card.dislikeLabel })).toBeInTheDocument();
  });

  it('submits positive feedback when the like button is pressed', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<RateAiContentCard translations={translations} onSubmit={onSubmit} />);
    const likeButton = screen.getByRole('button', { name: translations.card.likeLabel });
    await user.click(likeButton);
    expect(likeButton).toBeDisabled();
    expect(onSubmit).toHaveBeenCalledWith({ rating: 1 });
  });

  it('opens the modal and submits negative feedback with a message', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<RateAiContentCard translations={translations} onSubmit={onSubmit} />);
    const dislikeButton = screen.getByRole('button', { name: translations.card.dislikeLabel });
    await user.click(dislikeButton);
    expect(dislikeButton).toBeDisabled();
    expect(screen.getByText(translations.modal.title)).toBeInTheDocument();
    const sendButton = screen.getByRole('button', { name: translations.modal.send });
    expect(sendButton).toBeDisabled();
    const message = 'Needs improvement';
    await user.type(screen.getByPlaceholderText(translations.modal.placeholder), message);
    expect(sendButton).not.toBeDisabled();
    await user.click(sendButton);
    expect(onSubmit).toHaveBeenCalledWith({ rating: -1, message });
  });

  it('cancels the modal and resets state without submitting feedback', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<RateAiContentCard translations={translations} onSubmit={onSubmit} />);
    const dislikeButton = screen.getByRole('button', { name: translations.card.dislikeLabel });
    await user.click(dislikeButton);
    await user.type(screen.getByPlaceholderText(translations.modal.placeholder), 'Unhelpful');
    await user.click(screen.getByRole('button', { name: translations.modal.close }));
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('exposes data-testids when dataTestId is provided', async () => {
    const user = userEvent.setup();
    render(<RateAiContentCard translations={translations} onSubmit={vi.fn()} dataTestId="rate-ai-card" />);

    expect(screen.getByTestId('rate-ai-card')).toBeInTheDocument();
    const likeButton = screen.getByTestId('rate-ai-card-like-button');
    expect(likeButton).toBeInTheDocument();
    const dislikeButton = screen.getByTestId('rate-ai-card-dislike-button');
    expect(dislikeButton).toBeInTheDocument();

    await user.click(dislikeButton);

    expect(screen.getByTestId('rate-ai-card-dialog')).toBeInTheDocument();
    expect(screen.getByTestId('rate-ai-card-feedback-textarea')).toBeInTheDocument();
    expect(screen.getByTestId('rate-ai-card-cancel-button')).toBeInTheDocument();
    expect(screen.getByTestId('rate-ai-card-send-button')).toBeInTheDocument();

    await user.click(screen.getByTestId('rate-ai-card-cancel-button'));
  });
});
