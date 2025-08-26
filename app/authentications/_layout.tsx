import { AuthContext } from "@/utils/authContext";
import { isLoading } from "expo-font";
import { Redirect, Stack } from "expo-router";
import React, { useContext } from "react";

export default function _layout() {
  const {isLogin, isLoading} = useContext(AuthContext)
  if(isLoading){
    return null;
  }

  if(isLogin){
    return <Redirect href="/" />
  }
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }}  />
      <Stack.Screen name="CreateAccount"  options={{ headerShown: false }} />
    </Stack>
  );
}

