package main

import (
	"database/sql"
	"fmt"
	"net/http"
	"time"

	_ "github.com/go-sql-driver/mysql"
	"github.com/labstack/echo/v4"
)

type Response struct {
	Time       string `json:"time"`
	Name       string `json:"name"`
	Disease    string `json:"disease"`
	Found      bool   `json:"found"`
	Similarity int    `json:"similarity"`
	Indexes    []int  `json:"indexes"`
}

func match(c echo.Context) error {
	// if data yg diminta gada, return bad request
	if c.FormValue("text") == "" || c.FormValue("disease") == "" || c.FormValue("method") == "" {
		return c.JSON(http.StatusBadRequest, "text or disease or method is empty")
	}
	text := c.FormValue("text")
	disease := c.FormValue("disease")
	fmt.Println("[REQUEST IN]", text, disease)
	db, err := sql.Open("mysql", "root@tcp(localhost:3306)/")
	if err != nil {
		panic(err)
	}
	defer db.Close()

	_, err = db.Exec("USE stima3;")
	if err != nil {
		panic(err)
	}

	var pattern string

	if err := db.QueryRow("SELECT rantai FROM penyakit WHERE nama = ?", disease).Scan(&pattern); err != nil {
		panic(err)
	}
	var result []int
	var max_sim int
	if c.FormValue("method") == "BM" {
		result, max_sim = BMAlgo(text, pattern)
	} else {
		result, max_sim = KMPAlgo(text, pattern)
	}
	max_sim = (max_sim / len(pattern)) * 100

	res := &Response{
		Time:       time.Now().Local().Format("2006-01-02"),
		Name:       c.FormValue("username"),
		Disease:    c.FormValue("disease"),
		Found:      max_sim >= 80,
		Similarity: max_sim,
		Indexes:    result,
	}
	found := 0
	if res.Found {
		found = 1
	}
	_, err = db.Exec("INSERT INTO hasil_prediksi (tanggal, nama_pasien, penyakit_prediksi, status, kesamaan) VALUES (?, ?, ?, ?, ?);", res.Time, res.Name, res.Disease, found, res.Similarity)
	if err != nil {
		panic(err)
	}
	c.Response().Header().Set(echo.HeaderContentType, echo.MIMEApplicationJSONCharsetUTF8)
	c.Response().Header().Set(echo.HeaderAccessControlAllowOrigin, "*")
	c.Response().WriteHeader(http.StatusOK)
	return c.JSON(http.StatusOK, res)
}

type SearchRes struct {
	Result []SearchData `json:"result"`
}

type SearchData struct {
	idPrediksi        int
	tanggal           string
	nama_pasien       string
	penyakit_prediksi string
	status            int
	kesamaan          int
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
		if err := rows.Scan(&tempdata.idPrediksi, &tempdata.tanggal, &tempdata.nama_pasien, &tempdata.penyakit_prediksi, &tempdata.status, &tempdata.kesamaan); err != nil {
			panic(err)
		}
		data = append(data, tempdata)
	}
	fmt.Println(data)
	res := &SearchRes{
		Result: data,
	}
	c.Response().Header().Set(echo.HeaderContentType, echo.MIMEApplicationJSONCharsetUTF8)
	c.Response().Header().Set(echo.HeaderAccessControlAllowOrigin, "*")
	c.Response().WriteHeader(http.StatusOK)
	return c.JSON(http.StatusOK, res)
}

func main() {
	// initialize database
	createDB()
	// initializing, open localhost:1323 to check
	e := echo.New()
	e.POST("/api/match", match)
	e.POST("/api/search", search)
	e.Logger.Fatal(e.Start(":1323"))
}

// func main() {
// 	out, max_sim := BMAlgo("TCGTTGGCGCCCGACCCTTAGACTCTGTACTGAGTTCTATAAACGAGCCATTGCATACGAGATCGGTAGATTGATAAGGGACACAGAATATCCCCGGACGCAATAGACGGACAGCTTGGTATCCTAAGCACAGTCGCGCGTCCGAACCTAGCTCTACTTTAGAGGCCCCGGATTCTGGTGCTCGTAGACCGCAGAACCGATTGGGGGGATGTACAACAATATTTGTTAGTCACCTTTGGGTCACGATCTCCCACCTTACTGGAATTTAGTCCCTGCTATAATTTGCCTTGCATATAAGTTGCGTTACTTCAGCGTCCTAACCGCACCCTTAGCACGAAGACAGATTTGTTCATTCCCATACTCCGGCGTTGGCAGGGGGTTCGCATGTCCCACGTGAAACGTTGCTAAACCCTCAGGTTTCTGAGCGACAAAAGCTTTAAACGGGAGTTCGCGCTCATAACTTGGTCCGAATGCGGGTTCTTGCATCGTTCGACTGAGTTTGTTTCATGTAGAACGGGCGCAAAGTATACTTAGTTCAATCTTCAATACCTCGTATCATTGTACACCTGCCGGTCACCACCCAACGATGTGGGGACGGCGTTGCAACTTCGAGGACCTAATCTGACCGACCTAGATTCGGCACTGTGGGCAATATGAGGTATTGGCAGACACCCAGTGCCGAACAACACCTGACCTAACGGTAAGAGAGTCTCATAATGCGTCCGGCCGCGTGCCCAGGGTATATTTGGACAGTATCGAATGGACTGAGATGAACCTTTACACCGATCCGGAAACGGGTGCGTGGATTAGCCAGGAGCAAACGAAAAATCCTGGGCTACTTGATGTCTTGTGACGTTCTTAGAGATGGACGAAATGTTTCACGACCTAGGATAAGGTCGCCCTACAAAATAGATTTGTGCTACTCTCCTCATAAGCAGTCCGGTGTATCGAAAGAACAAGACTAGCCTTGCTAGCAACCGCGGGCTGGGGGGCTAAGGTA ", "TAAGGTA")
// 	// out, max_sim := BMAlgo("ACTGAGTC", "CTGC")
// 	fmt.Println(out, max_sim)
// }
