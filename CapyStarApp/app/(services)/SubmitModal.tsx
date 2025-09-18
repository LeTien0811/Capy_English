import { View, Text, Modal, Dimensions, StyleSheet } from "react-native";
import React from "react";
import ButtonStyle from "@/components/ButtonStyle";
import { UserSelectLessonContext } from "@/libs/type";
import SubmitText from "@/components/Lesson/SubmitText";

type SubmitModalType = {
  visible: boolean;
  isSelectAnswer: string;
  isSucces?: boolean;
  isSaveQuestionUserSelected: UserSelectLessonContext[] | [];
  NextStep: () => void;
  onClose: () => void;
};

const SubmitModal = ({ visible, isSelectAnswer, isSucces, isSaveQuestionUserSelected, NextStep,onClose }: SubmitModalType) => {
  const screenHeight = Dimensions.get("window").height;
  const DataUserQuestion =  isSaveQuestionUserSelected[isSaveQuestionUserSelected.length - 1];
  console.log("Submit Modal On: ", DataUserQuestion);
  const ClickNext = () => {
    console.log("Bài tiếp");
    NextStep();
    onClose();
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View
          className="bg-[#35284E] w-full border-2 border-[#7C63AB] rounded-xl flex items-center py-2"
          style={{ height: screenHeight * 0.4 }}
        >
          <SubmitText
            DataUserQuestion={DataUserQuestion}
          />

          {!isSucces ? (
            <ButtonStyle
              color="#7C63AB"
              content="Bài Tiếp"
              textColor="white"
              align_items="center"
              onPress={ClickNext}
            />
          ) : (
            <ButtonStyle
              color="#7C63AB"
              content="Hoàn Thành"
              textColor="white"
              align_items="center"
              onPress={onClose}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 8,
  },
});

export default SubmitModal;
