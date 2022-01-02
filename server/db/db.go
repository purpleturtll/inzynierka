package db

import (
	"fmt"
	"inzynierka/models"
	"log"
	"os"
	"time"

	"gorm.io/driver/sqlserver"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var db *gorm.DB
var err error

func Init() {
	newLogger := logger.New(
		log.New(os.Stdout, "\r\n", log.LstdFlags), // io writer
		logger.Config{
			SlowThreshold:             time.Second,   // Slow SQL threshold
			LogLevel:                  logger.Silent, // Log level
			IgnoreRecordNotFoundError: true,          // Ignore ErrRecordNotFound error for logger
		},
	)

	dsn := "sqlserver://admin:jHsjH42Hj@localhost:1433?database=INZ_DB"
	db, err = gorm.Open(sqlserver.Open(dsn), &gorm.Config{FullSaveAssociations: true, Logger: newLogger})
	if err != nil {
		return
	}
}

func Migrate() {
	err := db.AutoMigrate(
		&models.Animal{},
		&models.AnimalType{},
		&models.Chat{},
		&models.FavAnimal{},
		&models.Picture{},
		&models.Shelter{},
		&models.User{},
	)
	fmt.Println(err)
}

func Connection() *gorm.DB {
	return db
}
