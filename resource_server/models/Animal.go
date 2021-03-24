package main

import (
	"time"

	"gorm.io/gorm"
)

type Animal struct {
	gorm.Model
	AnimalType    AnimalType `json:"animal_type"`
	Breed         string     `json:"breed"`
	Name          string     `json:"name"`
	ShelterID     uint       `json:"shelter_id"`
	Shelter       *Shelter   `json:",omitempty"`
	Adoptable     bool       `json:"adoptable"`
	Description   string     `json:"description"`
	Age           uint       `json:"age"`
	AdmissionDate time.Time  `json:"admission_date"`
	ChipNumber    string     `json:"chip_number"`
	RecentlyFound bool       `json:"recently_found"`
	IsSterilized  bool       `json:"is_sterilized"`
	IsVaccinated  bool       `json:"is_vaccinated"`
}
