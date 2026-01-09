import React from 'react';
import { ThemeProvider } from '../app/theme/ThemeContext';

export const decorators = [
  (Story) => (
    <ThemeProvider>
      <Story />
    </ThemeProvider>
  ),
];
