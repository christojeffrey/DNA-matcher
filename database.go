package main

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
)

func createDB() {
	db, err := sql.Open("mysql", databaseReference)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	_, err = db.Exec("CREATE DATABASE IF NOT EXISTS stima3;")
	if err != nil {
		panic(err)
	}

	_, err = db.Exec("USE stima3;")
	if err != nil {
		panic(err)
	}

	_, err = db.Exec("DROP TABLE IF EXISTS penyakit;")
	if err != nil {
		panic(err)
	}

	_, err = db.Exec(`CREATE TABLE penyakit (
		idPenyakit INT NOT NULL AUTO_INCREMENT,
		nama VARCHAR(255) NOT NULL,
		rantai VARCHAR(255) NOT NULL,
		PRIMARY KEY (idPenyakit)
	);`)

	if err != nil {
		panic(err)
	}

	_, err = db.Exec(`CREATE TABLE IF NOT EXISTS hasil_prediksi (
		idPrediksi INT NOT NULL AUTO_INCREMENT,
		tanggal DATE NOT NULL,
		nama_pasien VARCHAR(255) NOT NULL,
		penyakit_prediksi VARCHAR(255) NOT NULL,
		status INT NOT NULL,
		kesamaan INT NOT NULL,
		PRIMARY KEY (idPrediksi)
	);`)

	if err != nil {
		panic(err)
	}
	// INSERT PENYAKIT-PENYAKIT YANG KITA COVER
	_, err = db.Exec(`INSERT INTO penyakit (nama, rantai)
	VALUES 
	("HIV", "TAAGGTA"), 
	("Alzheimer's", "GCTCT"), 
	("Parkinson's", "GGTCAG"),
	("AIDS", "GCTCTA"),
	("batuk", "GTCAGAT"),
	("diare", "GCTCTA"),
	("gagal makan", "TACAGAT"),
	("gagal tidur", "GCTAGTAGA"),
	("kurang bahagia", "GCACTA"),
	("IQ jongkok", "CACAT"),
	("terjebak dalam rat race perkuliahan", "TATAG"),
	("sindrom tubes", "ACTGATACT")
	;`)
	if err != nil {
		panic(err)
	}
	// INSERT PENYAKIT-PENYAKIT YANG KITA COVER
}

type Penyakit struct {
	IDPenyakit   int
	NamaPenyakit string
}
