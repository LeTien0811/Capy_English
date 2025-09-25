import * as SQLite from "expo-sqlite";

export interface AnswerObject {
  AnswerId: string;
  Answer: string[] | null;
}

export interface topicContext {
  id_Topic: number;
  Topic_name: string;
  Topic_description: string;
}

export interface level {
  id_level: string;
  Level_name: string;
  Level_description: string;
}

export interface learners {
  id_learners: number,
  email: string | null,
  password_hash: string | null,
  access_token: string | null,
  refresh_token: string | null,
  full_name: string,
  created_at: string | null,
}

export interface Learner_Profiles {
    id_Profiles: number,
    aim: string | null,
    score: string | null,
    progress_learners: string | null,
    learners_id: number,
    Course_id: number | null,
    Level_id: string,
};

export interface Lessons {
    id_lessons: number,
    title: string | null,
    description: string | null,
    completion: string | null,
    completion_date: string | null,
    Lesson_Group_id: number;
    Level_id: string,
    Topic_id: number,
};

export interface course {
    id_Course: number,
    title: string | null,
    description: string | null,
    completion: string | null,
    completion_date: string | null,
    Level_id: string,
    Topic_id: number,
};

export interface learningsession {
    id_session: number,
    score: number,
    timespent: number,
    complete_at: string,
    learner: number,
    lesson: number,
};

export interface Lesson_Group {
    id_group: number,
    title: string,
    description: string,
    Course_id: number ,
    Level_id  : string,
    Topic_id   : number,
};

export interface Question_Bank {
    id_question: number,
    question: string | null,
    question_type: string,
    option_a: string | null,
    option_b: string | null,
    option_c: string | null,
    option_d: string | null,
    correct_answer: string | null,
    passage: string | null,
    grammar_rule: string | null,
    grammar_example: string | null,
    audio_text: string | null,
    transcript: string | null,
    explain_question: string | null,
    topic_id : number,
    level_id : string
};

export interface Question_Group {
    id_QuestionGroup: number,
    Lessons_id: number ,
    Question_Bank_id : number,
    Topic_id   : number,
};

export interface DatabaseContextType {
    db: SQLite.SQLiteDatabase | null;
    isDbLoading: boolean;
    checkLoginStatus: () => Promise<learners | null>;
    getWidgetData: (learner_id: number) => Promise<Widget | null>;
    getLearnerProfiles: () => Promise<Learner_Profiles | null>;
    getCourse: () => Promise<course | null>;
    getLesson: () => Promise<Lessons[] | []>;
    getLessonGroup: () => Promise<Lesson_Group[] | []>;
    getQuestionGroup: () => Promise<Question_Group[] | []>;
    getQuestionBank: () => Promise<Question_Bank[] | []>;
    getLearningSession: () => Promise<learningsession[] | []>;
    RegisterLearner: (id_learners: number, email: string | null, password_hash: string | null, access_token: string | null, refresh_token: string | null, full_name: string, created_at: string) => Promise<boolean>;
    resetDatabaseForTesting: () => Promise<void>;
    setTopics: (data: topicContext[] | topicContext) => Promise<void>;
    setLevels: (data: level[] | level) => Promise<void>;
    setCourse: (data: course[] | course) => Promise<void>;
    setLearnerProfiles: (data: Learner_Profiles) => Promise<void>;
    setLessonGroup: (data: Lesson_Group[] | Lesson_Group) => Promise<void>;
    setLessons: (data: Lessons[] | Lessons) => Promise<void>;
    setQuestionBank: (data: Question_Bank[] | Question_Bank) => Promise<void>;
    getQuestionBankFollowId: (id_question: number) => Promise<Question_Bank | null>;
    setQuestionGroup: (data: Question_Group[] | Question_Group) => Promise<void>;
    getQuestionGroupFollowId: (Lessons_id: number) => Promise<Question_Group[] | null>;
    setLearningSession: (data: learningsession[] | learningsession) => Promise<void>;
}

export interface AuthContextType {
    Learner: learners | null;
    isAuthLoading: boolean;
    signIn: (data: any) => Promise<boolean>
    Register: (id_learners: number, email: string | null, password_hash: string | null, access_token: string | null, refresh_token: string | null , full_name: string, created_at: string | null) => Promise<boolean>
};

export interface PressToTranslateContextType {
  isHandingTranslate: boolean;
  resultTranslate: string | null;
  isHandleTranslate: (data: string) => Promise<void>;
}

export interface beforeQuestion {
  id: number;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: string;
  topic: number;
}

export interface QuestionContext {
  QuestionID: string;
  question_type: string;
  Question: string[] | null;
  Answer: AnswerObject[] | null;
  passage: string[] | null;
  grammar_rule: string[] | null;
  grammar_example: string[] | null;
  audio_text: string | null;
  transcript: string[] | null;
  explain_question: string | null,
  correctAnswer: string | null;
} 

export interface UserSelectLessonContext {
  QuestionID: string;
  Question: string[] | null;
  question_type: string;
  Answer: AnswerObject[] | null;
  passage: string[] | null;
  grammar_rule: string[] | null;
  grammar_example: string[] | null;
  audio_text: string | null;
  transcript: string[] | null;
  explain_question: string | null,
  correctAnswer: string | null;
  SelectAnswer: string | null;
}

export interface Result {
  numberOfQuestion: number;
  score: number;
}

export interface Widget {
  score: number;
  progress_learners: string;
  Level_id: number;
  Level_name: string;
  TOTAL_COMPLETE_LESSION: string;
  TOTAL_SCORE_FORM_SUCCES_LESSON: string;
}

export interface NewsList {
  Category: string;
  NewsItems: NewsItem[];
}

export interface NewsItem {
  heading: string;
  content: string;
  newspaper: string;
  DateUploads: Date;
  image: string;
  views: number;
}
