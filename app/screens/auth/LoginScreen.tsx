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

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;
type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export default function LoginScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);

      // TODO: Replace with actual API call
      // Mock login - in production, call your auth API
      const mockUser = {
        id: '1',
        email: data.email,
        name: 'Demo User',
      };

      const mockToken = 'mock-jwt-token';

      // Save to storage
      await StorageService.setAccessToken(mockToken);
      await StorageService.setUser(mockUser);

      // Update Redux state
      dispatch(setUser(mockUser));
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
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
            Welcome Back
          </Text>
          <Text
            variant="body"
            align="center"
            color={theme.colors.textSecondary}
            style={{ marginBottom: theme.spacing.xl }}
          >
            Sign in to continue
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
                style={{ marginBottom: theme.spacing.sm }}
              />
            )}
          />

          <Button
            title="Forgot Password?"
            variant="ghost"
            size="sm"
            onPress={() => navigation.navigate('ForgotPassword')}
            style={{ alignSelf: 'flex-end', marginBottom: theme.spacing.lg }}
          />

          <Button
            title="Sign In"
            onPress={handleSubmit(onSubmit)}
            loading={loading}
            fullWidth
            style={{ marginBottom: theme.spacing.md }}
          />

          <View style={styles.footer}>
            <Text variant="body" color={theme.colors.textSecondary}>
              Don&apos;t have an account?{' '}
            </Text>
            <Button
              title="Sign Up"
              variant="ghost"
              size="sm"
              onPress={() => navigation.navigate('Register')}
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
