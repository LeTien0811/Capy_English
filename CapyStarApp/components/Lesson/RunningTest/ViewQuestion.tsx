import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { ListLessonText } from "@/components/Text/ListLessonText";
import { Ionicons } from "@expo/vector-icons";
interface ViewQuestionType {
  questionType: string | null;
  question: string[] | null;
  isSpeaking: boolean;
  RunSpeak: () => void;
}
const ViewQuestion = ({
  question,
  questionType,
  isSpeaking,
  RunSpeak,
}: ViewQuestionType) => {
  return (
    <View className="w-full flex gap-3">
      <Text className="font-bold text-2xl">Chọn Câu Trả Lời Đúng</Text>
      <View className="flex flex-row gap-3">
        {questionType === "listening" ? (
          <Image
            source={require("@/assets/images/ImageMemeQuestion/singing_mickey-removebg.png")}
            className="w-36 h-36 object-fit"
          />
        ) : (
          <Image
            source={require("@/assets/images/ImageMemeQuestion/meomeow_bro-removebg.png")}
            className="w-36 h-36 object-fit"
          />
        )}

        <View className="border-2 rounded-xl flex-1 max-w-full flex flex-col  flex-wrap gap-1 p-2">
          {questionType === "listening" && (
            <Pressable
              onPress={RunSpeak}
              className="border-2 w-10 items-center rounded-xl border-green-600"
            >
              <Ionicons name="volume-medium" size={25} color="green" />
            </Pressable>
          )}

          <View className="flex-1 max-w-full flex flex-row  flex-wrap gap-1">
            <ListLessonText ArrayString={question} onPress={() => null} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ViewQuestion;
