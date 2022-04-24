package main

import (
	"fmt"
	"regexp"
)

// sebuah fungsi yang menerima, string dan mengembalikan sebuah object dengan attribute tanggal dan penyakit
func parseSearch(text string) (string, string) {
	// text dapat berbentuk tanggal, tanggal + penyakit, penyakit
	fmt.Println(text)
	// var regextanggal, _ = regexp.Compile(`\d{2}\-\d{2}\-\d{4}`)
	var regextanggalkata, _ = regexp.Compile(`(?i)\d{2} (januari|februari|Maret|April|mei|juni|july|agustus|september|oktober|november|desember|january|february|march|may|june|july|august|october|december) \d{4}`)
	var regexpenyakit, _ = regexp.Compile(`[^(0-9)]+`)
	var tanggal = regextanggalkata.FindString(text)
	var penyakit = regexpenyakit.FindAllString(text,-1)
	fmt.Println("tanggal:", tanggal)
	fmt.Println("penyakit:", penyakit)
	return tanggal, "penyakit"
}