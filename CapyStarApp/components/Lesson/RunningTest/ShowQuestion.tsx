import { View, Text, Pressable, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import ButtonStyle from "../../ButtonStyle";
import { AnswerObject, QuestionContext } from "@/libs/type";
import ButtonAnswerStyle from "../../ButtonAnswerStyle";
import handleMapText from "@/hooks/handleMapText";
import { useTranslateTextToAPI } from "@/utils/PressToTranslateContext";
import {ListLessonText} from "@/components/Text/ListLessonText"
import ViewQuestion from "./ViewQuestion";
import FielLearnerQuestion from "./FielLearnerQuestion";
type QuestionProp = {
  Lesson: QuestionContext;
  isSpeaking: boolean;
  openSubmit: (selected: string) => void;
  RunSpeak: () => void;
};

export const ShowQuestion = ({ Lesson, isSpeaking, openSubmit, RunSpeak }: QuestionProp) => {
  const [isPress, setPress] = useState("");
  const [backgroundButtonSubmit, setBackgroundButtonSubmit] = useState("#6F6C87");
  const [borderColorSelected, setborderColorSelected] = useState("");
  const clickAnswer = (AnswerId: string) => {
    setPress(AnswerId);
    console.log("Click")
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
        className="w-full flex gap-4 items-center"
        key={Lesson.QuestionID}
      >
        
          {Lesson.question_type === "reading" && (
            <View className="w-full flex flex-row gap-1 flex-wrap">
              <Text className="text-xl text-[#688EFF] font-bold text-center">
                Đoạn Văn:
              </Text>
              <ListLessonText
                ArrayString={Lesson.passage}
                onPress={() => null}
              />
            </View>
          )}
        
        <View className="w-full">
              <ViewQuestion
              questionType={Lesson.question_type}
              question={Lesson.Question}
              isSpeaking={isSpeaking}
              RunSpeak={RunSpeak}
              />
        </View>
        <View className="w-full">
          <FielLearnerQuestion
            UserQuestion={Lesson.Answer.find((answer) => answer.AnswerId === isPress)?.Answer ?? null}
          />
        </View>
        <View className="w-full flex justify-center flex-row flex-wrap gap-3">
          {Lesson.Answer.map((answer: AnswerObject) => {
            return (
              <ButtonAnswerStyle
                key={answer.AnswerId}
                idAnswer={answer.AnswerId}
                content={answer.Answer}
                color=""
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
