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
	// if data yg diminta gada, return bad request
	if c.FormValue("data") == "" {
		return c.JSON(http.StatusBadRequest, "query text is empty")
	}
	// olah data
	searchData := c.FormValue("data")

	db, err := sql.Open("mysql", databaseReference)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	_, err = db.Exec("USE stima3;")
	if err != nil {
		panic(err)
	}
	var data []SearchData
	var resTanggal string
	var resPenyakit string
	resTanggal, resPenyakit = parseSearch(searchData)
	var query string = "SELECT * FROM hasil_prediksi WHERE"
	if resTanggal != "" {
		query += " tanggal = '" + resTanggal + "'"
	}
	if resTanggal != "" && resPenyakit != "" {
		query += " OR "
	}
	if resPenyakit != "" {
		query += " penyakit_prediksi = '" + resPenyakit + "'"
	}
	query += ";"

	searchQuery := fmt.Sprintf(query)
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

	res := &SearchRes{
		Result: data,
	}
	fmt.Println(res.Result)
	c.Response().Header().Set(echo.HeaderContentType, echo.MIMEApplicationJSONCharsetUTF8)
	c.Response().Header().Set(echo.HeaderAccessControlAllowOrigin, "*")
	c.Response().WriteHeader(http.StatusOK)
	return c.JSON(http.StatusOK, res)
}
