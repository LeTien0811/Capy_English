import { View, Text } from "react-native";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import * as SQLite from "expo-sqlite";
import {
  beforeQuestion,
  course,
  DatabaseContextType,
  Learner_Profiles,
  learners,
  learningsession,
  Lesson_Group,
  Lessons,
  Question_Bank,
  Question_Group,
  topicContext,
  level,
} from "@/libs/type";
import { useRouter } from "expo-router";

const DEVELOPMENT_MODE = false;
const handleLocalStoredContext = createContext<DatabaseContextType | undefined>(
  undefined
);

const initDatabase = async () => {
  const db = await SQLite.openDatabaseAsync("CapyStarLocal");

  if (DEVELOPMENT_MODE) {
    console.log("Đang ở chế độ phát triển. Xóa và tạo lại database.");
    await db.execAsync(`
            DROP TABLE IF EXISTS learners;
            DROP TABLE IF EXISTS Topic;
            DROP TABLE IF EXISTS Levels;
            DROP TABLE IF EXISTS course;
            DROP TABLE IF EXISTS Learner_Profiles;
            DROP TABLE IF EXISTS Lesson_Group;
            DROP TABLE IF EXISTS Lessons;
            DROP TABLE IF EXISTS Question_Bank;
            DROP TABLE IF EXISTS Question_Group;
            DROP TABLE IF EXISTS LearningSession;
        `);
  }

  await db.execAsync(`
    PRAGMA journal_mode = WAL;
CREATE TABLE IF NOT EXISTS learners(
    id_learners INTEGER NOT NULL PRIMARY KEY,
    email TEXT UNIQUE NULL,
    password_hash varchar(50) NOT NULL,
    access_token TEXT NULL,
    refresh_token TEXT NULL,
    full_name TEXT NULL,
    created_at DATETIME NULL
);

CREATE TABLE IF NOT EXISTS Topic (
    id_Topic integer NOT NULL PRIMARY KEY,
    Topic_name varchar(255) NULL,
    Topic_description varchar(255) NULL
);

CREATE TABLE IF NOT EXISTS Levels (
    id_level varchar(20) NOT NULL PRIMARY KEY,
    Level_name varchar(255) NULL,
    Level_description varchar(255) NULL
);

CREATE TABLE IF NOT EXISTS course (
    id_Course integer NOT NULL PRIMARY KEY,
    title varchar(255) NULL,
    description varchar(255),
    completion varchar(50) NULL,
    completion_date datetime NULL,
    Level_id varchar(20) NOT NULL,
    Topic_id integer NULL,
    FOREIGN KEY (Level_id) REFERENCES Levels(id_level) ON DELETE CASCADE,
    FOREIGN KEY (Topic_id) REFERENCES Topic(id_Topic) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Learner_Profiles (
    id_Profiles integer NOT NULL PRIMARY KEY, 
    id_learners INTEGER,
    aim varchar(255),
    score TEXT,
    course_id integer,
    progress_learners varchar(255),
    Level_id varchar(20) NOT NULL,
    FOREIGN KEY (course_id) REFERENCES course(id_Course) ON DELETE CASCADE,
    FOREIGN KEY (Level_id) REFERENCES Levels(id_level) ON DELETE CASCADE,
    FOREIGN KEY (id_learners) REFERENCES learners(id_learners) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Lesson_Group (
    id_group integer NOT NULL PRIMARY KEY,
    title varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    Course_id integer NOT NULL,
    Level_id varchar(20) NOT NULL,
    Topic_id integer NOT NULL,
    FOREIGN KEY (Level_id) REFERENCES Levels(id_level) ON DELETE CASCADE,
    FOREIGN KEY (Topic_id) REFERENCES Topic(id_Topic) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Lessons (
    id_lessons integer NOT NULL PRIMARY KEY,
    title varchar(255) NULL,
    description varchar(255),
    completion varchar(50) NULL,
    completion_date datetime NULL,
    Lesson_Group_id integer,
    Level_id varchar(20) NOT NULL,
    Topic_id integer NULL,
    FOREIGN KEY (Lesson_Group_id) REFERENCES Lesson_Group(id_group) ON DELETE CASCADE,
    FOREIGN KEY (Level_id) REFERENCES Levels(id_level) ON DELETE CASCADE,
    FOREIGN KEY (Topic_id) REFERENCES Topic(id_Topic) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Question_Bank (
    id_question integer NOT NULL PRIMARY KEY,
    question varchar(255) NULL,
    question_type varchar(255) NULL,
    option_a varchar(100) NULL,
    option_b varchar(100) NULL,
    option_c varchar(100) NULL,
    option_d varchar(100) NULL,
    correct_answer varchar(1) NULL,
    passage TEXT NULL,
    grammar_rule TEXT NULL,
    grammar_example TEXT NULL,
    audio_text TEXT NULL,
    transcript TEXT NULL,
    explain_question TEXT NULL,
    level_id varchar(20) NOT NULL,
    topic_id integer NOT NULL,
    FOREIGN KEY (Level_id) REFERENCES Levels(id_level) ON DELETE CASCADE,
    FOREIGN KEY (topic_id) REFERENCES Topic(id_Topic) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Question_Group (
    id_QuestionGroup integer NOT NULL PRIMARY KEY,
    Lessons_id integer NOT NULL,
    Question_Bank_id integer NOT NULL,
    Topic_id integer NOT NULL,
    FOREIGN KEY (Lessons_id) REFERENCES Lessons(id_lessons) ON DELETE CASCADE,
    FOREIGN KEY (Question_Bank_id) REFERENCES Question_Bank(id_question) ON DELETE CASCADE,
    FOREIGN KEY (Topic_id) REFERENCES Topic(id_Topic) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS LearningSession (
    id_session integer NOT NULL PRIMARY KEY,
    learner_id integer NOT NULL,
    Lessons_id integer NOT NULL,
    score TEXT,
    time_spent TEXT,
    completion_at datetime NULL,
    FOREIGN KEY (Lessons_id) REFERENCES Lessons(id_lessons) ON DELETE CASCADE,
    FOREIGN KEY (learner_id) REFERENCES learners(id_learners) ON DELETE CASCADE
);
  `);
  return db;
};

export const DatabaseProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
  const [isDbLoading, setDbLoading] = useState(true);
  useEffect(() => {
    const loadDatabase = async () => {
      setDbLoading(true);
      try {
        const dbInstance = await initDatabase();
        setDb(dbInstance);
        console.log("handle Local Stored: Database initialized successfully.");
        return dbInstance;
      } catch (e) {
        console.error("Lỗi khi khởi tạo cơ sở dữ liệu nè: ", e);
        alert("Lỗi khi khởi tạo cơ sở dữ liệu" + e);
      } finally {
        setDbLoading(false);
      }
    };
    loadDatabase();
  }, []);

  const databaseFunctions = {
    checkLoginStatus: async (): Promise<learners | null> => {
      if (!db) return null;
      const result = await db.getFirstAsync<learners>(
        "select * from learners LIMIT 1"
      );
      return result || null;
    },

    getLearnerProfiles: async (): Promise<Learner_Profiles | null> => {
      if (!db) return null;

      const result = await db.getFirstAsync<Learner_Profiles>(
        "select * from Learner_Profiles LIMIT 1"
      );

      return result || null;
    },

    getCourse: async (): Promise<course | null> => {
      if (!db) return null;

      const result = await db.getFirstAsync<course>(
        "select * from course LIMIT 1"
      );

      return result || null;
    },

    getLesson: async (): Promise<Lessons[] | []> => {
      if (!db) return [];

      const result = await db.getAllAsync<Lessons>("select * from Lessons");
      return result || [];
    },

    getLessonGroup: async (): Promise<Lesson_Group[] | []> => {
      if (!db) return [];

      const result = await db.getAllAsync<Lesson_Group>(
        "select * from Lesson_Group"
      );
      return result || [];
    },

    getQuestionGroup: async (): Promise<Question_Group[] | []> => {
      if (!db) return [];

      const result = await db.getAllAsync<Question_Group>(
        "select * from Question_Group"
      );

      return result || [];
    },

    getQuestionGroupFollowId: async (Lessons_id: number): Promise<Question_Group[] | []> => {
      if (!db) return [];

      try {
        const result = await db.getAllAsync<Question_Group>(
        "select * from Question_Group where Lessons_id = ?", [Lessons_id]
      );
      
      return result || [];
      } catch (error) {
        console.log("Can get Question follow lesson id: ", Lessons_id.toString(), " error: ", error);
        return [];
      }
    },

    getQuestionBank: async (): Promise<Question_Bank[] | []> => {
      if (!db) return [];

      const result = await db.getAllAsync<Question_Bank>(
        "select * from Question_Bank"
      );

      return result || [];
    },

    getQuestionBankFollowId: async (
      id_question: number
    ): Promise<Question_Bank | null> => {
      if (!db) return null;
      try {
        const result = await db.getFirstAsync<Question_Bank>(
          "select * from Question_Bank where id_question = ?LIMIT 1",
          [id_question]
        );
        return result || null;
      } catch (error) {
        console.error("Error fetching Question_Bank:", error);
        return null;
      }
    },

    getLearningSession: async (): Promise<learningsession[] | []> => {
      if (!db) return [];

      const result = await db.getAllAsync<learningsession>(
        "select * from LearningSession"
      );

      return result || [];
    },

    RegisterLearner: async (
      id_learners: number,
      email: string | null,
      password_hash: string | null,
      access_token: string | null,
      refresh_token: string | null,
      full_name: string,
      created_at: string | null
    ) => {
      if (!db || isDbLoading) {
        console.log("RegisterLearner: DB chưa sẵn sàng");
        return false;
      }
      try {
        const created_at = new Date().toString();
        console.log("Insert params:", {
          id_learners,
          email,
          access_token,
          refresh_token,
          full_name,
          created_at,
        });

        const result = await db.runAsync(
          `INSERT OR REPLACE INTO learners(id_learners, email, password_hash, access_token, refresh_token, full_name, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            id_learners,
            email ?? null,
            password_hash ?? null,
            access_token ?? null,
            refresh_token ?? null,
            full_name ?? null,
            created_at ?? new Date().toISOString(),
          ]
        );
        console.log(
          "Login success full:",
          result.lastInsertRowId,
          result.changes
        );

        return true;
      } catch (error) {
        console.log("Register Error", error);

        return false;
      }
    },

    setTopics: async (data: topicContext[] | topicContext) => {
      if (!db) {
        console.error("Database is not ready.");
        return;
      }

      const dataArray = Array.isArray(data) ? data : [data];
      if (dataArray.length === 0) {
        console.log("Không có dữ liệu Topic để chèn.");

        return;
      }
      try {
        for (const item of dataArray) {
          if (item && item.id_Topic) {
            await db.runAsync(
              `INSERT OR REPLACE INTO Topic (id_Topic, Topic_name, Topic_description) VALUES (?, ?, ?)`,
              [item.id_Topic, item.Topic_name, item.Topic_description]
            );
          }
        }
        console.log("Dữ liệu Topic đã được chèn/cập nhật thành công.");
      } catch (error) {
        console.error("Lỗi khi chèn dữ liệu Topic:", error);
      }
    },

    setLevels: async (data: level[] | level) => {
      if (!db) {
        console.error("Database is not ready.");
        return;
      }
      const dataArray = Array.isArray(data) ? data : [data];
      if (dataArray.length === 0) {
        console.log("Không có dữ liệu Levels để chèn.");
        return;
      }
      try {
        for (const item of dataArray) {
          if (item && item.id_level) {
            await db.runAsync(
              `INSERT OR REPLACE INTO Levels (id_level, Level_name, Level_description) VALUES (?, ?, ?)`,
              [item.id_level, item.Level_name, item.Level_description]
            );
          }
        }
        console.log("Dữ liệu Levels đã được chèn/cập nhật thành công.");
      } catch (error) {
        console.error("Lỗi khi chèn dữ liệu Levels:", error);
      }
    },

    setCourse: async (data: any[] | any) => {
      if (!db) {
        console.error("Database is not ready.");
        return;
      }
      const dataArray = Array.isArray(data) ? data : [data];
      if (dataArray.length === 0) {
        console.log("Không có dữ liệu Course để chèn.");
        return;
      }
      try {
        for (const item of dataArray) {
          if (item && item.id_Course) {
            await db.runAsync(
              `INSERT OR REPLACE INTO course (id_Course, title, description, completion, completion_date, Level_id, Topic_id) VALUES (?, ?, ?, ?, ?, ?, ?)`,
              [
                item.id_Course,
                item.title,
                item.description,
                item.completion,
                item.completion_date,
                item.Level,
                item.Topic,
              ]
            );
          }
        }
        console.log("Dữ liệu Course đã được chèn/cập nhật thành công.");
      } catch (error) {
        console.error("Lỗi khi chèn dữ liệu Course:", error);
      }
    },

    setLearnerProfiles: async (data: any) => {
      if (!db) {
        console.error("Database is not ready.");
        return;
      }
      try {
        if (data) {
          await db.runAsync(
            `INSERT OR REPLACE INTO Learner_Profiles (id_Profiles, id_learners, aim, score, course_id, progress_learners, Level_id) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
              data.id_Profiles,
              data.Learners,
              data.aim,
              data.score,
              data.Course,
              data.progress_learners,
              data.Level,
            ]
          );
        }
        console.log(
          "Dữ liệu Learner_Profiles đã được chèn/cập nhật thành công."
        );
      } catch (error) {
        console.error("Lỗi khi chèn dữ liệu Learner_Profiles:", error);
      }
    },

    setLessonGroup: async (data: any[] | any) => {
      if (!db) {
        console.error("Database is not ready.");
        return;
      }
      const dataArray = Array.isArray(data) ? data : [data];
      if (dataArray.length === 0) {
        console.log("Không có dữ liệu Lesson_Group để chèn.");
        return;
      }
      try {
        for (const item of dataArray) {
          if (item && item.id_group) {
            await db.runAsync(
              `INSERT OR REPLACE INTO Lesson_Group (id_group, title, description, Course_id, Level_id, Topic_id) VALUES (?, ?, ?, ?, ?, ?)`,
              [
                item.id_group,
                item.title,
                item.description,
                item.Course,
                item.Level,
                item.Topic,
              ]
            );
          }
        }
        console.log("Dữ liệu Lesson_Group đã được chèn/cập nhật thành công.");
      } catch (error) {
        console.error("Lỗi khi chèn dữ liệu Lesson_Group:", error);
      }
    },

    setLessons: async (data: any[] | any) => {
      if (!db) {
        console.error("Database is not ready.");
        return;
      }
      const dataArray = Array.isArray(data) ? data : [data];
      if (dataArray.length === 0) {
        console.log("Không có dữ liệu Lessons để chèn.");
        return;
      }
      try {
        for (const item of dataArray) {
          if (item && item.id_lessons) {
            await db.runAsync(
              `INSERT OR REPLACE INTO Lessons (id_lessons, title, description, completion, completion_date, Lesson_Group_id, Level_id, Topic_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
              [
                item.id_lessons,
                item.title,
                item.description,
                item.completion,
                item.completion_date,
                item.Lesson_Group,
                item.Level,
                item.Topic,
              ]
            );
          }
        }
        console.log("Dữ liệu Lessons đã được chèn/cập nhật thành công.");
      } catch (error) {
        console.error("Lỗi khi chèn dữ liệu Lessons:", error);
      }
    },

    setQuestionBank: async (data: any[] | any) => {
      if (!db) {
        console.error("Database is not ready.");
        return;
      }
      const dataArray = Array.isArray(data) ? data : [data];
      if (dataArray.length === 0) {
        console.log("Không có dữ liệu Question_Bank để chèn.");
        return;
      }
      try {
        for (const item of dataArray) {
          if (item && item.id_question) {
            await db.runAsync(
              `INSERT OR REPLACE INTO Question_Bank (id_question, question, question_type, option_a, option_b, option_c, option_d, correct_answer, passage, grammar_rule, grammar_example, audio_text, transcript, explain_question, level_id, topic_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
              [
                item.id_question,
                item.question,
                item.question_type,
                item.option_a,
                item.option_b,
                item.option_c,
                item.option_d,
                item.correct_answer,
                item.passage,
                item.grammar_rule,
                item.grammar_example,
                item.audio_text,
                item.transcript,
                item.explain_question,
                item.level,
                item.topic_id,
              ] 
            );
          }
        }
        console.log("Dữ liệu Question_Bank đã được chèn/cập nhật thành công.");
      } catch (error) {
        console.error("Lỗi khi chèn dữ liệu Question_Bank:", error);
      }
    },

    setQuestionGroup: async (data: any[] | any) => {
      if (!db) {
        console.error("Database is not ready.");
        return;
      }
      const dataArray = Array.isArray(data) ? data : [data];
      if (dataArray.length === 0) {
        console.log("Không có dữ liệu Question_Group để chèn.");
        return;
      }
      try {
        for (const item of dataArray) {
          if (item && item.id_QuestionGroup) {
            await db.runAsync(
              `INSERT OR REPLACE INTO Question_Group (id_QuestionGroup, Lessons_id, Question_Bank_id, Topic_id) VALUES (?, ?, ?, ?)`,
              [
                item.id_QuestionGroup,
                item.Lessons,
                item.Question_bank,
                item.Topic,
              ]
            );
          }
        }
        console.log("Dữ liệu Question_Group đã được chèn/cập nhật thành công.");
      } catch (error) {
        console.error("Lỗi khi chèn dữ liệu Question_Group:", error);
      }
    },

    setLearningSession: async (data: learningsession[] | learningsession) => {
      if (!db) {
        console.error("Database is not ready.");
        return;
      }
      const dataArray = Array.isArray(data) ? data : [data];
      if (dataArray.length === 0) {
        console.log("Không có dữ liệu LearningSession để chèn.");
        return;
      }
      try {
        for (const item of dataArray) {
          if (item && item.id_session) {
            await db.runAsync(
              `INSERT OR REPLACE INTO LearningSession (id_session, learner_id, Lessons_id, score, time_spent, completion_at) VALUES (?, ?, ?, ?, ?, ?)`,
              [
                item.id_session,
                item.learners_id,
                item.lessons_id,
                item.score,
                item.timespent,
                item.complete_at,
              ]
            );
          }
        }
        console.log(
          "Dữ liệu LearningSession đã được chèn/cập nhật thành công."
        );
      } catch (error) {
        console.error("Lỗi khi chèn dữ liệu LearningSession:", error);
      }
    },

    //hàm chúng sinh bình đẳng hủy diệt thế giới
    resetDatabaseForTesting: async () => {
      if (!db) {
        console.error("Database is not ready for reset.");
        return;
      }
      try {
        await db.execAsync(`DROP TABLE IF EXISTS learners;`);
        console.log("Learners table dropped successfully.");

        await initDatabase();
        console.log("All tables recreated successfully.");
      } catch (error) {
        console.error("Failed to reset database:", error);
        throw error;
      }
    },
  };

  const value: DatabaseContextType = { db, isDbLoading, ...databaseFunctions };
  return (
    <handleLocalStoredContext.Provider value={value}>
      {children}
    </handleLocalStoredContext.Provider>
  );
};

export const useDatabase = () => {
  const context = useContext(handleLocalStoredContext);
  if (context === undefined) {
    console.log("useDatabase must be used winthin a DatabaseProvider");
    throw new Error("useDatabase must be used winthin a DatabaseProvider");
  }
  return context;
};
