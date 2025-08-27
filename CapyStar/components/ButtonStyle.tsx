import React from "react";
import { Pressable, Text } from "react-native";

type FielButton = {
  content: string;
  color: string;
  textColor: string;
  onPress: () => void;
};

const ButtonStyle = ({ content, color, textColor, onPress }: FielButton) => {
  const pareColor = color || "#F15D41";
  const pareText = textColor === "" ? "#F1F1F1" : textColor;
  return (
    <Pressable
       style={{ backgroundColor: pareColor }}
      className="h-[48] px-20 border-2 rounded-xl flex items-center justify-center" 
      onPress={onPress}>
      <Text 
      style={{ color: pareText }}
       className= "font-bold">{content}</Text>
    </Pressable>
  );
};

export default ButtonStyle;
