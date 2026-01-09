import React from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { Text } from './Text';

interface InputProps extends RNTextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<RNTextInput, InputProps>(
  ({ label, error, helperText, style, ...props }, ref) => {
    const { theme } = useTheme();

    return (
      <View style={styles.container}>
        {label && (
          <Text variant="label" style={{ marginBottom: theme.spacing.xs }}>
            {label}
          </Text>
        )}
        <RNTextInput
          ref={ref}
          {...props}
          style={[
            styles.input,
            {
              backgroundColor: theme.colors.surface,
              borderColor: error ? theme.colors.error : theme.colors.border,
              borderRadius: theme.borderRadius.md,
              color: theme.colors.text,
              paddingHorizontal: theme.spacing.md,
              paddingVertical: theme.spacing.sm,
            },
            style,
          ]}
          placeholderTextColor={theme.colors.textSecondary}
        />
        {error && (
          <Text
            variant="caption"
            color={theme.colors.error}
            style={{ marginTop: theme.spacing.xs }}
          >
            {error}
          </Text>
        )}
        {helperText && !error && (
          <Text
            variant="caption"
            color={theme.colors.textSecondary}
            style={{ marginTop: theme.spacing.xs }}
          >
            {helperText}
          </Text>
        )}
      </View>
    );
  }
);

Input.displayName = 'Input';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    borderWidth: 1,
    fontSize: 16,
  },
});
