import React from "react";
import { Text, View } from "react-native";

type TextProps = {
  content: string;
  color?: string;
};

const HeadingTextStyle = ({ content, color }: TextProps) => {

  return (
      <Text
        className={`font-bold text-5xl text-shadow-lg`}
      >
        {content}
      </Text>
  );
};

export default HeadingTextStyle;
