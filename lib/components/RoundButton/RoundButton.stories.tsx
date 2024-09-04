import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { RoundButton } from './RoundButton';

const meta = {
  title: 'Buttons/RoundButton',
  component: RoundButton,
  tags: ['autodocs'],
} satisfies Meta<typeof RoundButton>;

export default meta;

type Story = StoryObj<typeof meta>;

const Icon = ({ size }: { size: 'sm' | 'md' | 'lg' | undefined }) => {
  const pxSize = (() => {
    switch (size) {
      case 'sm':
        return '26px';
      case 'md':
        return '32px';
      case 'lg':
        return '48px';
      default:
        return '48px';
    }
  })();

  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={pxSize} viewBox="0 -960 960 960" width={pxSize}>
      <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-60q142.38 0 241.19-98.81Q820-337.63 820-480q0-142.38-98.81-241.19T480-820q-142.37 0-241.19 98.81Q140-622.38 140-480q0 142.37 98.81 241.19Q337.63-140 480-140Zm0-100q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Zm0-60q75 0 127.5-52.5T660-480q0-75-52.5-127.5T480-660q-75 0-127.5 52.5T300-480q0 75 52.5 127.5T480-300Zm0-100q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Z" />
    </svg>
  );
};

const render = (args: Story['args']) => {
  const { size, ...rest } = args;
  return <RoundButton {...rest} size={size} icon={<Icon size={size} />} />;
};

export const Base: Story = {
  render,
  args: {
    label: 'Goals',
    onClick: fn(),
    icon: null,
  },
};
