import { View, Text } from "react-native";
import React from "react";
import { ListLessonText } from "@/components/Text/ListLessonText";
interface FielLearnerQuestionType {
  UserQuestion: string[] | null;
}
const FielLearnerQuestion = ({ UserQuestion }: FielLearnerQuestionType) => {
  return (
    <View className="w-full flex flex-row flex-wrap border-b-2">
      {UserQuestion !== null && (
        <ListLessonText ArrayString={UserQuestion} onPress={() => null} />
        
      )}
    </View>
  );
};

export default FielLearnerQuestion;
