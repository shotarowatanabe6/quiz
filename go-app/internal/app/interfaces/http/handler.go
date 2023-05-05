package http

import (
	"net/http"
	"strconv"

	"go-app/internal/app/domain"

	"github.com/gin-gonic/gin"
)

// TodoHandler is a handler for managing Todo items
type TodoHandler struct {
	usecase domain.TodoUsecase
}

// NewTodoHandler creates a new TodoHandler instance
func NewTodoHandler(usecase domain.TodoUsecase) *TodoHandler {
	return &TodoHandler{usecase}
}

// CreateTodoHandler handles HTTP requests to create a new Todo item
func (h *TodoHandler) CreateTodoHandler(c *gin.Context) {
	// Parse the JSON request body
	var todo domain.Todo
	if err := c.ShouldBindJSON(&todo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Create the Todo item using the usecase
	if err := h.usecase.CreateTodo(c.Request.Context(), &todo); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Return the Todo item as a JSON response
	c.JSON(http.StatusCreated, todo)
}

// GetTodoHandler handles HTTP requests to get a Todo item by ID
func (h *TodoHandler) GetTodoHandler(c *gin.Context) {
	// Get the ID parameter from the URL path
	id := c.Param("id")

	// Parse the ID parameter as an integer
	idInt, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	// Get the Todo item using the usecase
	todo, err := h.usecase.GetTodo(c.Request.Context(), idInt)
	if err != nil {
		if err == domain.ErrNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Return the Todo item as a JSON response
	c.JSON(http.StatusOK, todo)
}

// UpdateTodoHandler
func (h *TodoHandler) UpdateTodoHandler(c *gin.Context) {
	// Get the ID parameter from the URL path
	id := c.Param("id")

	// Parse the ID parameter as an integer
	idInt, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	// Parse the JSON request body
	var todo domain.Todo
	if err := c.ShouldBindJSON(&todo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Set the ID of the Todo item to update
	todo.ID = idInt

	// Update the Todo item using the usecase
	if err := h.usecase.UpdateTodo(c.Request.Context(), &todo); err != nil {
		if err == domain.ErrNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Return the updated Todo item as a JSON response
	c.JSON(http.StatusOK, todo)
}

// DeleteTodoHandler handles HTTP requests to delete a Todo item by ID
func (h *TodoHandler) DeleteTodoHandler(c *gin.Context) {
	// Get the ID parameter from the URL path
	id := c.Param("id")

	// Parse the ID parameter as an integer
	idInt, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	// Delete the Todo item using the usecase
	if err := h.usecase.DeleteTodo(c.Request.Context(), idInt); err != nil {
		if err == domain.ErrNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Return a 204 No Content response
	c.Status(http.StatusNoContent)
}
