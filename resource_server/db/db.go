package db

import (
	"inzynierka/models"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB
var err error

func Init() {
	db, err = gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		return
	}
}

func Migrate() {
	db.AutoMigrate(
		&models.Animal{},
		&models.AnimalType{},
		&models.Chat{},
		&models.Picture{},
		&models.Shelter{},
		&models.User{},
	)
}

func Connection() *gorm.DB {
	return db
}
