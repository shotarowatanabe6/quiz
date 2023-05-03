package handlers

import (
	"net/http"
	"quiz/models"

	"github.com/gin-gonic/gin"
)

func GetQuestionSet(c *gin.Context) {
	questionSet := models.QuestionSet{
		Id: "123",
		Question: "ジンとベルモットを混ぜ合わせて作る、「カクテルの王様」とも呼ばれるカクテルは？",
		Choices: []string{"アメリカーノ", "マンハッタン", "マティーニ", "ギムレット"},
		Answer: models.Answer{
			ChoiceIndex: 3,
			Text:"マティーニ",
		},
	}
	c.JSON(http.StatusOK, gin.H{"questionSet": questionSet})
}
