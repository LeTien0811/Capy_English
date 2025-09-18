import { LoadingScreen } from "@/components/loadingScreen";
import { useAuthContext } from "@/utils/authContext";
import { useDatabase } from "@/utils/handleLocalStoredContext";
import { Redirect, Tabs, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Platform } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function ProtectedLayout() {
  const router = useRouter();
  const { Learner, isAuthLoading } = useAuthContext();
  const { isDbLoading } = useDatabase();
  useEffect(() => {
    console.log("🔄 Layout state:", { isDbLoading, isAuthLoading, Learner });
    if (!isAuthLoading && !isDbLoading) {
    if (!Learner || !Learner.id_learners) {
      router.replace('/(auth)');
    } else {
      router.replace('/(protected)/(home)');
    }
  }
  }, [isAuthLoading, isDbLoading]);

  if (isDbLoading || isAuthLoading) return <LoadingScreen />;

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: Platform.select({
          ios: { position: "absolute" },
          default: {},
        }),
        tabBarActiveTintColor: '#343b6e', 
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen name="(lesson)" options={{
          headerShown: false,
          title: "Course",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "book" : "book-outline"}
              size={24}
              color={color}
            />
          ),
        }} />
    </Tabs>
  );
}
