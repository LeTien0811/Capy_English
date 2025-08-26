import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
type CartProps = {
  topicId: number;
  topicName: string;
};

const Cart_lesson = ({ topicId, topicName }: CartProps) => {
  const style = StyleSheet.create({
    boxWithShadow: {
      shadowColor: "#000",
      shadowOffset: { width: 2, height: 1 },
      shadowOpacity: 1,
      shadowRadius: 5,
    },
  });
  return (
    <View 
    style={style.boxWithShadow}
    className="w-full p-3 border-2 shadow-xl border-gray-400 rounded-xl mb-3 flex flex-row justify-between">
      <Text>{topicName}</Text>
      <Pressable
        key={topicId}
        className="p-3 rounded-full border-2 border-gray-500"
      >
        <MaterialIcons name="play-arrow" size={24} color="black" />
      </Pressable>
    </View>
  );
};

export default Cart_lesson;
