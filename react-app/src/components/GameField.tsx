import React, { useState } from 'react'
import Question from '../components/quiz/Question'
import Choice from '../components/quiz/Choice'
import { getQuestionSet } from '../services/getQuestionSet'
import { QuestionSetType } from '../models/questionSetType'

function GameField() {
  const [questionSet, setQuestionSet] = useState<QuestionSetType>({
    id: '',
    question: '',
    choices: [''],
    answer: {
      choiceIndex: 0,
      text: ''
    }
  })

  const onClickGetQuestionSet = async (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault()
    const data = await getQuestionSet()
    setQuestionSet(data)
    // handle success or error
  }

  // const questionSetData = {
  //   question: '問題',
  //   choices: ['選択肢1', '選択肢2', '選択肢3', '選択肢4'],
  //   answer: {
  //     choiceIndex: 3,
  //     text: '選択肢3'
  //   }
  // }

  const { question, choices } = questionSet
  return (
    <div>
      <Question question={question} />
      <Choice choices={choices} />
      <button onClick={onClickGetQuestionSet}>問題を取得</button>
    </div>
  )
}

export default GameField
