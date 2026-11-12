# Panduan Pengerjaan & Dokumentasi RESTful API
## UTS Praktikum Pengembangan Aplikasi Web II (SI5B)

---

## 📌 Identitas Mahasiswa & Topik
- **Nama**: Ewaldo Suhendra
- **NIM**: 2428240090
- **Kelas**: SI5B
- **Topik**: 24 - Pariwisata Daerah
- **Mata Kuliah**: Pengembangan Aplikasi Web II (SI0027)
- **Dosen Penguji**: Nur Rachmat, M.Kom.
- **Tautan Repositori GitHub**: https://github.com/ewaldosuhendrakohar2428240090-del/uts-paw2-2428240090.git

---

## 📖 Ringkasan Ketentuan Template Laporan UTS

Berdasarkan berkas `Templat_Laporan_Praktikum_UTS_PAW2_SI5B_Upload.docx`, berikut adalah pemetaan komponen topik yang digunakan:

| Komponen Template | Nilai yang Diterapkan | Keterangan |
| :--- | :--- | :--- |
| **Model Utama & Endpoint** | `Destinasi`, `/destinasi` | Model entitas utama pariwisata |
| **Model Pendukung & Endpoint**| `Pengelola`, `/pengelola` | Model entitas pendukung organisasi pengelola |
| **[unik], [teks], [angka]** | `kode`, `nama`, `tarif` | Tiga field wajib pada model Destinasi |
| **[filter]** | `kategori` (dan `kota`) | Field untuk filtering query string |
| **[embed] (Embedding)** | `alamat` (`jalan`, `kota`) | Subdocument tanpa `_id` tersendiri |
| **[ref] (Referencing)** | `pengelolaId` | Rujukan bertipe `ObjectId` ke `Pengelola` |
| **Ketentuan C3 (Sorting)** | `GET /destinasi?sort=tarif` | Pengurutan menaik berdasarkan field angka (`tarif`) |

---

## 🛠️ Panduan Cara Mengerjakan & Mengisi Laporan Praktikum

### Langkah 1: Persiapan Lingkungan & Menjalankan Server
1. Buka terminal di folder project `restful-api-app`:
   ```bash
   cd restful-api-app
   ```
2. Pastikan file `.env` sudah ada dan sesuai dengan konfigurasi lokal:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://127.0.0.1:27017/uts_paw2
   CORS_ORIGIN=http://localhost:5173
   ```
3. Pastikan MongoDB Server lokal sudah aktif (layanan `MongoDB` di Windows berjalan).
4. Jalankan seeder basis data untuk mengisi data awal:
   ```bash
   npm run seed
   ```
5. Jalankan server:
   ```bash
   npm start
   ```

---

### Langkah 2: Panduan Pengambilan 7 Tangkapan Layar (Screenshot)

Pada file dokumen laporan Word, terdapat 7 kotak bergaris putus-putus untuk menempelkan screenshot hasil pengujian. Pastikan setiap gambar dipotong (*crop*) rapi dan teks terbaca jelas:

1. **Tangkapan Layar 1: Terminal Server (B1)**
   - **Yang harus terlihat**: Perintah `npm start`, pesan `Terhubung ke MongoDB`, dan alamat server `Server berjalan di http://localhost:3000`.

2. **Tangkapan Layar 2: Isi Basis Data (B1, B2)**
   - **Yang harus terlihat**: Buka **MongoDB Compass** pada database `uts_paw2`. Tampilkan daftar dua collection (`pengelolas` dan `destinasis`) dengan minimal satu dokumen pada collection `destinasis`.

3. **Tangkapan Layar 3: POST /destinasi (C1, B3)**
   - **Yang harus terlihat**: Pada Postman, Method `POST`, URL `http://localhost:3000/destinasi`, Body JSON yang dikirim (memuat nilai NIM pada field `kode`, misal: `"kode": "DST-2428240090-01"`), serta status `201 Created` yang menampilkan respons lengkap dengan field embedding (`alamat`) dan referencing (`pengelolaId`).

4. **Tangkapan Layar 4: GET /destinasi?kategori=alam&sort=tarif (C3)**
   - **Yang harus terlihat**: URL lengkap `http://localhost:3000/destinasi?kategori=alam&sort=tarif` dengan status respons `200 OK`, hanya menampilkan destinasi dengan kategori `alam` dan terurut menaik berdasarkan tarif.

5. **Tangkapan Layar 5: GET /destinasi/:id (C4)**
   - **Yang harus terlihat**: URL `http://localhost:3000/destinasi/<id_destinasi>`, respons `200 OK` dengan field `pengelolaId` yang sudah di-*populate* (memuat `_id`, `kode`, dan `nama` pengelola).

6. **Tangkapan Layar 6: Satu Skenario Galat (A3)**
   - **Yang harus terlihat**: Salah satu skenario galat, misalnya `POST /destinasi` tanpa `nama` (respons `400 Bad Request` dengan pesan `"nama wajib diisi"` dan detail), atau kode duplikat (`409 Conflict`).

7. **Tangkapan Layar 7: Riwayat Commit GitHub (Proses)**
   - **Yang harus terlihat**: Hasil perintah terminal `git log --oneline -5` atau tampilan tab *Commits* di repositori GitHub yang memperlihatkan commit bertahap (minimal 3 commit: Bagian A, Bagian B, Bagian C).

---

### Langkah 3: Panduan 15 Skenario Uji Endpoint di Postman (Tabel Bagian 3)

Gunakan daftar request berikut untuk menguji dan mengisi Tabel Hasil Pengujian Endpoint pada templat laporan:

| No | Request Postman | Method & Endpoint | Body Request (JSON) | Status Diharapkan | Status Didapat | Sesuai |
| :---: | :--- | :--- | :--- | :---: | :---: | :---: |
| **1** | POST [pathPendukung] | `POST /pengelola` | `{"kode": "PGL01", "nama": "Dinas Pariwisata"}` | `201` | `201` | Ya |
| **2** | POST [pathPendukung] kode sama | `POST /pengelola` | `{"kode": "PGL01", "nama": "Dinas Pariwisata Duplikat"}` | `409` | `409` | Ya |
| **3** | GET [pathPendukung] | `GET /pengelola` | *None* | `200` | `200` | Ya |
| **4** | POST [path] | `POST /destinasi` | `{"kode": "DST-2428240090-01", "nama": "Jembatan Ampera", "tarif": 0, "kategori": "sejarah", "alamat": {"jalan": "Jl. Sudirman", "kota": "Palembang"}, "pengelolaId": "<id_pengelola>"}` | `201` | `201` | Ya |
| **5** | POST [path] [unik] sama | `POST /destinasi` | `{"kode": "DST-2428240090-01", "nama": "Ampera Duplikat", "tarif": 0, "kategori": "sejarah", "pengelolaId": "<id_pengelola>"}` | `409` | `409` | Ya |
| **6** | POST [path] tanpa [teks] | `POST /destinasi` | `{"kode": "DST-2428240090-02", "tarif": 15000, "kategori": "alam", "pengelolaId": "<id_pengelola>"}` | `400 + detail` | `400` | Ya |
| **7** | POST [path] [angka] < min | `POST /destinasi` | `{"kode": "DST-2428240090-03", "nama": "Bukit", "tarif": -5000, "kategori": "alam", "pengelolaId": "<id_pengelola>"}` | `400` | `400` | Ya |
| **8** | GET [path] | `GET /destinasi` | *None* | `200, array` | `200` | Ya |
| **9** | GET [path]?[filter]=... | `GET /destinasi?kategori=alam` | *None* | `200, hanya data cocok` | `200` | Ya |
| **10**| GET [path]?[filter]=tidak_ada | `GET /destinasi?kategori=tidak_ada` | *None* | `200, []` | `200` | Ya |
| **11**| GET [path]?sort=[angka] | `GET /destinasi?sort=tarif` | *None* | `200, urut menaik` | `200` | Ya |
| **12**| GET [path]/:id | `GET /destinasi/<id_destinasi>` | *None* | `200, [ref] ter-populate` | `200` | Ya |
| **13**| GET [path]/:id (tidak ada) | `GET /destinasi/507f1f77bcf86cd799439011` | *None* | `404` | `404` | Ya |
| **14**| GET [path]/abc | `GET /destinasi/abc` | *None* | `400` | `400` | Ya |
| **15**| GET /rute-tidak-ada | `GET /rute-tidak-ada` | *None* | `404` | `404` | Ya |

---

### Langkah 4: Alasan Desain Data Model (Tabel Bagian 4)

| Data | Pola | Alasan |
| :--- | :--- | :--- |
| **`alamat` (`jalan`, `kota`)** | **Embedding** | Data alamat merupakan rincian lokasi fisik yang melekat langsung pada destinasi wisata dan selalu diakses secara bersamaan. Alamat tidak memerlukan ID independen atau operasi query terpisah. |
| **`Pengelola` (`pengelolaId`)** | **Referencing** | Satu entitas pengelola dapat mengelola banyak destinasi wisata (relasi *one-to-many*). Penggunaan referencing mencegah duplikasi data profil pengelola serta mempermudah pembaruan data secara konsisten. |

---

### Langkah 5: Kendala dan Penyelesaian (Tabel Bagian 5)

| No | Kendala | Penyelesaian |
| :---: | :--- | :--- |
| **1** | Format ID bukan ObjectId pada `GET /destinasi/:id` memicu `CastError` bawaan Mongoose yang menampilkan pesan internal teknis. | Mengonfigurasi `middlewares/errorHandler.js` untuk menangkap `err.name === 'CastError'` dan mengembalikan pesan respons HTTP 400 `{ "message": "Format ID '...' tidak valid" }` tanpa menampilkan nama model internal. |
| **2** | Kebutuhan penggabungan query parameter filtering (`kategori`) dan sorting (`tarif`) secara fleksibel. | Membangun query Mongoose secara modular (chaining): objek filter diterapkan terlebih dahulu pada `find(filter)`, kemudian disambungkan dengan `.sort({ [sortField]: 1 })` jika parameter sort dikirimkan. |

---

### Langkah 6: Checklist Akhir Sebelum Mengumpulkan (Tabel Bagian 6)

1. [x] Repositori GitHub bersifat publik dengan nama `uts-paw2-2428240090`.
2. [x] Riwayat commit bertahap (minimal 3 commit: Bagian A, Bagian B, Bagian C).
3. [x] Berkas `.env` tidak masuk ke repositori (`.gitignore` aktif); berkas `.env.example` tersedia.
4. [x] Nama model (`Destinasi`, `Pengelola`), endpoint (`/destinasi`, `/pengelola`), dan seluruh nama field sesuai topik.
5. [x] `README.md` memuat alasan embedding/referencing, daftar endpoint, dan panduan menjalankan aplikasi.
6. [x] Ketujuh tangkapan layar sudah ditempel di dokumen dan tabel hasil pengujian terisi lengkap.
7. [x] Identitas, tautan repositori, dan hash commit terakhir sudah diisi.
8. [x] Simpan dokumen laporan ke format PDF dengan nama: **`UTS-PAW2-SI5B-2428240090.pdf`** lalu unggah ke SPON.
