import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Position } from '@/types/build';
import { theme } from '@/constants/theme';

interface PositionFilterProps {
  selected: Position | 'ALL';
  onSelect: (position: Position | 'ALL') => void;
}

const positions: (Position | 'ALL')[] = ['ALL', 'PG', 'SG', 'SF', 'PF', 'C'];

export function PositionFilter({ selected, onSelect }: PositionFilterProps) {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {positions.map((position) => (
        <TouchableOpacity
          key={position}
          style={[
            styles.chip,
            selected === position && styles.chipSelected,
            position !== 'ALL' && selected === position && { backgroundColor: theme.colors.positions[position as Position] }
          ]}
          onPress={() => onSelect(position)}
          activeOpacity={0.7}
        >
          <Text style={[
            styles.chipText,
            selected === position && styles.chipTextSelected
          ]}>
            {position}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: theme.spacing.md,
  },
  content: {
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  chip: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  chipSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  chipText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.caption.fontSize,
    fontWeight: '600',
  },
  chipTextSelected: {
    color: theme.colors.secondary,
  },
});