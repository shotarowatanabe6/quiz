export interface QuestionSet {
  Id: string;
  Question: string;
  Choices: string[];
  Answer: {
    ChoiceIndex: number;
    Text: string;
  };
}
