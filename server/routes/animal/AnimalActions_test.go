package animal

import (
	"inzynierka/db"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/labstack/echo/v4"
	"github.com/stretchr/testify/assert"
)

func TestFilter(t *testing.T) {
	db.InitTest()
	db.Migrate()

	e := echo.New()
	req := httptest.NewRequest("GET", "http://127.0.0.1:8080/animal/read?page=0&animal-type=pies,kot", nil)
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	ctx := e.NewContext(req, rec)
	if assert.NoError(t, Filter(ctx)) {
		assert.Equal(t, http.StatusOK, rec.Code)
	}

	db.CleanTest()
}

func TestFilterSpeed(t *testing.T) {
	db.InitTest()
	db.Migrate()

	e := echo.New()
	req := httptest.NewRequest("GET", "http://127.0.0.1:8080/animal/read?page=0&animal-type=pies,kot", nil)
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	ctx := e.NewContext(req, rec)
	if assert.NoError(t, Filter(ctx)) {
		for i := 0; i < 5000000; i++ {
			assert.Equal(t, http.StatusOK, rec.Code)
		}
	}

	db.CleanTest()
}

func TestFilterWrongFilter(t *testing.T) {
	db.InitTest()
	db.Migrate()

	e := echo.New()
	req := httptest.NewRequest("GET", "http://127.0.0.1:8080/animal/read?page=0&animal=pies,kot", nil)
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	ctx := e.NewContext(req, rec)
	if assert.NoError(t, Filter(ctx)) {
		assert.Equal(t, http.StatusOK, rec.Code)
	}

	db.CleanTest()
}

func TestFilterWrongData(t *testing.T) {
	db.InitTest()
	db.Migrate()

	e := echo.New()
	req := httptest.NewRequest("GET", "http://127.0.0.1:8080/animal/read?page=0&age-from=abc", nil)
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	ctx := e.NewContext(req, rec)
	if assert.NoError(t, Filter(ctx)) {
		assert.Equal(t, http.StatusOK, rec.Code)
	}

	db.CleanTest()
}
