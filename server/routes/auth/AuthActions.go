package auth

import (
	"encoding/json"
	"fmt"
	"inzynierka/config"
	"inzynierka/db"
	"inzynierka/models"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func Login(c echo.Context) error {
	obj := new(models.User)
	if err := c.Bind(obj); err != nil {
		return echo.ErrInternalServerError
	}
	b, _ := json.MarshalIndent(obj, "", "\t")
	fmt.Printf("%v\n", string(b))
	found := new(models.User)
	result := db.Connection().First(&found, "email = ? AND password = ?", obj.Email, obj.Password)
	if result.Error == gorm.ErrRecordNotFound {
		return echo.ErrUnauthorized
	}

	claims := &config.Claims{
		Email: found.Email,
		Admin: true,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Minute * 10).Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	t, err := token.SignedString(config.Secret)
	if err != nil {
		return echo.ErrInternalServerError
	}

	return c.JSON(http.StatusOK, echo.Map{
		"token":   t,
		"user_id": found.ID,
	})
}

func Register(c echo.Context) error {
	obj := new(models.User)
	if err := c.Bind(obj); err != nil {
		return echo.ErrInternalServerError
	}

	found := new(models.User)
	result := db.Connection().First(&found, "email = ?", obj.Email)
	if result.Error != gorm.ErrRecordNotFound {
		return c.NoContent(http.StatusForbidden)
	}

	db.Connection().Create(obj)
	c.Logger().Info("User registered:", obj.Email)
	return c.NoContent(http.StatusCreated)
}

func RegisterShelter(c echo.Context) error {
	obj := new(models.Shelter)
	if err := c.Bind(obj); err != nil {
		return echo.ErrInternalServerError
	}

	found := new(models.Shelter)
	result := db.Connection().First(&found, "username = ?", obj.Username)
	if result.Error != gorm.ErrRecordNotFound {
		return c.NoContent(http.StatusForbidden)
	}

	db.Connection().Create(obj)
	c.Logger().Info("Shelter registered:", obj.Username)
	return c.NoContent(http.StatusCreated)
}
