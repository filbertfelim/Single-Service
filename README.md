# Identitas Diri

- Nama : Filbert Felim
- NIM : 18221097

# Cara menjalankan single service API

Clone the project

```bash
  git clone https://github.com/filbertfelim/Single-Service.git
```

Redirect ke folder project

```bash
  cd Single-Service
```

Install dependencies

```bash
  npm install
```

Redirect ke folder src

```bash
  cd src
```

Jalankan server

```bash
  nodemon index
```

Gunakan link [API documentation](http://localhost:3001/api-docs/) untuk mencoba request API

# Design Pattern

### Singleton Pattern

- Prisma ( ORM yang digunakan ) _client_ dalam proyek ini secara global hanya menggunakan satu _client instance_ untuk seluruh _controllers_ agar tidak menambah koneksi ke _database_ yang berkali-kali.

### Proxy Pattern

- Proxy pattern digunakan dalam _middleware_ `verifyToken` untuk melakukan verifikasi JWT token yang dihasilkan ketika login dengan setiap _bearer token_ yang dikirim dari _request_ API agar memastikan bahwa _user_ harus _login_ terlebih dahulu ( agar bisa mendapatkan token ) sebelum melakukan _request_ API terhadap data

### Request Response Pattern

- digunakan dalam semua _data fetching_ ketika _client_ melakukan _request_ API dan _server_ akan memberikan _response_ kepada _client_. Digunakan _pattern_ ini karena kesederhanaan dalam mengambil data, dan _reliable_ karena pasti akan menerima sebuah bentuk _response_

# Tech stack

- ORM : Prisma version 4.16.2 ( Prisma client version 4.16.2 )
- NodeJS : v20.3.0
- modules :
  - express : v4.18.2
  - jsonwebtoken v9.0.1
  - nodemon v3.0.1
  - bcrypt v5.1.0
  - cors v2.8.5
  - dotenv v16.3.1
  - swagger-jsdoc v6.2.8
  - swagger-ui-express v5.0.0

# Endpoint

### Barang API

- GET barang
- GET barang by id
- POST barang ( create new barang )
- POST barang ( update barang )
- DELETE barang

### Perusahaan API

- GET perusahaan
- GET perusahaan by id
- POST perusahaan ( create new perusahaan )
- POST perusahaan ( update perusahaan )
- DELETE perusahaan

### User API

- POST user ( register new user with admin access )
- POST user ( login to get JWT token )
- GET user ( get currently logged in user )

Selengkapnya di [API documentation](http://localhost:3001/api-docs/)

# Bonus

### B07 Dokumentasi API

- Menggunakan swagger untuk melakukan dokumentasi API yang dibuat dan bisa dicoba di link berikut : [API documentation](http://localhost:3001/api-docs/) ( setelah menjalankan server )
