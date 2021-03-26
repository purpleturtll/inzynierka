package auth

import "github.com/labstack/echo/v4"

type AuthRouter struct{}

func (AuthRouter) Init(g *echo.Group) {
	g.POST("/login", Login)
	g.POST("/register", Register)
}
