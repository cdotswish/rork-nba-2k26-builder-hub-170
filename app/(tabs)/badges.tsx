import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Search, Filter, Award, Info } from 'lucide-react-native';

import { theme } from '@/constants/theme';
import { nba2k26BadgeRequirements, getBadgesByCategory, searchBadges } from '@/mocks/builds';
import { BadgeCategory, BadgeLevel, BadgeRequirement } from '@/types/build';

const badgeLevelColors: Record<BadgeLevel, string> = {
  Bronze: '#CD7F32',
  Silver: '#C0C0C0',
  Gold: '#FFD700',
  'Hall of Fame': '#FF6B35',
  Legend: '#9B59B6'
};

const categoryColors: Record<BadgeCategory, string> = {
  Finishing: '#E74C3C',
  Shooting: '#3498DB',
  Playmaking: '#2ECC71',
  Defense: '#9B59B6',
  Rebounding: '#F39C12',
  'All-Around': '#34495E'
};

interface BadgeCardProps {
  badge: BadgeRequirement;
  onPress: () => void;
}

function BadgeCard({ badge, onPress }: BadgeCardProps) {
  const availableLevels = Object.keys(badge.requirements) as BadgeLevel[];
  const highestLevel = availableLevels[availableLevels.length - 1];
  
  return (
    <TouchableOpacity style={styles.badgeCard} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.badgeHeader}>
        <View style={[styles.categoryBadge, { backgroundColor: categoryColors[badge.category] }]}>
          <Text style={styles.categoryText}>{badge.category}</Text>
        </View>
        <View style={[styles.levelBadge, { backgroundColor: badgeLevelColors[highestLevel] }]}>
          <Text style={styles.levelText}>{highestLevel}</Text>
        </View>
      </View>
      
      <Text style={styles.badgeName}>{badge.name}</Text>
      <Text style={styles.badgeDescription} numberOfLines={2}>
        {badge.description}
      </Text>
      
      <View style={styles.requirementsPreview}>
        <Text style={styles.requirementsText}>
          {availableLevels.length} level{availableLevels.length !== 1 ? 's' : ''} available
        </Text>
        <Info size={16} color={theme.colors.textSecondary} />
      </View>
    </TouchableOpacity>
  );
}

interface BadgeDetailModalProps {
  badge: BadgeRequirement | null;
  visible: boolean;
  onClose: () => void;
}

function BadgeDetailModal({ badge, visible, onClose }: BadgeDetailModalProps) {
  if (!visible || !badge) return null;
  
  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{badge.name}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <View style={[styles.categoryBadge, { backgroundColor: categoryColors[badge.category], alignSelf: 'flex-start' }]}>
            <Text style={styles.categoryText}>{badge.category}</Text>
          </View>
          
          <Text style={styles.modalDescription}>{badge.description}</Text>
          
          <Text style={styles.requirementsTitle}>Requirements by Level:</Text>
          
          {Object.entries(badge.requirements).map(([level, requirement]) => (
            <View key={level} style={styles.levelRequirement}>
              <View style={[styles.levelHeader, { backgroundColor: badgeLevelColors[level as BadgeLevel] }]}>
                <Text style={styles.levelHeaderText}>{level}</Text>
              </View>
              
              <View style={styles.requirementContent}>
                {requirement.attributes.map((attrCombo, index) => (
                  <View key={index}>
                    <View style={styles.attributeCombo}>
                      {Object.entries(attrCombo).map(([attr, value], attrIndex) => (
                        <View key={attrIndex} style={styles.attributeRow}>
                          <Text style={styles.attributeLabel}>
                            {attr.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </Text>
                          <Text style={styles.attributeValue}>{value}</Text>
                        </View>
                      ))}
                    </View>
                    {index < requirement.attributes.length - 1 && (
                      <View style={styles.orDivider}>
                        <View style={styles.orLine} />
                        <Text style={styles.orText}>OR</Text>
                        <View style={styles.orLine} />
                      </View>
                    )}
                  </View>
                ))}
                
                {requirement.heightRestriction && (
                  <View style={styles.heightRestriction}>
                    <Text style={styles.heightRestrictionLabel}>Height Requirement</Text>
                    <Text style={styles.heightRestrictionText}>
                      {requirement.heightRestriction.min && `Min ${requirement.heightRestriction.min}`}
                      {requirement.heightRestriction.min && requirement.heightRestriction.max && ' - '}
                      {requirement.heightRestriction.max && `Max ${requirement.heightRestriction.max}`}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

export default function BadgesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<BadgeCategory | 'All'>('All');
  const [selectedBadge, setSelectedBadge] = useState<BadgeRequirement | null>(null);
  const [showModal, setShowModal] = useState(false);
  
  const categories: (BadgeCategory | 'All')[] = ['All', 'Finishing', 'Shooting', 'Playmaking', 'Defense', 'Rebounding', 'All-Around'];
  
  const filteredBadges = useMemo(() => {
    let badges = nba2k26BadgeRequirements;
    
    if (searchQuery) {
      badges = searchBadges(searchQuery);
    }
    
    if (selectedCategory !== 'All') {
      badges = getBadgesByCategory(selectedCategory);
    }
    
    if (searchQuery && selectedCategory !== 'All') {
      badges = badges.filter(badge => 
        badge.category === selectedCategory &&
        (badge.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
         badge.description?.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    return badges;
  }, [searchQuery, selectedCategory]);
  
  const handleBadgePress = (badge: BadgeRequirement) => {
    setSelectedBadge(badge);
    setShowModal(true);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search size={20} color={theme.colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search badges..."
            placeholderTextColor={theme.colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoryFilter}
          contentContainerStyle={styles.categoryFilterContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive,
                selectedCategory === category && category !== 'All' && {
                  backgroundColor: categoryColors[category as BadgeCategory]
                }
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[
                styles.categoryButtonText,
                selectedCategory === category && styles.categoryButtonTextActive
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Award size={24} color={theme.colors.primary} />
            <Text style={styles.statNumber}>{nba2k26BadgeRequirements.length}</Text>
            <Text style={styles.statLabel}>Total Badges</Text>
          </View>
          <View style={styles.statItem}>
            <Filter size={24} color={theme.colors.primary} />
            <Text style={styles.statNumber}>{filteredBadges.length}</Text>
            <Text style={styles.statLabel}>Filtered</Text>
          </View>
        </View>
        
        <View style={styles.badgeGrid}>
          {filteredBadges.map((badge) => (
            <BadgeCard
              key={badge.name}
              badge={badge}
              onPress={() => handleBadgePress(badge)}
            />
          ))}
        </View>
        
        {filteredBadges.length === 0 && (
          <View style={styles.emptyState}>
            <Award size={48} color={theme.colors.textSecondary} />
            <Text style={styles.emptyStateText}>No badges found</Text>
            <Text style={styles.emptyStateSubtext}>Try adjusting your search or filter</Text>
          </View>
        )}
      </ScrollView>
      
      <BadgeDetailModal
        badge={selectedBadge}
        visible={showModal}
        onClose={() => setShowModal(false)}
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
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  searchIcon: {
    marginRight: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    color: theme.colors.text,
    fontSize: theme.typography.body.fontSize,
  },
  categoryFilter: {
    marginBottom: theme.spacing.sm,
  },
  categoryFilterContent: {
    paddingRight: theme.spacing.lg,
  },
  categoryButton: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background,
    marginRight: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  categoryButtonActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  categoryButtonText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.caption.fontSize,
    fontWeight: '600',
  },
  categoryButtonTextActive: {
    color: theme.colors.secondary,
  },
  content: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: theme.spacing.lg,
    gap: theme.spacing.lg,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  statNumber: {
    color: theme.colors.text,
    fontSize: theme.typography.h2.fontSize,
    fontWeight: '700',
    marginTop: theme.spacing.sm,
  },
  statLabel: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.caption.fontSize,
    marginTop: theme.spacing.xs,
  },
  badgeGrid: {
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  badgeCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  badgeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  categoryBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  categoryText: {
    color: theme.colors.secondary,
    fontSize: theme.typography.caption.fontSize,
    fontWeight: '600',
  },
  levelBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  levelText: {
    color: theme.colors.secondary,
    fontSize: theme.typography.caption.fontSize,
    fontWeight: '600',
  },
  badgeName: {
    color: theme.colors.text,
    fontSize: theme.typography.h3.fontSize,
    fontWeight: '700',
    marginBottom: theme.spacing.sm,
  },
  badgeDescription: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.body.fontSize,
    lineHeight: 20,
    marginBottom: theme.spacing.md,
  },
  requirementsPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  requirementsText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.caption.fontSize,
  },
  emptyState: {
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  emptyStateText: {
    color: theme.colors.text,
    fontSize: theme.typography.h3.fontSize,
    fontWeight: '600',
    marginTop: theme.spacing.md,
  },
  emptyStateSubtext: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.body.fontSize,
    marginTop: theme.spacing.sm,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    margin: theme.spacing.lg,
    maxHeight: '80%',
    width: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  modalTitle: {
    color: theme.colors.text,
    fontSize: theme.typography.h2.fontSize,
    fontWeight: '700',
    flex: 1,
  },
  closeButton: {
    padding: theme.spacing.sm,
  },
  closeButtonText: {
    color: theme.colors.textSecondary,
    fontSize: 20,
    fontWeight: '600',
  },
  modalDescription: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.body.fontSize,
    lineHeight: 22,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  requirementsTitle: {
    color: theme.colors.text,
    fontSize: theme.typography.h3.fontSize,
    fontWeight: '700',
    marginBottom: theme.spacing.md,
  },
  levelRequirement: {
    marginBottom: theme.spacing.xl,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  levelHeader: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: 0,
    marginBottom: 0,
  },
  levelHeaderText: {
    color: theme.colors.secondary,
    fontSize: theme.typography.h3.fontSize,
    fontWeight: '700',
    textAlign: 'center',
  },
  requirementContent: {
    padding: theme.spacing.lg,
  },
  attributeCombo: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  attributeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    marginBottom: theme.spacing.xs,
  },
  attributeLabel: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.body.fontSize,
    fontWeight: '500',
    flex: 1,
  },
  attributeValue: {
    color: theme.colors.text,
    fontSize: theme.typography.body.fontSize,
    fontWeight: '700',
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    minWidth: 50,
    textAlign: 'center',
  },
  orDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing.md,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.border,
  },
  orText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.caption.fontSize,
    fontWeight: '700',
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  heightRestriction: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    marginTop: theme.spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.primary,
  },
  heightRestrictionLabel: {
    color: theme.colors.text,
    fontSize: theme.typography.caption.fontSize,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: theme.spacing.xs,
  },
  heightRestrictionText: {
    color: theme.colors.text,
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600',
  },
});