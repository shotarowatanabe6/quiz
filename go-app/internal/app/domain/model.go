package domain

import "time"

type User struct {
	ID        int64     `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type Todo struct {
	ID          int64     `gorm:"primaryKey"`
	Title       string    `gorm:"not null"`
	Description string    `gorm:"not null"`
	CreatedAt   time.Time `gorm:"autoCreateTime"`
	UpdatedAt   time.Time `gorm:"autoUpdateTime"`
}

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
