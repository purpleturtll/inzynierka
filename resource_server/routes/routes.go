package routes

import (
	"inzynierka/routes/animal"
	"inzynierka/routes/auth"

	"github.com/labstack/echo/v4"
)

func Init(g *echo.Group) {
	animal.Router{}.Init(g.Group("/animal"))
	auth.Router{}.Init(g.Group("/auth"))
}
