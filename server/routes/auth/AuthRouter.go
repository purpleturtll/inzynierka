package auth

import "github.com/labstack/echo/v4"

type Router struct{}

func (Router) Init(g *echo.Group) {
	g.POST("/login", Login)
	g.POST("/register", Register)
	g.POST("/register_shelter", RegisterShelter)
}
