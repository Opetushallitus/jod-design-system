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
  component: Component,
}: {
  label: string;
  icon?: React.ReactNode;
  selected?: boolean;
  component: React.ComponentType<LinkComponent>;
}) => {
  const variant = useServiceVariant();

  return (
    <div className="ds:border-l-8 ds:border-secondary-gray">
      <Component
        className={tidyClasses([
          'ds:flex',
          'ds:flex-1',
          'ds:gap-3',
          'ds:p-3',
          'ds:ml-3',
          'ds:mr-9',
          'ds:cursor-pointer',
          'ds:group',
          'ds:rounded',
          'ds:active:text-white',
          selected ? 'ds:text-white' : 'ds:text-black',
          selected ? getAccentBgClassForService(variant) : 'ds:hover:bg-bg-gray',
          getPressedBgColorClassForService(variant),
          getFocusOutlineClassForService(variant),
        ])}
      >
        {icon}
        <span className="ds:text-button-md ds:group-hover:underline">{label}</span>
      </Component>
    </div>
  );
};
