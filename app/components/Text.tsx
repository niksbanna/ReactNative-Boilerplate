import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

type TextVariant = 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label';

interface TextProps extends RNTextProps {
  variant?: TextVariant;
  color?: string;
  align?: 'left' | 'center' | 'right';
}

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  color,
  align = 'left',
  style,
  children,
  ...props
}) => {
  const { theme } = useTheme();

  const getTextStyle = () => {
    switch (variant) {
      case 'h1':
        return {
          fontSize: theme.typography.fontSizes.xxl,
          fontWeight: theme.typography.fontWeights.bold,
          lineHeight: theme.typography.lineHeights.xxl,
        };
      case 'h2':
        return {
          fontSize: theme.typography.fontSizes.xl,
          fontWeight: theme.typography.fontWeights.bold,
          lineHeight: theme.typography.lineHeights.xl,
        };
      case 'h3':
        return {
          fontSize: theme.typography.fontSizes.lg,
          fontWeight: theme.typography.fontWeights.semibold,
          lineHeight: theme.typography.lineHeights.lg,
        };
      case 'body':
        return {
          fontSize: theme.typography.fontSizes.md,
          fontWeight: theme.typography.fontWeights.regular,
          lineHeight: theme.typography.lineHeights.md,
        };
      case 'caption':
        return {
          fontSize: theme.typography.fontSizes.sm,
          fontWeight: theme.typography.fontWeights.regular,
          lineHeight: theme.typography.lineHeights.sm,
        };
      case 'label':
        return {
          fontSize: theme.typography.fontSizes.sm,
          fontWeight: theme.typography.fontWeights.medium,
          lineHeight: theme.typography.lineHeights.sm,
        };
      default:
        return {
          fontSize: theme.typography.fontSizes.md,
          fontWeight: theme.typography.fontWeights.regular,
          lineHeight: theme.typography.lineHeights.md,
        };
    }
  };

  return (
    <RNText
      {...props}
      style={[
        styles.text,
        getTextStyle(),
        {
          color: color || theme.colors.text,
          textAlign: align,
        },
        style,
      ]}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  text: {},
});
