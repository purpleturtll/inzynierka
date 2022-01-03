package animal

import (
	"encoding/json"
	"fmt"
	"inzynierka/db"
	"inzynierka/models"
	"io"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

// Wielkość strony do wysłania
const pageSize = 100

// Struktura z danymi do wysłania
type AnimalSend struct {
	ID            uint      `json:"id"`
	AnimalType    string    `json:"type"`
	Breed         string    `json:"breed"`
	Name          string    `json:"name"`
	ShelterCity   string    `json:"city"`
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
	IsFavourite   bool      `json:"favourite"`
}

// Przenoszenie danych ze structa Animal do AnimalSend z 'favourite' dla user_id z parametru user-id (domyślnie 'false')
func AnimalConvert(animals_db []models.Animal, user_id string) []AnimalSend {
	var animals []AnimalSend
	var animalType models.AnimalType
	var shelter models.Shelter
	var fav_animal []models.FavAnimal
	var IsFav bool

	for _, v := range animals_db {
		db.Connection().Select("type").First(&animalType, v.AnimalTypeID)
		db.Connection().Select("city").First(&shelter, v.ShelterID)
		//znajdź rekord z powiązaniem z tabeli fav_animals
		fav_assoc := db.Connection().Where("animal_id = ? AND user_id = ?", v.ID, user_id).Find(&fav_animal)
		if user_id == "" {
			IsFav = false
		} else {
			if fav_assoc.RowsAffected == 0 {
				IsFav = false
			} else {
				IsFav = true
			}
		}

		animal := AnimalSend{
			ID:            v.ID,
			AnimalType:    animalType.Type,
			Breed:         v.Breed,
			Name:          v.Name,
			ShelterCity:   shelter.City,
			Adoptable:     v.Adoptable,
			Description:   v.Description,
			Age:           v.Age,
			Weight:        v.Weight,
			Sex:           v.Sex,
			AdmissionDate: v.AdmissionDate,
			ChipNumber:    v.ChipNumber,
			RecentlyFound: v.RecentlyFound,
			IsSterilized:  v.IsSterilized,
			IsVaccinated:  v.IsVaccinated,
			IsFavourite:   IsFav,
		}
		animals = append(animals, animal)
	}

	return animals
}

// Tworzenie nowego profilu zwierzęcia, "doc" musi być pierwszą częścią
func Create(c echo.Context) error {
	var animal models.Animal

	type AnimalRcv struct {
		AnimalType    string
		Breed         string
		Name          string
		ShelterName   string
		ChipNumber    string
		Years         string
		Months        string
		Kg            string
		G             string
		Description   string
		AdmissionDate string
		Sex           string
	}

	incomingAnimalData := c.FormValue("doc")
	c.Logger().Print(incomingAnimalData)
	rcv := new(AnimalRcv)
	part_json := json.NewDecoder(strings.NewReader(incomingAnimalData))
	if err := part_json.Decode(rcv); err != nil {
		return err
	}
	b, _ := json.MarshalIndent(rcv, "", "\t")
	fmt.Printf("%v\n", string(b))

	var _type models.AnimalType
	db.Connection().Where("type", rcv.AnimalType).First(&_type)
	animal.AnimalTypeID = _type.ID

	_y, err := strconv.Atoi(rcv.Years)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "Error while converting years")
	}
	_m, err := strconv.Atoi(rcv.Months)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "Error while converting months")
	}
	animal.Age = uint(_y + _m)

	animal.Breed = rcv.Breed
	animal.AdmissionDate = time.Now()
	animal.Adoptable = true
	animal.Description = rcv.Description
	animal.Name = rcv.Name
	animal.ChipNumber = rcv.ChipNumber
	animal.IsSterilized = true
	animal.IsVaccinated = false
	animal.RecentlyFound = false
	animal.Sex = rcv.Sex

	var _shelter models.Shelter
	db.Connection().Where("username", rcv.ShelterName).First(&_shelter)
	animal.ShelterID = _shelter.ID

	_kg, err := strconv.Atoi(rcv.Kg)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "Error while converting grams")
	}
	_g, err := strconv.Atoi(rcv.G)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "Error while converting kg")
	}
	animal.Weight = float32(_kg*1000 + _g)

	err = db.Connection().Create(&animal).Error
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "Error while creating animal")
	}

	incomingAnimalPicture, err := c.FormFile("file")
	if err != nil {
		return c.JSON(http.StatusUnprocessableEntity, "Missing image")
	}
	src, err := incomingAnimalPicture.Open()
	if err != nil {
		return err
	}
	defer src.Close()

	filename := strconv.Itoa(int(animal.ID))
	outfile, err := os.Create("./pictures/" + fmt.Sprintf("%03d", animal.ID) + ".jpg")
	if err != nil {
		return err
	}
	defer outfile.Close()

	_, err = io.Copy(outfile, src)
	if err != nil {
		return err
	}

	picture := new(models.Picture)
	picture.Path = filename
	picture.AnimalID = animal.ID
	db.Connection().Create(picture)

	return c.String(http.StatusCreated, "Created")
}

func Read(c echo.Context) error {
	id := c.Param("id")
	id_int, _ := strconv.Atoi(id)
	obj := &models.Animal{}
	result := db.Connection().First(&obj, id_int)
	if result.Error == gorm.ErrRecordNotFound {
		return c.String(http.StatusNotFound, "Not Found")
	}
	return c.JSON(http.StatusOK, obj)
}

// Szukanie według id chipa
func ReadChip(c echo.Context) error {
	cid := c.Param("cid")
	obj := &models.Animal{}
	result := db.Connection().Where("chip_number", cid).First(&obj)
	if result.Error == gorm.ErrRecordNotFound {
		return c.String(http.StatusNotFound, "Not Found")
	}
	return c.JSON(http.StatusOK, obj)
}

// Filtrowanie
func Filter(c echo.Context) error {
	var animals_db []models.Animal
	var animals []AnimalSend

	user_id := c.QueryParam("user-id")
	animalType := c.QueryParam("animal-type")
	sex := c.QueryParam("sex")
	city := c.QueryParam("city")
	ageFrom := c.QueryParam("age-from")
	ageTo := c.QueryParam("age-to")
	weightFrom := c.QueryParam("weight-from")
	weightTo := c.QueryParam("weight-to")
	breed := c.QueryParam("breed")
	favourite := c.QueryParam("favourite")
	page := c.QueryParam("page")
	pageInt, _ := strconv.Atoi(page)

	result := db.Connection().Limit(pageSize).Offset(pageSize*pageInt).Scopes(
		Sex(sex), City(strings.Split(city, ",")), AgeRange([][]string{strings.Split(ageFrom, ","), strings.Split(ageTo, ",")}), Favourite(favourite),
		WeightRange([][]string{strings.Split(weightFrom, ","), strings.Split(weightTo, ",")}), Breed(strings.Split(breed, ",")), AnimalType(strings.Split(animalType, ",")),
	).Find(&animals_db)
	if result.Error == gorm.ErrRecordNotFound {
		return c.String(http.StatusNotFound, "Not Found")
	}

	// Przygotowanie danych do wysłania
	if favourite != "" {
		animals = AnimalConvert(animals_db, favourite)
	} else {
		animals = AnimalConvert(animals_db, user_id)
	}

	return c.JSON(http.StatusOK, animals)
}

func Update(c echo.Context) error {
	var animal models.Animal
	obj := new(models.Animal)
	if err := c.Bind(obj); err != nil {
		return err
	}
	b, _ := json.MarshalIndent(obj, "", "\t")
	fmt.Printf("%v\n", string(b))

	result := db.Connection().First(&animal, obj.ID)
	if result.Error == gorm.ErrRecordNotFound {
		return c.String(http.StatusNotFound, "Not Found")
	}

	animal = *obj
	result = db.Connection().Save(&animal)

	if result.Error != nil {
		return c.String(http.StatusInternalServerError, "Error while updating")
	}
	return c.String(http.StatusOK, "Updated")
}

func Delete(c echo.Context) error {
	return nil
}
