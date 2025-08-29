export interface AnswerObject {
  AnswerId: string;
  Answer: string;
}

export interface topicContext {
  id: number;
  name: string;
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
  Question: string;
  Answer: AnswerObject[];
  correctAnswer: string;
}

export interface UserLessonContext {
  QuestionID: string;
  Question: string;
  Answer: AnswerObject[];
  correctAnswer: string;
  SelectAnswer: string;
}

export interface Result {
  numberOfQuestion: number;
  score: number;
}
