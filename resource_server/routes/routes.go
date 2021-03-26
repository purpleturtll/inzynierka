package routes

import (
	"inzynierka/routes/animal"

	"github.com/labstack/echo/v4"
)

func Init(g *echo.Group) {
	animal.Router{}.Init(g.Group("/animal"))
}
