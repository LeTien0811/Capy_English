import ButtonStyle from "@/components/ButtonStyle";
import LearningLessionCart from "@/components/Lesson/ShowQuestion";
import ShowResult from "@/components/Lesson/ShowResult";
import useFetchAPI from "@/hooks/handleFetchAPI";
import useMapQuestions from "@/hooks/handleMapQuestions";
import useHandleQuiz from "@/hooks/handleQuiz";
import { beforeQuestion, QuestionContext } from "@/libs/type";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RunningTest() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [Lesson, setLesson] = useState<QuestionContext[]>([]);
  const [Data, isLoadingData] = useFetchAPI<beforeQuestion[]>(
    "VocabularyQuestions/",
    `topic=${id}`
  );
  const [isLoadingMap, setLoadingMap] = useState(true);
  useEffect(() => {
    if (Data && Array.isArray(Data) && !isLoadingData) {
      const MapQuestion = Data.map(useMapQuestions);
      setLesson(MapQuestion);
    }
  }, [id, isLoadingData]);
  const useHook = useHandleQuiz(Lesson);
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
    } = useHook;

  if (isLoadingData) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Đang tải câu hỏi...</Text>
      </View>
    );
  }
  if (!isQuizFinished && isQuestion && !isLoading && isQuestion.length > 0) {
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

  if (isQuizFinished && isResult && !isLoading) {
    return (
      <SafeAreaView className="w-full h-full items-center bg-[#2B223E] flex justify-center">
        <View className="w-full items-center flex justify-center">
          <ShowResult isResult={isResult} />
        </View>
        <ButtonStyle
          content="exit!"
          color=""
          textColor="white"
          align_items="center"
          key={null}
          onPress={() => router.back()}
        />
      </SafeAreaView>
    );
  }
}
