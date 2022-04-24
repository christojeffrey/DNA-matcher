package main

import (
	"database/sql"
	"fmt"
	"net/http"
	"regexp"

	"github.com/labstack/echo/v4"
)

func add(c echo.Context) error {
	// if name dan data yg diminta gada, return bad request
	if c.FormValue("name") == "" || c.FormValue("data") == "" {
		return c.JSON(http.StatusBadRequest, "name or data is empty")
	}
	// olah data
	db, err := sql.Open("mysql", databaseReference)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	_, err = db.Exec("USE stima3;")
	if err != nil {
		panic(err)
	}
	r, _ := regexp.Compile(`^[CAGT]+$`)
	fmt.Println("SELECT COUNT(*) FROM penyakit WHERE nama = '" + c.FormValue("name") + "' OR rantai = '" + c.FormValue("data") + "');")
	var count int
	_ = db.QueryRow("SELECT COUNT(*) FROM penyakit WHERE nama = '" + c.FormValue("name") + "' OR rantai = '" + c.FormValue("data") + "';").Scan(&count)
	fmt.Println("count")
	fmt.Println(count)
	if !r.MatchString(c.FormValue("data")) || count != 0 {
		c.Response().Header().Set(echo.HeaderContentType, echo.MIMEApplicationJSONCharsetUTF8)
		c.Response().Header().Set(echo.HeaderAccessControlAllowOrigin, "*")
		c.Response().WriteHeader(http.StatusBadRequest)
		return c.JSON(http.StatusBadRequest, "Text invalid")
	} else {
		searchQuery := "INSERT INTO penyakit (nama, rantai) VALUES ('" + c.FormValue("name") + "', '" + c.FormValue("data") + "');"
		fmt.Println((searchQuery))
		_, err = db.Query(searchQuery)
		if err != nil {
			panic(err)
		}
		c.Response().Header().Set(echo.HeaderContentType, echo.MIMEApplicationJSONCharsetUTF8)
		c.Response().Header().Set(echo.HeaderAccessControlAllowOrigin, "*")
		c.Response().WriteHeader(http.StatusOK)
		return c.JSON(http.StatusOK, "Success")
	}
}
