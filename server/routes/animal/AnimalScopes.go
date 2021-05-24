package animal

import (
	"gorm.io/gorm"
)

func AnimalType(animalType string) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		if animalType == "" {
			return db
		}
		return db.Joins("left join animal_types on animal_types.id = animals.animal_type_id").Where("animal_types.type = ?", animalType)
	}
}

func Sex(sex string) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		if sex == "" {
			return db
		}
		return db.Where("sex = ?", sex)
	}
}

func City(city string) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		if city == "" {
			return db
		}
		return db.Joins("left join shelters on shelters.id = animals.shelter_id").Where("shelters.city = ?", city)
	}
}

func AgeRange(ageRange []string) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		if ageRange[0] == "" || ageRange[1] == "" {
			return db
		}
		return db.Where("age >= ? AND age < ?", ageRange[0], ageRange[1])
	}
}

func WeightRange(weightRange []string) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		if weightRange[0] == "" || weightRange[1] == "" {
			return db
		}
		return db.Where("weight >= ? AND weight < ?", weightRange[0], weightRange[1])
	}
}

func Breed(breed string) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		if breed == "" {
			return db
		}
		return db.Where("breed = ?", breed)
	}
}
