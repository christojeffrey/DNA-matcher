package main

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
)

type SearchRes struct {
	Result []SearchData `json:"result"`
}

type SearchData struct {
	IdPrediksi        int    `json:"idprediksi"`
	Tanggal           string `json:"tanggal"`
	Nama_pasien       string `json:"nama_pasien"`
	Penyakit_prediksi string `json:"penyakit_prediksi"`
	Status            int    `json:"status"`
	Kesamaan          int    `json:"kesamaan"`
}

func search(c echo.Context) error {
	searchType := c.FormValue("type")
	searchData := c.FormValue("data")

	db, err := sql.Open("mysql", "root@tcp(localhost:3306)/")
	if err != nil {
		panic(err)
	}
	defer db.Close()

	_, err = db.Exec("USE stima3;")
	if err != nil {
		panic(err)
	}
	var data []SearchData

	searchQuery := fmt.Sprintf("SELECT * FROM hasil_prediksi WHERE %s = \"%s\"", searchType, searchData)
	fmt.Println((searchQuery))
	rows, err := db.Query(searchQuery)
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	for rows.Next() {
		var tempdata SearchData
		if err := rows.Scan(&tempdata.IdPrediksi, &tempdata.Tanggal, &tempdata.Nama_pasien, &tempdata.Penyakit_prediksi, &tempdata.Status, &tempdata.Kesamaan); err != nil {
			panic(err)
		}
		data = append(data, tempdata)
	}
	fmt.Println(data)
	res := &SearchRes{
		Result: data,
	}
	fmt.Println(res.Result)
	c.Response().Header().Set(echo.HeaderContentType, echo.MIMEApplicationJSONCharsetUTF8)
	c.Response().Header().Set(echo.HeaderAccessControlAllowOrigin, "*")
	c.Response().WriteHeader(http.StatusOK)
	return c.JSON(http.StatusOK, res)
}
