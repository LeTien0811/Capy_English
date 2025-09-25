import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { UserSelectLessonContext } from "@/libs/type";
import { ListLessonText } from "../../Text/ListLessonText";
import { Ionicons } from "@expo/vector-icons";
interface SubmitTextProps {
  DataUserQuestion: UserSelectLessonContext | null;
}
const ModalSubmitText = ({ DataUserQuestion }: SubmitTextProps) => {
  const [showGramma, setGramma] = useState<boolean| null>(null)
  const showGrammar = () => {
    const KetQuaView = document.querySelector("#KetQuaView");
    const GrammarView = document.querySelector('#GrammarView');
    KetQuaView?.classList.remove("flex");
    KetQuaView?.classList.add("hidden");
    GrammarView?.classList.remove("hidden");
    GrammarView?.classList.add("flex");
    
  }
  return (
    <View
      className="flex flex-col border-2 rounded-xl flex-1 flex-wrap p-2"
    >
      <View id="KetQuaView" className="w-full flex flex-wrap relative">
        <Text className="text-xl font-bold">Kết quả:</Text>
        {DataUserQuestion?.correctAnswer === DataUserQuestion?.SelectAnswer ? (
          <View className="w-full flex flex-row flex-wrap">
            <Text
              className="text-xl text-green-600 font-semibold"
          >
            {DataUserQuestion?.explain_question}
          </Text>
          </View>
        ) : (
          <View className="w-full flex flex-row flex-wrap">
            <Text className="text-xl text-red-600 font-bold flex-shrink">
              {DataUserQuestion?.explain_question}
          </Text>
          </View>
        )}
        {DataUserQuestion?.grammar_rule === null && (
          <View className="absolute top-1 right-1">
            <Ionicons name="bulb-outline" size={24} color="red" />
          </View>
        )}
      </View>

      {DataUserQuestion?.grammar_rule != null && (
        <View id="GrammarView" className="w-full flex flex-col flex-wrap">
          <View className="w-full">
            <Text className="text-white text-xl">Quy Tắc</Text>
            <ListLessonText
              ArrayString={DataUserQuestion?.grammar_rule}
              onPress={() => null}
            />
          </View>
          <View className="w-full">
            <Text className="text-white text-xl">Ví Dụ</Text>
            <ListLessonText
              ArrayString={DataUserQuestion?.grammar_example}
              onPress={() => null}
            />
          </View>
        </View>
      )}
    </View>
  );
};
export default ModalSubmitText;
