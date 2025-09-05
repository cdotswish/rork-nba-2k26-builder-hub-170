import React from 'react';
import { View, StyleSheet, FlatList, Text, ActivityIndicator } from 'react-native';
import { BuildCard } from '@/components/BuildCard';
import { PositionFilter } from '@/components/PositionFilter';
import { SearchBar } from '@/components/SearchBar';
import { useBuilds, useFilteredBuilds } from '@/hooks/builds-context';
import { theme } from '@/constants/theme';

export default function DiscoverScreen() {
  const { selectedPosition, setSelectedPosition, searchQuery, setSearchQuery, isLoading, builds } = useBuilds();
  const filteredBuilds = useFilteredBuilds();
  
  console.log('DiscoverScreen: builds from context =', builds);
  console.log('DiscoverScreen: filteredBuilds =', filteredBuilds);
  console.log('DiscoverScreen: isLoading =', isLoading);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchBar 
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <PositionFilter 
        selected={selectedPosition}
        onSelect={setSelectedPosition}
      />
      <FlatList
        data={filteredBuilds.filter(build => {
          const isValid = build && build.id;
          if (!isValid) {
            console.log('DiscoverScreen: filtering out invalid build:', build);
          }
          return isValid;
        })}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          console.log('DiscoverScreen: rendering item:', item?.id, item?.name);
          return <BuildCard build={item} />;
        }}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No builds found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your filters</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  listContent: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    color: theme.colors.text,
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
    marginBottom: theme.spacing.sm,
  },
  emptySubtext: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.caption.fontSize,
  },
});