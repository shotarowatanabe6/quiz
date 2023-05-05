package worker

import (
	"go-app/internal/app"
	"go-app/internal/app/api/handlers"
	"log"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type Worker struct {
	Config app.Config
}

func NewWorker(config app.Config) *Worker {
	return &Worker{
		Config: config,
	}
}

func (w *Worker) Run() {
	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"PUT", "PATCH"},
		AllowHeaders:     []string{"Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	router.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Hello World!",
		})
	})

	router.GET("/question", handlers.GetQuestionSet)
	router.POST("/choice", handlers.PostSelectedChoice)

	if err := router.Run(":8080"); err != nil {
		log.Fatal(err)
	}
}
