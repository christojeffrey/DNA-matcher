package main

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
)

type Disease struct {
	Name []string `json:"name"`
}

func getAllDiseases(c echo.Context) error {

	db, err := sql.Open("mysql", "root@tcp(localhost:3306)/")
	if err != nil {
		panic(err)
	}
	defer db.Close()

	_, err = db.Exec("USE stima3;")
	if err != nil {
		panic(err)
	}
	var data []string

	searchQuery := "SELECT nama FROM penyakit;"
	fmt.Println((searchQuery))
	rows, err := db.Query(searchQuery)
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	for rows.Next() {
		var name string
		err = rows.Scan(&name)
		if err != nil {
			panic(err)
		}
		data = append(data, name)
	}
	fmt.Println(data)
	res := &Disease{
		Name: data,
	}
	c.Response().Header().Set(echo.HeaderContentType, echo.MIMEApplicationJSONCharsetUTF8)
	c.Response().Header().Set(echo.HeaderAccessControlAllowOrigin, "*")
	c.Response().WriteHeader(http.StatusOK)
	return c.JSON(http.StatusOK, res)
}
