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

func ReadPage(c echo.Context) error {
	nr := c.QueryParam("nr")
	nr_int, _ := strconv.Atoi(nr)
	obj := &models.Animal{}
	if err := c.Bind(obj); err != nil {
		return err
	}
	result := db.Connection().Offset(pageSize * nr_int).Limit(pageSize).Where(obj)
	if result.Error == gorm.ErrRecordNotFound {
		return c.String(http.StatusNotFound, "Not Found")
	}
	return c.JSON(http.StatusOK, obj)
}

func Update(c echo.Context) error {
	return nil
}

func Delete(c echo.Context) error {
	return nil
}
