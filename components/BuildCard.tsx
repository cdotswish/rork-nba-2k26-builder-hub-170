import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Star, Play, TrendingUp } from 'lucide-react-native';
import { Build, ATTRIBUTE_GROUPS } from '@/types/build';
import { theme } from '@/constants/theme';
import { Link } from 'expo-router';

interface BuildCardProps {
  build: Build;
}

const getAttributeDisplayName = (key: string): string => {
  const displayNames: { [key: string]: string } = {
    closeShot: 'Close Shot',
    drivingLayup: 'Driving Layup',
    drivingDunk: 'Driving Dunk',
    standingDunk: 'Standing Dunk',
    postControl: 'Post Control',
    midRangeShot: 'Mid-Range',
    threePointShot: '3-Point',
    freeThrow: 'Free Throw',
    passAccuracy: 'Pass Accuracy',
    ballHandle: 'Ball Handle',
    speedWithBall: 'Speed w/ Ball',
    interiorDefense: 'Interior D',
    perimeterDefense: 'Perimeter D',
    steal: 'Steal',
    block: 'Block',
    offensiveRebound: 'Off. Rebound',
    defensiveRebound: 'Def. Rebound',
    speed: 'Speed',
    agility: 'Agility',
    strength: 'Strength',
    vertical: 'Vertical',
    stamina: 'Stamina',
  };
  return displayNames[key] || key;
};

export function BuildCard({ build }: BuildCardProps) {
  console.log('BuildCard: received build =', build);
  console.log('BuildCard: build type =', typeof build);
  console.log('BuildCard: build keys =', build ? Object.keys(build) : 'no keys');
  
  if (!build || typeof build !== 'object') {
    console.log('BuildCard: build is not an object', build);
    return (
      <View style={styles.container}>
        <Text style={{ color: 'red', padding: 16 }}>Invalid build data - not an object</Text>
      </View>
    );
  }
  
  if (!build.id) {
    console.log('BuildCard: build is missing id', build);
    return (
      <View style={styles.container}>
        <Text style={{ color: 'red', padding: 16 }}>Invalid build data - missing ID</Text>
      </View>
    );
  }
  
  if (!build.detailedAttributes) {
    console.log('BuildCard: build is missing detailedAttributes', build);
    return (
      <View style={styles.container}>
        <Text style={{ color: 'red', padding: 16 }}>Invalid build data - missing detailed attributes</Text>
      </View>
    );
  }

  return (
    <Link href={`/build/${build.id}`} asChild>
      <TouchableOpacity style={styles.container} activeOpacity={0.8}>
        {build.thumbnailUrl && (
          <View style={styles.thumbnailContainer}>
            <Image source={{ uri: build.thumbnailUrl }} style={styles.thumbnail} />
            {build.videoUrl && (
              <View style={styles.playButton}>
                <Play size={24} color="#FFF" fill="#FFF" />
              </View>
            )}
          </View>
        )}
        
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={[styles.positionBadge, { backgroundColor: theme.colors.positions[build.position] || theme.colors.primary }]}>
              <Text style={styles.positionText}>{build.position || 'N/A'}</Text>
            </View>
            <View style={styles.rating}>
              <Star size={16} color={theme.colors.primary} fill={theme.colors.primary} />
              <Text style={styles.ratingText}>{(build.rating || 0).toFixed(1)}</Text>
              <Text style={styles.reviewCount}>({build.reviewCount || 0})</Text>
            </View>
          </View>
          
          <Text style={styles.name} numberOfLines={1}>{build.name}</Text>
          <Text style={styles.archetype} numberOfLines={1}>{build.archetype}</Text>
          
          <View style={styles.stats}>
            <Text style={styles.stat}>{build.height} • {build.weight} lbs</Text>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.attributesContainer}>
            <View style={styles.attributes}>
              {Object.entries(ATTRIBUTE_GROUPS).map(([categoryKey, group]) => (
                <View key={categoryKey} style={styles.attributeGroup}>
                  <Text style={styles.groupTitle}>{group.name}</Text>
                  {group.attributes.map((attrKey) => {
                    const value = build.detailedAttributes?.[attrKey] || 0;
                    const displayName = getAttributeDisplayName(attrKey);
                    return (
                      <View key={attrKey} style={styles.attributeRow}>
                        <Text style={styles.attributeName}>{displayName}</Text>
                        <View style={styles.attributeValueContainer}>
                          <View style={[styles.attributeBar, { width: `${value}%` }]} />
                          <Text style={styles.attributeValue}>{value}</Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              ))}
            </View>
          </ScrollView>
          
          <View style={styles.footer}>
            <Text style={styles.creator}>by {build.userName}</Text>
            <TrendingUp size={14} color={theme.colors.success} />
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  thumbnailContainer: {
    height: 120,
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  positionBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  positionText: {
    color: theme.colors.secondary,
    fontSize: theme.typography.small.fontSize,
    fontWeight: '700',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    color: theme.colors.text,
    fontSize: theme.typography.caption.fontSize,
    fontWeight: '600',
  },
  reviewCount: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.small.fontSize,
  },
  name: {
    color: theme.colors.text,
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
    marginBottom: 4,
  },
  archetype: {
    color: theme.colors.primary,
    fontSize: theme.typography.caption.fontSize,
    marginBottom: theme.spacing.sm,
  },
  stats: {
    marginBottom: theme.spacing.sm,
  },
  stat: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.small.fontSize,
  },
  attributesContainer: {
    marginBottom: theme.spacing.md,
  },
  attributes: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  attributeGroup: {
    minWidth: 120,
  },
  groupTitle: {
    color: theme.colors.primary,
    fontSize: theme.typography.small.fontSize,
    fontWeight: '700',
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
  },
  attributeRow: {
    marginBottom: 4,
  },
  attributeName: {
    color: theme.colors.textSecondary,
    fontSize: 10,
    marginBottom: 2,
  },
  attributeValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: theme.borderRadius.sm,
    overflow: 'hidden',
    position: 'relative',
  },
  attributeBar: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    position: 'absolute',
    opacity: 0.3,
  },
  attributeValue: {
    color: theme.colors.text,
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 4,
    zIndex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  creator: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.small.fontSize,
  },
});