package domain

import "errors"

var (
	ErrUserNotFound = errors.New("user not found")
	ErrNotFound     = errors.New("not found")
	ErrUnauthorized = errors.New("unauthorized")
)

type UserUsecase interface {
	GetAllUsers() ([]*User, error)
	GetUserByID(id int64) (*User, error)
	CreateUser(user *User) error
	UpdateUser(user *User) error
	DeleteUser(id int64) error
}

type userUsecase struct {
	repo UserRepository
}

func NewUserUsecase(repo UserRepository) UserUsecase {
	return &userUsecase{repo: repo}
}

func (u *userUsecase) GetAllUsers() ([]*User, error) {
	return u.repo.GetAllUsers()
}

func (u *userUsecase) GetUserByID(id int64) (*User, error) {
	user, err := u.repo.GetUserByID(id)
	if err != nil {
		if err == ErrUserNotFound {
			return nil, ErrUserNotFound
		}
		return nil, err
	}
	return user, nil
}

func (u *userUsecase) CreateUser(user *User) error {
	return u.repo.CreateUser(user)
}

func (u *userUsecase) UpdateUser(user *User) error {
	_, err := u.GetUserByID(user.ID)
	if err != nil {
		return err
	}
	return u.repo.UpdateUser(user)
}

func (u *userUsecase) DeleteUser(id int64) error {
	_, err := u.GetUserByID(id)
	if err != nil {
		return err
	}
	return u.repo.DeleteUser(id)
}
