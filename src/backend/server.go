package main

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
)

func getUser(c echo.Context) error {
	id := c.Param("id")
	return c.String(http.StatusOK, id)
}

func save(c echo.Context) error {
	// Get name and email
	name := c.FormValue("name")
	email := c.FormValue("email")
	return c.String(http.StatusOK, "name:"+name+", email:"+email)
}

func match(c echo.Context) error {

	// fmt.Println(("your mom gay"))~
	return c.String(http.StatusOK, "Hello, World!")
}

func main() {
	text := "AABAACAADAABAABA"
	pattern := "AABA"
	BM_out := BMAlgo(text, pattern)
	fmt.Println("Using BM, pattern found", len(BM_out), "times")
	KMP_algo := KMPAlgo(text, pattern)
	fmt.Println("Using KMP, pattern found", len(KMP_algo), "times")
}

// func main() {
// 	// initializing, open localhost:1323 to check
// 	e := echo.New()
// 	e.GET("/", func(c echo.Context) error {
// 		return c.String(http.StatusOK, "Hello, World!")
// 	})~

// 	// routing:
// 	e.GET("/users/:id", getUser)
// 	e.POST("/save", save)
// 	e.POST("/match", match)

// 	e.Logger.Fatal(e.Start(":3000"))
// }
