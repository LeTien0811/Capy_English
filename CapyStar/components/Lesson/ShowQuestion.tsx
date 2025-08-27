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
    <View className="w-full h-screen bg-[#2B223E] flex gap-2 items-center justify-center" key={Lesson.QuestionID}>
      <Text className="text-5xl font-bold text-wrap color-white font-">{Lesson.Question}</Text>
      <View className="w-full p-5 flex gap-4">
        <Pressable className="border-2 h-[59] border-[#6F6C87] rounded-xl px-5 items-start flex justify-center" onPress={() => onAnswer("A")}><Text className="color-white font-bold text-xl">{Lesson.Answer_A}</Text></Pressable>
        <Pressable className="border-2 h-[59] border-[#6F6C87] rounded-xl px-5 items-start flex justify-center" onPress={() => onAnswer("B")}><Text className="color-white font-bold text-xl">{Lesson.Answer_B}</Text></Pressable>
        <Pressable className="border-2 h-[59] border-[#6F6C87] rounded-xl px-5 items-start flex justify-center" onPress={() => onAnswer("C")}><Text className="color-white font-bold text-xl">{Lesson.Answer_C}</Text></Pressable>
        <Pressable><Text>{Lesson.correctAnswer}</Text></Pressable>
      </View>
    </View>
  );
};

export default LearningLessionCart;
