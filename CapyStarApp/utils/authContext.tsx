import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Redirect, useRouter } from "expo-router";
import {
  AuthContextType,
  learners,
} from "@/libs/type";
import { useDatabase } from "./handleLocalStoredContext";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [Learner, setLearner] = useState<learners | null>(null);
  const [isAuthLoading, setAuthLoading] = useState(true);

  const {
    isDbLoading,
    checkLoginStatus,
    RegisterLearner,
    setTopics,
    setLevels,
    setCourse,
    setLearnerProfiles,
    setLessonGroup,
    setLessons,
    setQuestionBank,
    setQuestionGroup,
    setLearningSession,
  } = useDatabase();

  const init = async () => {
      setAuthLoading(true);
      try {
        const saved = await checkLoginStatus();
        if (saved) {
          setLearner(saved);
          console.log("🔑 Khởi tạo từ DB:", saved);
        } else {
          setLearner(null);
        }
      } finally {
        setAuthLoading(false);
      }
    };

  useEffect(() => {
    if (isDbLoading) return;
    init();
  }, [isDbLoading]);

  const signIn = async (data: any) => {
    if (isDbLoading) {
      console.log("Database chưa sẵn sàng!");
      return false;
    }
    setAuthLoading(true);
    if (!data) { setAuthLoading(false);   return false;}

    const learner = data.learner;
    if (!learner) {
      console.log("Not Data on learner Data");
      return false;
    }

    const resultRegister = await RegisterLearner(
      learner.id_learners,
      learner.email,
      learner.password_hash,
      "",
      "",
      learner.full_name,
      learner.created_at ?? new Date().toISOString()
    );

    if (resultRegister) {
      const LearnerInDb = await checkLoginStatus();
      if (LearnerInDb) {
        setLearner(LearnerInDb);
      }
      const topicData = data.topic;
      if (!topicData) {
        console.log("Not Data on topic Data");
        return false;
      }
      setTopics(topicData);

      const levelData = data.level;
      if (!levelData) {
        console.log("Not Data on level Data");
        return false;
      }
      setLevels(levelData);

      const courseData = data.course;
      if (!courseData) return false;
      setCourse(courseData);

      const learnerProfileData = data.learner_profile;
      if (!learnerProfileData) {
        console.log("Not Data on learner ProFile Data");
        return false;
      }
      setLearnerProfiles(learnerProfileData);

      const lesson_groupData = data.lesson_group;
      if (!lesson_groupData) {
        console.log("Not Data on lesson group Data");
        return false;
      }
      setLessonGroup(lesson_groupData);

      const lessonData = data.lesson;
      if (!lessonData) {
        console.log("Not Data on lesson Data");
        return false;
      }
      setLessons(lessonData);

      const question_bankData = data.question_bank;
      if (!question_bankData) {
        console.log("Not Data on question bank Data");
        return false;
      }
      console.log("*****Show data question bank từ API:", data.question_bank)
      setQuestionBank(question_bankData);

      const question_groupData = data.question_group;
      if (!question_groupData) {
        console.log("Not Data on question_group Data");
        return false;
      }
      setQuestionGroup(question_groupData);

      const learning_sessionData = data.learning_session;
      if (learning_sessionData) setLearningSession(learning_sessionData);

      setAuthLoading(false);
      return true;
    } else {
      console.log("Lỗi RegisterLearner in database");
      setAuthLoading(false);
      return false;
    }
  };

  const Register = async (
    id_learners: number,
    email: string | null,
    password_hash: string | null,
    access_token: string | null,
    refresh_token: string | null,
    full_name: string,
    created_at: string | null
  ) => {
    if (isDbLoading) return false;
    setAuthLoading(true);
    setLearner({
      id_learners,
      email,
      password_hash,
      access_token,
      refresh_token,
      full_name,
      created_at,
    });
    return true;
  };

  const authContextValue: AuthContextType = {
    Learner,
    isAuthLoading,
    signIn,
    Register,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    console.log("useAuth must be used winthin a AuthContext.Provider");
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
