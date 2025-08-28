import ButtonStyle from "@/components/ButtonStyle";
import LearningLessionCart from "@/components/Lesson/ShowQuestion";
import ShowResult from "@/components/Lesson/ShowResult";
import useHandleQuiz from "@/hooks/handleQuiz";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Learning() {
  const { lesson } = useLocalSearchParams();

  const {
    isQuizFinished,
    isLoading,
    isQuestion,
    isCurrentQuestion,
    isScore,
    isResult,
    isAnswered,
    isSelectAnswer,
    handleSelected,
    handleNextStep,
  } = useHandleQuiz(lesson);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Đang tải câu hỏi...</Text>
      </View>
    );
  }

  if (!isQuizFinished && isQuestion && isQuestion.length > 0) {
    return (
      <SafeAreaView className="w-fulls h-full">
        <View className="w-full h-full bg-[#2B223E] items-center flex gap-4 justify-center">
          <LearningLessionCart
            Lesson={isQuestion[isCurrentQuestion]}
            isScore={isScore}
            isAnswered={isAnswered}
            isSelectAnswer={isSelectAnswer}
            onAnswer={handleSelected}
          />
          <ButtonStyle
            content="Tiếp Tục"
            color="white"
            textColor="Black"
            align_items="center"
            onPress={handleNextStep}
          />
        </View>
      </SafeAreaView>
    );
  }

  if (isQuizFinished && isResult) {
    return (
      <SafeAreaView className="w-full h-full">
        <View className="w-full h-full items-center flex justify-center">
          <ShowResult isResult={isResult} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View className="flex-1 justify-center items-center">
      <Text>Không có câu hỏi nào được tìm thấy.</Text>
    </View>
  );
}
