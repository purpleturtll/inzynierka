package routes

import (
	"inzynierka/routes/animal"

	"github.com/labstack/echo"
)

func Routes(g *echo.Group) {
	animal.Router{}.Init(g.Group("/animal"))
}
