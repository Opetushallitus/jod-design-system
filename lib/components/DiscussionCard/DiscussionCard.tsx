import { JodComment, JodThumbUp } from '../../icons';
import { tidyClasses as tc } from '../../utils';

export interface DiscussionCardProps {
  message: string;
  author: string;
  date: string;
  likes: number;
  className?: string;
  onClickLike?: () => void;
  onClickComment?: () => void;
  dataTestId?: string;
}

export const DiscussionCard = ({
  message,
  author,
  date,
  likes = 0,
  className,
  onClickLike,
  onClickComment,
  dataTestId,
}: DiscussionCardProps) => {
  const getInitials = (name: string) =>
    name
      .split(' ')
      .slice(0, 2)
      .map((n) => n[0])
      .join('');

  return (
    <div className={tc(`ds:flex ds:flex-row ds:py-5 ds:text-primary-gray ${className}`)} data-testid={dataTestId}>
      <div className="ds:items-start ds:shrink-1 ds:pr-4">
        <div className="ds:size-7 ds:rounded-full ds:bg-secondary-4-dark ds:flex ds:justify-center ds:items-center ds:text-white ds:text-button-md">
          {getInitials(author)}
        </div>
      </div>

      <div className="ds:flex ds:flex-col ds:gap-3">
        <div className="ds:flex ds:gap-3 ds:items-center">
          <div className="ds:text-heading-4 ds:font-poppins">{author}</div>
          <div className="ds:text-body-sm ds:font-arial">{date}</div>
        </div>

        <div
          className="ds:text-body-sm ds:font-poppins ds:pr-7"
          data-testid={dataTestId ? `${dataTestId}-message` : undefined}
        >
          {message}
        </div>

        <div className="ds:flex ds:flex-row ds:gap-5 ds:items-center ds:justify-start ds:text-accent">
          <button
            className="ds:cursor-pointer ds:size-6"
            onClick={onClickComment}
            data-testid={dataTestId ? `${dataTestId}-comment` : undefined}
          >
            <JodComment size={24} />
          </button>
          <button
            className="ds:cursor-pointer ds:h-[24px] ds:flex ds:flex-row ds:gap-3 ds:items-center"
            onClick={onClickLike}
            data-testid={dataTestId ? `${dataTestId}-like` : undefined}
          >
            <JodThumbUp size={24} />
            {likes > 0 && (
              <span
                className="ds:text-body-sm ds:font-poppins ds:text-primary-gray"
                data-testid={dataTestId ? `${dataTestId}-likes` : undefined}
              >
                {likes}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
