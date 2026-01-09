import React from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { Text, Card } from '../../components';
import { useGetPostsQuery } from '../../store/services/posts';

import { Post } from '../../store/services/posts';

export default function HomeScreen() {
  const { theme } = useTheme();
  const { data: posts, isLoading, error, refetch } = useGetPostsQuery();

  const renderPost = ({ item }: { item: Post }) => (
    <Card elevated style={{ marginBottom: theme.spacing.md }}>
      <Text variant="h3" style={{ marginBottom: theme.spacing.xs }}>
        {item.title}
      </Text>
      <Text variant="body" color={theme.colors.textSecondary} numberOfLines={2}>
        {item.body}
      </Text>
    </Card>
  );

  if (error) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.centerContent}>
          <Text variant="body" color={theme.colors.error}>
            Failed to load posts. Please try again.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={[
          styles.listContent,
          { paddingHorizontal: theme.spacing.md, paddingTop: theme.spacing.md },
        ]}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}
        ListEmptyComponent={
          isLoading ? (
            <View style={styles.centerContent}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
          ) : (
            <View style={styles.centerContent}>
              <Text variant="body" color={theme.colors.textSecondary}>
                No posts found
              </Text>
            </View>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 16,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
});
