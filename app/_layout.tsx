import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import "../global.css";

import { useColorScheme } from "@/hooks/useColorScheme";
import { useContext, useEffect } from "react";
import { View } from "react-native";
import { AuthContext, AuthProvider } from "@/utils/authContext";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    "Kanit-Medium": require("../assets/fonts/Kanit-Medium.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <View className="flex-1 font-Kanit-Medium">
          <Stack>
            <Stack.Screen name="(protected)" options={{ headerShown: false }} />
            <Stack.Screen name="authentications" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>

          <StatusBar style="auto" hidden={true} />
        </View>
      </ThemeProvider>
    </AuthProvider>
  );
}
