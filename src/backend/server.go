package main

import (
	_ "github.com/go-sql-driver/mysql"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	// initialize database
	createDB()
	// initializing, open localhost:1323 to check
	e := echo.New()
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{}))

	e.GET("/api/alldiseases", getAllDiseases)
	e.POST("/api/match", match)
	e.POST("/api/search", search)
	e.PUT("/api/add", add)
	e.Logger.Fatal(e.Start(":1323"))
}

