import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import "../global.css";

import { AuthProvider } from "@/utils/authContext";
import { DatabaseProvider } from "@/utils/handleLocalStoredContext";
import { View } from "react-native";
import { PressToTranslateProvider } from "@/utils/PressToTranslateContext";

export const unstable_settings = {
  initialRouteName: "(protected)",
};

export default function RootLayout() {
  return (
    <DatabaseProvider>
      <AuthProvider>
        <PressToTranslateProvider>
          <Stack>
            <Stack.Screen
              name="(protected)"
              options={{
                headerShown: false,
                presentation: "card",
              }}
            />
            <Stack.Screen
              name="(services)"
              options={{
                title: "Running Test",
                headerShown: false,
                presentation: "card",
              }}
            />
            <Stack.Screen
              name="(auth)"
              options={{
                headerShown: false,
                presentation: "card",
              }}
            />
            <Stack.Screen
              name="stackModal"
              options={{
                presentation: "modal",
                headerShown: false,
                animation: "fade",
              }}
            />
          </Stack>
          <StatusBar style="auto" hidden={false} />
        </PressToTranslateProvider>
      </AuthProvider>
    </DatabaseProvider>
  );
}
