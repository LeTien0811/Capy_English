import ButtonStyle from "@/components/ButtonStyle";
import { ShowQuestion } from "@/components/Lesson/RunningTest/ShowQuestion";
import ShowResult from "@/components/Lesson/RunningTest/ShowResult";
import useHandleQuiz from "@/hooks/handleQuiz";
import { Question_Group } from "@/libs/type";
import { useDatabase } from "@/utils/handleLocalStoredContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SubmitModal from "./SubmitModal";
import * as Speech from "expo-speech";
import { useAuthContext } from "@/utils/authContext";
import { useFetchAPI } from "@/hooks/handleFetchAPI";
import { useTranslateTextToAPI } from "@/utils/PressToTranslateContext";
import StatusBarView from "@/components/Lesson/StatusBar";
// , Reading, Grammar, Listening

interface submitRespone {
  learner_session: [];
  false_answer: {};
  email: string;
  password_hash: string;
  message?: string;
  errors?: any;
}

export default function RunningTest() {
  const router = useRouter();
  const { getQuestionGroupFollowId } = useDatabase();
  const { id_Lesson } = useLocalSearchParams();
  const [isLoadingMap, setLoadingMap] = useState(true);
  const [isQuestionGroup, setQuestionGroup] = useState<Question_Group[]>([]);
  const [isVisible, setVisible] = useState(false);
  const { Learner, isAuthLoading } = useAuthContext();
  let useHook = useHandleQuiz(isQuestionGroup);
  const [responses, isLoadingFetch, fetchAPI] =
    useFetchAPI<submitRespone>("SaveSessionForUser");
  const [isSpeaking, setSpeaking] = useState(false);

  const {
    isQuizFinished,
    isLoading,
    isQuestion,
    StackStatusQuestionForLearner,
    isResult,
    isSelectAnswer,
    isSaveQuestionUserSelected,
    elapsed,
    handleSubmit,
    handleNextStep,
  } = useHook;

  const { isHandingTranslate, resultTranslate, isHandleTranslate } =
    useTranslateTextToAPI();

  useEffect(() => {
    (async () => {
      setLoadingMap(true);
      const Question = await getQuestionGroupFollowId(Number(id_Lesson));
      if (Question != null) {
        setQuestionGroup(Question);
        console.log("Running Test Thành Công Question Group");
      } else {
        console.log("Running Test có lỗi xảy ra Question Group Null");
        router.back();
      }
      setLoadingMap(false);
    })();
  }, [id_Lesson]);

  const openSubmitModal = (answerID: string) => {
    console.log("hello");
    setVisible(true);
    handleSubmit(answerID, null);
  };

  const speech = () => {
    setSpeaking(true);
    const audio = isQuestion?.audio_text;
    Speech.stop();
    if (audio != null) {
      Speech.speak(audio?.toString(), {
        language: "en-GB",
        rate: 1.0,
        pitch: 1.0,
      });
      console.log("run speech");
    }
    setSpeaking(false);
  };

  useEffect(() => {
    speech();
  }, [isQuestion]);

  const SubmitAndExit = async () => {
    console.log(
      "Handle QUiz Question user Selected : ",
      isSaveQuestionUserSelected
    );
    
    const false_answer = isSaveQuestionUserSelected
      .filter(
        (filter) =>
          filter.correctAnswer === filter.SelectAnswer &&
          filter.Question !== null
      )
      .map((item, index) => {
        return {
          Lessons: id_Lesson,
          Question_bank: item.QuestionID,
          question: item.Question !== null ? item.Question.join(" ") : null,
          correct_answer: item.correctAnswer,
          learners_answer: item.SelectAnswer,
          answered_at: new Date().toISOString(),
        };
      });

    const learner_session = {
      score: isResult?.score.toFixed(2),
      time_spent: elapsed,
      completed_at: new Date().toISOString(),
      lesson: id_Lesson,
    };

    const email = Learner?.email;
    const password_hash = Learner?.password_hash;
    console.log("Dữ liệu gửi đi:");
    console.log("Dữ liệu gửi đi email:", email);
    console.log("Dữ liệu gửi đi password_hash:", password_hash);
    console.log("Dữ liệu gửi đi false_answer:", false_answer);
    console.log("Dữ liệu gửi đi learner_session:", learner_session);
    try {
      const response = await fetchAPI({
        method: "POST",
        payload: { email, password_hash, learner_session, false_answer },
      });

      if (response?.errors) {
        Alert.alert(
          "Nộp bài thất bại",
          `${response.message}\nChi tiết: ${JSON.stringify(response.errors, null, 2)}`
        );
      } else {
        Alert.alert("Thành công", response?.message || "Nộp bài thành công");
      }
    } catch (error: any) {
      if (error.response) {
        console.log("API Error:", error.response.data);
        Alert.alert(
          "Nộp bài không thành công",
          JSON.stringify(error.response.data, null, 2)
        );
      } else {
        console.log("Khác:", error.message);
        Alert.alert("Lỗi", error.message);
      }
    }
    router.back();
  };

  if (isLoadingMap) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Đang tải câu hỏi...</Text>
      </View>
    );
  }
  if (!isQuizFinished && isQuestion && !isLoading && isQuestion != null) {
    return (
      <SafeAreaView
        style={{ flex: 1 }}
        className="p-4 relative flex gap-3 items-center"
      >
        <StatusBarView />

        {/* {isQuestion.question_type === "listening" && (
          <Pressable
            className="absolute w-15 h-15 top-20 right-3 border-2 bg-white rounded-xl p-2"
            onPress={() => speech()}
          >
            <Text className="font-semibold">Repeat</Text>
          </Pressable>
        )} */}

        <ShowQuestion
          Lesson={isQuestion}
          isSpeaking={isSpeaking}
          openSubmit={openSubmitModal}
          RunSpeak={speech}
        />

        <SubmitModal
          visible={isVisible}
          isSelectAnswer={isSelectAnswer}
          StackStatusQuestionForLearner={StackStatusQuestionForLearner}
          isQuestionGroup={isQuestionGroup}
          isSucces={false}
          isSaveQuestionUserSelected={isSaveQuestionUserSelected}
          NextStep={() => handleNextStep()}
          onClose={() => setVisible(false)}
        />
      </SafeAreaView>
    );
  }

  if (isQuizFinished && isResult && !isLoading) {
    return (
      <SafeAreaView className="w-full h-full items-center bg-[#2B223E] flex justify-center">
        <View className="w-full items-center flex justify-center">
          <ShowResult isResult={isResult} />
        </View>
        <ButtonStyle
          content="exit!"
          color=""
          textColor="white"
          align_items="center"
          key={null}
          onPress={() => SubmitAndExit()}
        />
      </SafeAreaView>
    );
  }

  return (
    <View>
      <Text>Đang có lỗi xảy ra</Text>
    </View>
  );
}
