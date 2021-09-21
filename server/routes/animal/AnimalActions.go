package animal

import (
	"encoding/json"
	"fmt"
	"inzynierka/db"
	"inzynierka/models"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

// Wielkość strony do wysłania
const pageSize = 2

// Struktura z danymi do wysłania
type AnimalSend struct {
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
}

// Przenoszenie danych ze structa Animal do AnimalSend
func AnimalConvert(animals_db []models.Animal) []AnimalSend {
	var animals []AnimalSend
	var animalType models.AnimalType
	var shelter models.Shelter

	for _, v := range animals_db {
		db.Connection().Select("type").Where("id = ?", v.AnimalTypeID).First(&animalType)
		db.Connection().Select("city").Where("id = ?", v.ShelterID).First(&shelter)
		animal := AnimalSend{
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
		}
		animals = append(animals, animal)
	}

	return animals
}

func Create(c echo.Context) error {
	obj := new(models.Animal)
	if err := c.Bind(obj); err != nil {
		return err
	}
	b, _ := json.MarshalIndent(obj, "", "\t")
	fmt.Printf("%v\n", string(b))
	db.Connection().Create(obj)
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
	animals = AnimalConvert(animals_db)
	fmt.Print(animals)

	return c.JSON(http.StatusOK, animals)
}

func Update(c echo.Context) error {
	return nil
}

func Delete(c echo.Context) error {
	return nil
}
