package models

type QuestionSet struct {
	Id       string
	Question string
	Choices  []string
	Answer   Answer
}

type Answer struct {
	ChoiceIndex int
	Text        string
}