# 💍 Serverless Digital Wedding Invitation

> *An elegant, responsive, and serverless digital wedding invitation landing page built with HTML, Tailwind CSS, Vanilla JS, and Supabase.*

Sebuah proyek *landing page* undangan pernikahan digital modern yang mengutamakan kecepatan, kebersihan kode, dan skalabilitas. Proyek ini dibangun sebagai alternatif yang lebih ringan dan efisien dibandingkan menggunakan *page builder* konvensional (seperti WordPress/Elementor).

Mengusung arsitektur **JAMstack (JavaScript, APIs, Markup)**, proyek ini memisahkan antarmuka statis (*frontend*) dari pengolahan data (*backend*), memungkinkan *hosting* gratis dengan performa tinggi, sambil tetap mempertahankan fitur dinamis seperti RSVP dan Buku Tamu.

## 📌 Topik / Tags
`wedding-invitation`, `tailwind-css`, `html5`, `vanilla-javascript`, `supabase`, `serverless`, `jamstack`, `landing-page`, `responsive-web-design`

---

## ✨ Fitur Utama

* **Desain Responsif (Mobile-First):** Tata letak yang beradaptasi sempurna di berbagai ukuran layar, dari ponsel hingga *desktop*, dibangun menggunakan utilitas Tailwind CSS.
* **Animasi Interaktif:** Pengalaman *scrolling* yang elegan menggunakan AOS (Animate On Scroll).
* **Fitur Dinamis Serverless:** * **RSVP & Guestbook:** Pengelolaan konfirmasi kehadiran dan ucapan secara *real-time* tanpa *server backend* tradisional, ditenagai oleh Supabase (PostgreSQL).
* **Amplop Digital:** Fitur *copy-to-clipboard* yang memudahkan tamu untuk menyalin nomor rekening dengan satu klik.
* **Audio Latar Belakang:** Pemutaran musik romantis yang terintegrasi halus saat undangan dibuka.

## 🛠️ Teknologi yang Digunakan

* **Frontend:** HTML5 Semantik, [Tailwind CSS](https://tailwindcss.com/) (via CDN untuk *setup* cepat), Vanilla JavaScript.
* **Backend / Database:** [Supabase](https://supabase.com/) (BaaS berbasis PostgreSQL).
* **Animasi:** [AOS (Animate On Scroll)](https://michalsnik.github.io/aos/).
* **Tipografi:** Google Fonts (Poppins, Playfair Display, Great Vibes).

## 🚀 Panduan Memulai (Getting Started)

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di mesin lokal Anda.

### 1. Kloning Repositori
```bash
git clone [https://github.com/AdhyDa/Wedding-Invitation.git](https://github.com/AdhyDa/Wedding-Invitation.git)
cd Wedding-Invitation
```

### 2. Persiapan Supabase (Untuk Fitur RSVP)
1. Buat akun dan proyek baru di [Supabase](https://supabase.com/).
2. Buat tabel baru bernama guestbook dengan kolom berikut:
* id (UUID, Primary Key)
* nama (Text)
* kehadiran (Text/Boolean)
* jumlah_orang (Integer)
* ucapan (Text)
* created_at (Timestamp)
3. Atur Row Level Security (RLS) agar publik dapat melakukan INSERT dan SELECT.
4. Salin Project URL dan anon/public API Key dari dashboard Supabase Anda.

### 3. Konfigurasi Lingkungan
Buka file script.js (atau file JS utama Anda) dan masukkan kredensial Supabase yang telah disalin:

``` JavaScript
const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```
### 4. Menjalankan Proyek
Karena ini adalah situs statis, Anda dapat langsung membuka file index.html di browser Anda. Untuk pengalaman development yang lebih baik (mengatasi masalah CORS saat fetch API), disarankan menggunakan local server seperti ekstensi Live Server di VS Code.

---
## 📂 Struktur Direktori
``` Plaintext
Wedding-Invitation/
├── couple1.jpg      # Image Placeholder
├── couple2.jpg      # Image Placeholder
├── index.html       # Struktur utama antarmuka
├── placeholder.jpg  # Hero Image Placeholder
└── script.js        # Logika interaktivitas dan API Supabase
```

## 👨‍💻 Penulis
Dikembangkan oleh Adhyaksa Daudi (Adhy)

Mahasiswa Program Studi Pendidikan Teknik Informatika, Universitas Negeri Malang.
