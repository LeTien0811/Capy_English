import React, { useEffect, useState } from "react";
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
import useFetchAPI from "@/hooks/handleFetchAPI";
import useMapQuestions from "@/hooks/handleMapQuestions";
import { beforeQuestion, QuestionContext, topicContext } from "@/libs/type";

const Cart_lesson = ({ id, name }: topicContext) => {
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
      <Text>{name}</Text>
      <TouchableOpacity
        key={id}
        className="p-3 rounded-full border-2 border-gray-500"
        style={{ backgroundColor: "#A1D689" }}
        onPress={() => router.push({pathname:"/RunningTest", params:{id: id.toString()},})}
      >
        <MaterialIcons name="play-arrow" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Cart_lesson;
