package main

import (
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/spf13/viper"

	"go-app/internal/app"
)

func main() {
	// Load configuration from YAML file
	viper.SetConfigFile("./config/app.yaml")
	err := viper.ReadInConfig()
	if err != nil {
		log.Fatalf("Failed to read configuration file: %v", err)
	}

	// Initialize the application
	app, err := app.NewApp()
	if err != nil {
		log.Fatalf("Failed to initialize application: %v", err)
	}

	// Create Gin router and middleware
	router := gin.Default()
	router.Use(app.LoggingMiddleware)

	// Define routes
	router.GET("/users", app.UserHandler.ListUsers)

	// Start HTTP server
	log.Printf("Starting HTTP server on port %v", viper.GetString("server.port"))
	if err := router.Run(fmt.Sprintf(":%v", viper.GetString("server.port"))); err != nil {
		log.Fatalf("Failed to start HTTP server: %v", err)
	}
}
