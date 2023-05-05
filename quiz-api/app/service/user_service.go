package service

import (
	"errors"
	"time"

	"quiz-api/app/model"
)

type UserService struct {
	users []*model.User
}

func NewUserService() *UserService {
	return &UserService{
		users: []*model.User{},
	}
}

// 全ユーザーを取得
func (us *UserService) GetAllUsers() ([]*model.User, error) {
	return us.users, nil
}

// ユーザーを取得
func (us *UserService) GetUserById(id int) (*model.User, error) {
	for _, user := range us.users {
		if user.ID == id {
			return user, nil
		}
	}
	return nil, errors.New("user not found")
}

// ユーザーを作成
func (us *UserService) CreateUser(user *model.User) (*model.User, error) {
	user.ID = len(us.users) + 1
	user.CreatedAt = time.Now()
	user.UpdatedAt = time.Now()
	createdUser := &model.User{
		ID:        user.ID,
		Name:      user.Name,
		Email:     user.Email,
		CreatedAt: user.CreatedAt,
		UpdatedAt: user.UpdatedAt,
	}
	us.users = append(us.users, createdUser)
	return createdUser, nil
}

// ユーザーを更新
func (us *UserService) UpdateUserById(id int, user *model.User) (*model.User, error) {
	for i, u := range us.users {
		if u.ID == id {
			user.ID = u.ID
			user.CreatedAt = u.CreatedAt
			user.UpdatedAt = time.Now()
			us.users[i] = user
			return user, nil
		}
	}
	return nil, errors.New("user not found")
}

// ユーザーを削除
func (us *UserService) DeleteUserById(id int) error {
	for i, user := range us.users {
		if user.ID == id {
			us.users = append(us.users[:i], us.users[i+1:]...)
			return nil
		}
	}
	return errors.New("user not found")
}
