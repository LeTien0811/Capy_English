import React, { useState } from "react";
import { Text, TextInput } from "react-native";

type InputProps = {
  content: string;
  isBorder: boolean;
  setText: (text: string) => void;
  security: boolean;
};

const InputStyle = ({ content, isBorder, setText, security }: InputProps) => {
  return (!security ? (
      <TextInput
        style={{ borderWidth: isBorder ? 2 : 0 }}
        className="w-full outline-none px-3 h-[48] border-gray-500 rounded-xl"
        onChangeText={setText}
        placeholder={content}
      />
    ) : (
      <TextInput
        style={{ borderWidth: isBorder ? 2 : 0 }}
        className="w-full outline-none px-3 h-[48] border-gray-500 rounded-xl"
        onChangeText={setText}
        placeholder={content}
        secureTextEntry
      />
    ));
  
};

export default InputStyle;
