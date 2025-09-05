import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Stack, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useBuilds } from '@/hooks/builds-context';
import { theme } from '@/constants/theme';
import { Position, DetailedAttributes, DEFAULT_DETAILED_ATTRIBUTES, ATTRIBUTE_GROUPS } from '@/types/build';
import AttributeEditor from '@/components/AttributeEditor';
import { Save, ArrowLeft } from 'lucide-react-native';

export default function CustomBuildScreen() {
  const { addBuild } = useBuilds();
  
  const [name, setName] = useState('');
  const [position, setPosition] = useState<Position>('PG');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [wingspan, setWingspan] = useState('');
  const [archetype, setArchetype] = useState('');
  const [detailedAttributes, setDetailedAttributes] = useState<DetailedAttributes>(DEFAULT_DETAILED_ATTRIBUTES);

  const positions: Position[] = ['PG', 'SG', 'SF', 'PF', 'C'];

  const calculateCategoryAverages = () => {
    const categoryAverages: any = {};
    
    Object.entries(ATTRIBUTE_GROUPS).forEach(([categoryKey, group]) => {
      const values = group.attributes.map(attr => detailedAttributes[attr]);
      const average = values.reduce((sum, val) => sum + val, 0) / values.length;
      categoryAverages[categoryKey] = Math.round(average);
    });
    
    return {
      finishing: categoryAverages.finishing || 0,
      shooting: categoryAverages.shooting || 0,
      playmaking: categoryAverages.playmaking || 0,
      defense: (categoryAverages.defense + categoryAverages.rebounding) / 2 || 0,
      physicals: categoryAverages.physicals || 0,
    };
  };

  const handleSubmit = async () => {
    if (!name || !height || !weight || !wingspan || !archetype) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const attributes = calculateCategoryAverages();

    await addBuild({
      name,
      position,
      height,
      weight: parseInt(weight),
      wingspan,
      archetype,
      attributes,
      detailedAttributes,
      badges: [],
      thumbnailUrl: `https://images.unsplash.com/photo-${Math.random() > 0.5 ? '1546519638-68e109498ffc' : '1574623452334-1e0ac2b3ccb4'}?w=800`,
    });

    Alert.alert('Success', 'Custom build created successfully!', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Stack.Screen 
        options={{
          title: 'Custom Build',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
              <ArrowLeft size={24} color={theme.colors.text} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={handleSubmit} style={styles.headerButton}>
              <Save size={24} color={theme.colors.primary} />
            </TouchableOpacity>
          ),
        }}
      />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Build Name *</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="e.g., Elite Custom Build"
              placeholderTextColor={theme.colors.textSecondary}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Position *</Text>
            <View style={styles.positionSelector}>
              {positions.map((pos) => (
                <TouchableOpacity
                  key={pos}
                  style={[
                    styles.positionOption,
                    position === pos && { backgroundColor: theme.colors.positions[pos] }
                  ]}
                  onPress={() => setPosition(pos)}
                >
                  <Text style={[
                    styles.positionOptionText,
                    position === pos && styles.positionOptionTextSelected
                  ]}>
                    {pos}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Archetype *</Text>
            <TextInput
              style={styles.input}
              value={archetype}
              onChangeText={setArchetype}
              placeholder="e.g., Custom Specialist"
              placeholderTextColor={theme.colors.textSecondary}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>Height *</Text>
              <TextInput
                style={styles.input}
                value={height}
                onChangeText={setHeight}
                placeholder="e.g., 6'3"
                placeholderTextColor={theme.colors.textSecondary}
              />
            </View>
            
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>Weight (lbs) *</Text>
              <TextInput
                style={styles.input}
                value={weight}
                onChangeText={setWeight}
                placeholder="e.g., 195"
                placeholderTextColor={theme.colors.textSecondary}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Wingspan *</Text>
            <TextInput
              style={styles.input}
              value={wingspan}
              onChangeText={setWingspan}
              placeholder="e.g., 6'8"
              placeholderTextColor={theme.colors.textSecondary}
            />
          </View>

          <View style={styles.divider} />
          
          <AttributeEditor 
            attributes={detailedAttributes}
            onAttributesChange={setDetailedAttributes}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  headerButton: {
    padding: theme.spacing.sm,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: theme.spacing.lg,
  },
  sectionTitle: {
    color: theme.colors.primary,
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight as any,
    marginBottom: theme.spacing.lg,
  },
  inputGroup: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    color: theme.colors.text,
    fontSize: theme.typography.caption.fontSize,
    fontWeight: '600' as any,
    marginBottom: theme.spacing.sm,
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    color: theme.colors.text,
    fontSize: theme.typography.body.fontSize,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  positionSelector: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  positionOption: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  positionOptionText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600' as any,
  },
  positionOptionTextSelected: {
    color: theme.colors.secondary,
  },
  row: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.xl,
  },
});