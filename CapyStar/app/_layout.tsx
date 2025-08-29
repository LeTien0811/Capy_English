import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import "../global.css";

import { useContext, useEffect } from "react";
import { View } from "react-native";
import { AuthContext, AuthProvider } from "@/utils/authContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <View className="flex-1">
        <Stack>
          <Stack.Screen name="(protected)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{
              presentation: "modal",
            }}
          />
         <Stack.Screen
        name="(services)"
        options={{
          title: 'Running Test',
          headerShown:false,
        }}
      />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack>

        <StatusBar style="auto" />
      </View>
    </AuthProvider>
  );
}
