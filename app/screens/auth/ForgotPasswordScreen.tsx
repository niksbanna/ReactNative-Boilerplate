import React from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeContext';
import { Button, Text, Input } from '../../components';
import { AuthStackParamList } from '../../types/navigation';

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
type ForgotPasswordNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'ForgotPassword'>;

export default function ForgotPasswordScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<ForgotPasswordNavigationProp>();
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setLoading(true);

      // TODO: Replace with actual API call
      console.log('Password reset requested for:', data.email);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setSubmitted(true);
    } catch (error) {
      console.error('Password reset error:', error);
      alert('Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.content}>
          <Text variant="h1" align="center" style={{ marginBottom: theme.spacing.lg }}>
            Check Your Email
          </Text>
          <Text
            variant="body"
            align="center"
            color={theme.colors.textSecondary}
            style={{ marginBottom: theme.spacing.xl }}
          >
            We&apos;ve sent password reset instructions to your email address.
          </Text>
          <Button title="Back to Login" onPress={() => navigation.navigate('Login')} fullWidth />
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Text variant="h1" align="center" style={{ marginBottom: theme.spacing.lg }}>
            Forgot Password?
          </Text>
          <Text
            variant="body"
            align="center"
            color={theme.colors.textSecondary}
            style={{ marginBottom: theme.spacing.xl }}
          >
            Enter your email address and we&apos;ll send you instructions to reset your password.
          </Text>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Email"
                placeholder="Enter your email"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.email?.message}
                keyboardType="email-address"
                autoCapitalize="none"
                style={{ marginBottom: theme.spacing.lg }}
              />
            )}
          />

          <Button
            title="Send Reset Link"
            onPress={handleSubmit(onSubmit)}
            loading={loading}
            fullWidth
            style={{ marginBottom: theme.spacing.md }}
          />

          <Button
            title="Back to Login"
            variant="ghost"
            onPress={() => navigation.navigate('Login')}
            fullWidth
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 24,
  },
});
