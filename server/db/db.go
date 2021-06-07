package db

import (
	"fmt"
	"inzynierka/models"

	"gorm.io/driver/sqlserver"
	"gorm.io/gorm"
)

var db *gorm.DB
var err error

func Init() {
	dsn := "sqlserver://admin1:admin1@localhost:1433?database=INZ_DB"
	db, err = gorm.Open(sqlserver.Open(dsn), &gorm.Config{})
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
