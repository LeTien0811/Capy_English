import { useEffect, useState } from "react";
import {
  Question_Bank,
  Question_Group,
  QuestionContext,
  Result,
  UserSelectLessonContext,
} from "@/libs/type";
import { useRouter } from "expo-router";
import { useDatabase } from "@/utils/handleLocalStoredContext";
import HandleMapQuestions from "./handleMapQuestions";

const useHandleQuiz = (QuestionGroup: any[]) => {
  const router = useRouter();
  // Con trỏ trỏ đến câu hỏi hiện tại
  const [isCurrentQuestion, setCurrentQuestion] = useState(0);
  // Lưu Câu hỏi người dùng đã chọn
  const [isSaveQuestionUserSelected, setSaveQuestionUserSelected] = useState<
    UserSelectLessonContext[]
  >([]);
  // Điểm
  const [isScore, setScore] = useState(0);
  // Lưu danh sách câu hỏi để truy vấn Dữ Liệu Local
  const [isQuestionGroup, setIsQuestionGroup] = useState<Question_Group[]>([]);
  // Kiểm tra đã hoàn thành chưa
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  //Dùng để showw kết quả
  const [isResult, setResult] = useState<Result | undefined>(undefined);
  // Câu hỏi
  const [isQuestion, setIsQuestion] = useState<QuestionContext | null>(null);
  // Kiểm tra người dùng đã chọn đúng câu trả lời
  const [isSelectAnswer, setSelectAnswer] = useState<boolean | null>(null);
  // Xử lý dữ liệu ở local
  const { getQuestionBankFollowId } = useDatabase();

  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState<number>(0);

  const [StackStatusQuestionForLearner, SetStackStatusQuestionForLearner] =
    useState<string[]>([]);

  // Khi bắt đầu làm bài test
  const startTest = () => {
    setStartTime(Date.now());
    setElapsed(0);
  };

  // Khi nộp bài
  const finishTest = () => {
    if (startTime) {
      const endTime = Date.now();
      const duration = Math.floor((endTime - startTime) / 1000);
      setElapsed(duration);
      console.log("Thời gian làm bài:", duration, "giây");
    }
  };

  useEffect(() => {
    setIsLoading(true);
    try {
      if (QuestionGroup.length > 0) {
        setIsQuestionGroup(QuestionGroup);
        startTest();
      }
    } catch (e) {
      console.log("Invalid JSON in lesson param", e);
      router.back();
    }
    setIsLoading(false);
  }, [QuestionGroup, router]);

  useEffect(() => {
    getQuestionBank();
  }, [isQuestionGroup]);

  const getQuestionBank = async () => {
    if (
      isQuestionGroup != null &&
      isCurrentQuestion + 1 < isQuestionGroup.length
    ) {
      const result = await getQuestionBankFollowId(
        isQuestionGroup[isCurrentQuestion].Question_Bank_id
      );
      console.log("**** dữ liệu question bank trong handle quiz: ", result);
      if (result != null) {
        const map = HandleMapQuestions(result);
        setIsQuestion(map);
        console.log(
          "Get Question Bank in Handle Quiz : ",
          map,
          " /////, currentQuestion: ",
          isCurrentQuestion
        );
      }
    } else {
      if (isQuestionGroup == null) {
        console.log("Handle Quiz Có Lỗi xảy ra ở Question Group");
        router.back();
      } else {
        console.log(
          "Handle Quiz có lỗi xảy ra: ",
          isQuestionGroup.length,
          " và ",
          isCurrentQuestion
        );
      }
    }
  };

  const HandleSetStackStatusQuestionForLearner = (status: string) => {
    if (
      StackStatusQuestionForLearner[
        StackStatusQuestionForLearner.length - 1
      ] !== status
    ) {
      SetStackStatusQuestionForLearner([]);
      SetStackStatusQuestionForLearner((prev) => [...prev, status]);
      return;
    }
    SetStackStatusQuestionForLearner((prev) => [...prev, status]);
    return;
  };

  const handleSubmit = (selected: string) => {
    if (!isQuestionGroup || isQuestionGroup.length === 0) {
      console.log("Không có bài học");
      return;
    }
    if (isQuestion != null) {
      const userSelected = selected === isQuestion.correctAnswer;
      if (userSelected) {
        setScore((score) => score + 10 / isQuestionGroup.length);
        setSelectAnswer(true);
        HandleSetStackStatusQuestionForLearner("D");
      } else {
        setSelectAnswer(false);
        HandleSetStackStatusQuestionForLearner("S");
      }
      const userSelect: UserSelectLessonContext = {
        QuestionID: isQuestion.QuestionID,
        Question: isQuestion.Question,
        question_type: isQuestion.question_type,
        Answer: isQuestion.Answer,
        passage: isQuestion.passage,
        grammar_example: isQuestion.grammar_example,
        grammar_rule: isQuestion.grammar_rule,
        audio_text: isQuestion.audio_text,
        transcript: isQuestion.transcript,
        explain_question: isQuestion.explain_question,
        correctAnswer: isQuestion.correctAnswer,
        SelectAnswer: selected,
      };
      setSaveQuestionUserSelected((prev) => [...prev, userSelect]);
    }
  };

  useEffect(() => {
    getQuestionBank();
    console.log("Gọi get question bank");
  }, [isCurrentQuestion]);

  useEffect(() => {
    console.log("Hoàn Thành Bài Test", isResult);
    finishTest();
  }, [isQuizFinished, isResult]);

  const handleNextStep = () => {
    if (!isQuestionGroup || isQuestionGroup.length === 0) {
      return;
    }
    if (isCurrentQuestion + 1 < isQuestionGroup.length) {
      setCurrentQuestion((current) => current + 1);
      setSelectAnswer(null);
    } else {
      setIsQuizFinished(true);
      const result = {
        numberOfQuestion: isQuestionGroup.length,
        score: isScore,
      };
      setResult(result);
    }
    console.log("Next step đã được gọi");
  };

  return {
    isQuizFinished,
    isLoading,
    isQuestionGroup,
    isQuestion,
    StackStatusQuestionForLearner,
    isCurrentQuestion,
    isScore,
    isResult,
    isSelectAnswer,
    isSaveQuestionUserSelected,
    elapsed,
    handleSubmit,
    handleNextStep,
  };
};

export default useHandleQuiz;
