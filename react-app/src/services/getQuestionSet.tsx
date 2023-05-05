import axios, { AxiosResponse } from "axios";

import { QuestionSet } from "../models/questionSet";

async function GetQuestionSet(): Promise<QuestionSet> {
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

export default GetQuestionSet;
