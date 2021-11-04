package favanimal

import (
	"inzynierka/db"
	"inzynierka/models"
	"net/http"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func ReadForUser(c echo.Context) error {
	user_id := c.Param("user_id")
	var res []models.FavAnimal
	result := db.Connection().Where("user_id = ?", user_id).Find(&res)
	if result.Error == gorm.ErrRecordNotFound {
		return c.String(http.StatusNotFound, "Not Found")
	} else {
		return c.JSON(http.StatusOK, res)
	}
}

// Unfollow
func Delete(c echo.Context) error {
	obj := new(models.FavAnimal)
	if err := c.Bind(obj); err != nil {
		return echo.ErrInternalServerError
	}
	lookup := new(models.FavAnimal)
	result := db.Connection().Where("animal_id = ? AND user_id = ?", obj.AnimalID, obj.UserID).Find(&lookup)
	if result.RowsAffected == 0 {
		return c.String(http.StatusNotFound, "Not Found")
	} else {
		db.Connection().Unscoped().Delete(&lookup)
		return c.JSON(http.StatusNoContent, nil)
	}
}

// Follow
func Create(c echo.Context) error {
	obj := new(models.FavAnimal)
	if err := c.Bind(obj); err != nil {
		return echo.ErrInternalServerError
	}
	lookup := new(models.FavAnimal)
	result := db.Connection().Where("animal_id = ? AND user_id = ?", obj.AnimalID, obj.UserID).Find(&lookup)
	if result.RowsAffected == 0 {
		db.Connection().Where("animal_id = ? AND user_id = ?", lookup.AnimalID, lookup.UserID).Create(&obj)
		return c.JSON(http.StatusCreated, nil)
	} else {
		return c.String(http.StatusNotFound, "Not Found")
	}
}
