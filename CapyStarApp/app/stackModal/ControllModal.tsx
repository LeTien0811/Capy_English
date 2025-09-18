import { View, Text, Pressable, Platform } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const Modal = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="w-full bg-white h-full items-center flex justify-center">
      <View className="mb-4">
        <Text className="text-3xl font-extrabold text-[#333]">
          CAPY ENGLISH
        </Text>
      </View>
      <View className="items-center flex gap-4">
        <Pressable className="px-4  bg-[#333] items-center border-2 border-gray-400 h-[42] flex justify-center rounded-lg" 
        onPress={() => router.push({ pathname: "/(auth)/CreateAccount" })}>
          <Text className="text-white font-bold">Bắt Đầu Tạo Tài Khoản </Text>
        </Pressable>
        <Text className="underline font-bold text-xl ">Hoặc</Text>
        <Pressable className="px-4  bg-[#333] items-center border-2 border-gray-400 h-[42] flex justify-center rounded-lg"
        onPress={() => router.push({pathname: "/stackModal/ModalInputName"})}
        >
          <Text className="text-white font-bold">Học Ngay Bây Giờ</Text>
        </Pressable>
        <Pressable  onPress={() => router.back()}>
          <Text className="underline font-bold text-xl">Đóng</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Modal;
