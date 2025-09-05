import createContextHook from '@nkzw/create-context-hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useMemo, useCallback } from 'react';
import { Build, Review, Position } from '@/types/build';

import { useAuth } from '@/hooks/auth-context';

const API_BASE_URL = 'https://nba2k26-backend.onrender.com';

// Helper function to make API requests with proper error handling
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  console.log(`API Request: ${options.method || 'GET'} ${url}`);
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  console.log(`API Response: ${response.status} ${response.statusText}`);
  
  let data;
  const contentType = response.headers.get('content-type');
  
  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  } else {
    const text = await response.text();
    console.log(`Non-JSON response:`, text);
    if (!response.ok) {
      throw new Error(`Server error: ${response.status} - ${text}`);
    }
    // Try to parse as JSON anyway
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }
  }

  if (!response.ok) {
    throw new Error(data.error || data.message || `Request failed: ${response.status}`);
  }

  return data;
};

interface BuildsContextValue {
  builds: Build[];
  reviews: Review[];
  isLoading: boolean;
  selectedPosition: Position | 'ALL';
  setSelectedPosition: (position: Position | 'ALL') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addBuild: (build: Omit<Build, 'id' | 'userId' | 'userName' | 'rating' | 'reviewCount' | 'createdAt' | 'updatedAt'>) => Promise<{ success: boolean; error?: string }>;
  updateBuild: (id: string, build: Partial<Build>) => Promise<{ success: boolean; error?: string }>;
  deleteBuild: (id: string) => Promise<{ success: boolean; error?: string }>;
  addReview: (review: Omit<Review, 'id' | 'userId' | 'userName' | 'createdAt'>) => Promise<{ success: boolean; error?: string }>;
  getUserBuilds: () => Build[];
  getBuildById: (id: string) => Build | undefined;
  getReviewsForBuild: (buildId: string) => Review[];
}

export const [BuildsProvider, useBuilds] = createContextHook<BuildsContextValue>(() => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [selectedPosition, setSelectedPosition] = useState<Position | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const getAuthHeaders = useCallback(async () => {
    const token = await AsyncStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
  }, []);
  
  // Load builds from server
  const buildsQuery = useQuery({
    queryKey: ['builds'],
    queryFn: async () => {
      try {
        console.log('buildsQuery: Starting to load builds');
        
        // First check if server is responding
        try {
          const healthCheck = await apiRequest('/');
          console.log('buildsQuery: Server health check passed:', healthCheck.status);
        } catch (healthError) {
          console.error('buildsQuery: Server health check failed:', healthError);
          throw new Error('Server is not responding');
        }
        
        const headers = await getAuthHeaders();
        const data = await apiRequest('/api/builds', {
          headers,
        });
        
        console.log('buildsQuery: Loaded builds from server, count:', data.builds?.length || data.length || 0);
        return data.builds || data || [];
      } catch (error) {
        console.error('buildsQuery: Error loading builds:', error);
        // Return empty array instead of throwing to prevent app crashes
        return [];
      }
    },
    enabled: true, // Always enabled, not just when authenticated
  });
  
  // Load reviews from server
  const reviewsQuery = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      try {
        console.log('reviewsQuery: Starting to load reviews');
        
        const headers = await getAuthHeaders();
        const data = await apiRequest('/api/reviews', {
          headers,
        });
        
        console.log('reviewsQuery: Loaded reviews from server, count:', data.reviews?.length || data.length || 0);
        return data.reviews || data || [];
      } catch (error) {
        console.error('reviewsQuery: Error loading reviews:', error);
        // Return empty array instead of throwing to prevent app crashes
        return [];
      }
    },
    enabled: true, // Always enabled, not just when authenticated
    retry: false, // Don't retry if the endpoint doesn't exist
  });
  

  
  // Mutation to create build
  const createBuildMutation = useMutation({
    mutationFn: async (buildData: Omit<Build, 'id' | 'userId' | 'userName' | 'rating' | 'reviewCount' | 'createdAt' | 'updatedAt'>) => {
      const headers = await getAuthHeaders();
      const data = await apiRequest('/api/builds', {
        method: 'POST',
        headers,
        body: JSON.stringify(buildData),
      });

      return data.build || data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['builds'] });
    },
  });
  const { mutateAsync: createBuildMutateAsync } = createBuildMutation;

  // Mutation to update build
  const updateBuildMutation = useMutation({
    mutationFn: async ({ id, buildData }: { id: string; buildData: Partial<Build> }) => {
      const headers = await getAuthHeaders();
      const data = await apiRequest(`/api/builds/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(buildData),
      });

      return data.build || data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['builds'] });
    },
  });
  const { mutateAsync: updateBuildMutateAsync } = updateBuildMutation;

  // Mutation to delete build
  const deleteBuildMutation = useMutation({
    mutationFn: async (id: string) => {
      const headers = await getAuthHeaders();
      await apiRequest(`/api/builds/${id}`, {
        method: 'DELETE',
        headers,
      });

      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['builds'] });
    },
  });
  const { mutateAsync: deleteBuildMutateAsync } = deleteBuildMutation;

  // Mutation to create review
  const createReviewMutation = useMutation({
    mutationFn: async (reviewData: Omit<Review, 'id' | 'userId' | 'userName' | 'createdAt'>) => {
      const headers = await getAuthHeaders();
      const data = await apiRequest('/api/reviews', {
        method: 'POST',
        headers,
        body: JSON.stringify(reviewData),
      });

      return data.review || data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['builds'] });
    },
  });
  const { mutateAsync: createReviewMutateAsync } = createReviewMutation;
  
  const addBuild = useCallback(async (buildData: Omit<Build, 'id' | 'userId' | 'userName' | 'rating' | 'reviewCount' | 'createdAt' | 'updatedAt'>) => {
    try {
      console.log('addBuild: Starting to add build:', buildData.name);
      if (!user) {
        return { success: false, error: 'User not authenticated' };
      }

      await createBuildMutateAsync(buildData);
      console.log('addBuild: Build created successfully on server');
      return { success: true };
    } catch (error) {
      console.error('addBuild: Error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to create build' 
      };
    }
  }, [user, createBuildMutateAsync]);
  
  const updateBuild = useCallback(async (id: string, buildData: Partial<Build>) => {
    try {
      console.log('updateBuild: Starting to update build:', id);
      await updateBuildMutateAsync({ id, buildData });
      console.log('updateBuild: Build updated successfully');
      return { success: true };
    } catch (error) {
      console.error('updateBuild: Error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to update build' 
      };
    }
  }, [updateBuildMutateAsync]);
  
  const deleteBuild = useCallback(async (id: string) => {
    try {
      console.log('deleteBuild: Starting to delete build:', id);
      await deleteBuildMutateAsync(id);
      console.log('deleteBuild: Build deleted successfully');
      return { success: true };
    } catch (error) {
      console.error('deleteBuild: Error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to delete build' 
      };
    }
  }, [deleteBuildMutateAsync]);
  
  const addReview = useCallback(async (reviewData: Omit<Review, 'id' | 'userId' | 'userName' | 'createdAt'>) => {
    try {
      console.log('addReview: Starting to add review for build:', reviewData.buildId);
      if (!user) {
        return { success: false, error: 'User not authenticated' };
      }

      await createReviewMutateAsync(reviewData);
      console.log('addReview: Review created successfully');
      return { success: true };
    } catch (error) {
      console.error('addReview: Error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to create review' 
      };
    }
  }, [user, createReviewMutateAsync]);
  
  const getUserBuilds = useCallback(() => {
    const builds = buildsQuery.data || [];
    if (!user) return [];
    return builds.filter((b: Build) => b.userId === user.id);
  }, [buildsQuery.data, user]);
  
  const getBuildById = useCallback((id: string) => {
    const builds = buildsQuery.data || [];
    console.log('getBuildById: searching for id =', id);
    console.log('getBuildById: available builds =', builds.map((b: Build) => ({ id: b?.id, name: b?.name })));
    
    if (!Array.isArray(builds)) {
      console.log('getBuildById: builds is not an array');
      return undefined;
    }
    
    const found = builds.find((b: Build) => {
      const isValid = b && typeof b === 'object' && b.id === id;
      return isValid;
    });
    console.log('getBuildById: found build =', found ? { id: found.id, name: found.name } : 'null');
    return found;
  }, [buildsQuery.data]);
  
  const getReviewsForBuild = useCallback((buildId: string) => {
    const reviews = reviewsQuery.data || [];
    return reviews.filter((r: Review) => r.buildId === buildId);
  }, [reviewsQuery.data]);
  
  return useMemo(() => ({
    builds: buildsQuery.data || [],
    reviews: reviewsQuery.data || [],
    isLoading: buildsQuery.isLoading || reviewsQuery.isLoading,
    selectedPosition,
    setSelectedPosition,
    searchQuery,
    setSearchQuery,
    addBuild,
    updateBuild,
    deleteBuild,
    addReview,
    getUserBuilds,
    getBuildById,
    getReviewsForBuild,
  }), [
    buildsQuery.data,
    reviewsQuery.data,
    buildsQuery.isLoading,
    reviewsQuery.isLoading,
    selectedPosition,
    searchQuery,
    addBuild,
    updateBuild,
    deleteBuild,
    addReview,
    getUserBuilds,
    getBuildById,
    getReviewsForBuild,
  ]);
});

export function useFilteredBuilds() {
  const { builds, selectedPosition, searchQuery } = useBuilds();
  
  return useMemo(() => {
    console.log('useFilteredBuilds: builds =', builds);
    console.log('useFilteredBuilds: builds length =', builds?.length);
    console.log('useFilteredBuilds: builds type =', typeof builds);
    console.log('useFilteredBuilds: builds isArray =', Array.isArray(builds));
    
    if (!builds || !Array.isArray(builds)) {
      console.log('useFilteredBuilds: builds is not an array, returning empty array');
      return [];
    }
    
    let filtered = builds.filter(build => {
      const isValid = build && typeof build === 'object' && build.id;
      if (!isValid) {
        console.log('useFilteredBuilds: invalid build found:', build);
      }
      return isValid;
    });
    console.log('useFilteredBuilds: after filtering undefined builds =', filtered.length);
    
    if (selectedPosition !== 'ALL') {
      filtered = filtered.filter(b => b.position === selectedPosition);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(b => 
        b.name.toLowerCase().includes(query) ||
        b.archetype.toLowerCase().includes(query) ||
        b.userName.toLowerCase().includes(query)
      );
    }
    
    const result = filtered.sort((a, b) => b.rating - a.rating);
    console.log('useFilteredBuilds: final result length =', result.length);
    console.log('useFilteredBuilds: final result =', result.map(b => ({ id: b.id, name: b.name })));
    return result;
  }, [builds, selectedPosition, searchQuery]);
}