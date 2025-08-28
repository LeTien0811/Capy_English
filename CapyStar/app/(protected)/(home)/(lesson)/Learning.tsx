
import LearningLessionCart from "@/components/Lesson/ShowQuestion";
import ShowResult from "@/components/Lesson/ShowResult";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type LessonContext = {
  QuestionID: string;
  Question: string;
  Answer_A: string;
  Answer_B: string;
  Answer_C: string;
  Answer_D: string;
  correctAnswer: string;
};

type UserLessonContext = {
  QuestionID: string;
  Question: string;
  Answer_A: string;
  Answer_B: string;
  Answer_C: string;
  Answer_D: string;
  correctAnswer: string;
  SelectAnswer: string;
};

type Result = {
  numberOfQuestion: number;
  score: number;
};

export default function Learning() {
  const router = useRouter();
  const { lesson } = useLocalSearchParams();

  const [isCurrentQuestion, setIsCurrentQuestion] = useState(0);
  const [isUserSelectAnswer, setIsUserSelectAnswer] = useState<
    UserLessonContext[]
  >([]);
  const [isScore, setIsScore] = useState(0);
  const [isQuestion, setIsQuestion] = useState<any[]>([]);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isResult, setResult] = useState<Result>();

  useEffect(() => {
    if (typeof lesson === "string") {
      try {
        const parsedLesson: LessonContext[] = JSON.parse(lesson);
        if (parsedLesson.length > 0) {
          setIsQuestion(parsedLesson);
        } else {
          router.back();
        }
      } catch (e) {
        console.log("Invalid JSON in lesson param", e);
        router.back();
      }
    } else {
      console.log("lesson param is not a string", lesson);
      router.back();
    }
    setIsLoading(false);
  }, [lesson]);

  const handleAnswer = (selected: string) => {
    const currentQuestion = isQuestion[isCurrentQuestion];
    if (!currentQuestion) return;
    const isCorrect = selected === currentQuestion.correctAnswer;
    if (isCorrect) {
      setIsScore((prevScore) => prevScore +  (10/isQuestion.length));
    }

    const NewUserAnswer: UserLessonContext = {
      QuestionID: currentQuestion.QuestionID,
      Question: currentQuestion.Question,
      Answer_A: currentQuestion.Answer_A,
      Answer_B: currentQuestion.Answer_B,
      Answer_C: currentQuestion.Answer_C,
      Answer_D: currentQuestion.Answer_D,
      correctAnswer: currentQuestion.correctAnswer,
      SelectAnswer: selected,
    };
    setIsUserSelectAnswer((prev) => [...prev, NewUserAnswer]);

    const nexStep = isCurrentQuestion + 1;
    if (nexStep < isQuestion.length) {
      setIsCurrentQuestion((prev) => (prev = nexStep));
    } else {
      setIsQuizFinished(true);
      const newRessul: Result = {
        numberOfQuestion: isQuestion.length,
        score: isScore,
      };
      setResult(newRessul);
    }
    setIsLoading(false);
  };

  if (!isQuizFinished && !isLoading) {
    return (
      <SafeAreaView className="w-fulls h-full">
        <View className="w-full h-full items-center flex justify-center">
          <LearningLessionCart
            Lesson={isQuestion[isCurrentQuestion]}
            onAnswer={handleAnswer}
          />
        </View>
      </SafeAreaView>
    );
  } else if (isQuizFinished && !isLoading) {
    return (
      <SafeAreaView className="w-full h-full">
        <View className="w-full h-full items-center flex justify-center">
        {isResult && <ShowResult isResult={isResult} />}
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Đang tải câu hỏi...</Text>
      </View>
    );
  }
}
