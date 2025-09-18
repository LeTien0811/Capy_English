import { Redirect, Stack, Tabs } from 'expo-router';
import React, { useContext } from 'react';
import { Platform } from 'react-native';
import 'react-native-gesture-handler';

export default function ServicesLayout() {

  return (
    <Stack>
      <Stack.Screen
        name="RunningTest"
        options={{
          title: 'Running Test',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SubmitModal"
        options={{
          headerShown: false,
          presentation: 'modal',
          animation: "fade",
        }}
      />
    </Stack>
  );
}
