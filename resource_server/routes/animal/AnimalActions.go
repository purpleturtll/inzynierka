package animal

import (
	"fmt"

	"github.com/labstack/echo/v4"
)

func Create(c echo.Context) error {
	fmt.Println("ADD")
	return nil
}

func Read(c echo.Context) error {
	fmt.Println("READ")
	return nil
}

func Update(c echo.Context) error {
	return nil
}

func Delete(c echo.Context) error {
	return nil
}
