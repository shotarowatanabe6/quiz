import React, { useState } from "react";
import Question from "../components/quiz/Question";
import Choice from "../components/quiz/Choice";
import { QuestionSet } from "../models/questionSet";
import axios, { AxiosResponse } from "axios";

async function getQuestionSet(): Promise<QuestionSet> {
  try {
    const url = "http://localhost:8080/question";
    const response: AxiosResponse<{ questionSet: QuestionSet }> =
      await axios.get(url);
    if (response.data) {
      return response.data.questionSet;
    } else {
      throw new Error("Unexpected API response");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const GameField: React.FC = () => {
  const [questionSet, setQuestionSet] = useState<QuestionSet>({
    Id: "",
    Question: "",
    Choices: [],
    Answer: {
      ChoiceIndex: 0,
      Text: "",
    },
  });

  const onClickGetQuestionSet = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.preventDefault(); // フォームのデフォルトの動作（リロード）を防ぐ
    (async () => {
      const q = await getQuestionSet();
      if (q) {
        setQuestionSet(q);
      }
    })();
  };

  return (
    <div>
      <Question questionSet={questionSet} />
      <Choice questionSet={questionSet} />
      <button onClick={onClickGetQuestionSet}>問題を取得</button>
    </div>
  );
};

export default GameField;
