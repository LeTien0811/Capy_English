export interface AnswerObject {
  AnswerId: string;
  Answer: string;
}
export interface LessonContext {
  QuestionID: string;
  Question: string;
  Answer: AnswerObject[];
  correctAnswer: string;
};

export interface UserLessonContext {
  QuestionID: string;
  Question: string;
  Answer: AnswerObject[];
  correctAnswer: string;
  SelectAnswer: string;
};

export interface Result {
  numberOfQuestion: number;
  score: number;
};
