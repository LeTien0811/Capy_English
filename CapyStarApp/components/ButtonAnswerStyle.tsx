import React from "react";
import { Pressable, Text } from "react-native";

type FielButton = {
  key: string;
  content: string | null;
  color: string;
  textColor: string;
  align_items?: "flex-start" | "flex-end" | "center";
  boderColor: string | null;
  onPress: () => void;
};

const ButtonAnswerStyle = ({
  key,
  content,
  color,
  textColor,
  align_items,
  boderColor,
  onPress,
}: FielButton) => {
  const pareColor = color || "#F15D41";
  const pareText = textColor === "" ? "#F1F1F1" : textColor;
  const pareAlign = align_items || "center";
  const pareBoderColor = boderColor || "#7C63AB";
  return (
    <Pressable
      key={key}
      style={{ backgroundColor: pareColor, alignItems: pareAlign, borderColor: pareBoderColor }}
      className="h-[75] px-5 border-2 rounded-xl flex justify-center"
      onPress={onPress}
    >
      <Text style={{ color: pareText }} className="font-bold text-xl">
        {content}
      </Text>
    </Pressable>
  );
};

export default ButtonAnswerStyle;
