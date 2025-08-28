import { View, Text, Pressable } from "react-native";
import React from "react";
import ButtonStyle from "../ButtonStyle";
import { AnswerObject, LessonContext } from "@/libs/type";
import ButtonAnswerStyle from "../ButtonAnswerStyle";

type prop = {
  Lesson: LessonContext;
  isScore: number;
  isAnswered: boolean;
  isSelectAnswer: string | null;
  onAnswer: (selected: string) => void;
};
const LearningLessionCart = ({
  Lesson,
  isScore,
  isAnswered,
  isSelectAnswer,
  onAnswer,
}: prop) => {
  if (!Lesson || !Lesson.Answer) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Đang tải câu hỏi...</Text>
      </View>
    );
  }

  return (
    <View
      className="w-full flex gap-2 items-center justify-center"
      key={Lesson.QuestionID}
    >
      <Text className="text-5xl font-bold text-wrap color-white font-">
        {Lesson.Question}
      </Text>
      <View className="w-full p-5 flex gap-4">
        {Lesson.Answer.map((answer: AnswerObject) => {
          let backgroundButton = "white";
          let textColor = "black";
          if (isAnswered) {
            if (answer.AnswerId === isSelectAnswer) {
              if (isSelectAnswer === Lesson.correctAnswer) {
                backgroundButton = "green";
                textColor = "white";
              } else {
                backgroundButton = "red";
                textColor = "white";
              }
            }
          }
          return (
            <ButtonAnswerStyle
              key={answer.AnswerId}
              content={answer.Answer}
              color={backgroundButton}
              align_items="flex-start"
              textColor={textColor}
              onPress={() => onAnswer(answer.AnswerId)}
            />
          );
        })}
        <Pressable>
          <Text>{Lesson.correctAnswer}</Text>
        </Pressable>
      </View>
      <Text>Điểm số: {isScore}</Text>
    </View>
  );
};

export default LearningLessionCart;
