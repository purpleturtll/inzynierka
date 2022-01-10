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
	foundUser := new(models.User)
	resultUser := db.Connection().First(&foundUser, "email = ? AND password = ?", obj.Email, obj.Password)
	foundShelter := new(models.Shelter)
	resultShelter := db.Connection().First(&foundShelter, "email = ? AND password = ?", obj.Email, obj.Password)
	if resultUser.Error == gorm.ErrRecordNotFound && resultShelter.Error == gorm.ErrRecordNotFound {
		fmt.Println("AAAAAAAAAAAAAAA nie ma nigdzie")
		return echo.ErrUnauthorized
	}

	var isShelter bool
	var email string
	var username string
	var id uint

	if resultUser.Error == gorm.ErrRecordNotFound {
		// Is Shelter
		isShelter = true
		email = foundShelter.Email
		id = foundShelter.ID
		username = foundShelter.Username
	} else {
		// Is User
		isShelter = false
		email = foundUser.Email
		id = foundUser.ID
		username = foundUser.Firstname
	}

	claims := &config.Claims{
		Username:  username,
		Email:     email,
		IsShelter: isShelter, // Set shelter flag for client app
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Minute * 1000).Unix(), // Long time for testing
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	t, err := token.SignedString(config.Secret)
	if err != nil {
		return echo.ErrInternalServerError
	}

	return c.JSON(http.StatusOK, echo.Map{
		"token":      t,
		"user_id":    id,
		"username":   username,
		"is_shelter": isShelter,
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

func Unregister(c echo.Context) error {
	type Req struct {
		ID uint `json:"user_id"`
	}
	obj := new(Req)
	if err := c.Bind(obj); err != nil {
		return echo.ErrInternalServerError
	}

	result := db.Connection().Where("id = ?", obj.ID).Delete(&models.User{})
	if result.Error != gorm.ErrRecordNotFound {
		result = db.Connection().Where("id = ?", obj.ID).Delete(&models.Shelter{})
		if result.Error != gorm.ErrRecordNotFound {
			return c.NoContent(http.StatusForbidden)
		}
	}

	db.Connection().Create(obj)
	c.Logger().Info("Unregistered:", obj.ID)
	return c.NoContent(http.StatusOK)
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
