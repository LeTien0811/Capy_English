import { useAuthContext } from "@/utils/authContext";
import { useFetchAPI } from "@/hooks/handleFetchAPI";
import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, TextInput, View, Text, Pressable } from "react-native";
import ButtonStyle from "@/components/ButtonStyle";
import InputStyle from "@/components/InputStyle";
import HeadingTextStyle from "@/components/Text/HeadingTextStyle";
import { SafeAreaView } from "react-native-safe-area-context";

interface LearnerResponse {
  learner: any;
  topic: any;
  level: any;
  learner_profile: any;
  course: any;
  lesson_group: any;
  lesson: any;
  question_group: any;
  question_bank: any;
  learning_session: any;
  false_answer: any;
}


export default function Login() {
  const router = useRouter();
  const [isEmail, setEmail] = useState("");
  const [isPassword, setPassword] = useState("");
  const { signIn } = useAuthContext();
  useEffect(() => {
    console.log("your fields: ", isEmail, isPassword);
  }, [isEmail, isPassword]);

  const [responses, isLoadingFetch, fetchAPI] =
    useFetchAPI<LearnerResponse>("SigninLearner");

  const handleSubmit = async () => {
    const response = await fetchAPI({
      method: "POST",
      payload: { email: isEmail, password_hash: isPassword},
    });
    if (!response) {
      return Alert.alert("Không có dữ liệu từ API");
    }
    const data = {
      learner: response.learner,
      topic: response.topic,
      level: response.level,
      learner_profile: response.learner_profile,
      course: response.course,
      lesson_group: response.lesson_group,
      lesson: response.lesson,
      question_group: response.question_group,
      question_bank: response.question_bank,
      learning_session: response.learning_session,
      false_answer: response.false_answer,
    };
    if (!data) return Alert.alert("No data from API");

    const ok = await signIn(data);
    if (ok) {
      router.replace("/(protected)/(home)");
    } else {
      Alert.alert("Đăng nhập thất bại");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-yellow-100 items-center justify-center">
      <View className="w-4/5 items-center bg-white p-6 rounded-lg shadow-lg flex gap-3">
        <HeadingTextStyle content="LOGIN WITH EMAIL" color="#333" key={3} />
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

        <ButtonStyle
          content="Continue"
          color="#FF9800"
          textColor="#000"
          onPress={handleSubmit}
        />

        <Pressable
          onPress={() => {
            router.push({ pathname: "/(auth)/CreateAccount" });
          }}
        >
          <Text>Register</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
