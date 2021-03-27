package models

import "gorm.io/gorm"

type Picture struct {
	gorm.Model
	AnimalID uint
	//TODO Przechowywanie obrazów w formie pliku na dysku i trzymanie w bazie tylko ścieżki dostępu do tego pliku
	Path string
}
