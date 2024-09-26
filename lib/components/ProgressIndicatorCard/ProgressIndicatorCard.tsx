import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export const ProgressIndicatorCard = () => {
  return (
    <div className="ds-shadow-border ds-rounded ds-bg-bg-gray-2-25 ds-min-h-[285px] ds-flex ds-items-center ds-justify-center">
      <AiOutlineLoading3Quarters className="ds-absolute ds-animate-spin ds-text-accent" size={64} />
    </div>
  );
};
