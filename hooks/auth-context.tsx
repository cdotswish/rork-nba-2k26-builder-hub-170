import createContextHook from '@nkzw/create-context-hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useCallback, useMemo } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (name: string) => Promise<{ success: boolean; error?: string }>;
}

const API_BASE_URL = 'https://nba2k26-backend.onrender.com';

// Helper function to make API requests with proper error handling
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  console.log(`API Request: ${options.method || 'GET'} ${url}`);
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      signal: controller.signal,
      ...options,
    });
    
    clearTimeout(timeoutId);
    console.log(`API Response: ${response.status} ${response.statusText}`);
    
    let data;
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      // Get the raw text first
      const text = await response.text();
      console.log(`Non-JSON response (${contentType}):`, text.substring(0, 200));
      
      // Check if it's HTML (common for error pages)
      if (contentType && contentType.includes('text/html')) {
        console.error('Received HTML instead of JSON - server may be down or URL incorrect');
        throw new Error('Server returned HTML instead of JSON - please check server status');
      }
      
      // Only try to parse as JSON if it looks like JSON
      if (text.trim().startsWith('{') || text.trim().startsWith('[')) {
        try {
          data = JSON.parse(text);
        } catch (parseError) {
          console.error('Failed to parse response as JSON:', parseError);
          throw new Error(`Invalid JSON response from server`);
        }
      } else {
        // Not JSON at all
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        data = { message: text };
      }
    }

    if (!response.ok) {
      throw new Error(data?.error || data?.message || `Request failed: ${response.status}`);
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout - server is not responding');
      }
      if (error.message.includes('Load failed') || error.message.includes('fetch')) {
        throw new Error('Network error - cannot connect to server');
      }
      if (error.message.includes('JSON')) {
        // Already a JSON error, pass it through
        throw error;
      }
    }
    throw error;
  }
};

export const [AuthProvider, useAuth] = createContextHook<AuthContextValue>(() => {
  const queryClient = useQueryClient();
  const [isInitialized, setIsInitialized] = useState(false);

  // Load stored token and validate with server
  const authQuery = useQuery({
    queryKey: ['auth'],
    queryFn: async () => {
      try {
        console.log('authQuery: Starting authentication check');
        
        const token = await AsyncStorage.getItem('authToken');
        
        if (!token) {
          console.log('authQuery: No token found');
          setIsInitialized(true);
          return null;
        }

        console.log('authQuery: Token found, validating with server');
        
        try {
          const data = await apiRequest('/api/auth/me', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          
          console.log('authQuery: Token validation successful');
          setIsInitialized(true);
          return data.user || data;
        } catch (error) {
          console.log('authQuery: Token validation failed, removing token:', error);
          await AsyncStorage.removeItem('authToken');
          setIsInitialized(true);
          return null;
        }
      } catch (error) {
        console.error('authQuery: Authentication error:', error);
        await AsyncStorage.removeItem('authToken');
        setIsInitialized(true);
        return null;
      }
    },
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      console.log('loginMutation: Attempting login for:', email);
      
      const data = await apiRequest('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      
      console.log('loginMutation: Login successful');
      
      // Handle different response structures
      const responseData = {
        token: data.token || data.access_token || data.accessToken || data.jwt,
        user: data.user || data.data || { 
          id: data.id || data.userId || data.user_id || Math.random().toString(36),
          email: email,
          name: data.name || data.displayName || email.split('@')[0],
          createdAt: data.createdAt || new Date().toISOString()
        }
      };
      
      if (!responseData.token) {
        console.warn('loginMutation: No token in response, authentication may not persist');
      }
      
      return responseData;
    },
    onSuccess: async (data) => {
      console.log('loginMutation: Login successful, storing token');
      if (data.token) {
        await AsyncStorage.setItem('authToken', data.token);
      }
      queryClient.setQueryData(['auth'], data.user);
      queryClient.invalidateQueries({ queryKey: ['builds'] });
    },
  });
  const { mutateAsync: loginMutateAsync } = loginMutation;

  const registerMutation = useMutation({
    mutationFn: async ({ email, password, name }: { email: string; password: string; name: string }) => {
      console.log('registerMutation: Attempting registration for:', email);
      
      const data = await apiRequest('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password, name, displayName: name }),
      });
      
      console.log('registerMutation: Registration successful');
      
      // Handle different response structures
      const responseData = {
        token: data.token || data.access_token || data.accessToken || data.jwt,
        user: data.user || data.data || { 
          id: data.id || data.userId || data.user_id || Math.random().toString(36),
          email: email,
          name: name,
          createdAt: data.createdAt || new Date().toISOString()
        }
      };
      
      console.log('registerMutation: Final response data:', responseData);
      
      if (!responseData.token) {
        console.warn('registerMutation: No token in response, authentication may not persist');
      }
      
      return responseData;
    },
    onSuccess: async (data) => {
      console.log('registerMutation: Registration successful, storing token');
      if (data.token) {
        await AsyncStorage.setItem('authToken', data.token);
      }
      queryClient.setQueryData(['auth'], data.user);
      queryClient.invalidateQueries({ queryKey: ['builds'] });
    },
  });
  const { mutateAsync: registerMutateAsync } = registerMutation;

  const updateProfileMutation = useMutation({
    mutationFn: async (name: string) => {
      console.log('updateProfileMutation: Attempting to update profile with name:', name);
      
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        console.log('updateProfileMutation: No authentication token found');
        throw new Error('No authentication token');
      }

      const data = await apiRequest('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name, displayName: name }),
      });
      
      console.log('updateProfileMutation: Profile update successful');
      
      // Handle different response structures
      const updatedUser = data.user || data.data || data;
      
      // Merge with existing user data to preserve fields not returned by the update
      const currentUser = queryClient.getQueryData(['auth']) as User | null;
      if (currentUser) {
        return {
          ...currentUser,
          ...updatedUser,
          name: updatedUser.name || name, // Ensure name is updated
        };
      }
      
      return updatedUser;
    },
    onSuccess: (updatedUser) => {
      console.log('updateProfileMutation: Profile updated successfully:', updatedUser);
      queryClient.setQueryData(['auth'], updatedUser);
    },
  });
  const { mutateAsync: updateProfileMutateAsync } = updateProfileMutation;

  const login = useCallback(async (email: string, password: string) => {
    try {
      await loginMutateAsync({ email, password });
      return { success: true };
    } catch (error) {
      console.error('login: Error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Login failed' 
      };
    }
  }, [loginMutateAsync]);

  const register = useCallback(async (email: string, password: string, name: string) => {
    try {
      await registerMutateAsync({ email, password, name });
      return { success: true };
    } catch (error) {
      console.error('register: Error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Registration failed' 
      };
    }
  }, [registerMutateAsync]);

  const updateProfile = useCallback(async (name: string) => {
    try {
      await updateProfileMutateAsync(name);
      return { success: true };
    } catch (error) {
      console.error('updateProfile: Error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Profile update failed' 
      };
    }
  }, [updateProfileMutateAsync]);

  const logout = useCallback(async () => {
    console.log('logout: Logging out user');
    await AsyncStorage.removeItem('authToken');
    queryClient.setQueryData(['auth'], null);
    queryClient.clear();
  }, [queryClient]);

  return useMemo(() => ({
    user: authQuery.data || null,
    isLoading: authQuery.isLoading || !isInitialized,
    isAuthenticated: !!authQuery.data,
    login,
    register,
    logout,
    updateProfile,
  }), [authQuery.data, authQuery.isLoading, isInitialized, login, register, logout, updateProfile]);
});