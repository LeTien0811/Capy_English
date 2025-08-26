import { Redirect, Stack, Tabs } from 'expo-router';
import React, { useContext } from 'react';
import { Platform } from 'react-native';

import { AuthContext } from '@/utils/authContext';

export default function LessonLayout() {
 const { isLogin, isLoading } = useContext(AuthContext);
    // if(!isLogin){
    //     <Redirect href="/authentications/Login" />;
    // }
  return (
    <Stack>
      <Stack.Screen
        name="Learning"
        options={{
          title: 'Learning',
          headerShown:false,
        }}
      />
    </Stack>
  );
}
