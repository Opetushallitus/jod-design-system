import React from 'react';
import { cx } from '../../cva';
import { JodAi, JodThumbDown, JodThumbDownFilled, JodThumbUp, JodThumbUpFilled } from '../../icons';
import { Button, ConfirmDialog, Spinner, Textarea } from '../../main';

export interface RateAiContentCardProps {
  /** Object containing all the translations for the component */
  translations: {
    /** Translations for the card content */
    card: {
      /** Title text shown on the card */
      title: string;
      /** Aria label for the AI icon */
      aiLabel: string;
      /** Content text shown on the card */
      content: string;
      /** Aria label for the like button */
      likeLabel: string;
      /** Aria label for the dislike button */
      dislikeLabel: string;
    };
    /** Translations for the modal dialog */
    modal: {
      /** Translation for modal close button */
      close: string;
      /** Translation for modal send button */
      send: string;
      /** Translation for modal sending state */
      sending: string;
      /** Translation for modal title */
      title: string | React.ReactNode;
      /** Translation for modal description text */
      description: string | React.ReactNode;
      /** Translation for modal textarea placeholder */
      placeholder: string;
    };
  };
  /** Callback function when user submits feedback */
  onSubmit: ({ rating, message }: { rating: number; message?: string }) => Promise<void> | void;
  /** Size of the card */
  size?: 'md' | 'lg';
  /** Test id for querying in tests */
  dataTestId?: string;
}

export const RateAiContentCard = ({ translations, onSubmit, size = 'lg', dataTestId }: RateAiContentCardProps) => {
  const [value, setValue] = React.useState('');
  const [isLikeSubmitting, setIsLikeSubmitting] = React.useState(false);
  const [isDislikeSubmitting, setIsDislikeSubmitting] = React.useState(false);
  const [isDislikeSending, setIsDislikeSending] = React.useState(false);

  const like = async () => {
    setIsLikeSubmitting(true);
    setTimeout(() => {
      setIsLikeSubmitting(false);
    }, 3000);
    await onSubmit({ rating: 1 });
  };

  const dislike = async (hideDialog: () => void) => {
    if (isDislikeSending) {
      return;
    }

    setIsDislikeSending(true);
    await onSubmit({ rating: -1, message: value });
    setIsDislikeSending(false);
    setValue('');
    hideDialog();
    setTimeout(() => {
      setIsDislikeSubmitting(false);
    }, 3000);
  };

  const cancelDislike = (hideDialog: () => void) => {
    setValue('');
    hideDialog();
    setTimeout(() => {
      setIsDislikeSubmitting(false);
    }, 3000);
  };

  const footer = (hideDialog: () => void) => (
    <div className="ds:flex ds:flex-row ds:justify-between ds:gap-5">
      <Button
        onClick={() => cancelDislike(hideDialog)}
        label={translations.modal.close}
        dataTestId={dataTestId ? `${dataTestId}-cancel-button` : undefined}
      />
      <Button
        variant="accent"
        disabled={value.trim().length === 0}
        onClick={() => void dislike(hideDialog)}
        label={isDislikeSending ? translations.modal.sending : translations.modal.send}
        icon={isDislikeSending ? <Spinner color="white" size={20} /> : undefined}
        iconSide={isDislikeSending ? 'right' : undefined}
        dataTestId={dataTestId ? `${dataTestId}-send-button` : undefined}
      />
    </div>
  );

  return (
    <div
      className={cx('ds:flex ds:flex-col ds:gap-3 ds:bg-accent ds:text-white', {
        'ds:rounded-md ds:px-5 ds:py-6': size === 'md',
        'ds:rounded-lg ds:p-6': size === 'lg',
      })}
      data-testid={dataTestId}
    >
      <div className="ds:flex ds:gap-3 ds:text-heading-2">
        <h2 className="ds:grow">{translations.card.title}</h2>
        <JodAi aria-label={translations.card.aiLabel} size={32} className="ds:flex-none" />
      </div>
      <div className="ds:flex ds:flex-col ds:gap-6">
        <p className="ds:text-body-lg">{translations.card.content}</p>
        <div className="ds:flex ds:flex-row ds:items-center ds:justify-between ds:w-[128px] ds:h-9 ds:rounded-[30px] ds:mt-auto">
          <button
            className={cx(
              'ds:flex ds:flex-1 ds:h-full ds:w-full ds:items-center ds:justify-center ds:rounded-l-full ds:pl-6 ds:pr-5 ds:bg-white',
              { 'ds:hover:bg-secondary-5-light-3 ds:cursor-pointer': !isLikeSubmitting },
            )}
            aria-label={translations.card.likeLabel}
            onClick={() => void like()}
            disabled={isLikeSubmitting}
            data-testid={dataTestId ? `${dataTestId}-like-button` : undefined}
          >
            {isLikeSubmitting ? (
              <JodThumbUpFilled className="ds:text-accent" />
            ) : (
              <JodThumbUp className="ds:text-accent" />
            )}
          </button>
          <div className="ds:h-9 ds:min-w-1 ds:bg-border-gray" aria-hidden="true" />
          <ConfirmDialog
            title={
              <div className="ds:flex ds:justify-between ds:gap-3">
                {translations.modal.title}
                <JodAi aria-label={translations.card.aiLabel} size={32} className="ds:flex-none" />
              </div>
            }
            description={translations.modal.description}
            footer={footer}
            content={
              <Textarea
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
                placeholder={translations.modal.placeholder}
                maxLength={5000}
                dataTestId={dataTestId ? `${dataTestId}-feedback-textarea` : undefined}
              />
            }
            dataTestId={dataTestId ? `${dataTestId}-dialog` : undefined}
          >
            {(showDialog) => (
              <button
                className={cx(
                  'ds:flex ds:flex-1 ds:h-full ds:items-center ds:justify-center ds:rounded-r-full ds:pl-5 ds:pr-6 ds:bg-white',
                  { 'ds:hover:bg-secondary-5-light-3 ds:cursor-pointer': !isDislikeSubmitting },
                )}
                aria-label={translations.card.dislikeLabel}
                disabled={isDislikeSubmitting}
                onClick={() => {
                  setIsDislikeSubmitting(true);
                  showDialog();
                }}
                data-testid={dataTestId ? `${dataTestId}-dislike-button` : undefined}
              >
                {isDislikeSubmitting ? (
                  <JodThumbDownFilled className="ds:text-accent" />
                ) : (
                  <JodThumbDown className="ds:text-accent" />
                )}
              </button>
            )}
          </ConfirmDialog>
        </div>
      </div>
    </div>
  );
};
