import type { Meta, StoryObj } from '@storybook/react';
import { MdOutlineFlag } from 'react-icons/md';

import { PathProgress } from './PathProgress';

const meta = {
  title: 'PathProgress',
  component: PathProgress,
  tags: ['autodocs'],
} satisfies Meta<typeof PathProgress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-6177&t=5Uc1JYa0GCm43PGV-4',
    },
    docs: {
      description: {
        story: 'Path progress component.',
      },
    },
  },
  args: {
    steps: [
      {
        circleComponent: 1,
        label: 'Start',
        content: <div>Content 1 here</div>,
        isCompleted: true,
      },
      {
        circleComponent: '2',
        label: 'Second step',
      },
      {
        circleComponent: <span>3</span>,
        label: 'Third step',
        content: (
          <div>
            <div className="ds:bg-white ds:p-6 ds:rounded">
              <span className="ds:text-heading-3">Lorem ipsum</span>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et leo rhoncus dolor porttitor
                scelerisque. Sed facilisis tristique nibh nec finibus. Class aptent taciti sociosqu ad litora torquent
                per conubia nostra, per inceptos himenaeos. Nullam eu nulla scelerisque, semper justo quis, gravida
                quam. Sed semper est eu porta hendrerit. Integer et est ac nunc interdum venenatis. Phasellus tempus
                purus a ligula luctus suscipit. Phasellus finibus et felis a elementum.
              </p>
            </div>
            <button className="ds:rounded-full ds:bg-accent ds:text-white ds:py-4 ds:px-6 ds:mt-11">
              Add step manually
            </button>
          </div>
        ),
      },
      {
        circleComponent: <MdOutlineFlag size={24} />,
        labelComponent: <span className="ds:bg-accent ds:text-white ds:p-3">End</span>,
      },
    ],
  },
};
