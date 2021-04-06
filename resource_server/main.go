package main

import (
	"inzynierka/db"
	"inzynierka/routes"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	db.Init()
	db.Migrate()
	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	g := e.Group("")
	routes.Init(g)

	e.Logger.Fatal(e.Start(":8080"))
}
