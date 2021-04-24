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
		"token": t,
	})
}

func Register(c echo.Context) error {
	obj := new(models.User)
	if err := c.Bind(obj); err != nil {
		return err
	}
	c.Logger().Info("User registered:", obj.Email)
	db.Connection().Create(obj)
	return c.NoContent(http.StatusCreated)
}
