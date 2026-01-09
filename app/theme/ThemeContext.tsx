import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { createTheme, Theme, ColorScheme } from './tokens';

type ThemeContextType = {
  theme: Theme;
  colorScheme: ColorScheme;
  toggleTheme: () => void;
  setColorScheme: (scheme: ColorScheme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemColorScheme = useColorScheme() as ColorScheme;
  const [colorScheme, setColorSchemeState] = useState<ColorScheme>(systemColorScheme || 'light');

  const theme = createTheme(colorScheme);

  const toggleTheme = useCallback(() => {
    setColorSchemeState(prev => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const setColorScheme = useCallback((scheme: ColorScheme) => {
    setColorSchemeState(scheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, colorScheme, toggleTheme, setColorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
