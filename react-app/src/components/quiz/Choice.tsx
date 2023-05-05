import React, { useState, useEffect } from "react";
import Result from "./Result";
import { QuestionSetAnswer } from "../../models/questionSet";

interface ChoiceProps {
  choices: string[];
  answer: QuestionSetAnswer;
  buttonDisabled: boolean;
  setChoicesDisabled: (value: boolean) => void;
}

function Choice({
  choices,
  answer,
  buttonDisabled,
  setChoicesDisabled,
}: ChoiceProps) {
  const format = (choice: string) => " " + choice + " ";
  const isCorrectAnswer = (correctAnswer: string, userAnswer: string) => {
    return correctAnswer === userAnswer;
  };
  const correctAnswer = answer.Text;

  const [userAnswer, setUserAnswer] = useState("");
  const [result, setResult] = useState<string>("");

  useEffect(() => {
    if (userAnswer === "") {
      return;
    }
    if (isCorrectAnswer(correctAnswer, userAnswer)) {
      setResult("Correct");
    } else {
      setResult("Incorrect");
    }
  }, [userAnswer, correctAnswer, result]);

  const handleOnClick = (c: string) => {
    setChoicesDisabled(true);
    setUserAnswer(c);
  };

  return (
    <div>
      {choices.map((c, index) => (
        <button
          onClick={() => {
            handleOnClick(c);
          }}
          key={index}
          disabled={buttonDisabled}
        >
          {format(c)}
        </button>
      ))}
      {result && <Result correctAnswer={correctAnswer} result={result} />}
    </div>
  );
}

export default Choice;
