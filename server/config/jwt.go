package config

import (
	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo/v4/middleware"
)

var Secret = []byte("secret")

type Claims struct {
	Email string `json:"email"`
	Admin bool   `json:"admin"`
	jwt.StandardClaims
}

var JWTConfig = middleware.JWTConfig{
	Claims:     &Claims{},
	SigningKey: Secret,
}
