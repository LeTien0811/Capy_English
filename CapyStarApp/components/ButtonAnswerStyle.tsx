import React from "react";
import { Pressable, Text } from "react-native";

type FielButton = {
  idAnswer: string | null;
  content: string[] | null;
  color: string;
  textColor: string;
  align_items?: "flex-start" | "flex-end" | "center";
  boderColor: string | null;
  onPress: () => void;
};

const ButtonAnswerStyle = ({
  idAnswer,
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
      key={idAnswer || null}
      style={{
        backgroundColor: pareColor,
        alignItems: pareAlign,
        borderColor: pareBoderColor,
      }}
      className="h-[75] border-2 rounded-xl flex flex-row flex-wrap justify-center gap-2"
      onPress={onPress}
    >
      {content?.map((element, index) => (
        <Text key={index}  style={{ color: pareText }} className="font-bold text-xl">
          {element}
        </Text>
      ))}
    </Pressable>
  );
};

export default ButtonAnswerStyle;
