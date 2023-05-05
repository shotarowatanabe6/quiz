package main

import (
	"log"
	"net/http"

	"./config"

	"github.com/gin-gonic/gin"
)

func main() {
	// configを読み込む
	config.Init()

	// ginのルーターを初期化
	r := gin.Default()

	// コントローラーをルーターに登録
	uc := controller.NewUserController()
	router.UserRouter(r, uc)

	// サーバーを起動
	err := http.ListenAndServe(config.AppConfig.AppPort, r)
	if err != nil {
		log.Fatalf("failed to start server: %v", err)
	}
}
