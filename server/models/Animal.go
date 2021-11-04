package models

import (
	"time"

	"gorm.io/gorm"
)

type Animal struct {
	gorm.Model
	Users         []User    `gorm:"many2many:fav_animals"`
	AnimalTypeID  uint      `json:"animal_type"`
	Breed         string    `json:"breed"`
	Name          string    `json:"name"`
	ShelterID     uint      `json:"shelter_id"`
	Adoptable     bool      `json:"adoptable"`
	Description   string    `json:"description"`
	Age           uint      `json:"age"`
	Weight        float32   `json:"weight"`
	Sex           string    `json:"sex"`
	AdmissionDate time.Time `json:"admission_date"`
	ChipNumber    string    `json:"chip_number"`
	RecentlyFound bool      `json:"recently_found"`
	IsSterilized  bool      `json:"is_sterilized"`
	IsVaccinated  bool      `json:"is_vaccinated"`
}
