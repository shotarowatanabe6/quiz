import React from "react";
import { QuestionSet } from "../../models/questionSet";
interface QuestionProps {
  question: string;
  optionalProp?: string;
}

function Question({ question, optionalProp }: QuestionProps) {
  return <div>{question}</div>;
}

export default Question;
