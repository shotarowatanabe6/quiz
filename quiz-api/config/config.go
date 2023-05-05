package config

import (
	"os"
)

// アプリケーションの設定
type appConfig struct {
	AppPort string
}

// アプリケーションの設定のインスタンス
var AppConfig *appConfig

// 設定を初期化
func Init() {
	AppConfig = &appConfig{
		AppPort: os.Getenv("APP_PORT"),
	}
}
