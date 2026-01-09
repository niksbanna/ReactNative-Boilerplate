import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from '../Text';
import { ThemeProvider } from '../../theme/ThemeContext';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('Text', () => {
  it('renders correctly with children', () => {
    const { getByText } = renderWithTheme(<Text>Test Text</Text>);
    expect(getByText('Test Text')).toBeTruthy();
  });

  it('renders h1 variant', () => {
    const { getByText } = renderWithTheme(<Text variant="h1">Heading</Text>);
    expect(getByText('Heading')).toBeTruthy();
  });

  it('renders body variant by default', () => {
    const { getByText } = renderWithTheme(<Text>Body Text</Text>);
    expect(getByText('Body Text')).toBeTruthy();
  });
});
