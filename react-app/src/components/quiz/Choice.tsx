import React, { useState, useEffect } from "react";
import Result from "./Result";
import { QuestionSet } from "../../models/questionSet";

interface ChoiceProps {
  questionSet: QuestionSet;
  optionalProp?: string;
}

function Choice({ questionSet, optionalProp }: ChoiceProps) {
  const format = (choice: string) => " " + choice + " ";
  const isCorrectAnswer = (correctAnswer: string, userAnswer: string) => {
    return correctAnswer === userAnswer;
  };
  const correctAnswer = questionSet.Answer.Text;

  const [userAnswer, setUserAnswer] = useState("");
  const [result, setResult] = useState<string | undefined>();

  useEffect(() => {
    if (userAnswer === "") {
      return;
    }
    if (isCorrectAnswer(correctAnswer, userAnswer)) {
      setResult("Correct");
    } else {
      setResult("Incorrect");
    }
    console.log(userAnswer, correctAnswer, result);
  }, [userAnswer, correctAnswer, result]);

  const handleOnClick = (questionSet: QuestionSet, c: string) => {
    setUserAnswer(c);
  };

  return (
    <div>
      {questionSet.Choices.map((c, index) => (
        <button
          onClick={() => {
            handleOnClick(questionSet, c);
          }}
          key={index}
        >
          {format(c)}
        </button>
      ))}
      {result && <Result correctAnswer={correctAnswer} result={result} />}
    </div>
  );
}

export default Choice;
