package auth

import (
	"inzynierka/db"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/labstack/echo/v4"
	"github.com/stretchr/testify/assert"
)

func TestRegisterNew(t *testing.T) {
	db.InitTest()
	db.Migrate()

	body := `{"password":"1qaz@WSX","firstname":"username","surname":"usurname","email":"umail@mail.com"}`
	e := echo.New()
	req := httptest.NewRequest(http.MethodPost, "/", strings.NewReader(body))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	ctx := e.NewContext(req, rec)
	if assert.NoError(t, Register(ctx)) {
		assert.Equal(t, http.StatusCreated, rec.Code)
	}

	db.CleanTest()
}

func TestRegisterExisting(t *testing.T) {}
func TestLoginNew(t *testing.T)         {}
func TestLoginExisting(t *testing.T)    {}
