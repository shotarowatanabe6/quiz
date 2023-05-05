package repository

import (
	"context"

	"go-app/internal/app/domain"

	"github.com/jinzhu/gorm"
)

// TodoRepository is a repository for managing Todo items
type TodoRepository struct {
	db *gorm.DB
}

// NewTodoRepository creates a new TodoRepository instance
func NewTodoRepository(db *gorm.DB) *TodoRepository {
	return &TodoRepository{db}
}

// CreateTodo creates a new Todo item
func (r *TodoRepository) CreateTodo(ctx context.Context, todo *domain.Todo) error {
	return r.db.Create(todo).Error
}

// GetTodo retrieves a Todo item by ID
func (r *TodoRepository) GetTodo(ctx context.Context, id int64) (*domain.Todo, error) {
	var todo domain.Todo
	if err := r.db.First(&todo, id).Error; err != nil {
		if gorm.IsRecordNotFoundError(err) {
			// return nil, domain.ErrNotFound
			return nil, err
		}
		return nil, err
	}
	return &todo, nil
}

// UpdateTodo updates an existing Todo item
func (r *TodoRepository) UpdateTodo(ctx context.Context, todo *domain.Todo) error {
	return r.db.Save(todo).Error
}

// DeleteTodo deletes a Todo item by ID
func (r *TodoRepository) DeleteTodo(ctx context.Context, id int64) error {
	return r.db.Delete(&domain.Todo{}, id).Error
}

// GetAllTodos retrieves all Todo items
func (r *TodoRepository) GetAllTodos(ctx context.Context) ([]*domain.Todo, error) {
	var todos []*domain.Todo
	if err := r.db.Find(&todos).Error; err != nil {
		return nil, err
	}
	return todos, nil
}
