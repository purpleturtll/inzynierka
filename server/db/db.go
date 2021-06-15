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

func InitTest() {
	dsn := "sqlserver://admin1:admin1@localhost:1433?database=INZ_DB_TEST"
	db, err = gorm.Open(sqlserver.Open(dsn), &gorm.Config{})
	if err != nil {
		return
	}
}

func CleanTest() {
	db.Exec("DELETE FROM animals")
	db.Exec("DELETE FROM animal_types")
	db.Exec("DELETE FROM chats")
	db.Exec("DELETE FROM pictures")
	db.Exec("DELETE FROM shelters")
	db.Exec("DELETE FROM fav_animals")
	db.Exec("DELETE FROM users")
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
