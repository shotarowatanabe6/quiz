import { QuestionSetType } from '../models/questionSetType'

export const getQuestionSet = async () => {
  const response = await fetch('/api/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
    // body: JSON.stringify(questionSet)
  })

  if (!response.ok) {
    throw new Error('Failed to get questionSet')
  }

  const data = await response.json()
  return data
}
