package db

import (
	"fmt"
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
	err := db.AutoMigrate(
		&models.Animal{},
		&models.AnimalType{},
		&models.Chat{},
		&models.Picture{},
		&models.Shelter{},
		&models.User{},
	)
	fmt.Println(err)
}

func Connection() *gorm.DB {
	return db
}
