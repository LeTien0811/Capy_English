import { Redirect, Stack, Tabs } from 'expo-router';
import React, { useContext } from 'react';
import { Platform } from 'react-native';

import { AuthContext } from '@/utils/authContext';

export default function HomeLayout() {
 const { isLogin, isLoading } = useContext(AuthContext);
    // if(!isLogin){
    //     <Redirect href="/authentications/Login" />;
    // }
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown:false,
        }}
      />
      <Stack.Screen
        name="(lesson)"
        options={{
          title: 'Home',
          headerShown:false,
        }}
      />
    </Stack>
  );
}
