import React from "react";
import { Text } from "react-native";

type TextProps = {
  content: string;
  color: string;
};

const TitleTextStyle = ({ content, color }: TextProps) => {
  return <Text className="line-clamp-2 text-wrap font-bold" style={{ color: color }}>{content}</Text>;
};

export default TitleTextStyle;
