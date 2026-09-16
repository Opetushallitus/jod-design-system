import type React from 'react';

export interface LinkComponent {
  children: React.ReactNode;
  className: string;
  target?: string;
  rel?: string;
}
