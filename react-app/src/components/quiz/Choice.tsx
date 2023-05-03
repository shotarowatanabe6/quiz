import React from "react";
import { QuestionSet } from "../../models/questionSet";
interface ChoiceProps {
  questionSet: QuestionSet;
  optionalProp?: string;
}

function Choice({ questionSet, optionalProp }: ChoiceProps) {
  const format = (choice: string) => " " + choice + " ";

  const handleOnClick = (c: string) => {
    alert(c);
  };

  return (
    <div>
      {questionSet.Choices.map((c, index) => (
        <button
          onClick={() => {
            handleOnClick(c);
          }}
          key={index}
        >
          {format(c)}
        </button>
      ))}
    </div>
  );
}

export default Choice;
