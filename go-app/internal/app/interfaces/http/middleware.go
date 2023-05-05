package http

import (
	"go-app/internal/app/domain"
)

// AuthMiddleware is a middleware for authenticating users
type AuthMiddleware struct {
	usecase domain.UserUsecase
}

// NewAuthMiddleware creates a new AuthMiddleware instance
func NewAuthMiddleware(usecase domain.UserUsecase) *AuthMiddleware {
	return &AuthMiddleware{usecase}
}

// Authenticate is a middleware function that checks if the user is authenticated
// func (m *AuthMiddleware) Authenticate() gin.HandlerFunc {
// 	return func(c *gin.Context) {
// 		// Get the Authorization header from the request
// 		authHeader := c.GetHeader("Authorization")

// 		// Check if the Authorization header is missing
// 		if authHeader == "" {
// 			c.JSON(http.StatusUnauthorized, gin.H{"error": "Missing Authorization header"})
// 			c.Abort()
// 			return
// 		}

// 		// Extract the access token from the Authorization
// 		// header
// 		accessToken := authHeader[7:]

// 		// Get the user by the access token using the usecase
// 		user, err := m.usecase.GetUserByAccessToken(c.Request.Context(), accessToken)
// 		if err != nil {
// 			if errors.Is(err, domain.ErrUnauthorized) {
// 				c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
// 				c.Abort()
// 				return
// 			}
// 			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
// 			c.Abort()
// 			return
// 		}

// 		// Add the user to the request context
// 		c.Set("user", user)

// 		// Continue with the next middleware or handler
// 		c.Next()
// 	}
// }
