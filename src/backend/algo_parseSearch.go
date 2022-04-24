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
	var regexpenyakitkotor, _ = regexp.Compile(`[^(0-9)]+`)
	// var regexpenyakit, _ = regexp.Compile(`^(?:(?!januari|februari).)*$`)
	var regexinvalidpenyakit, _ = regexp.Compile(`(?i)(januari|februari|Maret|April|mei|juni|july|agustus|september|oktober|november|desember|january|february|march|may|june|july|august|october|december)`)
	var tanggal = regextanggalkata.FindString(text)
	var penyakits = regexpenyakitkotor.FindAllString(text,-1)

	//array of valid penyakit
	var validPenyakit []string
	//for earch penyakits
	for _, penyakit := range penyakits {
		fmt.Println(penyakit)
		// if penyakit is valid
		if !regexinvalidpenyakit.MatchString(penyakit) {
			validPenyakit = append(validPenyakit, penyakit)
		}

	}
	fmt.Println("validpenyakit:")
	for _, penyakit := range validPenyakit {
		fmt.Println(penyakit)
	}
	
	fmt.Println("tanggal:", tanggal)
	fmt.Println("penyakit:", validPenyakit)
	return tanggal, "penyakit"
}