import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import LearningLessionCart from "@/components/LearningLessionCart";

type LessonContext = {
  QuestionID: string;
  Question: string;
  Answer_A: string;
  Answer_B: string;
  Answer_C: string;
  correctAnswer: string;
};

type UserLessonContext = {
  QuestionID: string;
  Question: string;
  Answer_A: string;
  Answer_B: string;
  Answer_C: string;
  correctAnswer: string;
  SelectANswer: string;
};

export default function Learning() {
  const router = useRouter();
  const [isCurrentQuestion, setIsCurrentQuestion] = useState(0);
  const [isUserSelectAnswer, setIsUserSelectAnswer] = useState<UserLessonContext[]>([]);
  const [isScore, setIsScore] = useState(0);
  const [isQuestion, setIsQuestion] = useState<any[]>([]);
  const { lesson } = useLocalSearchParams();

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
      }
    } else {
      console.log("lesson param is not a string", lesson);
    }
  }, [lesson]);

  const isQuestionLength = isQuestion.length;

  const handleAnswer = (selected: string) => {
    if (isQuestion[isCurrentQuestion] === selected) {
      setIsScore(prev => prev + (isQuestionLength / 10));
    } else {
      const NewUserAnswer: UserLessonContext = {
        QuestionID: isQuestion[isCurrentQuestion].QuestionID,
        Question: isQuestion[isCurrentQuestion].Question,
        Answer_A: isQuestion[isCurrentQuestion].Answer_A,
        Answer_B: isQuestion[isCurrentQuestion].Answer_A,
        Answer_C: isQuestion[isCurrentQuestion].Answer_A,
        correctAnswer: isQuestion[isCurrentQuestion].Answer_A,
        SelectANswer: selected
      };
      setIsUserSelectAnswer(prev => [...prev, NewUserAnswer]);
    }
  }

  if (isQuestionLength > 0) {
    return (
      <SafeAreaView className="w-full h-full">
        <View className="w-full h-full items-center flex justify-center">
          {isQuestionLength > 0 && (
            <LearningLessionCart
              Lesson={isQuestion[isCurrentQuestion]}
              onAnswer={handleAnswer}
            />
          )}
        </View>
      </SafeAreaView>
    );
  } else {
    return null;
  }
}
