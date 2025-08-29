import { Redirect, Tabs } from 'expo-router';
import React, { useContext } from 'react';
import { Platform } from 'react-native';

import { AuthContext } from '@/utils/authContext';

export default function ProtectedLayout() {
 const { isLogin, isLoading } = useContext(AuthContext);
    if(!isLogin){
      return <Redirect href="/(auth)" />;
    }

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'home',
          headerShown:false,
        }}
      />
      <Tabs.Screen
        name="(lesson)"
        options={{
          title: 'lesson',
          headerShown:false,
        }}
      />
    </Tabs>
  );
}
