package favanimal

import "github.com/labstack/echo/v4"

type Router struct{}

func (Router) Init(g *echo.Group) {
	g.POST("/create", Create)
	g.GET("/read/:user_id", ReadForUser)
	g.DELETE("/delete", Delete)
}
