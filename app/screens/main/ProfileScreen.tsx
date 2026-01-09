import React from 'react';
import { View, StyleSheet, ScrollView, Switch } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { Button, Text, Card } from '../../components';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { logout } from '../../store/slices/authSlice';

export default function ProfileScreen() {
  const { theme, colorScheme, toggleTheme } = useTheme();
  const { user } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Card elevated style={{ marginBottom: theme.spacing.lg }}>
        <Text variant="h2" style={{ marginBottom: theme.spacing.xs }}>
          {user?.name || 'User'}
        </Text>
        <Text variant="body" color={theme.colors.textSecondary}>
          {user?.email || 'No email'}
        </Text>
      </Card>

      <Card style={{ marginBottom: theme.spacing.md }}>
        <View style={styles.settingRow}>
          <View>
            <Text variant="body" style={{ marginBottom: theme.spacing.xs }}>
              Dark Mode
            </Text>
            <Text variant="caption" color={theme.colors.textSecondary}>
              Toggle dark/light theme
            </Text>
          </View>
          <Switch
            value={colorScheme === 'dark'}
            onValueChange={toggleTheme}
            trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
          />
        </View>
      </Card>

      <Card style={{ marginBottom: theme.spacing.md }}>
        <Text variant="label" style={{ marginBottom: theme.spacing.sm }}>
          About
        </Text>
        <Text variant="body" color={theme.colors.textSecondary}>
          React Native Boilerplate
        </Text>
        <Text variant="caption" color={theme.colors.textSecondary}>
          Version 1.0.0
        </Text>
      </Card>

      <Button title="Logout" variant="outline" onPress={handleLogout} fullWidth />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
