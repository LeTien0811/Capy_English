import ButtonStyle from "@/components/ButtonStyle";
import InputStyle from "@/components/InputStyle";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function CreateAccount() {
  const router = useRouter();
  const [isEmail, setEmail] = useState("");
  const [isPassword, setPassword] = useState("");
  return (
    <SafeAreaView className="flex-1 bg-yellow-100 items-center justify-center">
      <View className="w-4/5 items-center bg-white p-6 rounded-lg shadow-lg flex gap-3">
        <View className="py-5">
          <Text className="text-3xl font-extrabold text-[#333]">
            CAPY ENGLISH
          </Text>
        </View>

        <TouchableOpacity className="flex-row items-center justify-center bg-white p-3 rounded-md border border-gray-300 w-full shadow-sm mb-4">
          <Image
            source={{
              uri: "https://img.icons8.com/color/48/000000/google-logo.png",
            }}
            className="w-6 h-6 mr-3"
          />
          <Text>SignIn With Google</Text>
        </TouchableOpacity>

        <View className="w-full flex gap-2">
          <Text className="px-3">Name</Text>
          <InputStyle
            content="Name"
            isBorder={true}
            setText={setEmail}
            key={1}
            security={false}
          />
        </View>

        <View className="w-full flex gap-2">
          <Text className="px-3">Email</Text>
          <InputStyle
            content="Your Email"
            isBorder={true}
            setText={setEmail}
            key={1}
            security={false}
          />
        </View>

        <View className="w-full flex gap-2">
          <Text className="px-3">Password</Text>
          <InputStyle
            content="Your Password"
            isBorder={true}
            setText={setPassword}
            key={2}
            security={true}
          />
        </View>

        <View className="w-full">
          <ButtonStyle
            content="Create"
            color="#FF9800"
            textColor="#000"
            onPress={null}
          />
        </View>
        
        <View className="w-full items-center flex justify-center flex-row gap-1">
          <Text>
            Have a Account 
          </Text>
          <Pressable
          onPress={() => {router.push({pathname: "/(auth)/Login"})}}
          >
            <Text className="text-blue-600 font-bold">Login</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
