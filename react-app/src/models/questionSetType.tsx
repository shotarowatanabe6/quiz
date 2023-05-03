export interface QuestionSetType {
  id: string
  question: string
  choices: string[]
  answer: {
    choiceIndex: number
    text: string
  }
}
