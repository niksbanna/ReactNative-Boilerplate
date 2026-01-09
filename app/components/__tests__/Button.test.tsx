import React from 'react';
import { render } from '@testing-library/react-native';
import { Button } from '../Button';
import { ThemeProvider } from '../../theme/ThemeContext';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('Button', () => {
  it('renders correctly with title', () => {
    const { getByText } = renderWithTheme(<Button title="Test Button" onPress={() => {}} />);
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('renders loading state', () => {
    const { getByTestId, queryByText } = renderWithTheme(
      <Button title="Test Button" loading onPress={() => {}} />
    );
    expect(queryByText('Test Button')).toBeNull();
  });

  it('applies disabled state', () => {
    const onPress = jest.fn();
    const { getByText } = renderWithTheme(
      <Button title="Test Button" disabled onPress={onPress} />
    );
    const button = getByText('Test Button').parent?.parent;
    expect(button?.props.accessibilityState?.disabled).toBe(true);
  });
});
