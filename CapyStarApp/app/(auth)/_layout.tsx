import { isLoading } from "expo-font";
import { Redirect, Stack } from "expo-router";
import React, { useContext } from "react";

export default function _layout() {

    return (
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="Login" options={{ headerShown: false }} />
        <Stack.Screen name="CreateAccount" options={{ headerShown: false }} />
      </Stack>
    );
  
}
