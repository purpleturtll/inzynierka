package routes

import (
	"inzynierka/routes/animal"
	"inzynierka/routes/animal_type"
	"inzynierka/routes/auth"

	"github.com/labstack/echo/v4"
)

func Init(g *echo.Group) {
	// Group for /animal routes
	animalGroup := g.Group("/animal")
	// For now requires auth
	//animalGroup.Use(middleware.JWTWithConfig(config.JWTConfig))
	animal.Router{}.Init(animalGroup)

	//Also requires auth for now
	animalTypeGroup := g.Group("/animal_type")
	//animalTypeGroup.Use(middleware.JWTWithConfig(config.JWTConfig))
	animal_type.Router{}.Init(animalTypeGroup)

	// Requires no auth
	auth.Router{}.Init(g.Group("/auth"))
}
