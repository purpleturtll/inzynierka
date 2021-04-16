package auth

import (
	"encoding/json"
	"fmt"
	"inzynierka/db"
	"inzynierka/models"
	"net/http"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func Login(c echo.Context) error {
	obj := new(models.User)
	if err := c.Bind(obj); err != nil {
		return err
	}
	b, _ := json.MarshalIndent(obj, "", "\t")
	fmt.Printf("%v\n", string(b))
	found := new(models.User)
	result := db.Connection().First(&found, "email = ? AND password = ?", obj.Email, obj.Password)
	if result.Error == gorm.ErrRecordNotFound {
		return c.String(http.StatusNotFound, "Not Found")
	}
	return c.JSON(http.StatusAccepted, found)
}

func Register(c echo.Context) error {
	obj := new(models.User)
	if err := c.Bind(obj); err != nil {
		return err
	}
	b, _ := json.MarshalIndent(obj, "", "\t")
	fmt.Printf("%v\n", string(b))
	db.Connection().Create(obj)
	return c.String(http.StatusCreated, "Created")
}
