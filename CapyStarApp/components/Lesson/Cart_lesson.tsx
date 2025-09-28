import React, { useEffect, useState } from "react";
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import useMapQuestions from "@/hooks/handleMapQuestions";
import {
  beforeQuestion,
  Lesson_Group,
  Lessons,
  QuestionContext,
  topicContext,
} from "@/libs/type";
import { useDatabase } from "@/utils/handleLocalStoredContext";

type CartLessonProps = {
  LessonGroup: Lesson_Group;
  Lesson: Lessons[];
};

const Cart_lesson: React.FC<CartLessonProps> = ({ LessonGroup, Lesson }) => {
  const router = useRouter();
  const style = StyleSheet.create({
    boxWithShadow: {
      ...Platform.select({
        ios: {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 5,
        },
        android: {
          elevation: 7,
        },
      }),
    },
  });
  const map = [
    {
      left: "70%",
      top: "17%",
      icon: "https://img.icons8.com/?size=100&id=9yi0ap13nwJM&format=png&color=000000",
    },
    {
      left: "40%",
      top: "34%",
      icon: "https://img.icons8.com/?size=100&id=71733&format=png&color=000000",
    },
    {
      left: "67%",
      top: "49%",
      icon: "https://img.icons8.com/?size=100&id=81083&format=png&color=000000",
    },
    {
      left: "90%",
      top: "66%",
      icon: "https://img.icons8.com/?size=100&id=81214&format=png&color=000000",
    },
    {
      left: "70%",
      top: "83%",
      icon: "https://img.icons8.com/?size=100&id=sGeHnSchL0fu&format=png&color=000000",
    },
  ];
  
  const PressInLesson = async(idLesson: number) => {
      router.push({pathname: "/(services)/RunningTest", 
        params: {id_Lesson: idLesson.toString()}});
  }
  
  return (
    <View className="flex-1 h-[86vh] rounded-xl mb-3 flex flex-col justify-between">
      <View
        style={style.boxWithShadow}
        className="w-full flex flex-row justify-between bg-[#A1D689] border-[1px] p-5 border-gray-600"
      >
        <View className="">
          <Text className="text-white font-semibold text-xl">
            {LessonGroup.title}
          </Text>
          <Text className="text-white font-normal text-xl">
            {LessonGroup.description}
          </Text>
        </View>
        <View className="border-2 border-gray-500 rounded-xl w-[50px] h-[50px]   flex items-center justify-center">
          <Image
            source={{
              uri: "https://img.icons8.com/?size=100&id=58710&format=png&color=FFFFFF",
            }}
            className="w-8 h-8"
          />
        </View>
      </View>
      <View className="relative h-full">
        {Lesson.map((item, index) => (
          <TouchableOpacity
            key={item.id_lessons}
            onPress={() => PressInLesson(item.id_lessons)}
            className="w-[100] h-[100] bg-gray-500 rounded-full flex items-center justify-center absolute"
            style={{
              top: map[index].top as `${number}%`,
              left: map[index].left as `${number}%`,
              backgroundColor: item.completion ? "#F2FFEC" : "#FFD372",
              transform: [{ translateX: -100 }, { translateY: -100 }],
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 5,
              elevation: 7,
            }}
          >
            <Text className="text-white">
              <Image source={{ uri: map[index].icon }}        className="w-10 h-10" />
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Cart_lesson;
