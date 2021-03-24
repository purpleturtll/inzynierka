package main

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Username  string `json:"username"`
	Password  string `json:"password"`
	Firstname string `json:"firstname"`
	Surname   string `json:"surname"`
	Email     string `json:"email"`
}
