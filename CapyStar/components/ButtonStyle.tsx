import React from "react";
import { Pressable, Text } from "react-native";

type FielButton = {
  content: string;
  color: string;
  textColor: string;
  align_items?: "flex-start" | "flex-end" | "center";
  onPress: () => void;
};
const mapAlign= [
  {"flex-start": "flex-start"},
  {"flex-end": "flex-start"},
  {"center": "center"}
]
const ButtonStyle = ({ content, color, textColor, align_items, onPress }: FielButton) => {
  const pareColor = color || "#F15D41";
  const pareText = textColor === "" ? "#F1F1F1" : textColor;
  const pareAlign = align_items ? mapAlign[align_items] : "center"
  return (
    <Pressable
       style={{ backgroundColor: pareColor, alignItems: pareAlign }}
      className="h-[59] px-5 border-2 rounded-xl flex justify-center" 
      onPress={onPress}>
      <Text 
      style={{ color: pareText }}
       className= "font-bold">{content}</Text>
    </Pressable>
  );
};

export default ButtonStyle;
