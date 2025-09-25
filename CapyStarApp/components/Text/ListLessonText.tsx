import { View, Text, Pressable } from "react-native";
import React from "react";
import { useTranslateTextToAPI } from "@/utils/PressToTranslateContext";
type ListLessonTextProps = {
  ArrayString: string[] | null;
  onPress: () => void | null;
};
export const ListLessonText = ({
  ArrayString,
  onPress,
}: ListLessonTextProps) => {
  const { isHandingTranslate, resultTranslate, isHandleTranslate } =
    useTranslateTextToAPI();

  return ArrayString != null ? (
    ArrayString.map((element, index) => (
      <Pressable
        key={index}
        onLongPress={() => isHandleTranslate(element)}
        delayLongPress={500}
      >
        <Text className=" text-xl font-bold" suppressHighlighting={true}>
          {element}
        </Text>
      </Pressable>
    ))
  ) : (
    <View>
      <Text>Rỗng</Text>
    </View>
  );
};
