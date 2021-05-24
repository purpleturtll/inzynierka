package animal

import (
	"encoding/json"
	"fmt"
	"inzynierka/db"
	"inzynierka/models"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

const pageSize = 2

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
	id := c.QueryParam("id")
	id_int, _ := strconv.Atoi(id)
	obj := &models.Animal{}
	result := db.Connection().First(&obj, id_int)
	if result.Error == gorm.ErrRecordNotFound {
		return c.String(http.StatusNotFound, "Not Found")
	}
	return c.JSON(http.StatusOK, obj)
}

// Filtrowanie
func Filter(c echo.Context) error {
	var animals []models.Animal
	animalType := c.QueryParam("animal-type")
	sex := c.QueryParam("sex")
	city := c.QueryParam("city")
	ageFrom := c.QueryParam("age-from")
	ageTo := c.QueryParam("age-to")
	weightFrom := c.QueryParam("weight-from")
	weightTo := c.QueryParam("weight-to")
	breed := c.QueryParam("breed")
	page := c.QueryParam("page")
	pageInt, _ := strconv.Atoi(page)

	result := db.Connection().Limit(pageSize).Offset(pageSize*pageInt).Scopes(
		Sex(sex), City(city), AgeRange([]string{ageFrom, ageTo}), WeightRange([]string{weightFrom, weightTo}), Breed(breed), AnimalType(animalType)).Find(&animals)
	if result.Error == gorm.ErrRecordNotFound {
		return c.String(http.StatusNotFound, "Not Found")
	}
	return c.JSON(http.StatusOK, animals)
}

func Update(c echo.Context) error {
	return nil
}

func Delete(c echo.Context) error {
	return nil
}
