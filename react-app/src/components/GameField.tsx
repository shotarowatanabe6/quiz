import React, { useState, useRef, useEffect } from "react";
import io, { Socket } from "socket.io-client";

import Operation from "./Operation";
import Chat from "./Chat";
import Question from "../components/quiz/Question";
import Choice from "../components/quiz/Choice";
import { QuestionSet } from "../models/questionSet";
import GetQuestionSet from "../services/getQuestionSet";

const initialQuestionSet = {
  Id: "",
  Question: "",
  Choices: [],
  Answer: {
    ChoiceIndex: 0,
    Text: "",
  },
};

const GameField: React.FC = () => {
  const [entered, setEntered] = useState(false);
  const [name, setName] = useState("");
  const [buttonDisabled, setChoicesDisabled] = useState(true);
  const [questionSet, setQuestionSet] =
    useState<QuestionSet>(initialQuestionSet);
  const [question, setQuestion] = useState<string>("");
  const [choices, setChoices] = useState<string[]>([]);

  const socketRef = useRef<Socket>(io("http://localhost:3001"));

  const onClickShowQuestion = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.preventDefault(); // フォームのデフォルトの動作（リロード）を防ぐ
    // APIを叩きquestionSetを取得する
    (async () => {
      try {
        const q = await GetQuestionSet();
        if (q) {
          console.log(q);
          setQuestionSet(q);
          socketRef.current?.emit("showQuestion", q.Question);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  };

  useEffect(() => {
    socketRef.current.on("connect", () => {
      socketRef.current.emit("join", {
        name: name,
      });
    });
    socketRef.current.on("showQuestion", (question: string) => {
      setQuestion(question);
      console.log(question);
    });
    socketRef.current.on("showChoices", (choices: string[]) => {
      setChoices(choices);
      console.log(choices);
      setChoicesDisabled(false);
    });
    socketRef.current.on("disconnect", () => {
      socketRef.current.disconnect();
    });
  }, []);

  const onClickShowChoices = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault(); // フォームのデフォルトの動作（リロード）を防ぐ
    socketRef.current?.emit("showChoices", questionSet.Choices);
  };

  const handleEnter = (name: string) => {
    setEntered(true);
    setName(name);
  };
  const handleLeave = () => {
    setEntered(false);
  };

  return (
    <>
      <div>
        <button onClick={onClickShowQuestion}>問題を表示</button>
        <button onClick={onClickShowChoices}>選択肢を表示</button>
        <Question question={question} />
        <Choice
          choices={choices}
          answer={questionSet.Answer}
          buttonDisabled={buttonDisabled}
          setChoicesDisabled={setChoicesDisabled}
        />
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
