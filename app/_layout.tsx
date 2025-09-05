import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BuildsProvider } from "@/hooks/builds-context";
import { AuthProvider } from "@/hooks/auth-context";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  return (
    <Stack 
      screenOptions={{ 
        headerBackTitle: "Back",
        headerStyle: {
          backgroundColor: '#0a0a0a',
        },
        headerTintColor: '#FFD700',
        contentStyle: {
          backgroundColor: '#0a0a0a',
        }
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="build/[id]" 
        options={{ 
          title: "Build Details",
          presentation: 'card'
        }} 
      />
      <Stack.Screen 
        name="custom-build" 
        options={{ 
          title: "Create Build",
          presentation: 'modal'
        }} 
      />
      <Stack.Screen 
        name="login" 
        options={{ 
          headerShown: false,
          presentation: 'modal'
        }} 
      />
      <Stack.Screen 
        name="register" 
        options={{ 
          headerShown: false,
          presentation: 'modal'
        }} 
      />
    </Stack>
  );
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BuildsProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <RootLayoutNav />
          </GestureHandlerRootView>
        </BuildsProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}