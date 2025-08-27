import React from "react";
import { Text, View } from "react-native";

type TextProps = {
  content: string;
  color?: string;
};

const HeadingTextStyle = ({ content, color }: TextProps) => {

  return (
      <Text
        style={{color: color}}
        className={`font-bold text-5xl text-shadow-lg text-center`}
      >
        {content}
      </Text>
  );
};

export default HeadingTextStyle;
