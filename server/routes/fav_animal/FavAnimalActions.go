package favanimal

import (
	"fmt"
	"inzynierka/db"
	"inzynierka/models"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"

	"gorm.io/gorm"
)

func Read(c echo.Context) error {
	id := c.Param("id")
	obj := &models.User{}
	res := []models.Animal{}
	result := db.Connection().Model(&obj).Where("id IN ?", id).Association("fav_animal").Find(&res)
	//fmt.Println(result)
	if result == gorm.ErrRecordNotFound {
		return c.String(http.StatusNotFound, "Not Found")
	}
	return c.JSON(http.StatusOK, res)
}

func Delete(c echo.Context) error {
	id := c.Param("id")
	animal_id, _ := strconv.Atoi(c.Param("animal_id"))
	obj := &models.User{}
	animal := &models.Animal{}
	db.Connection().First(&animal, animal_id)
	result := db.Connection().Model(&obj).Where("id IN ?", id).Association("fav_animal").Delete(&animal)
	fmt.Println(result)
	if result == gorm.ErrRecordNotFound {
		return c.String(http.StatusNotFound, "Not Found")
	}
	return c.JSON(http.StatusOK, nil)
}

func Create(c echo.Context) error {
	id := c.Param("id")
	animal_id, _ := strconv.Atoi(c.Param("animal_id"))
	obj := &models.User{}
	animal := &models.Animal{}
	db.Connection().First(&animal, animal_id)
	result := db.Connection().Model(&obj).Where("id IN ?", id).Association("fav_animal").Append(&animal)
	fmt.Println(result)
	if result == gorm.ErrRecordNotFound {
		return c.String(http.StatusNotFound, "Not Found")
	}
	return c.JSON(http.StatusOK, nil)
}
