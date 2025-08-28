import { useEffect, useState } from 'react';
import { LessonContext, Result, UserLessonContext } from '@/libs/type';
import { useRouter } from 'expo-router';
import { preventAutoHideAsync } from 'expo-splash-screen';

const useHandleQuiz = (lesson: any) => {
  const router = useRouter();
  const [isCurrentQuestion, setCurrentQuestion] = useState(0);
  const [isUserSelected, setUserSelected] = useState<UserLessonContext[]>([]);
  const [isScore, setScore] = useState(0);
  const [isQuestion, setIsQuestion] = useState<any[]>([]);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isResult, setResult] = useState<Result | undefined>(undefined);

  const [isAnswered, setIsAnswered] = useState(false);
  const [isSelectAnswer, setSelectAnswer] = useState("");

  useEffect(() => {
    if (typeof lesson === "string") {
      try {
        const parsedLesson: LessonContext[] = JSON.parse(lesson);
        if (parsedLesson.length > 0) {
          setIsQuestion(parsedLesson);
        } else {
          router.back();
        }
      } catch (e) {
        console.log("Invalid JSON in lesson param", e);
        router.back();
      }
    } else {
      console.log("lesson param is not a string", lesson);
      router.back();
    }
    setIsLoading(false);
  }, [lesson, router]);

  const handleSelected = (selected: string) => {
    if (!isQuestion || isQuestion.length === 0) {
      return;
    }
    const userSelected = selected === isQuestion[isCurrentQuestion].correctAnswer;
    alert(JSON.stringify(userSelected))
    if (userSelected) {
      setScore((score) => score + 10 / isQuestion.length);
    }
    const userSelect: UserLessonContext = {
      QuestionID: isQuestion[isCurrentQuestion].QuestionID,
      Question: isQuestion[isCurrentQuestion].Question,
      Answer: isQuestion[isCurrentQuestion].Answer,
      correctAnswer: isQuestion[isCurrentQuestion].correctAnswer,
      SelectAnswer: selected
    }
    setUserSelected((prev) => [...prev, userSelect])
    setIsAnswered(true);
    setSelectAnswer(selected);
  };

  const handleNextStep = () => {
    if (!isQuestion || isQuestion.length === 0) {
      return;
    }
    if (isCurrentQuestion + 1 < isQuestion.length) {
      setCurrentQuestion((current) => current + 1);
      setIsAnswered(false);
      
    } else {
      setIsQuizFinished(true);
      const result = {
        numberOfQuestion: isQuestion.length,
        score: isScore,
      };
      setResult(result);
    }
    alert(JSON.stringify(isUserSelected))
  };

  return {
    isQuizFinished,
    isLoading,
    isQuestion,
    isCurrentQuestion,
    isScore,
    isResult,
    isAnswered,
    isSelectAnswer,
    handleSelected,
    handleNextStep,
  };
  
};

export default useHandleQuiz;
