package models

import "gorm.io/gorm"

type FavAnimal struct {
	gorm.Model
	AnimalID string `json:"animal_id"`
	UserID   string `json:"user_id"`
}
