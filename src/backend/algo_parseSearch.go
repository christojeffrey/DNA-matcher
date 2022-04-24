package main

import (
	"fmt"
	"regexp"
	"strings"
)

// sebuah fungsi yang menerima, string dan mengembalikan sebuah object dengan attribute tanggal dan penyakit
func parseSearch(text string) (string, string) {
	// text dapat berbentuk tanggal, tanggal + penyakit, penyakit
	fmt.Println(text)
	//hilangkan spasi di depan dan dibelakang
	text = strings.TrimSpace(text)

	fmt.Println("cleaned")
	fmt.Println(text)
	// var regextanggal, _ = regexp.Compile(`\d{2}\-\d{2}\-\d{4}`)
	var regextanggalkata, _ = regexp.Compile(`(?i)\d{1,2} (januari|februari|Maret|April|mei|juni|july|agustus|september|oktober|november|desember|january|february|march|may|june|july|august|october|december) \d{4}`)
	var regexpenyakitkotor, _ = regexp.Compile(`[^(0-9)]+`)
	// var regexpenyakit, _ = regexp.Compile(`^(?:(?!januari|februari).)*$`)
	var regexinvalidpenyakit, _ = regexp.Compile(`(?i)(januari|februari|Maret|April|mei|juni|july|agustus|september|oktober|november|desember|january|february|march|may|june|july|august|october|december)`)
	var tanggal = regextanggalkata.FindString(text)
	var penyakits = regexpenyakitkotor.FindAllString(text, -1)

	//array of valid penyakit
	var validPenyakit []string
	//for earch penyakits
	for _, penyakit := range penyakits {
		//hilangkan spasi di depan dan dibelakang penyakit
		penyakit = strings.TrimSpace(penyakit)
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
	var resPenyakit string
	//kalau penyakit ada isinya
	if len(validPenyakit) > 0 {
		resPenyakit = validPenyakit[0]
	}
	var resTanggal string
	// formating tanggal
	if tanggal != "" {
		// ubah jadi bentuk "2021-04-18" dari "22 April 2020"
		var index = strings.Index(tanggal, " ")
		var dd = tanggal[:index]
		fmt.Println("dd")
		// jika tanggal kurang dari 10
		if len(dd) == 1 {
			dd = "0" + dd
		}
		fmt.Println(dd)
		tanggal = tanggal[index+1:]
		index = strings.Index(tanggal, " ")

		var mm = tanggal[:index]
		fmt.Println("bulan")
		fmt.Println(mm)
		var yyyy = tanggal[index+1:]
		fmt.Println("tahun")
		fmt.Println(yyyy)
		resTanggal = yyyy + "-" + bulanToNumber(mm) + "-" + dd
	}
	fmt.Println("tanggal:", resTanggal)
	fmt.Println("penyakit:", resPenyakit)
	return resTanggal, resPenyakit
}

func bulanToNumber(bulan string) string {
	var bulanInNumber string
	var regexjanuari, _ = regexp.Compile(`(?i)(januari|january)`)
	var regexfebruari, _ = regexp.Compile(`(?i)(februari|february)`)
	var regexmaret, _ = regexp.Compile(`(?i)(maret|march)`)
	var regexapril, _ = regexp.Compile(`(?i)(april|may)`)
	var regexmei, _ = regexp.Compile(`(?i)(mei|may)`)
	var regexjuni, _ = regexp.Compile(`(?i)(juni|june)`)
	var regexjuli, _ = regexp.Compile(`(?i)(juli|july)`)
	var regexagustus, _ = regexp.Compile(`(?i)(agustus|august)`)
	var regexseptember, _ = regexp.Compile(`(?i)(september|september)`)
	var regexoktober, _ = regexp.Compile(`(?i)(oktober|october)`)
	var regexnovember, _ = regexp.Compile(`(?i)(november|november)`)
	var regexdesember, _ = regexp.Compile(`(?i)(desember|december)`)
	if regexjanuari.MatchString(bulan) {
		bulanInNumber = "01"
	} else if regexfebruari.MatchString(bulan) {
		bulanInNumber = "02"
	} else if regexmaret.MatchString(bulan) {
		bulanInNumber = "03"
	} else if regexapril.MatchString(bulan) {
		bulanInNumber = "04"
	} else if regexmei.MatchString(bulan) {
		bulanInNumber = "05"
	} else if regexjuni.MatchString(bulan) {
		bulanInNumber = "06"
	} else if regexjuli.MatchString(bulan) {
		bulanInNumber = "07"
	} else if regexagustus.MatchString(bulan) {
		bulanInNumber = "08"
	} else if regexseptember.MatchString(bulan) {
		bulanInNumber = "09"
	} else if regexoktober.MatchString(bulan) {
		bulanInNumber = "10"
	} else if regexnovember.MatchString(bulan) {
		bulanInNumber = "11"
	} else if regexdesember.MatchString(bulan) {
		bulanInNumber = "12"
	}

	return bulanInNumber
}
