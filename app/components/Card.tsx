import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

interface CardProps extends ViewProps {
  children: ReactNode;
  elevated?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, elevated = false, style, ...props }) => {
  const { theme } = useTheme();

  return (
    <View
      {...props}
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.card,
          borderRadius: theme.borderRadius.lg,
          padding: theme.spacing.md,
          ...(elevated ? theme.shadows.md : {}),
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
  },
});
