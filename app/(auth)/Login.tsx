import ButtonStyle from "@/components/ButtonStyle";
import InputStyle from "@/components/InputStyle";
import HeadingTextStyle from "@/components/Text/HeadingTextStyle";
import React, { useContext } from "react";
import { Text, View, StyleSheet, TextInput, Pressable } from "react-native";
import { AuthContext } from "@/utils/authContext";

export default function Login() {
  const authContext = useContext(AuthContext);
  const handleLogin = async () => {
    const fakeToken = "a-fake-auth-token-12345";
    authContext.signIn(fakeToken);
  };
  return (
    <View className="bg-white w-screen h-full flex items-center justify-center p-4">
      <HeadingTextStyle content="Capy Star" color="#FFEDC4" />

      <View className="w-full flex gap-2">
        <Text className="font-bold text-xl">Email</Text>
        <InputStyle content="" isBorder={true} />

        <ButtonStyle
          content="Continue"
          color=""
          textColor=""
          onPress={handleLogin}
        />
        <View className="w-full flex flex-row items-center justify-between">
          <View className="flex-1 h-px bg-gray-300 mx-2" />
          <Text className="text-gray-500 text-sm font-normal">or</Text>
          <View className="flex-1 h-px bg-gray-300 mx-2" />
        </View>
        <ButtonStyle
          content="Continue With Google"
          color="#F1F1F1"
          textColor="#000000"
        />
        <ButtonStyle
          content="Continue With Facebook"
          color="#F1F1F1"
          textColor="#000000"
        />
      </View>
    </View>
  );
}
