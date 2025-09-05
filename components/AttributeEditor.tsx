import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { DetailedAttributes, ATTRIBUTE_GROUPS, AttributeCategory, DEFAULT_DETAILED_ATTRIBUTES } from '@/types/build';
import { theme } from '@/constants/theme';
import { ChevronDown, ChevronUp, RotateCcw, Copy, Download, Upload } from 'lucide-react-native';

interface AttributeEditorProps {
  attributes: DetailedAttributes;
  onAttributesChange: (attributes: DetailedAttributes) => void;
}

interface CategorySummary {
  average: number;
  total: number;
  count: number;
}

export default function AttributeEditor({ attributes, onAttributesChange }: AttributeEditorProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<AttributeCategory>>(new Set(['finishing']));

  const toggleCategory = (category: AttributeCategory) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const updateAttribute = (key: keyof DetailedAttributes, value: number) => {
    const clampedValue = Math.max(0, Math.min(99, value));
    onAttributesChange({
      ...attributes,
      [key]: clampedValue
    });
  };

  const resetAttributes = () => {
    Alert.alert(
      'Reset Attributes',
      'Are you sure you want to reset all attributes to default values?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reset', 
          style: 'destructive',
          onPress: () => onAttributesChange(DEFAULT_DETAILED_ATTRIBUTES)
        }
      ]
    );
  };

  const duplicateAttributes = () => {
    Alert.alert('Attributes Copied', 'Attribute data has been copied to clipboard (simulated)');
  };

  const exportAttributes = () => {
    const jsonString = JSON.stringify(attributes, null, 2);
    Alert.alert('Export Attributes', `Attributes exported:\n${jsonString.substring(0, 100)}...`);
  };

  const importAttributes = () => {
    Alert.prompt(
      'Import Attributes',
      'Paste your attribute JSON data:',
      (text) => {
        try {
          const imported = JSON.parse(text || '{}');
          const validatedAttributes = { ...DEFAULT_DETAILED_ATTRIBUTES };
          
          Object.keys(imported).forEach(key => {
            if (key in DEFAULT_DETAILED_ATTRIBUTES) {
              const value = parseInt(imported[key]);
              if (!isNaN(value) && value >= 0 && value <= 99) {
                (validatedAttributes as any)[key] = value;
              }
            }
          });
          
          onAttributesChange(validatedAttributes);
          Alert.alert('Success', 'Attributes imported successfully!');
        } catch {
          Alert.alert('Error', 'Invalid JSON format');
        }
      }
    );
  };

  const categorySummaries = useMemo(() => {
    const summaries: Record<AttributeCategory, CategorySummary> = {} as any;
    
    Object.entries(ATTRIBUTE_GROUPS).forEach(([category, group]) => {
      const categoryKey = category as AttributeCategory;
      const values = group.attributes.map(attr => attributes[attr]);
      const total = values.reduce((sum, val) => sum + val, 0);
      const average = values.length > 0 ? total / values.length : 0;
      
      summaries[categoryKey] = {
        average: Math.round(average * 10) / 10,
        total,
        count: values.length
      };
    });
    
    return summaries;
  }, [attributes]);



  const formatAttributeName = (key: string) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Custom Attributes</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.actionButton} onPress={resetAttributes}>
            <RotateCcw size={16} color={theme.colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={duplicateAttributes}>
            <Copy size={16} color={theme.colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={exportAttributes}>
            <Download size={16} color={theme.colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={importAttributes}>
            <Upload size={16} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>



      {Object.entries(ATTRIBUTE_GROUPS).map(([categoryKey, group]) => {
        const category = categoryKey as AttributeCategory;
        const isExpanded = expandedCategories.has(category);
        const summary = categorySummaries[category];

        return (
          <View key={category} style={styles.categoryContainer}>
            <TouchableOpacity 
              style={styles.categoryHeader}
              onPress={() => toggleCategory(category)}
              activeOpacity={0.7}
            >
              <View style={styles.categoryHeaderLeft}>
                <Text style={styles.categoryTitle}>{group.name}</Text>
                <Text style={styles.categoryAverage}>Avg: {summary.average}</Text>
              </View>
              {isExpanded ? (
                <ChevronUp size={20} color={theme.colors.textSecondary} />
              ) : (
                <ChevronDown size={20} color={theme.colors.textSecondary} />
              )}
            </TouchableOpacity>

            {isExpanded && (
              <View style={styles.attributesContainer}>
                {group.attributes.map((attributeKey) => {
                  const value = attributes[attributeKey];
                  return (
                    <View key={attributeKey} style={styles.attributeRow}>
                      <View style={styles.attributeHeader}>
                        <Text style={styles.attributeName}>
                          {formatAttributeName(attributeKey)}
                        </Text>
                        <View style={styles.attributeValueContainer}>
                          <TextInput
                            style={styles.attributeInput}
                            value={value.toString()}
                            onChangeText={(text) => {
                              const numValue = parseInt(text) || 0;
                              updateAttribute(attributeKey, numValue);
                            }}
                            keyboardType="numeric"
                            maxLength={2}
                          />
                        </View>
                      </View>
                      <View style={styles.sliderContainer}>
                        <View style={styles.customSlider}>
                          <View style={styles.sliderTrack}>
                            <View 
                              style={[
                                styles.sliderFill, 
                                { width: `${(value / 99) * 100}%` }
                              ]} 
                            />
                            <TouchableOpacity
                              style={[
                                styles.sliderThumb,
                                { left: `${(value / 99) * 100}%` }
                              ]}
                              onPress={() => {}}
                            />
                          </View>
                        </View>
                        <View style={styles.sliderLabels}>
                          <Text style={styles.sliderLabel}>0</Text>
                          <Text style={styles.sliderLabel}>99</Text>
                        </View>
                      </View>
                      <View style={styles.quickButtons}>
                        <TouchableOpacity
                          style={styles.quickButton}
                          onPress={() => updateAttribute(attributeKey, Math.max(0, value - 5))}
                        >
                          <Text style={styles.quickButtonText}>-5</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.quickButton}
                          onPress={() => updateAttribute(attributeKey, Math.max(0, value - 1))}
                        >
                          <Text style={styles.quickButtonText}>-1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.quickButton}
                          onPress={() => updateAttribute(attributeKey, Math.min(99, value + 1))}
                        >
                          <Text style={styles.quickButtonText}>+1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.quickButton}
                          onPress={() => updateAttribute(attributeKey, Math.min(99, value + 5))}
                        >
                          <Text style={styles.quickButtonText}>+5</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  title: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h2.fontWeight as any,
    color: theme.colors.text,
  },
  headerActions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  actionButton: {
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },

  categoryContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: 'hidden',
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
  },
  categoryHeaderLeft: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight as any,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  categoryAverage: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textSecondary,
  },
  attributesContainer: {
    padding: theme.spacing.lg,
    paddingTop: 0,
  },
  attributeRow: {
    marginBottom: theme.spacing.lg,
  },
  attributeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  attributeName: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600' as any,
    color: theme.colors.text,
    flex: 1,
  },
  attributeValueContainer: {
    width: 50,
  },
  attributeInput: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    textAlign: 'center',
    fontSize: theme.typography.h3.fontSize,
    fontWeight: '700' as any,
    color: theme.colors.text,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  sliderContainer: {
    paddingHorizontal: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  customSlider: {
    height: 40,
    justifyContent: 'center',
  },
  sliderTrack: {
    height: 4,
    backgroundColor: theme.colors.border,
    borderRadius: 2,
    position: 'relative',
  },
  sliderFill: {
    height: 4,
    backgroundColor: theme.colors.primary,
    borderRadius: 2,
  },
  sliderThumb: {
    position: 'absolute',
    top: -8,
    width: 20,
    height: 20,
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    marginLeft: -10,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.xs,
  },
  sliderLabel: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textSecondary,
  },
  quickButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: theme.spacing.sm,
  },
  quickButton: {
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    minWidth: 40,
  },
  quickButtonText: {
    color: theme.colors.text,
    fontSize: theme.typography.caption.fontSize,
    fontWeight: '600' as any,
    textAlign: 'center',
  },
});