import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, Alert, TextInput, Modal, ScrollView } from 'react-native';
import { BuildCard } from '@/components/BuildCard';
import { useBuilds } from '@/hooks/builds-context';
import { useAuth } from '@/hooks/auth-context';
import { theme } from '@/constants/theme';
import { User, Plus, LogOut, LogIn, UserPlus, Edit3, Check, X, Trash2, RefreshCw } from 'lucide-react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const { getUserBuilds } = useBuilds();
  const { user, logout, isAuthenticated, isLoading, updateProfile } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [showDebugInfo, setShowDebugInfo] = useState(false);
  const userBuilds = getUserBuilds();

  // Debug: Log user data
  console.log('ProfileScreen: Current user data:', user);

  const handleCreateBuild = () => {
    router.push('/custom-build');
  };

  const handleSignIn = () => {
    router.push('/login');
  };

  const handleSignUp = () => {
    router.push('/register');
  };

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            setIsLoggingOut(true);
            await logout();
            setIsLoggingOut(false);
          },
        },
      ]
    );
  };

  const handleEditName = () => {
    setNewName(user?.name || '');
    setIsEditing(true);
  };

  const handleSaveName = async () => {
    if (!newName.trim()) {
      Alert.alert('Error', 'Name cannot be empty');
      return;
    }

    const result = await updateProfile(newName.trim());
    if (result.success) {
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully');
    } else {
      Alert.alert('Error', result.error || 'Failed to update profile');
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setNewName('');
  };

  const handleClearLocalData = () => {
    Alert.alert(
      'Clear Local Data',
      'This will clear all local authentication and build data. You will need to sign in again.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear Data',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.multiRemove(['authToken', 'localUsers', 'builds', 'reviews']);
              Alert.alert('Success', 'Local data cleared. Please restart the app.');
              await logout();
            } catch {
              Alert.alert('Error', 'Failed to clear local data');
            }
          },
        },
      ]
    );
  };

  const handleTestBackend = async () => {
    try {
      const response = await fetch('https://nba2k26-backend.onrender.com', {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });
      
      const text = await response.text();
      Alert.alert(
        'Backend Test Result',
        `Status: ${response.status}\nResponse: ${text.substring(0, 200)}${text.length > 200 ? '...' : ''}`,
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert(
        'Backend Test Failed',
        `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        [{ text: 'OK' }]
      );
    }
  };

  // Show sign in options for unauthenticated users
  if (!isAuthenticated && !isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.authContainer}>
          <View style={styles.authHeader}>
            <View style={styles.avatar}>
              <User size={40} color={theme.colors.primary} />
            </View>
            <Text style={styles.authTitle}>Welcome to NBA 2K26 Build Creator</Text>
            <Text style={styles.authSubtitle}>Sign in to save and share your builds</Text>
          </View>

          <View style={styles.authButtons}>
            <TouchableOpacity 
              style={styles.signInButton}
              onPress={handleSignIn}
              activeOpacity={0.8}
              testID="sign-in-button"
            >
              <LogIn size={20} color={theme.colors.secondary} />
              <Text style={styles.signInButtonText}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.signUpButton}
              onPress={handleSignUp}
              activeOpacity={0.8}
              testID="sign-up-button"
            >
              <UserPlus size={20} color={theme.colors.primary} />
              <Text style={styles.signUpButtonText}>Create Account</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.featuresContainer}>
            <Text style={styles.featuresTitle}>Features:</Text>
            <Text style={styles.featureItem}>• Save your custom builds</Text>
            <Text style={styles.featureItem}>• Share builds with the community</Text>
            <Text style={styles.featureItem}>• Browse trending builds</Text>
            <Text style={styles.featureItem}>• Earn badges and achievements</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <User size={40} color={theme.colors.primary} />
        </View>
        <View style={styles.profileInfo}>
          <View style={styles.nameContainer}>
            <Text style={styles.userName}>{user?.name || 'MyPlayer'}</Text>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={handleEditName}
              testID="edit-name-button"
            >
              <Edit3 size={16} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.userEmail}>{user?.email}</Text>
          <Text style={styles.buildCount}>{userBuilds.length} Builds Created</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => setShowDebugInfo(!showDebugInfo)}
            testID="debug-button"
          >
            <RefreshCw size={16} color={theme.colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleLogout}
            disabled={isLoggingOut}
            testID="logout-button"
          >
            <LogOut size={16} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>

      {showDebugInfo && (
        <View style={styles.debugContainer}>
          <Text style={styles.debugTitle}>Debug Information</Text>
          <ScrollView style={styles.debugScroll} showsVerticalScrollIndicator={false}>
            <Text style={styles.debugText}>User ID: {user?.id}</Text>
            <Text style={styles.debugText}>Email: {user?.email}</Text>
            <Text style={styles.debugText}>Name: {user?.name}</Text>
            <Text style={styles.debugText}>Created: {user?.createdAt}</Text>
            <Text style={styles.debugText}>User Builds: {userBuilds.length}</Text>
            
            <View style={styles.debugActions}>
              <TouchableOpacity style={styles.debugButton} onPress={handleTestBackend}>
                <Text style={styles.debugButtonText}>Test Backend</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.debugButton} onPress={handleClearLocalData}>
                <Trash2 size={16} color={theme.colors.error} />
                <Text style={[styles.debugButtonText, { color: theme.colors.error }]}>Clear Data</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}

      {userBuilds.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No builds yet</Text>
          <Text style={styles.emptySubtext}>Create your first build to share with the community</Text>
          <TouchableOpacity 
            style={styles.createButton}
            onPress={handleCreateBuild}
            activeOpacity={0.8}
          >
            <Plus size={20} color={theme.colors.secondary} />
            <Text style={styles.buttonText}>Create Build</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={userBuilds}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <BuildCard build={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      <Modal
        visible={isEditing}
        transparent
        animationType="fade"
        onRequestClose={handleCancelEdit}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Display Name</Text>
            <TextInput
              style={styles.modalInput}
              value={newName}
              onChangeText={setNewName}
              placeholder="Enter your name"
              placeholderTextColor={theme.colors.textSecondary}
              autoFocus
              testID="name-input"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={handleCancelEdit}
                testID="cancel-button"
              >
                <X size={16} color={theme.colors.textSecondary} />
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSaveName}
                testID="save-button"
              >
                <Check size={16} color={theme.colors.secondary} />
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  profileInfo: {
    marginLeft: theme.spacing.lg,
    flex: 1,
  },
  userName: {
    color: theme.colors.text,
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
    marginBottom: 2,
  },
  userEmail: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.caption.fontSize,
    marginBottom: 4,
  },
  buildCount: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.caption.fontSize,
  },
  listContent: {
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  emptyText: {
    color: theme.colors.text,
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
    marginBottom: theme.spacing.sm,
  },
  emptySubtext: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.caption.fontSize,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.round,
  },
  buttonText: {
    color: theme.colors.secondary,
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600',
  },
  headerActions: {
    flexDirection: 'row',
    gap: theme.spacing.xs,
  },
  actionButton: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  editButton: {
    padding: theme.spacing.xs,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  modalContent: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    color: theme.colors.text,
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  modalInput: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  modalButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.xs,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  cancelButton: {
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
  },
  cancelButtonText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600',
  },
  saveButtonText: {
    color: theme.colors.secondary,
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600',
  },
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  authHeader: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl * 2,
  },
  authTitle: {
    color: theme.colors.text,
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
    textAlign: 'center',
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  authSubtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.body.fontSize,
    textAlign: 'center',
    lineHeight: 22,
  },
  authButtons: {
    width: '100%',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xl * 2,
  },
  signInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    height: 50,
  },
  signInButtonText: {
    color: theme.colors.secondary,
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600',
  },
  signUpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    height: 50,
  },
  signUpButtonText: {
    color: theme.colors.primary,
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600',
  },
  featuresContainer: {
    alignSelf: 'stretch',
  },
  featuresTitle: {
    color: theme.colors.text,
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
    marginBottom: theme.spacing.md,
  },
  featureItem: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.body.fontSize,
    marginBottom: theme.spacing.xs,
    lineHeight: 20,
  },
  debugContainer: {
    backgroundColor: theme.colors.surface,
    margin: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  debugTitle: {
    color: theme.colors.text,
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
    marginBottom: theme.spacing.md,
  },
  debugScroll: {
    maxHeight: 200,
  },
  debugText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.caption.fontSize,
    marginBottom: theme.spacing.xs,
    fontFamily: 'monospace',
  },
  debugActions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.md,
  },
  debugButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  debugButtonText: {
    color: theme.colors.text,
    fontSize: theme.typography.caption.fontSize,
    fontWeight: '600',
  },
});