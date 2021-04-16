package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Password  string `json:"password"`
	Firstname string `json:"firstname"`
	Surname   string `json:"surname"`
	Email     string `json:"email"`
}
