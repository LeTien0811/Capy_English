import React from 'react'
import { AnswerObject, Question_Bank, QuestionContext } from "@/libs/type";
import handleMapText from './handleMapText';

const HandleMapQuestions = (questionData: Question_Bank):QuestionContext => {
    const { id_question, question_type, question, option_a, option_b, option_c, option_d, correct_answer, passage, grammar_rule, grammar_example, audio_text, transcript, matching_pair, explain_question} = questionData;
    let answersArray = [
        { AnswerId: "A", Answer: handleMapText(option_a)},
        { AnswerId: "B", Answer: handleMapText(option_b)},
        { AnswerId: "C", Answer: handleMapText(option_c)},
        { AnswerId: "D", Answer: handleMapText(option_d)},
        ];
    let matching = [];
    if(matching_pair != null) {
        matching = JSON.parse(matching_pair);
    }
    return {
        QuestionID: id_question.toString(),
        question_type: question_type,
        Question: handleMapText(question),
        Answer: answersArray,
        passage: handleMapText(passage),
        grammar_rule: handleMapText(grammar_rule),
        grammar_example: handleMapText(grammar_example),
        audio_text: audio_text,
        transcript: handleMapText(transcript),
        matching_pair: matching,
        explain_question: explain_question,
        correctAnswer: correct_answer 
    };
}

export default HandleMapQuestions