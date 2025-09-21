import { View, Text, Pressable, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import ButtonStyle from "../ButtonStyle";
import { AnswerObject, QuestionContext } from "@/libs/type";
import ButtonAnswerStyle from "../ButtonAnswerStyle";
import handleMapText from "@/hooks/handleMapText";

type QuestionProp = {
  Lesson: QuestionContext;
  openSubmit: (selected: string) => void;
};

export const ShowQuestion = ({
  Lesson,
  openSubmit,
}: QuestionProp) => {
  const [isPress, setPress] = useState("");
  const [backgroundButtonSubmit, setBackgroundButtonSubmit] =
    useState("#6F6C87");
  const [borderColorSelected, setborderColorSelected] = useState("");

  const clickAnswer = (AnswerId: string) => {
    setPress(AnswerId);
  };

  const clickSubmit = () => {
    if (isPress !== "") {
      openSubmit(isPress);
      setPress("");
    } else {
      Alert.alert("Thông Báo", "Vui Lòng Chọn  Đáp Án");
      console.log("Chưa chọn đáp án!");
    }
  };

  useEffect(() => {
    if (isPress !== "") {
      setBackgroundButtonSubmit("#7A68FF");
      setborderColorSelected(isPress);
    } else {
      setBackgroundButtonSubmit("#6F6C87");
      setborderColorSelected("");
    }
  }, [isPress]);

  if (!Lesson || !Lesson.Answer) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Đang tải câu hỏi...</Text>
      </View>
    );
  } else {
    return (
      <View
        className="w-full flex gap-2 items-center justify-center"
        key={Lesson.QuestionID}
      >
        <View className="w-full flex flex-row items-center justify-center gap-2 flex-wrap">
          <Text className="text-2xl text-[#688EFF] font-bold text-center text-wrap">Passage:</Text>
          {Lesson.question_type === "reading" && (
            Lesson.passage?.map((element, index) => (
            <Text key={index} className="text-2xl text-[#688EFF] font-bold text-center text-wrap" onLongPress={() => console.log(element)}>
              {element}
            </Text>
          ))
            
          )}

        </View>
        <View className="w-full flex flex-row items-center justify-center gap-2">
          {Lesson.Question?.map((element, index) => (
            <Text key={index} className="text-white text-2xl font-bold" onLongPress={() => console.log(element)}>
              {element}
            </Text>
          ))}
        </View>
        <View className="w-full p-5 flex gap-4">
          {Lesson.Answer.map((answer: AnswerObject) => {
            console.log("This answer in map: ", answer);
            return (
              <ButtonAnswerStyle
                key={answer.AnswerId}
                idAnswer={answer.AnswerId}
                content={answer.Answer}
                color="#35284E"
                align_items="flex-start"
                textColor="white"
                boderColor={
                  answer.AnswerId === borderColorSelected ? "#7A68FF" : ""
                }
                onPress={() => clickAnswer(answer.AnswerId)}
              />
            );
          })}
        </View>
        <ButtonStyle
          color={backgroundButtonSubmit}
          content="Submit"
          textColor="white"
          align_items="center"
          onPress={() => clickSubmit()}
        />
      </View>
    );
  }
};
