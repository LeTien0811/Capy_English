import React, { useState } from "react";
import { Text, TextInput } from "react-native";

type InputProps = {
    content: string,
    isBorder: boolean,
}

const InputStyle = ({content, isBorder}: InputProps) => {
    const [text, setText] = useState('')
    return <TextInput
    style={{borderWidth: isBorder ? 2 : 0}}
    className="w-full outline-none px-3 h-[48] border-gray-500 rounded-xl" 
    value={text}
    onChangeText={setText}
    placeholder={content}
    />;
};

export default InputStyle;
