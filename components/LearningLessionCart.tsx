import { View, Text, Pressable } from "react-native";
import React from "react";

type LessonContext = {
  QuestionID: string;
  Question: string;
  Answer_A: string;
  Answer_B: string;
  Answer_C: string;
  correctAnswer: string;
};

type prop = {
    Lesson: LessonContext, 
    onAnswer: (selcted: string) => void;
}
const LearningLessionCart = ({
 Lesson, onAnswer
}: prop) => {
  return (
    <View className="w-full h-full flex gap-2 items-center justify-center" key={Lesson.QuestionID}>
      <Text>{Lesson.Question}</Text>
      <View>
        <Pressable onPress={() => onAnswer("A")}><Text>{Lesson.Answer_A}</Text></Pressable>
        <Pressable onPress={() => onAnswer("B")}><Text>{Lesson.Answer_B}</Text></Pressable>
        <Pressable onPress={() => onAnswer("C")}><Text>{Lesson.Answer_C}</Text></Pressable>
         <Pressable><Text>{Lesson.correctAnswer}</Text></Pressable>
      </View>
    </View>
  );
};

export default LearningLessionCart;
