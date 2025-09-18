import React from 'react'
import { AnswerObject, Question_Bank, QuestionContext } from "@/libs/type";

const HandleMapQuestions = (questionData: Question_Bank):QuestionContext => {
    const { id_question, question_type, question, option_a, option_b, option_c, option_d, correct_answer, passage, grammar_rule, grammar_example, audio_text, transcript,  explain_question} = questionData;
    let answersArray = [
        { AnswerId: "A", Answer: option_a ?? null},
        { AnswerId: "B", Answer: option_b ?? null},
        { AnswerId: "C", Answer: option_c ?? null},
        { AnswerId: "D", Answer: option_d ?? null},
        ];
    return {
        QuestionID: id_question.toString(),
        question_type: question_type,
        Question: question,
        Answer: answersArray,
        passage: passage,
        grammar_rule: grammar_rule,
        grammar_example: grammar_example,
        audio_text: audio_text,
        transcript: transcript,
        explain_question: explain_question,
        correctAnswer: correct_answer 
    };
}

export default HandleMapQuestions