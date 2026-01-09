import React from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeContext';
import { Button, Text, Input } from '../../components';
import { useAppDispatch } from '../../store/hooks';
import { setUser } from '../../store/slices/authSlice';
import { StorageService } from '../../services/storage';
import { AuthStackParamList } from '../../types/navigation';

const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;
type RegisterScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

export default function RegisterScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setLoading(true);

      // TODO: Replace with actual API call
      const mockUser = {
        id: '1',
        email: data.email,
        name: data.name,
      };

      const mockToken = 'mock-jwt-token';

      await StorageService.setAccessToken(mockToken);
      await StorageService.setUser(mockUser);

      dispatch(setUser(mockUser));
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
            Create Account
          </Text>
          <Text
            variant="body"
            align="center"
            color={theme.colors.textSecondary}
            style={{ marginBottom: theme.spacing.xl }}
          >
            Sign up to get started
          </Text>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Name"
                placeholder="Enter your name"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.name?.message}
                style={{ marginBottom: theme.spacing.md }}
              />
            )}
          />

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
                style={{ marginBottom: theme.spacing.md }}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Password"
                placeholder="Enter your password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.password?.message}
                secureTextEntry
                style={{ marginBottom: theme.spacing.md }}
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Confirm Password"
                placeholder="Confirm your password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.confirmPassword?.message}
                secureTextEntry
                style={{ marginBottom: theme.spacing.lg }}
              />
            )}
          />

          <Button
            title="Sign Up"
            onPress={handleSubmit(onSubmit)}
            loading={loading}
            fullWidth
            style={{ marginBottom: theme.spacing.md }}
          />

          <View style={styles.footer}>
            <Text variant="body" color={theme.colors.textSecondary}>
              Already have an account?{' '}
            </Text>
            <Button
              title="Sign In"
              variant="ghost"
              size="sm"
              onPress={() => navigation.navigate('Login')}
            />
          </View>
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
