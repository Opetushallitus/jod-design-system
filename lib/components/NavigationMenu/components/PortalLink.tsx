import { JodOpenInNew } from '../../../icons';
import { tidyClasses, useServiceVariant } from '../../../main';
import {
  getAccentBgClassForService,
  getFocusOutlineClassForService,
  getPressedBgColorClassForService,
} from '../../../utils';
import { LinkComponent } from '../types';

export const PortalLink = ({
  label,
  icon,
  selected = false,
  externalLinkIconAriaLabel,
  component: Component,
}: {
  label: string;
  icon?: React.ReactNode;
  selected?: boolean;
  externalLinkIconAriaLabel?: string;
  component: React.ComponentType<LinkComponent>;
}) => {
  const variant = useServiceVariant();

  return (
    <div className="ds:border-l-8 ds:border-secondary-gray">
      <Component
        {...(externalLinkIconAriaLabel ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className={tidyClasses([
          'ds:ml-3',
          'ds:flex',
          'ds:flex-1',
          'ds:gap-3',
          'ds:py-3',
          'ds:cursor-pointer',
          'ds:group',
          'ds:rounded',
          'ds:active:text-white',
          selected ? 'ds:text-white' : 'ds:text-primary-gray',
          selected ? getAccentBgClassForService(variant) : 'ds:hover:bg-bg-gray',
          getPressedBgColorClassForService(variant),
          getFocusOutlineClassForService(variant),
        ])}
      >
        {icon}
        <div className="ds:flex ds:flex-row ds:w-full ds:gap-3 ds:pr-3 ds:justify-between ds:pl-3">
          <span className="ds:text-button-md ds:group-hover:underline">{label}</span>
          {externalLinkIconAriaLabel && <JodOpenInNew size={24} ariaLabel={externalLinkIconAriaLabel} />}
        </div>
      </Component>
    </div>
  );
};
