import { useState } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import { MdInfoOutline } from 'react-icons/md';
import { JSX } from 'react/jsx-runtime';
import { useMediaQueries } from '../../main';
import { SelectionCard, SelectionCardProps } from './SelectionCard';

const meta = {
  title: 'Cards/SelectionCard',
  component: SelectionCard,
  tags: ['autodocs'],
} satisfies Meta<typeof SelectionCard>;

export default meta;

type Story = StoryObj<typeof meta>;

const parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-8209&t=l99ZKZvdvioC2lb5-1',
  },
};

const RenderDefault = (args: JSX.IntrinsicAttributes & SelectionCardProps) => {
  const [selected, setSelected] = useState(false);
  const onClick = () => {
    setSelected(!selected);
  };

  return <SelectionCard {...args} selected={selected} onClick={onClick} />;
};

export const Default: Story = {
  render: RenderDefault,
  parameters,
  args: {
    label: 'Kartoittaa omaa osaamistani',
    icon: <span className="ds-text-[70px]">😎</span>,
    selected: false,
    infoAriaLabel: 'Info',
    infoIcon: <MdInfoOutline size={24} />,
    tooltipContent: (
      <>
        <div className="ds-text-heading-4 ds-mb-4">Tavoitteen vaikutus tuloksiin</div>
        <p>
          Ohjeistaa täyttämään osaamisprofiilin ja sieltä löytyvien apuvälineiden hyödyntämiseen. Kannustaa katsomaan
          myös kohtaannon tuloksia.
        </p>
      </>
    ),
  },
};

const RenderMultiple = () => {
  const { sm } = useMediaQueries();
  const [cardData, setCardData] = useState([
    { icon: '🙈', selected: false, label: 'Lorem ipsum' },
    { icon: '🙉', selected: false, label: 'Dolor sit amet' },
    { icon: '🙊', selected: false, label: 'Consectetur adipiscing elit' },
  ]);

  const [info, setInfo] = useState('');

  const onClick = (index: number) => () => {
    setCardData((prev) => {
      const data = [...prev];
      data[index].selected = !data[index].selected;
      return data;
    });
  };

  const setInfoVisible = (index: number) => (visible: boolean) => {
    // eslint-disable-next-line sonarjs/no-selector-parameter
    if (visible && info !== cardData[index].label) {
      setInfo(cardData[index].label);
    } else if (!visible) {
      setInfo('');
    }
  };

  const CardList = () =>
    cardData.map((card, index) => (
      <SelectionCard
        key={card.label}
        label={card.label}
        selected={card.selected}
        onClick={onClick(index)}
        setHovered={setInfoVisible(index)}
        icon={<span className="ds-text-[70px]">{card.icon}</span>}
        infoAriaLabel={`Info for ${card.label}`}
        tooltipContent={
          <div>
            Tooltip for <strong>{card.label}</strong>
          </div>
        }
      />
    ));
  return (
    <>
      {sm && <div>Showing info for card: {info}</div>}
      {sm ? (
        <div className="ds-flex ds-flex-row ds-gap-x-5">
          <CardList />
        </div>
      ) : (
        <div className="ds-flex ds-flex-col ds-gap-y-5">
          <CardList />
        </div>
      )}
    </>
  );
};

export const MultipleWithHover: Story = {
  render: RenderMultiple,
  parameters: {
    ...parameters,
  },
  args: {
    label: 'Kartoittaa omaa osaamistani',
    icon: <span className="ds-text-[70px]">😎</span>,
    infoAriaLabel: 'Info',
    selected: false,
  },
};
