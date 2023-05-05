package domain

type UserRepository interface {
	GetAllUsers() ([]*User, error)
	GetUserByID(id int64) (*User, error)
	CreateUser(user *User) error
	UpdateUser(user *User) error
	DeleteUser(id int64) error
}
