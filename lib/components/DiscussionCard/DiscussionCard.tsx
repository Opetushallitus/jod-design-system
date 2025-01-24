import { MdOutlineComment, MdOutlineThumbUp } from 'react-icons/md';
import { tidyClasses as tc } from '../../utils';

export interface DiscussionCardProps {
  message: string;
  author: string;
  date: string;
  likes: number;
  className?: string;
  onClickLike?: () => void;
  onClickComment?: () => void;
}

export const DiscussionCard = ({
  message,
  author,
  date,
  likes = 0,
  className,
  onClickLike,
  onClickComment,
}: DiscussionCardProps) => {
  const getInitials = (name: string) =>
    name
      .split(' ')
      .slice(0, 2)
      .map((n) => n[0])
      .join('');

  return (
    <div className={tc(`ds:flex ds:flex-row ds:py-5 ${className}`)}>
      <div className="ds:items-start ds:shrink-1 ds:pr-4">
        <div className="ds:size-7 ds:rounded-full ds:bg-[#AD4298] ds:flex ds:justify-center ds:items-center ds:text-white ds:text-button-md">
          {getInitials(author)}
        </div>
      </div>

      <div className="ds:flex ds:flex-col ds:gap-3">
        <div className="ds:flex ds:gap-3 ds:items-center">
          <div className="ds:text-heading-3">{author}</div>
          <div className="ds:text-body-sm ds:font-arial">{date}</div>
        </div>

        <div className="ds:text-body-sm ds:font-arial ds:pr-7">{message}</div>

        <div className="ds:flex ds:flex-row ds:gap-5 ds:items-center ds:justify-start ds:text-accent">
          <button className="ds:cursor-pointer ds:size-6" onClick={onClickComment}>
            <MdOutlineComment size={24} />
          </button>
          <button
            className="ds:cursor-pointer ds:h-[24px] ds:flex ds:flex-row ds:gap-3 ds:items-center"
            onClick={onClickLike}
          >
            <MdOutlineThumbUp size={24} />
            {likes > 0 && <span className="ds:text-body-sm ds:font-arial ds:text-black">{likes}</span>}
          </button>
        </div>
      </div>
    </div>
  );
};
