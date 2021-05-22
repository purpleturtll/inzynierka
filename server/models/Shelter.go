package models

import "gorm.io/gorm"

type Shelter struct {
	gorm.Model
	NIP          string `json:"nip"`
	PhoneNumber  string `json:"phone_number"`
	Username     string `json:"username"`
	Password     string `json:"password"`
	Email        string `json:"email"`
	City         string `json:"city"`
	Street       string `json:"street"`
	StreetNumber string `json:"street_number"`
	PostalCode   string `json:"postal_code"`
	Description  string `json:"description"`
}
