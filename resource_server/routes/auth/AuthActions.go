package auth

import (
	"fmt"

	"github.com/labstack/echo/v4"
)

func Login(c echo.Context) error {
	fmt.Println("LOGIN")
	return nil
}

func Register(c echo.Context) error {
	fmt.Println("REGISTER")
	return nil
}
