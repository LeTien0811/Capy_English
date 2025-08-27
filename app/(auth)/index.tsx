import ButtonStyle from "@/components/ButtonStyle";
import HeadingTextStyle from "@/components/Text/HeadingTextStyle";
import TitleTextStyle from "@/components/Text/TitleTextStyle";
import { useRouter } from "expo-router";
import React from "react";
import { ImageBackground, Pressable, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BackgroundImage = require("@/assets/images/backgroundWelcomeScreen.png");

export default function WelcomeScreen() {
    const router = useRouter()
  return (
    <ImageBackground
      source={BackgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView className="w-full h-full items-center relative flex gap-10 justify-center text-center">
        <Pressable className="absolute top-10 right-10"
        onPress={() => router.push("/(auth)/Login")}>
            <Text className="text-xl font-bold text-white">Sigin Now</Text>
        </Pressable>
        <HeadingTextStyle
            content= "WelCome To Capy Start"
            color="white"
        />
        <TitleTextStyle
        content="Learning English So Easy"
        color="white"
        />
        <ButtonStyle 
        content="Get Started"
        color="green"
        textColor="white"
        onPress={() => router.push("/(auth)/CreateAccount")}
        />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
