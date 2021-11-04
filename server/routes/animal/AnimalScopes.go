package animal

import (
	"gorm.io/gorm"
)

func AnimalType(animalType []string) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		if len(animalType) > 1 || animalType[0] != "" {
			db.Joins("left join animal_types on animal_types.id = animals.animal_type_id")

			switch len(animalType) {
			case 1:
				db.Where("animal_types.type = ?", animalType[0])
			case 2:
				db.Where("animal_types.type = ? OR animal_types.type = ?", animalType[0], animalType[1])
			case 3:
				db.Where("animal_types.type = ? OR animal_types.type = ? OR animal_types.type = ?", animalType[0], animalType[1], animalType[2])
			case 4:
				db.Where("animal_types.type = ? OR animal_types.type = ? OR animal_types.type = ? OR animal_types.type = ?",
					animalType[0], animalType[1], animalType[2], animalType[3])
			case 5:
				db.Where("animal_types.type = ? OR animal_types.type = ? OR animal_types.type = ? OR animal_types.type = ? OR animal_types.type = ?",
					animalType[0], animalType[1], animalType[2], animalType[3], animalType[4])

			}
		}
		return db
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

func City(city []string) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		if len(city) > 1 || city[0] != "" {
			db.Joins("left join shelters on shelters.id = animals.shelter_id")

			switch len(city) {
			case 1:
				db.Where("shelters.city = ?", city[0])
			case 2:
				db.Where("shelters.city = ? OR shelters.city = ?", city[0], city[1])
			case 3:
				db.Where("shelters.city = ? OR shelters.city = ? OR shelters.city = ?", city[0], city[1], city[2])
			case 4:
				db.Where("shelters.city = ? OR shelters.city = ? OR shelters.city = ? OR shelters.city = ?",
					city[0], city[1], city[2], city[3])
			case 5:
				db.Where("shelters.city = ? OR shelters.city = ? OR shelters.city = ? OR shelters.city = ? OR shelters.city = ?",
					city[0], city[1], city[2], city[3], city[4])

			}
		}
		return db
	}
}

func Breed(breed []string) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		if len(breed) > 1 || breed[0] != "" {
			switch len(breed) {
			case 1:
				db.Where("breed = ?", breed[0])
			case 2:
				db.Where("breed = ? OR breed = ?", breed[0], breed[1])
			case 3:
				db.Where("breed = ? OR breed = ? OR breed = ?", breed[0], breed[1], breed[2])
			case 4:
				db.Where("breed = ? OR breed = ? OR breed = ? OR breed = ?",
					breed[0], breed[1], breed[2], breed[3])
			case 5:
				db.Where("breed = ? OR breed = ? OR breed = ? OR breed = ? OR breed = ?",
					breed[0], breed[1], breed[2], breed[3], breed[4])
			case 6:
				db.Where("breed = ? OR breed = ? OR breed = ? OR breed = ? OR breed = ? OR breed = ?",
					breed[0], breed[1], breed[2], breed[3], breed[4], breed[5])

			}
		}
		return db
	}
}

func AgeRange(ageRange [][]string) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		if len(ageRange[0]) > 1 || ageRange[0][0] != "" {
			switch len(ageRange[0]) {
			case 1:
				db.Where("age >= ? AND age < ?", ageRange[0][0], ageRange[1][0])
			case 2:
				db.Where("(age >= ? AND age < ?) OR (age >= ? AND age < ?)", ageRange[0][0], ageRange[1][0], ageRange[0][1], ageRange[1][1])
			case 3:
				db.Where("(age >= ? AND age < ?) OR (age >= ? AND age < ?) OR (age >= ? AND age < ?)",
					ageRange[0][0], ageRange[1][0], ageRange[0][1], ageRange[1][1], ageRange[0][2], ageRange[1][2])
			case 4:
				db.Where("(age >= ? AND age < ?) OR (age >= ? AND age < ?) OR (age >= ? AND age < ?) OR (age >= ? AND age < ?)",
					ageRange[0][0], ageRange[1][0], ageRange[0][1], ageRange[1][1], ageRange[0][2], ageRange[1][2], ageRange[0][3], ageRange[1][3])
			case 5:
				db.Where("(age >= ? AND age < ?) OR (age >= ? AND age < ?) OR (age >= ? AND age < ?) OR (age >= ? AND age < ?) OR (age >= ? AND age < ?)",
					ageRange[0][0], ageRange[1][0], ageRange[0][1], ageRange[1][1], ageRange[0][2], ageRange[1][2], ageRange[0][3], ageRange[1][3], ageRange[0][4], ageRange[1][4])
			}
		}
		return db
	}
}

func WeightRange(weightRange [][]string) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		if len(weightRange[0]) > 1 || weightRange[0][0] != "" {
			switch len(weightRange[0]) {
			case 1:
				db.Where("weight >= ? AND weight < ?", weightRange[0][0], weightRange[1][0])
			case 2:
				db.Where("(weight >= ? AND weight < ?) OR (weight >= ? AND weight < ?)", weightRange[0][0], weightRange[1][0], weightRange[0][1], weightRange[1][1])
			case 3:
				db.Where("(weight >= ? AND weight < ?) OR (weight >= ? AND weight < ?) OR (weight >= ? AND weight < ?)",
					weightRange[0][0], weightRange[1][0], weightRange[0][1], weightRange[1][1], weightRange[0][2], weightRange[1][2])
			case 4:
				db.Where("(weight >= ? AND weight < ?) OR (weight >= ? AND weight < ?) OR (weight >= ? AND weight < ?) OR (weight >= ? AND weight < ?)",
					weightRange[0][0], weightRange[1][0], weightRange[0][1], weightRange[1][1], weightRange[0][2], weightRange[1][2], weightRange[0][3], weightRange[1][3])
			case 5:
				db.Where("(weight >= ? AND weight < ?) OR (weight >= ? AND weight < ?) OR (weight >= ? AND weight < ?) OR (weight >= ? AND weight < ?) OR (weight >= ? AND weight < ?)",
					weightRange[0][0], weightRange[1][0], weightRange[0][1], weightRange[1][1], weightRange[0][2], weightRange[1][2],
					weightRange[0][3], weightRange[1][3], weightRange[0][4], weightRange[1][4])
			}
		}
		return db
	}
}

func Favourite(fav string) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		if fav == "" {
			return db
		}

		db.Joins("left join fav_animals on fav_animals.animal_id = animals.id")
		db.Where("fav_animals.user_id = ?", fav)

		return db
	}
}
