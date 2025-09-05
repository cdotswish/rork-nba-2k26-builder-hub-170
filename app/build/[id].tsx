import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Star, Play, User, MessageSquare } from 'lucide-react-native';
import { useBuilds } from '@/hooks/builds-context';
import { theme } from '@/constants/theme';
import { ATTRIBUTE_GROUPS, AttributeCategory } from '@/types/build';

export default function BuildDetailScreen() {
  const params = useLocalSearchParams();
  const { getBuildById, getReviewsForBuild, addReview } = useBuilds();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  
  console.log('BuildDetailScreen: params =', params);
  console.log('BuildDetailScreen: params type =', typeof params);
  
  if (!params || typeof params !== 'object') {
    console.log('BuildDetailScreen: params is not an object');
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Invalid parameters</Text>
      </View>
    );
  }
  
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  
  console.log('BuildDetailScreen: extracted id =', id);
  
  if (!id || typeof id !== 'string') {
    console.log('BuildDetailScreen: invalid id, params =', params);
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Invalid build ID</Text>
        <Text style={styles.errorText}>Params: {JSON.stringify(params)}</Text>
      </View>
    );
  }
  
  const build = getBuildById(id);
  const reviews = getReviewsForBuild(id);
  
  console.log('BuildDetailScreen: build found =', !!build);
  console.log('BuildDetailScreen: build =', build ? { id: build.id, name: build.name } : 'null');

  if (!build) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Build not found</Text>
      </View>
    );
  }

  const handleSubmitReview = async () => {
    if (!comment.trim()) {
      Alert.alert('Error', 'Please write a comment');
      return;
    }
    
    await addReview({
      buildId: build.id,
      rating,
      comment: comment.trim(),
    });
    
    setComment('');
    setRating(5);
    Alert.alert('Success', 'Review submitted!');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {build.thumbnailUrl && (
        <View style={styles.mediaContainer}>
          <Image source={{ uri: build.thumbnailUrl }} style={styles.thumbnail} />
          {build.videoUrl && (
            <TouchableOpacity style={styles.playButton} activeOpacity={0.8}>
              <Play size={32} color="#FFF" fill="#FFF" />
            </TouchableOpacity>
          )}
        </View>
      )}

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={[styles.positionBadge, { backgroundColor: theme.colors.positions[build.position] }]}>
            <Text style={styles.positionText}>{build.position}</Text>
          </View>
          <View style={styles.rating}>
            <Star size={20} color={theme.colors.primary} fill={theme.colors.primary} />
            <Text style={styles.ratingText}>{build.rating.toFixed(1)}</Text>
            <Text style={styles.reviewCount}>({build.reviewCount} reviews)</Text>
          </View>
        </View>

        <Text style={styles.name}>{build.name}</Text>
        <Text style={styles.archetype}>{build.archetype}</Text>
        
        <View style={styles.creator}>
          <User size={16} color={theme.colors.textSecondary} />
          <Text style={styles.creatorText}>Created by {build.userName}</Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Height</Text>
            <Text style={styles.statValue}>{build.height}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Weight</Text>
            <Text style={styles.statValue}>{build.weight} lbs</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Wingspan</Text>
            <Text style={styles.statValue}>{build.wingspan}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Attributes</Text>
          <View style={styles.attributesContainer}>
            {Object.entries(ATTRIBUTE_GROUPS).map(([categoryKey, group]) => {
              const category = categoryKey as AttributeCategory;
              const categoryColor = theme.colors.categories[group.name as keyof typeof theme.colors.categories] || theme.colors.primary;
              
              return (
                <View key={category} style={styles.attributeGroup}>
                  <View style={[styles.groupHeader, { backgroundColor: `${categoryColor}15` }]}>
                    <Text style={[styles.groupTitle, { color: categoryColor }]}>{group.name}</Text>
                  </View>
                  <View style={styles.attributesList}>
                    {group.attributes.map((attrKey) => {
                      const value = build.detailedAttributes[attrKey];
                      const displayName = attrKey
                        .replace(/([A-Z])/g, ' $1')
                        .replace(/^./, str => str.toUpperCase())
                        .trim();
                      
                      return (
                        <View key={attrKey} style={styles.attributeRow}>
                          <View style={styles.attributeInfo}>
                            <Text style={styles.attributeName}>{displayName}</Text>
                            <Text style={[styles.attributeValue, { color: categoryColor }]}>{value}</Text>
                          </View>
                          <View style={styles.attributeBarContainer}>
                            <View 
                              style={[
                                styles.attributeBar, 
                                { width: `${Math.max(value, 2)}%` },
                                { backgroundColor: categoryColor }
                              ]} 
                            />
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Badges</Text>
          <View style={styles.badgesContainer}>
            {build.badges.map((badge, index) => (
              <View 
                key={index} 
                style={[
                  styles.badge,
                  { backgroundColor: theme.colors.badges[badge.level] }
                ]}
              >
                <Text style={styles.badgeName}>{badge.name}</Text>
                <Text style={styles.badgeLevel}>{badge.level}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Write a Review</Text>
          <View style={styles.ratingSelector}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setRating(star)}>
                <Star 
                  size={32} 
                  color={theme.colors.primary} 
                  fill={star <= rating ? theme.colors.primary : 'transparent'}
                />
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            style={styles.reviewInput}
            placeholder="Share your experience with this build..."
            placeholderTextColor={theme.colors.textSecondary}
            value={comment}
            onChangeText={setComment}
            multiline
            numberOfLines={4}
          />
          <TouchableOpacity 
            style={styles.submitButton}
            onPress={handleSubmitReview}
            activeOpacity={0.8}
          >
            <MessageSquare size={20} color={theme.colors.secondary} />
            <Text style={styles.submitButtonText}>Submit Review</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          {reviews.length === 0 ? (
            <Text style={styles.noReviews}>No reviews yet. Be the first!</Text>
          ) : (
            reviews.map((review) => (
              <View key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewUser}>{review.userName}</Text>
                  <View style={styles.reviewRating}>
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        size={14} 
                        color={theme.colors.primary} 
                        fill={i < review.rating ? theme.colors.primary : 'transparent'}
                      />
                    ))}
                  </View>
                </View>
                <Text style={styles.reviewComment}>{review.comment}</Text>
              </View>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  errorText: {
    color: theme.colors.text,
    fontSize: theme.typography.h3.fontSize,
    textAlign: 'center',
    marginTop: 50,
  },
  mediaContainer: {
    height: 250,
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
    transform: [{ translateX: -30 }, { translateY: -30 }],
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: theme.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  positionBadge: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
  positionText: {
    color: theme.colors.secondary,
    fontSize: theme.typography.body.fontSize,
    fontWeight: '700',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingText: {
    color: theme.colors.text,
    fontSize: theme.typography.body.fontSize,
    fontWeight: '700',
  },
  reviewCount: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.caption.fontSize,
  },
  name: {
    color: theme.colors.text,
    fontSize: theme.typography.h1.fontSize,
    fontWeight: theme.typography.h1.fontWeight,
    marginBottom: theme.spacing.sm,
  },
  archetype: {
    color: theme.colors.primary,
    fontSize: theme.typography.h3.fontSize,
    marginBottom: theme.spacing.md,
  },
  creator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  creatorText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.caption.fontSize,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.small.fontSize,
    marginBottom: 4,
  },
  statValue: {
    color: theme.colors.text,
    fontSize: theme.typography.h3.fontSize,
    fontWeight: '700',
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    color: theme.colors.primary,
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
    marginBottom: theme.spacing.md,
  },
  attributesContainer: {
    gap: theme.spacing.xl,
  },
  attributeGroup: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: 'hidden',
  },
  groupHeader: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  groupTitle: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  attributesList: {
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  attributeRow: {
    marginBottom: theme.spacing.sm,
  },
  attributeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  attributeName: {
    color: theme.colors.text,
    fontSize: theme.typography.body.fontSize,
    fontWeight: '500',
  },
  attributeBarContainer: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: theme.borderRadius.sm,
    overflow: 'hidden',
  },
  attributeBar: {
    height: '100%',
    borderRadius: theme.borderRadius.sm,
  },
  attributeValue: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: '700',
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  badge: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
  badgeName: {
    color: '#000',
    fontSize: theme.typography.small.fontSize,
    fontWeight: '700',
  },
  badgeLevel: {
    color: '#000',
    fontSize: 10,
    opacity: 0.8,
  },
  ratingSelector: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  reviewInput: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    color: theme.colors.text,
    fontSize: theme.typography.body.fontSize,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.md,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
  },
  submitButtonText: {
    color: theme.colors.secondary,
    fontSize: theme.typography.body.fontSize,
    fontWeight: '700',
  },
  noReviews: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.caption.fontSize,
    textAlign: 'center',
    paddingVertical: theme.spacing.lg,
  },
  reviewCard: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  reviewUser: {
    color: theme.colors.text,
    fontSize: theme.typography.caption.fontSize,
    fontWeight: '600',
  },
  reviewRating: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewComment: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.caption.fontSize,
    lineHeight: 18,
  },
});