package models

import "gorm.io/gorm"

type Picture struct {
	gorm.Model
	AnimalID uint
	Path     string
}
