import React, { useState } from 'react'
import { beforeQuestion, QuestionContext } from "@/libs/type";

const useMapQuestions = (questionData: beforeQuestion):QuestionContext => {
    const { id, question, option_a, option_b, option_c, option_d, correct_answer, topic } = questionData;
    const answersArray = [
        { AnswerId: "A", Answer: option_a },
        { AnswerId: "B", Answer: option_b },
        { AnswerId: "C", Answer: option_c },
        { AnswerId: "D", Answer: option_d },
    ];
    
    return {
        QuestionID: id.toString(),
        Question: question,
        Answer: answersArray,
        correctAnswer: correct_answer 
    };
}

export default useMapQuestions