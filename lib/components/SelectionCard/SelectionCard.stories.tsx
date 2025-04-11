import { useState } from '@storybook/preview-api';
import type { StoryObj } from '@storybook/react';
import { JSX } from 'react/jsx-runtime';
import type { TitledMeta } from '../../utils';
import { Button } from '../Button/Button';
import { SelectionCard, SelectionCardProps } from './SelectionCard';

const meta = {
  title: 'Cards/SelectionCard',
  component: SelectionCard,
  tags: ['autodocs'],
} satisfies TitledMeta<typeof SelectionCard>;

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
    icon: <span className="ds:text-[70px]">😎</span>,
    selected: false,
  },
};

const RenderMultiple = () => {
  const [orientation, setOrientation] = useState<SelectionCardProps['orientation']>('vertical');
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
        orientation={orientation}
        onClick={onClick(index)}
        onMouseEnter={() => setInfoVisible(index)(true)}
        onMouseLeave={() => setInfoVisible(index)(false)}
        onFocus={() => setInfoVisible(index)(true)}
        onBlur={() => setInfoVisible(index)(false)}
        icon={<span className="ds:text-[70px]">{card.icon}</span>}
      />
    ));
  return (
    <div className="ds:flex ds:flex-col ds:gap-y-5">
      <div>
        <Button
          onClick={() => setOrientation(orientation === 'vertical' ? 'horizontal' : 'vertical')}
          label={orientation === 'horizontal' ? 'Show as vertical' : 'Show as horizontal'}
          variant="accent"
        />
      </div>
      <div>Showing info for card: {info}</div>
      <div className={`ds:flex ${orientation === 'vertical' ? 'ds:flex-row' : 'ds:flex-col'} ds:gap-5`}>
        <CardList />
      </div>
    </div>
  );
};

export const MultipleWithHover: Story = {
  render: RenderMultiple,
  parameters: {
    ...parameters,
  },
  args: {
    label: 'Kartoittaa omaa osaamistani',
    icon: <span className="ds:text-[70px]">😎</span>,
    selected: false,
  },
};
