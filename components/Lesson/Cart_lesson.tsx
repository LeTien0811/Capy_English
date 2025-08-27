import React from "react";
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";

type CartProps = {
  topicId: number;
  topicName: string;
};

const Cart_lesson = ({ topicId, topicName }: CartProps) => {
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
  return (
    <View
      style={style.boxWithShadow}
      className="bg-white w-full p-3 border-2 border-gray-400 rounded-xl mb-3 flex flex-row justify-between"
    >
      <Text>{topicName}</Text>
      <TouchableOpacity
        key={topicId}
        className="p-3 rounded-full border-2 border-gray-500"
        style={{ backgroundColor: "#A1D689" }}
        onPress={() => {
          const lessonData = [
            {
              QuestionID: "1",
              Question: "what is this",
              Answer_A: "what is this",
              Answer_B: "what is this",
              Answer_C: "what is this",
              correctAnswer: "B",
            },
            {
              QuestionID: "2",
              Question: "another question",
              Answer_A: "A",
              Answer_B: "B",
              Answer_C: "C",
              correctAnswer: "C",
            },
          ];
          router.push({
            pathname: "/(protected)/(home)/(lesson)/Learning",
            params: {
              lesson: JSON.stringify(lessonData),
            },
          });
        }}
      >
        <MaterialIcons name="play-arrow" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Cart_lesson;
