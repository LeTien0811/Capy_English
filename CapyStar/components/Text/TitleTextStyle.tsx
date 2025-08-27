import React from "react";
import { Text } from "react-native";

type TextProps = {
  content: string;
  color: string;
};

const TitleTextStyle = ({ content, color }: TextProps) => {
  return <Text className="text-wrap font-bold" style={{ color: color }}>{content}</Text>;
};

export default TitleTextStyle;
