import { Redirect, Stack, Tabs } from 'expo-router';
import React, { useContext } from 'react';
import { Platform } from 'react-native';

import { AuthContext } from '@/utils/authContext';

export default function LessonLayout() {
  
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Lesson',
          headerShown:false,
        }}
      />
      
    </Stack>
  );
}
