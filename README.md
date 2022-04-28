# <a href = "https://deoxyde.netlify.app/">Deoxyde DNA Checker</a>: DNA Pattern-Matching Website

> Program deteksi penyakit dalam rantai DNA menggunakan algoritma _string matching_ dan _Regular Expression_ dalam bentuk website
> > _Tugas Besar 3 IF2211 Strategi Algoritma_ <br> _Penerapan String Matching dan Regular Expression dalam
DNA Pattern Matching_ <br> _Semester II 2021/2022_ <br>


![image](https://user-images.githubusercontent.com/71161031/165725592-509ed3de-0de2-436c-b711-a1cc5efff7eb.png)


## Table of Contents
- [Deskripsi Singkat](#deskripsi-singkat)
- [_Requirements_](#requirements)
- [Kompilasi](#kompilasi)
- [Cara Menggunakan](#cara-menggunakan)
- [Identitas](#identitas)

## Deskripsi Singkat

Salah satu jenis tes DNA yang sangat berkaitan dengan dunia bioinformatika adalah DNA
sequence analysis. DNA sequence analysis adalah sebuah cara yang dapat digunakan untuk
memprediksi berbagai macam penyakit yang tersimpan pada database berdasarkan urutan
sekuens DNA-nya. Sebuah sekuens DNA adalah suatu representasi string of nucleotides yang
disimpan pada suatu rantai DNA, sebagai contoh: ATTCGTAACTAGTAAGTTA. Teknik pattern
matching memegang peranan penting untuk dapat menganalisis sekuens DNA yang sangat
panjang dalam waktu singkat. Oleh karena itu, mahasiswa Teknik Informatika berniat untuk
membuat suatu aplikasi web berupa DNA Sequence Matching yang menerapkan algoritma
String Matching dan Regular Expression untuk membantu penyedia jasa kesehatan dalam
memprediksi penyakit pasien. Hasil prediksi juga dapat ditampilkan dalam tabel dan dilengkapi
dengan kolom pencarian untuk membantu admin dalam melakukan filtering dan pencarian.

_Deoxyde_ adalah sebuah _website_ yang dapat digunakan untuk mendeteksi sebuah penyakit dalam seseorang dengan mencocokkan rantai DNA seseorang dengan rantai DNA yang menentukan sebuah penyakit. Pengguna dapat mengunggah plainteks berisi rantai DNA dan program akan melakukan pencocokan dengan rantai tersebut. Program akan melakukan validasi rantai DNA yang dimasukkan menggunakan _RegEx_. Selain itu, pengguna dapat menambahkan penyakit baru ke dalam _database_ dan melihat hasil prediksi sebelumnya.

## Requirements
Untuk pengujian di _local_:
- <a href = "https://nodejs.org/en/download/"> _Node Package Manager_ `(npm)`</a>
- <a href = "https://go.dev/doc/install"> _Go Compiler 1.18_ </a>
- <a href = "https://www.apachefriends.org/download.html"> _XAMPP Control Panel_ untuk server lokal (jika diperlukan) </a>
Untuk pengujian _online_ dapat dilakukan di **<a href = "https://deoxyde.netlify.all/">https://deoxyde.netlify.app/</a>**

## Kompilasi
1. _Clone_ repositori ini terlebih dahulu dan pastikan _requirements_ sudah terpasang!
2. Buka hasil _clone_ di _local_

### Kompilasi _Deployment_
Untuk pengujian _deployment_, tidak perlu melakukan kompilasi dan dapat dilakukan di **<a href = "https://deoxyde.netlify.all/">https://deoxyde.netlify.app/</a>**
### Kompilasi Backend
[**IMPORTANT**] Pastikan terminal _MySQL_ sudah dapat diakses!
1. Dari folder _root_, navigasi ke folder `backend` `cd src/backend`
2. Pada file `config.go`, ubah variabel `databaseReference` menjadi format akses database _MySql_ dengan format string `{USERNAME}:{PASSWORD}@tcp({SERVER MYSQL LOKAL})` atau `{USERNAME}@tcp({SERVER MYSQL LOKAL)}`
> Server MySQL lokal biasanya berupa localhost:3306
3. Jalankan perintah untuk kompilasi _backend_:
```go
go run .
```
Apabila sukses, _database_ akan dibuat di dalam _MySQL_ lokal dan _server_ dapat dijalankan di `https://localhost:1323`

### Kompilasi Frontend
1. Dari folder _root_, navigasi ke folder `frontend` `cd src/frontend`
2. Lakukan instalasi _node modules yang diperlukan_ dengan perintah:
```javascript
npm install
```
3. Setelah itu, lakukan kompilasi _website_ dengan perintah:
```javascript
npm run dev
```

## Cara Menggunakan
#### **[IMPORTANT] Daftar penyakit yang ada di _website_ ini adalah fiksi belaka.**
### Fitur Deteksi Penyakit
1. Unggah berkas plainteks berisi rantai DNA ke _dropbox_ (dapat dengan mengklik _dropbox_ dan memilih atau melakukan _drag-and-drop_. Isi berkas akan ditampilkan ke dalam _dropbox_
2. Masukkan nama pengguna, penyakit yang ingin diperiksa, dan algoritma yang ingin digunakan
3. Klik `Submit`, dan hasil akan keluar apabila data valid
**[IMPORTANT]** Karena naluri pencarian dengan arah berbeda, hasil persentase pengecekan antara algoritma _Boyer-Moore_ dan _KMP_ dapat berbeda. Algoritma _Boyer-Moore_ melakukan pencocokan dari kanan-ke-kiri, sementara algoritma _KMP_ melakukan pencocokan dari kiri-ke-kanan. 

![image](https://user-images.githubusercontent.com/71161031/165732748-d52811bf-b168-47d9-8093-01e7c51a1e2f.png)

### Fitur Input Penyakit
1. Unggah berkas plainteks berisi rantai DNA ke _dropbox_ (dapat dengan mengklik _dropbox_ dan memilih atau melakukan _drag-and-drop_. Isi berkas akan ditampilkan ke dalam _dropbox_
2. Masukkan nama penyakit yang ingin ditambahkan
3. Klik `Submit`, dan penyakit akan ditambahkan apabila rantai valid dan tidak ada penyakit lain yang sudah ada dengan rantai / nama yang sama.

![image](https://user-images.githubusercontent.com/71161031/165732910-8e523722-131d-4650-9e70-212c01ea593e.png)

### Fitur Pencarian Sejarah
1. Masukkan _query_ pencarian dalam format <tanggal><spasi><nama penyakit>, <tanggal> saja, atau <penyakit> saja.
2. Halaman akan menunjukkan daftar penyakit yang ada sesuai kriteria

![image](https://user-images.githubusercontent.com/71161031/165733499-d894e15e-baa4-497b-8dd9-20419af013b8.png)

### Fitur Dark Mode
_Toggle_ tombol di bagian kanan di bawah tombol _About_ untuk mengaktifkan _dark mode_.
> _Hal ini, tentunya, untuk mempermudah penggunaan di malam hari._
  
![image](https://user-images.githubusercontent.com/71161031/165733687-2c529f3f-0884-431f-9185-18cf1d1eef9a.png)


## Identitas
Dibuat oleh Kelompok 53 - D&A
-  <a href="https://github.com/felinejtd">Felicia Sutandijo - 13520050</a> - desain _frontend_ dan dokumentasi
-  <a href="https://github.com/clumsyyyy">Owen Christian Wijaya - 13520124</a> - konfigurasi _backend_ dan _HTTP client_
-  <a href="https://github.com/christojeffrey">Christopher Jeffrey - 13520055</a> - _deployment_, testing, dan desain _frontend_
