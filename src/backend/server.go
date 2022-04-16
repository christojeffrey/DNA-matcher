package main

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
)

type Response struct {
	Found   bool  `json:"found"`
	Indexes []int `json:"indexes"`
}

func match(c echo.Context) error {
	fmt.Println("[REQUEST IN]")
	text := c.FormValue("text")
	pattern := c.FormValue("pattern")
	result := BMAlgo(text, pattern)
	res := &Response{
		Found:   len(result) > 0,
		Indexes: result,
	}
	c.Response().Header().Set(echo.HeaderContentType, echo.MIMEApplicationJSONCharsetUTF8)
	c.Response().Header().Set(echo.HeaderAccessControlAllowOrigin, "*")
	c.Response().WriteHeader(http.StatusOK)
	return c.JSON(http.StatusOK, res)
}

func main() {
	// initializing, open localhost:3000 to check
	e := echo.New()
	e.POST("/api/match", match)

	e.Logger.Fatal(e.Start(":1323"))
}
