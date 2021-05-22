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

// Zwracanie strony o danym numerze i spełniającej dane warunki, wysłanie w ciele metody POST.
func ReadPage(c echo.Context) error {
	var animals []models.Animal
	nr := c.Param("nr")
	nr_int, _ := strconv.Atoi(nr)
	obj := make(map[string]interface{})
	if err := c.Bind(&obj); err != nil {
		return err
	}

	// Usuwanie "nr" z mapy, potencjalny błąd, jeśli faktycznie istnieje taka kolumna w tabeli
	_, ok := obj["nr"]
	if ok {
		delete(obj, "nr")
	}

	result := db.Connection().Limit(pageSize).Offset(pageSize * nr_int).Find(&animals)
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
