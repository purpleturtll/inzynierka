package main

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type AnimalType struct {
	gorm.Model
	Animal_type string `json:"animal_type" gorm:"column:type"`
}

var db *gorm.DB
var err error

func main() {
	db, err = gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	db.AutoMigrate(&AnimalType{})
	if err != nil {
		return
	}
	e := echo.New()
	e.Logger.SetLevel(0)
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.GET("/animaltype", readType)
	e.POST("/animaltype", addType)

	e.Logger.Fatal(e.Start(":8080"))
}

func readType(c echo.Context) error {
	id := c.QueryParam("id")
	id_int, _ := strconv.Atoi(id)
	at := &AnimalType{}
	result := db.First(&at, id_int)
	if result.Error == gorm.ErrRecordNotFound {
		return c.String(http.StatusNotFound, "Not Found")
	}
	return c.String(http.StatusOK, at.Animal_type)
}

func addType(c echo.Context) error {
	at := new(AnimalType)
	if err := c.Bind(at); err != nil {
		return err
	}
	result := db.Where("type = ?", at.Animal_type).First(&AnimalType{})
	if result.Error == gorm.ErrRecordNotFound {
		db.Create(at)
		return c.String(http.StatusCreated, "Created")
	}
	return c.String(http.StatusFound, "Already exists!")
}
