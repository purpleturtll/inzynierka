package animal

import "github.com/labstack/echo/v4"

type Router struct{}

func (Router) Init(g *echo.Group) {
	g.POST("/create", Create)
	g.GET("/read/:id", Read)
	g.GET("/read", Filter)
	g.PATCH("/update", Update)
	g.DELETE("/delete/:id", Delete)
}
