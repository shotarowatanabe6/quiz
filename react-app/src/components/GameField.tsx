import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";

import Operation from "./Operation";
import Chat from "./Chat";
import Question from "../components/quiz/Question";
import Choice from "../components/quiz/Choice";
import { QuestionSet } from "../models/questionSet";

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
  const [entered, setEntered] = useState(false);
  const [name, setName] = useState("");

  const handleEnter = (name: string) => {
    setEntered(true);
    setName(name);
  };

  const handleLeave = () => {
    setEntered(false);
  };

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
    <>
      <div>
        <button onClick={onClickGetQuestionSet}>問題を取得</button>
        <Question questionSet={questionSet} />
        <Choice questionSet={questionSet} />
      </div>
      <hr></hr>
      <div>
        <Operation
          onEnter={handleEnter}
          onLeave={handleLeave}
          entered={entered}
        />
        {entered && <Chat name={name} />}
      </div>
    </>
  );
};

export default GameField;
