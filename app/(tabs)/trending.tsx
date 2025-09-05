import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { BuildCard } from '@/components/BuildCard';
import { useBuilds } from '@/hooks/builds-context';
import { theme } from '@/constants/theme';
import { TrendingUp } from 'lucide-react-native';

export default function TrendingScreen() {
  const { builds } = useBuilds();
  
  // Sort by rating and review count for trending
  const trendingBuilds = [...builds]
    .sort((a, b) => {
      const scoreA = a.rating * Math.log(a.reviewCount + 1);
      const scoreB = b.rating * Math.log(b.reviewCount + 1);
      return scoreB - scoreA;
    })
    .slice(0, 10);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TrendingUp size={24} color={theme.colors.primary} />
        <Text style={styles.headerText}>Top 10 Builds This Week</Text>
      </View>
      <FlatList
        data={trendingBuilds}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View>
            <View style={styles.rankBadge}>
              <Text style={styles.rankText}>#{index + 1}</Text>
            </View>
            <BuildCard build={item} />
          </View>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerText: {
    color: theme.colors.text,
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
  },
  listContent: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  rankBadge: {
    position: 'absolute',
    top: -10,
    left: 10,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
    zIndex: 1,
  },
  rankText: {
    color: theme.colors.secondary,
    fontSize: theme.typography.small.fontSize,
    fontWeight: '700',
  },
});