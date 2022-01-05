package config

import (
	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo/v4/middleware"
)

var Secret = []byte("secret")

type Claims struct {
	Username  string `json:"username"`
	Email     string `json:"email"`
	IsShelter bool   `json:"isShelter"`
	jwt.StandardClaims
}

var JWTConfig = middleware.JWTConfig{
	Claims:     &Claims{},
	SigningKey: Secret,
}
