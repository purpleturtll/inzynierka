package routes

import (
	"inzynierka/routes/animal"
	"inzynierka/routes/animal_type"
	"inzynierka/routes/auth"

	"github.com/labstack/echo/v4"
)

func Init(g *echo.Group) {
	animal.Router{}.Init(g.Group("/animal"))
	animal_type.Router{}.Init(g.Group("/animal_type"))
	auth.Router{}.Init(g.Group("/auth"))
}
