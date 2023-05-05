package handlers

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func PostSelectedChoice(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	fmt.Println(db)
	c.JSON(http.StatusOK, gin.H{"questionSet": ""})
}

type Answer struct {
	gorm.Model
	ID                  string `json:"ID"`
	QuestionID          string `json:"QuestionID"`
	AnsweredUser        string `json:"AnsweredUser"`
	AnsweredChoiceText  string `json:"AnsweredChoiceText"`
	AnsweredChoiceIndex int    `json:"AnsweredChoiceIndex"`
}
