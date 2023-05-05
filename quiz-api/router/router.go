package router

import (
	"github.com/gin-gonic/gin"
)

// ユーザーAPIのルーティング
func UserRouter(r *gin.Engine, uc *controller.UserController) {
	user := r.Group("/api/v1/user")
	{
		user.GET("/", uc.GetUsers)
		user.GET("/:id", uc.GetUser)
		user.POST("/", uc.CreateUser)
		user.PUT("/:id", uc.UpdateUser)
		user.DELETE("/:id", uc.DeleteUser)
	}
}
