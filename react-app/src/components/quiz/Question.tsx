import React from "react";
import { QuestionSet } from "../../models/questionSet";
interface QuestionProps {
  questionSet: QuestionSet;
  optionalProp?: string;
}

function Question({ questionSet, optionalProp }: QuestionProps) {
  return <div>{questionSet.Question}</div>;
}

export default Question;
