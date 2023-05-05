package database

import (
	"fmt"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

// MySQLConfig is the configuration for a MySQL database connection
type MySQLConfig struct {
	Username string
	Password string
	Host     string
	Port     string
	Database string
}

// NewMySQL creates a new MySQL database connection
func NewMySQL(cfg MySQLConfig) (*gorm.DB, error) {
	// Construct the DSN string
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		cfg.Username, cfg.Password, cfg.Host, cfg.Port, cfg.Database)

	// Open a connection to the MySQL database using the gorm library
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	return db, nil
}
