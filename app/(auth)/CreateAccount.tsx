import { useRouter } from "expo-router";
import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function CreateAccount() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-yellow-100 items-center justify-center"> {/* Thay đổi ở đây */}
      <View className="w-4/5 items-center bg-white p-6 rounded-lg shadow-lg"> {/* Thêm nền trắng cho phần nội dung và bo góc, đổ bóng */}
        {/* Title */}
        <View className="py-5 mb-4"> {/* Giảm padding top/bottom và margin bottom */}
          <Text className="text-3xl font-extrabold text-[#333]">
            Crossing Knowledge
          </Text>
        </View>

        {/* Sign up with Google Button */}
        <TouchableOpacity className="flex-row items-center justify-center bg-white p-3 rounded-md border border-gray-300 w-full shadow-sm mb-4"> {/* Thêm margin bottom */}
          <Image
            source={{ uri: 'https://img.icons8.com/color/48/000000/google-logo.png' }}
            className="w-6 h-6 mr-3"
          />
          <Text className="text-base font-bold text-gray-700">Sign up with Google</Text>
        </TouchableOpacity>

        {/* Separator */}
        <Text className="my-5 text-sm text-gray-500">or sign up with email</Text>

        {/* Input Fields */}
        <TextInput
          className="w-full p-4 border border-gray-300 rounded-lg mb-4 text-base text-gray-700"
          placeholder="Parent's Name"
          placeholderTextColor="#999"
        />
        <TextInput
          className="w-full p-4 border border-gray-300 rounded-lg mb-4 text-base text-gray-700"
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor="#999"
        />
        {/* Password input with eye icon */}
        <View className="w-full relative mb-4">
          <TextInput
            className="w-full p-4 border border-gray-300 rounded-lg text-base text-gray-700 pr-12"
            placeholder="6+ characters"
            secureTextEntry={true}
            placeholderTextColor="#999"
          />
          <TouchableOpacity className="absolute right-4 top-1/2 -translate-y-3">
            <Image
              source={{ uri: 'https://img.icons8.com/material-outlined/24/000000/visible.png' }}
              className="w-6 h-6"
            />
          </TouchableOpacity>
        </View>

        {/* Terms and Policy */}
        <Text className="text-xs text-center mt-2 mb-5 text-gray-500">
          By continuing, you agree with Crossing Knowledge's{" "}
          <Text className="text-blue-600 underline" onPress={() => console.log('Go to Terms of Service')}>Terms of Service</Text> and <Text className="text-blue-600 underline" onPress={() => console.log('Go to Privacy Policy')}>Privacy Policy</Text>.
        </Text>

        {/* Create Account Button */}
        <TouchableOpacity className="w-full p-4 bg-[#ff6347] rounded-lg items-center shadow-md mb-4"> {/* Thêm margin bottom */}
          <Text className="text-white text-lg font-bold">Create Account</Text>
        </TouchableOpacity>

        {/* Sign In Link */}
        <View className="flex-row"> {/* Bỏ margin top nếu bạn muốn nó gần nút hơn */}
          <Text className="text-sm text-gray-500 mr-1">Already have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/Login")}>
            <Text className="text-sm text-blue-600 font-bold">Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}