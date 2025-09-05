import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Plus, Settings } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { router } from 'expo-router';

export default function CreateScreen() {
  const handleCustomBuild = () => {
    router.push('/custom-build');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Settings size={64} color={theme.colors.primary} />
        </View>
        
        <Text style={styles.title}>Create Your Build</Text>
        <Text style={styles.description}>
          Create and share your NBA 2K26 MyCareer build with full control over individual attributes.
        </Text>
        
        <TouchableOpacity 
          style={styles.createButton}
          onPress={handleCustomBuild}
          activeOpacity={0.8}
        >
          <Plus size={24} color={theme.colors.secondary} />
          <Text style={styles.buttonText}>Create Custom Build</Text>
        </TouchableOpacity>
        
        <View style={styles.tips}>
          <Text style={styles.tipsTitle}>Tips for a Great Build:</Text>
          <Text style={styles.tip}>• Set individual attribute values (0-99)</Text>
          <Text style={styles.tip}>• Include descriptive names and archetypes</Text>
          <Text style={styles.tip}>• Export/import builds to share with friends</Text>
          <Text style={styles.tip}>• Save and edit builds anytime</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: theme.spacing.xl,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.h1.fontSize,
    fontWeight: theme.typography.h1.fontWeight,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  description: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.body.fontSize,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
    lineHeight: 22,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
    borderRadius: theme.borderRadius.round,
    marginBottom: theme.spacing.xl,
    width: '100%',
  },
  buttonText: {
    color: theme.colors.secondary,
    fontSize: theme.typography.body.fontSize,
    fontWeight: '700',
  },
  tips: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    width: '100%',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  tipsTitle: {
    color: theme.colors.primary,
    fontSize: theme.typography.body.fontSize,
    fontWeight: '700',
    marginBottom: theme.spacing.md,
  },
  tip: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.caption.fontSize,
    marginBottom: theme.spacing.sm,
    lineHeight: 18,
  },
});