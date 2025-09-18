import { View, Text, ScrollView } from "react-native";
import React from "react";
import { UserSelectLessonContext } from "@/libs/type";
interface SubmitTextProps {
  DataUserQuestion: UserSelectLessonContext | null;
}
const SubmitText = ({ DataUserQuestion }: SubmitTextProps) => {
  return (
    <ScrollView className="w-full mb-20 p-2"
    contentContainerStyle={{ paddingBottom: 10 }} >
      {DataUserQuestion?.transcript != null 
      && 
      (
        <Text style={{
            fontWeight: "bold",
            flexShrink: 1,
          }}
          className="text-xl text-white font-bold">
            {DataUserQuestion?.transcript}
          </Text>
      )
      }
      {DataUserQuestion?.correctAnswer === DataUserQuestion?.SelectAnswer ? (
        <Text
          style={{
            fontSize: 18,
            color: "green",
            fontWeight: "bold",
            flexShrink: 1,
          }}
          className="text-2xl text-green-300 font-bold"
        >
          {DataUserQuestion?.explain_question}
        </Text>


      ) : (
        <Text
          style={{
            fontWeight: "bold",
            textAlign: "center",
            flexShrink: 1,
          }}
          className="text-xl text-red-300 font-bold text-center"
        >
          Bạn đã chọn sai câu trả lời:{" "}
          {
            DataUserQuestion?.Answer?.find(
              (index2) => index2.AnswerId === DataUserQuestion?.correctAnswer
            )?.Answer
          }{" "}
          vì {DataUserQuestion?.explain_question}
        </Text>
      )}
      {DataUserQuestion?.grammar_rule != null 
      && 
      (
        <Text style={{
            fontWeight: "bold",
            textAlign: "center",
            flexShrink: 1,
          }}
          className="text-xl text-red-300 font-bold text-center">
            Quy Tắc: {DataUserQuestion?.grammar_rule}

            Ví Dụ: {DataUserQuestion?.grammar_example}
          </Text>
      )
      }
      
    </ScrollView>
  );
};
export default SubmitText;
