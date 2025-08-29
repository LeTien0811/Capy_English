import { Redirect, Stack, Tabs } from 'expo-router';
import React, { useContext } from 'react';
import { Platform } from 'react-native';

import { AuthContext } from '@/utils/authContext';

export default function ServicesLayout() {
//  const { isLogin, isLoading } = useContext(AuthContext);
//     if(!isLogin){
//         <Redirect href="/(auth)/Login" />;
//     }
  return (
    <Stack>
      <Stack.Screen
        name="RunningTest"
        options={{
          title: 'Running Test',
          headerShown:false,
        }}
      />
    </Stack>
  );
}
