import React from 'react'

interface QuestionProps {
  question: string
  optionalProp?: string
}

function Question({ question, optionalProp }: QuestionProps) {
  return <div>{question}</div>
}

export default Question
