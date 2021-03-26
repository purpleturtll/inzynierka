package main

import (
	"inzynierka/routes"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

var err error

func main() {
	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	g := e.Group("")
	routes.Init(g)

	e.Logger.Fatal(e.Start(":8080"))
}

// func readType(c echo.Context) error {
// 	id := c.QueryParam("id")
// 	id_int, _ := strconv.Atoi(id)
// 	at := &AnimalType{}
// 	result := db.First(&at, id_int)
// 	if result.Error == gorm.ErrRecordNotFound {
// 		return c.String(http.StatusNotFound, "Not Found")
// 	}
// 	return c.String(http.StatusOK, at.Animal_type)
// }

// func addType(c echo.Context) error {
// 	at := new(AnimalType)
// 	if err := c.Bind(at); err != nil {
// 		return err
// 	}
// 	result := db.Where("type = ?", at.Animal_type).First(&AnimalType{})
// 	if result.Error == gorm.ErrRecordNotFound {
// 		db.Create(at)
// 		return c.String(http.StatusCreated, "Created")
// 	}
// 	return c.String(http.StatusFound, "Already exists!")
// }
