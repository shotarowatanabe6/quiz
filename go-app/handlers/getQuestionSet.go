package handlers

import (
	"math/rand"
	"net/http"
	"quiz/models"
	"time"

	"github.com/gin-gonic/gin"
)

func GetQuestionSet(c *gin.Context) {
	questionSets := []models.QuestionSet{
		{
			Id: "1",
			Question: "ジンとベルモットを混ぜ合わせて作る、「カクテルの王様」とも呼ばれるカクテルは？",
			Choices: []string{"アメリカーノ", "マンハッタン", "マティーニ", "ギムレット"},
			Answer: models.Answer{
				ChoiceIndex: 3,
				Text:"マティーニ",
			},
		}, {
			Id: "2",
			Question: "アメリカ合衆国の州の名前に使われていないのはどれ？",
			Choices: []string{"ノース", "イースト", "サウス", "ウエスト"},
			Answer: models.Answer{
				ChoiceIndex: 2,
				Text:"イースト",
			},
		}, {
			Id: "3",
			Question: "1933年の映画『風とともに去りぬ』で、主演のスカーレット・オハラを演じた女優は誰？",
			Choices: []string{"キャサリン・ヘップバーン", "オードリー・ヘップバーン", "イングリッド・バーグマン", "ビビアン・リー"},
			Answer: models.Answer{
				ChoiceIndex: 4,
				Text:"ビビアン・リー",
			},
		},
}

	seed := time.Now().UnixNano()
	r := rand.New(rand.NewSource(seed))
	questionSet := questionSets[r.Intn(len(questionSets))]

	c.JSON(http.StatusOK, gin.H{"questionSet": questionSet})
}
