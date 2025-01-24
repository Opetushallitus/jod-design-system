import { Spinner } from '../Spinner/Spinner';

export const ProgressIndicatorCard = () => {
  return (
    <div className="ds:shadow-border ds:rounded ds:bg-bg-gray-2-25 ds:min-h-[285px] ds:flex ds:items-center ds:justify-center">
      <Spinner size={64} color="accent" className="ds:absolute" />
    </div>
  );
};
