package favanimal

import "github.com/labstack/echo/v4"

type Router struct{}

func (Router) Init(g *echo.Group) {
	g.POST("/create/:id/:animal_id", Create)
	g.GET("/read/:id", Read)
	g.DELETE("/delete/:id/:animal_id", Delete)
}
