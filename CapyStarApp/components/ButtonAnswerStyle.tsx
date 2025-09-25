import React from "react";
import { Pressable, Text } from "react-native";
import { ListLessonText } from "./Text/ListLessonText";

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
  const pareBoderColor = boderColor || "black";
  return (
    <Pressable
      key={idAnswer || null}
      style={{
        display: "flex",
        backgroundColor: pareColor,
        alignItems: pareAlign,
        borderColor: pareBoderColor,
        justifyContent: "center",
      }}
      className="w-full h-[75] p-3 flex flex-row gap-2 border-2 rounded-xl"
      onPress={onPress}
    >
      <ListLessonText ArrayString={content}
      onPress={onPress}
      />
    </Pressable>
  );
};

export default ButtonAnswerStyle;
