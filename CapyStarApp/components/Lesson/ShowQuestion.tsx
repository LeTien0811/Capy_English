import { View, Text, Pressable, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import ButtonStyle from "../ButtonStyle";
import { AnswerObject, QuestionContext } from "@/libs/type";
import ButtonAnswerStyle from "../ButtonAnswerStyle";

type QuestionProp = {
  Lesson: QuestionContext;
  isScore: number;
  isSelectAnswer: string | null;
  openSubmit: (selected: string) => void;
};

export const ShowQuestion = ({
  Lesson,
  isScore,
  isSelectAnswer,
  openSubmit,
}: QuestionProp) => {
  
  const [isPress, setPress] = useState("");
  const [backgroundButtonSubmit, setBackgroundButtonSubmit] = useState("#6F6C87");
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
  }
 

  useEffect(() => {
    if(isPress !== "") {
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
        <View className="w-full flex items-center justify-center">
          {Lesson.question_type === 'reading' && (
            <Text className="text-2xl mb-10 text-[#688EFF] font-bold text-center text-wrap">
            Passage: {Lesson.passage}
          </Text>
          )}
          <Text className="text-2xl text-white font-bold text-center text-wrap">
            {Lesson.Question}
          </Text>
         
        </View>
        <View className="w-full p-5 flex gap-4">
          {Lesson.Answer.map((answer: AnswerObject) => {
            return (
              <ButtonAnswerStyle
                key={answer.AnswerId}
                content={answer.Answer}
                color="#35284E"
                align_items="flex-start"
                textColor="white"
                boderColor={answer.AnswerId === borderColorSelected ? "#7A68FF" : ""}
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
