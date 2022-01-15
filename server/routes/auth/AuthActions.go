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
		fmt.Println("User or shelter not found")
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
		ID        uint `json:"user_id"`
		IsShelter bool `json:"is_shelter"`
	}
	obj := new(Req)
	if err := c.Bind(obj); err != nil {
		return echo.ErrInternalServerError
	}

	c.Logger().Print(obj)

	if obj.IsShelter {
		temp := &models.Shelter{}
		temp.ID = obj.ID
		result := db.Connection().Delete(temp)
		if result.Error == gorm.ErrRecordNotFound {
			return c.NoContent(http.StatusForbidden)
		}
	} else {
		temp := &models.User{}
		temp.ID = obj.ID
		result := db.Connection().Delete(temp)
		if result.Error == gorm.ErrRecordNotFound {
			return c.NoContent(http.StatusForbidden)
		}
	}

	c.Logger().Print("Unregistered:", obj.ID)
	return c.NoContent(http.StatusOK)
}

func Passwd(c echo.Context) error {
	type Req struct {
		IsShelter   bool   `json:"is_shelter"`
		ID          uint   `json:"user_id"`
		NewPassword string `json:"new_password"`
	}
	obj := new(Req)
	if err := c.Bind(obj); err != nil {
		return echo.ErrInternalServerError
	}

	if obj.IsShelter {
		result := db.Connection().Model(&models.Shelter{}).Where("id = ?", obj.ID).Update("password", obj.NewPassword)
		if result.Error == gorm.ErrRecordNotFound {
			return c.NoContent(http.StatusForbidden)
		}
	} else {
		result := db.Connection().Model(&models.User{}).Where("id = ?", obj.ID).Update("password", obj.NewPassword)
		if result.Error == gorm.ErrRecordNotFound {
			return c.NoContent(http.StatusForbidden)
		}
	}

	c.Logger().Info("Updated password:", obj.ID, " to ", obj.NewPassword)
	return c.JSON(http.StatusOK, "Password updated")
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
