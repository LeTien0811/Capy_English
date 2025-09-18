import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";

import { useContext, useEffect } from "react";
import { View } from "react-native";

export const unstable_settings = {
  initialRouteName: "(protected)",
};

export default function ModalLayout() {
  return (
    
      <View className="flex-1">
        <Stack>
          <Stack.Screen
            name="ControllModal"
            options={{
              headerShown: false,
              presentation: "modal",
              animation: "fade",
            }}
          />
          <Stack.Screen
            name="ModalInputName"
            options={{
              headerShown: false,
              presentation: "transparentModal",
              animation: "fade",
            }}
          />
        </Stack>
        <StatusBar style="auto" hidden={false} />
      </View>

  );
}
