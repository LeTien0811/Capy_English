import { View, Text, Modal, Dimensions, StyleSheet } from "react-native";
import React from "react";
import ButtonStyle from "@/components/ButtonStyle";
import { Question_Group, UserSelectLessonContext } from "@/libs/type";
import ModalSubmitText from "@/components/Lesson/ModalSubmit/ModalSubmitText";
import MemeImageInSubmitModal from "@/components/Lesson/ModalSubmit/MemeImageInSubmitModal";
import useHandleQuiz from "@/hooks/handleQuiz";

type SubmitModalType = {
  visible: boolean;
  isSelectAnswer: boolean | null;
  StackStatusQuestionForLearner: string[];
  isQuestionGroup: Question_Group[];
  isSucces?: boolean;
  isSaveQuestionUserSelected: UserSelectLessonContext[] | [];
  NextStep: () => void;
  onClose: () => void;
};

const FalseImage: Record<number, any> = {
  6: require("@/assets/images/ImageMemeQuestion/DamMayLuon.jpg"),
  5: require("@/assets/images/ImageMemeQuestion/BocChayGianDu.jpg"),
  4: require("@/assets/images/ImageMemeQuestion/canhcao.jpg"),
  3: require("@/assets/images/ImageMemeQuestion/NoiLaiLanNua-removebg-preview.png"),
  2: require("@/assets/images/ImageMemeQuestion/DocNgoNgang-removebg-preview.png"),
  1: require("@/assets/images/ImageMemeQuestion/DoMoHoi-removebg-preview.png"),
};
const TrueImage: Record<number, any> = {
  1: require("@/assets/images/ImageMemeQuestion/like-removebg-preview.png"),
  2: require("@/assets/images/ImageMemeQuestion/batkhocNghenNgao-removebg-preview.png"),
  3: require("@/assets/images/ImageMemeQuestion/sigma_meomeo-removebg.png"),
  4: require("@/assets/images/ImageMemeQuestion/BocChay.jpg"),
};

const SubmitModal = ({
  visible,
  isSelectAnswer,
  StackStatusQuestionForLearner,
  isSucces,
  isQuestionGroup,
  isSaveQuestionUserSelected,
  NextStep,
  onClose,
}: SubmitModalType) => {
  const screenHeight = Dimensions.get("window").height;
  const DataUserQuestion =
    isSaveQuestionUserSelected[isSaveQuestionUserSelected.length - 1];
  const ClickNext = () => {
    console.log("Bài tiếp");
    NextStep();
    onClose();
  };

  const checkingStatus = (
    status: string,
    StackStatusQuestionForLearner: string[]
  ) => {
    console.log("Stack status: \n");
    StackStatusQuestionForLearner.map((element, index) => {
      console.log("Stack element: ", element, " \n");
    });
    console.log("Stack end \n");
    return StackStatusQuestionForLearner.filter((item) => item === status)
      .length;
  };

  const HandleStatus = () => {
    const Percent = 10 / isQuestionGroup.length;
    if (isSelectAnswer != null && StackStatusQuestionForLearner.length !== 0) {
      const checkingStatusNumber = checkingStatus(
        isSelectAnswer ? "D" : "S",
        StackStatusQuestionForLearner
      );
      const score = Percent * checkingStatusNumber;
      const imageKey = Math.floor(score);
      console.log(
        "Score image: ",
        imageKey,
        " checking Status number: ",
        checkingStatusNumber,
        " scrore: ",
        score
      );
      if (isSelectAnswer) {
        // Nếu đúng, lấy từ TrueImage
        return score > 1
          ? TrueImage[imageKey] || TrueImage[Object.keys(TrueImage).length]
          : require("@/assets/images/ImageMemeQuestion/DocSachChill.jpg");
      } else {
        // Nếu sai, lấy từ FalseImage
        return score > 1
          ? FalseImage[imageKey] || FalseImage[Object.keys(FalseImage).length]
          : require("@/assets/images/ImageMemeQuestion/DocSachChill.jpg");
      }
    }
    return null;
  };
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View
          className="bg-white w-full border-2 border-[#7C63AB] rounded-xl flex items-center gap-2 p-2"
          style={{ height: screenHeight * 0.3 }}
        >
          <View className="w-full flex flex-row">
            <MemeImageInSubmitModal imageMeme={HandleStatus()} />

            <ModalSubmitText DataUserQuestion={DataUserQuestion} />
          </View>

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
