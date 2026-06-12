// ============================================================
// MOCK DATA - Website Kecamatan Harian
// Kabupaten Samosir, Sumatera Utara
// ============================================================

export const KECAMATAN_CONFIG = {
  nama: "Kecamatan Harian",
  tagline: "Surga Tersembunyi di Tepi Danau Toba",
  kabupaten: "Kabupaten Samosir",
  provinsi: "Sumatera Utara",
  alamat: "Jl. Raya Harian No. 1, Kec. Harian, Kab. Samosir, Sumatera Utara 22392",
  telepon: "+62 626-20001",
  email: "info@kecharian.id",
  website: "www.kecharian.id",
  jam_operasional: "Senin - Jumat: 08.00 - 16.00 WIB",
  koordinat: { lat: 2.5833, lng: 98.6817 },
  sosmed: {
    facebook: "https://facebook.com/kecharian",
    instagram: "https://instagram.com/kecharian",
    youtube: "https://youtube.com/kecharian",
  },
  meta_desc: "Website resmi Kecamatan Harian, Kabupaten Samosir - Destinasi wisata alam dan budaya di tepi Danau Toba, Sumatera Utara.",
};

// Backward compatibility
export const SITE_CONFIG = KECAMATAN_CONFIG;

// ============================================================
// DATA DESA
// ============================================================
export interface Desa {
  id: number;
  slug: string;
  nama: string;
  foto: string;
  banner: string;
  deskripsi: string;
  kepala_desa: string;
  sekretaris: string;
  penduduk: number;
  luas_wilayah: string;
  rt: number;
  rw: number;
  sejarah: string;
  visi: string;
  misi: string[];
  aktif: boolean;
}

export const DESA_DATA: Desa[] = [
  {
    id: 1,
    slug: "turpuk-sihotang",
    nama: "Desa Turpuk Sihotang",
    foto: "https://images.unsplash.com/photo-1566205865731-51803de32a35?w=600&q=80",
    banner: "https://images.unsplash.com/photo-1643005264349-aae1772b2186?w=1400&q=80",
    deskripsi: "Desa Turpuk Sihotang dikenal sebagai pusat kerajinan ulos dan wisata budaya Batak Toba yang autentik. Terletak di tepian Danau Toba dengan pemandangan yang memukau.",
    kepala_desa: "Binsar Sihotang, S.IP",
    sekretaris: "Hotma Br. Simanjuntak",
    penduduk: 2143,
    luas_wilayah: "12,8 km²",
    rt: 16,
    rw: 4,
    sejarah: `Desa Turpuk Sihotang didirikan oleh marga Sihotang pada abad ke-17, menjadi salah satu permukiman tertua di sekitar Danau Toba. Nama "Turpuk" berasal dari bahasa Batak yang berarti "persimpangan", menggambarkan posisi desa sebagai titik pertemuan jalur perdagangan tradisional.\n\nPada masa kolonial Belanda, desa ini dikenal sebagai sentra produksi ulos berkualitas tinggi yang diperdagangkan ke seluruh Nusantara. Tradisi menenun ulos terus diwariskan secara turun-temurun hingga hari ini, menjadikan Turpuk Sihotang sebagai destinasi wisata budaya unggulan Kecamatan Harian.`,
    visi: "Menjadi desa budaya terbaik di kawasan Danau Toba yang mandiri, lestari, dan sejahtera pada tahun 2030.",
    misi: [
      "Melestarikan tradisi tenun ulos sebagai warisan budaya Batak",
      "Mengembangkan wisata budaya berbasis kearifan lokal",
      "Meningkatkan kesejahteraan pengrajin ulos melalui UMKM",
      "Membangun infrastruktur desa yang berkelanjutan",
    ],
    aktif: true,
  },
  {
    id: 2,
    slug: "sosor-dolok",
    nama: "Desa Sosor Dolok",
    foto: "https://images.unsplash.com/photo-1719557051612-10473aaa90e0?w=600&q=80",
    banner: "https://images.unsplash.com/photo-1575221165108-1c5d11ee1c51?w=1400&q=80",
    deskripsi: "Desa Sosor Dolok terkenal dengan wisata alam air terjun Efrata yang menakjubkan dan perkebunan kopi arabika premium. Panorama bukit hijau yang asri menjadi daya tarik utama.",
    kepala_desa: "Marolop Samosir, S.Hut",
    sekretaris: "Riama Br. Napitupulu",
    penduduk: 1876,
    luas_wilayah: "15,3 km²",
    rt: 14,
    rw: 3,
    sejarah: `Desa Sosor Dolok terletak di kaki perbukitan yang mengelilingi Danau Toba. "Sosor Dolok" dalam bahasa Batak berarti "lereng bukit", menggambarkan topografi desa yang berbukit dengan hamparan sawah dan kebun kopi yang subur.\n\nDesa ini dikenal sebagai penghasil kopi arabika premium sejak abad ke-19, ketika petani setempat mulai membudidayakan kopi di lereng bukit yang kaya mineral vulkanik. Air Terjun Efrata yang berada di wilayah desa telah menjadi destinasi wisata alam yang semakin populer.`,
    visi: "Menjadi desa wisata alam dan pertanian organik terbaik di Kabupaten Samosir yang berkelanjutan dan mandiri.",
    misi: [
      "Mengembangkan potensi wisata alam Air Terjun Efrata",
      "Memajukan pertanian kopi arabika organik",
      "Meningkatkan infrastruktur akses wisata",
      "Memberdayakan kelompok tani dan UMKM lokal",
    ],
    aktif: true,
  },
];

// ============================================================
// PROFIL KECAMATAN
// ============================================================
export const KECAMATAN_PROFIL = {
  sejarah: `Kecamatan Harian merupakan salah satu kecamatan di Kabupaten Samosir, Sumatera Utara. Wilayah ini berbatasan langsung dengan Danau Toba yang merupakan danau vulkanik terbesar di dunia dan Asia Tenggara.\n\nKecamatan ini memiliki kekayaan alam dan budaya Batak Toba yang luar biasa. Dua desa utama, yakni Turpuk Sihotang dan Sosor Dolok, menjadi pilar utama pengembangan pariwisata dan ekonomi lokal.\n\nPada era modern, Kecamatan Harian terus berkembang sebagai destinasi wisata unggulan dengan tagline "Surga Tersembunyi di Tepi Danau Toba", menawarkan pengalaman autentik wisata budaya, alam, dan kuliner khas Batak.`,
  visi: "Menjadi kecamatan wisata terbaik di kawasan Danau Toba yang mandiri, berbudaya, dan berkelanjutan pada tahun 2030.",
  misi: [
    "Mengembangkan potensi wisata alam dan budaya berbasis kearifan lokal Batak",
    "Meningkatkan kesejahteraan masyarakat melalui pengembangan UMKM dan pariwisata",
    "Melestarikan budaya dan tradisi Batak sebagai aset kecamatan",
    "Membangun infrastruktur yang berkelanjutan dan ramah lingkungan",
    "Meningkatkan kualitas pendidikan dan kesehatan masyarakat",
  ],
  statistik: {
    penduduk: 4019,
    kepala_keluarga: 1048,
    luas_wilayah: "28,1 km²",
    desa: 2,
    rw: 7,
    rt: 30,
    pria: 2012,
    wanita: 2007,
    batas: {
      utara: "Kecamatan Sianjur Mula-Mula",
      selatan: "Danau Toba",
      timur: "Kecamatan Pangururan",
      barat: "Kecamatan Sitio-tio",
    },
  },
};

export const DESA_PROFIL = KECAMATAN_PROFIL;

// ============================================================
// STRUKTUR ORGANISASI KECAMATAN
// ============================================================
export const STRUKTUR_ORGANISASI = [
  { id: 1, nama: "Drs. Rudi Manik, M.AP", jabatan: "Camat", foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80", periode: "2022-sekarang" },
  { id: 2, nama: "Sarmauli Br. Purba, S.IP", jabatan: "Sekretaris Camat", foto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80", periode: "2022-sekarang" },
  { id: 3, nama: "Hotman Sirait, S.STP", jabatan: "Kasi Pemerintahan", foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80", periode: "" },
  { id: 4, nama: "Dewi Tampubolon, S.Sos", jabatan: "Kasi Pelayanan Umum", foto: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=200&q=80", periode: "" },
  { id: 5, nama: "Rikardo Panjaitan, SH", jabatan: "Kasi Pemberdayaan Masyarakat", foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80", periode: "" },
  { id: 6, nama: "Lena Br. Sagala, S.Sos", jabatan: "Kasubag Umum & Kepegawaian", foto: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80", periode: "" },
  { id: 7, nama: "Andi Siahaan", jabatan: "Kasi Ketentraman & Ketertiban", foto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80", periode: "" },
  { id: 8, nama: "Sari Br. Manullang", jabatan: "Kasubag Keuangan & Program", foto: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80", periode: "" },
];

// ============================================================
// KATEGORI
// ============================================================
export const KATEGORI_WISATA = ["Semua", "Alam", "Budaya", "Kuliner", "Air", "Religi"];
export const KATEGORI_UMKM = ["Semua", "Kuliner", "Kerajinan", "Pertanian", "Jasa", "Fashion"];
export const KATEGORI_BERITA = ["Semua", "Umum", "Wisata", "UMKM", "Budaya", "Kesehatan", "Pertanian", "Pemerintahan"];
export const KATEGORI_PUPUK = ["Semua", "Organik", "Kimia", "Hayati", "Subsidi"];
export const KATEGORI_EVENT = ["Semua", "Festival", "Budaya", "Olahraga", "Pasar", "Pemerintahan"];
export const KATEGORI_GALERI = ["Semua", "Wisata", "Budaya", "UMKM", "Kegiatan Desa", "Event"];

// ============================================================
// WISATA (dengan village_id)
// ============================================================
export interface Wisata {
  id: number;
  slug: string;
  nama: string;
  kategori: string;
  deskripsi: string;
  foto: string;
  galeri: string[];
  jam_buka: string;
  tiket: string;
  fasilitas: string[];
  lokasi: string;
  koordinat: { lat: number; lng: number };
  rating: number;
  featured: boolean;
  aktif: boolean;
  village_id: number | null; // null = kecamatan level
}

export const WISATA_DATA: Wisata[] = [
  {
    id: 1,
    slug: "air-terjun-efrata",
    nama: "Air Terjun Efrata",
    kategori: "Air",
    village_id: 2,
    deskripsi: "Air terjun memukau setinggi 80 meter yang tersembunyi di balik hutan tropis Desa Sosor Dolok. Airnya yang jernih dan sejuk mengalir melewati bebatuan vulkanik, menciptakan pemandangan yang spektakuler. Trek menuju air terjun menawarkan pengalaman hiking yang menarik di tengah keindahan alam.",
    foto: "https://images.unsplash.com/photo-1575221165108-1c5d11ee1c51?w=800&q=80",
    galeri: [
      "https://images.unsplash.com/photo-1575221165108-1c5d11ee1c51?w=800&q=80",
      "https://images.unsplash.com/photo-1761520873942-407665deb1f8?w=800&q=80",
      "https://images.unsplash.com/photo-1615009820619-d69e2f948e8d?w=800&q=80",
    ],
    jam_buka: "07.00 - 17.00 WIB",
    tiket: "Rp 15.000/orang",
    fasilitas: ["Area parkir", "Toilet umum", "Warung makan", "Pemandu lokal", "Area camping"],
    lokasi: "Desa Sosor Dolok, Kec. Harian",
    koordinat: { lat: 2.5900, lng: 98.6900 },
    rating: 4.8,
    featured: true,
    aktif: true,
  },
  {
    id: 2,
    slug: "sanggar-tenun-ulos-sihotang",
    nama: "Sanggar Tenun Ulos Sihotang",
    kategori: "Budaya",
    village_id: 1,
    deskripsi: "Pusat kerajinan tenun ulos tradisional Batak Toba di Desa Turpuk Sihotang. Pengunjung dapat menyaksikan langsung proses menenun dengan alat tradisional dan belajar membuat ulos dari pengrajin berpengalaman. Tersedia galeri dan toko untuk membeli ulos berkualitas langsung dari pengrajin.",
    foto: "https://images.unsplash.com/photo-1761410201022-cae20bd6abcf?w=800&q=80",
    galeri: [
      "https://images.unsplash.com/photo-1761410201022-cae20bd6abcf?w=800&q=80",
      "https://images.unsplash.com/photo-1773562629318-03fc9fcef40e?w=800&q=80",
    ],
    jam_buka: "08.00 - 17.00 WIB",
    tiket: "Gratis (workshop Rp 75.000)",
    fasilitas: ["Workshop tenun", "Galeri ulos", "Toko souvenir", "Pemandu budaya"],
    lokasi: "Desa Turpuk Sihotang, Kec. Harian",
    koordinat: { lat: 2.5780, lng: 98.6750 },
    rating: 4.9,
    featured: true,
    aktif: true,
  },
  {
    id: 3,
    slug: "panorama-danau-toba-harian",
    nama: "Panorama Danau Toba Harian",
    kategori: "Alam",
    village_id: null,
    deskripsi: "Titik pandang terbaik menikmati keindahan Danau Toba dari wilayah Kecamatan Harian. Dari ketinggian ini, wisatawan dapat menikmati hamparan biru Danau Toba yang luas dengan latar Pulau Samosir dan perbukitan hijau yang menakjubkan.",
    foto: "https://images.unsplash.com/photo-1643005264349-aae1772b2186?w=800&q=80",
    galeri: [
      "https://images.unsplash.com/photo-1643005264349-aae1772b2186?w=800&q=80",
      "https://images.unsplash.com/photo-1615009820619-d69e2f948e8d?w=800&q=80",
    ],
    jam_buka: "05.00 - 19.00 WIB",
    tiket: "Rp 5.000/orang",
    fasilitas: ["Menara pandang", "Warung kopi", "Parkir", "Toilet"],
    lokasi: "Kecamatan Harian",
    koordinat: { lat: 2.5833, lng: 98.6817 },
    rating: 4.7,
    featured: true,
    aktif: true,
  },
  {
    id: 4,
    slug: "perkebunan-kopi-arabika",
    nama: "Perkebunan Kopi Arabika Sosor Dolok",
    kategori: "Alam",
    village_id: 2,
    deskripsi: "Agrowisata perkebunan kopi arabika premium di lereng bukit Sosor Dolok. Wisatawan dapat melihat langsung proses penanaman, pemetikan, hingga pengolahan kopi. Tersedia sesi cupping untuk menikmati cita rasa kopi Toba yang khas.",
    foto: "https://images.unsplash.com/photo-1767678233351-9308d8220fa5?w=800&q=80",
    galeri: [
      "https://images.unsplash.com/photo-1767678233351-9308d8220fa5?w=800&q=80",
    ],
    jam_buka: "08.00 - 16.00 WIB",
    tiket: "Rp 20.000/orang",
    fasilitas: ["Tour kebun", "Cupping session", "Toko kopi", "Cafe"],
    lokasi: "Desa Sosor Dolok, Kec. Harian",
    koordinat: { lat: 2.5950, lng: 98.6950 },
    rating: 4.6,
    featured: false,
    aktif: true,
  },
  {
    id: 5,
    slug: "rumah-adat-batak-harian",
    nama: "Rumah Adat Batak Harian",
    kategori: "Budaya",
    village_id: 1,
    deskripsi: "Kompleks rumah adat Batak Toba yang masih terjaga keasliannya di Desa Turpuk Sihotang. Pengunjung dapat menyaksikan arsitektur tradisional gorga dan mempelajari filosofi hidup masyarakat Batak melalui bangunan bersejarah ini.",
    foto: "https://images.unsplash.com/photo-1566205865731-51803de32a35?w=800&q=80",
    galeri: [
      "https://images.unsplash.com/photo-1566205865731-51803de32a35?w=800&q=80",
      "https://images.unsplash.com/photo-1773562629318-03fc9fcef40e?w=800&q=80",
    ],
    jam_buka: "08.00 - 17.00 WIB",
    tiket: "Rp 10.000/orang",
    fasilitas: ["Pemandu wisata", "Museum mini", "Toko souvenir", "Parkir"],
    lokasi: "Desa Turpuk Sihotang, Kec. Harian",
    koordinat: { lat: 2.5760, lng: 98.6730 },
    rating: 4.8,
    featured: false,
    aktif: true,
  },
  {
    id: 6,
    slug: "pasar-tradisional-harian",
    nama: "Pasar Tradisional Harian",
    kategori: "Kuliner",
    village_id: null,
    deskripsi: "Pasar tradisional kecamatan yang beroperasi setiap hari Sabtu. Menjual berbagai produk lokal khas Samosir seperti ikan pora-pora, kopi arabika, andaliman, ulos, dan berbagai kerajinan tangan.",
    foto: "https://images.unsplash.com/photo-1770529932989-5b14015f5812?w=800&q=80",
    galeri: [
      "https://images.unsplash.com/photo-1770529932989-5b14015f5812?w=800&q=80",
    ],
    jam_buka: "06.00 - 12.00 WIB (Sabtu)",
    tiket: "Gratis",
    fasilitas: ["Parkir", "Toilet", "Warung makan"],
    lokasi: "Pusat Kecamatan Harian",
    koordinat: { lat: 2.5833, lng: 98.6817 },
    rating: 4.4,
    featured: false,
    aktif: true,
  },
];

// ============================================================
// UMKM (dengan village_id)
// ============================================================
export interface UMKM {
  id: number;
  nama: string;
  kategori: string;
  deskripsi: string;
  produk: string[];
  foto: string;
  pemilik: string;
  telepon: string;
  instagram: string;
  whatsapp: string;
  alamat: string;
  village_id: number | null;
  aktif: boolean;
}

export const UMKM_DATA: UMKM[] = [
  {
    id: 1,
    nama: "Tenun Ulos Bu Riana",
    kategori: "Kerajinan",
    village_id: 1,
    deskripsi: "Pengrajin ulos Batak generasi ketiga dari Desa Turpuk Sihotang. Menggunakan alat tenun tradisional dengan motif-motif khas Toba. Ulos yang dihasilkan memiliki kualitas premium dan dikenal hingga mancanegara.",
    produk: ["Ulos Sadum", "Ulos Ragi Hotang", "Ulos Bintang Maratur", "Selendang Ulos", "Tas Ulos"],
    foto: "https://images.unsplash.com/photo-1761410201022-cae20bd6abcf?w=400&q=80",
    pemilik: "Riana Br. Sihotang",
    telepon: "0812-3456-7890",
    instagram: "@ulosriana_sihotang",
    whatsapp: "6281234567890",
    alamat: "Desa Turpuk Sihotang, Kec. Harian",
    aktif: true,
  },
  {
    id: 2,
    nama: "Kopi Arabika Sosor Dolok",
    kategori: "Pertanian",
    village_id: 2,
    deskripsi: "Produsen kopi arabika premium dari lereng Bukit Sosor Dolok. Proses roasting dilakukan secara tradisional dengan cita rasa fruity dan earthy yang khas dataran tinggi Samosir.",
    produk: ["Kopi Arabika Roasted", "Kopi Arabika Green Bean", "Kopi Luwak Toba", "Cold Brew Toba"],
    foto: "https://images.unsplash.com/photo-1767678233351-9308d8220fa5?w=400&q=80",
    pemilik: "Hotman Samosir",
    telepon: "0821-6789-0123",
    instagram: "@kopi_sosordolok",
    whatsapp: "6282167890123",
    alamat: "Desa Sosor Dolok, Kec. Harian",
    aktif: true,
  },
  {
    id: 3,
    nama: "Warung Naniura Harian",
    kategori: "Kuliner",
    village_id: null,
    deskripsi: "Warung kuliner Batak yang menyajikan menu tradisional autentik. Terkenal dengan naniura (ikan mas mentah), arsik, dan berbagai masakan khas Batak Toba dengan resep turun-temurun.",
    produk: ["Naniura", "Ikan Arsik", "Saksang", "Daun Ubi Tumbuk", "Kopi Sidikalang"],
    foto: "https://images.unsplash.com/photo-1770529932989-5b14015f5812?w=400&q=80",
    pemilik: "Benny Purba",
    telepon: "0813-5678-9012",
    instagram: "@naniura_harian",
    whatsapp: "6281356789012",
    alamat: "Pusat Kecamatan Harian",
    aktif: true,
  },
  {
    id: 4,
    nama: "Ukiran Kayu Batak Sihotang",
    kategori: "Kerajinan",
    village_id: 1,
    deskripsi: "Pengrajin furniture dan souvenir kayu dengan motif ukiran gorga Batak. Melayani pesanan custom untuk keperluan rumah, hotel, dan oleh-oleh wisatawan.",
    produk: ["Patung Gorga", "Mangkok Kayu Batak", "Meja Ukir", "Pigura Motif Gorga", "Sendok Kayu"],
    foto: "https://images.unsplash.com/photo-1566205865731-51803de32a35?w=400&q=80",
    pemilik: "Amos Sihotang",
    telepon: "0822-3456-7890",
    instagram: "@ukiran_sihotang",
    whatsapp: "6282234567890",
    alamat: "Desa Turpuk Sihotang, Kec. Harian",
    aktif: true,
  },
  {
    id: 5,
    nama: "Homestay Danau View Harian",
    kategori: "Jasa",
    village_id: null,
    deskripsi: "Penginapan keluarga dengan pemandangan Danau Toba yang langsung terhampar. Sarapan pagi dengan menu Batak tradisional tersedia setiap hari.",
    produk: ["Kamar Standard", "Kamar Deluxe Lake View", "Family Room", "Paket Wisata 3D2N"],
    foto: "https://images.unsplash.com/photo-1643005264349-aae1772b2186?w=400&q=80",
    pemilik: "Rohani Br. Naibaho",
    telepon: "0823-4567-8901",
    instagram: "@homestay_harian",
    whatsapp: "6282345678901",
    alamat: "Kecamatan Harian, Kab. Samosir",
    aktif: true,
  },
  {
    id: 6,
    nama: "Gula Aren Organik Sosor Dolok",
    kategori: "Pertanian",
    village_id: 2,
    deskripsi: "Produsen gula aren organik dari pohon aren alami di Desa Sosor Dolok. Diproses secara tradisional tanpa bahan kimia, menghasilkan gula aren berkualitas tinggi.",
    produk: ["Gula Aren Cetak", "Gula Aren Kristal", "Sirup Aren", "Palm Sugar Organik"],
    foto: "https://images.unsplash.com/photo-1736259762078-2d2d6f327567?w=400&q=80",
    pemilik: "Devi Br. Napitupulu",
    telepon: "0824-5678-9012",
    instagram: "@gulaaren_sosordolok",
    whatsapp: "6282456789012",
    alamat: "Desa Sosor Dolok, Kec. Harian",
    aktif: true,
  },
];

// ============================================================
// BERITA (dengan village_id)
// ============================================================
export interface Berita {
  id: number;
  slug: string;
  judul: string;
  kategori: string;
  ringkasan: string;
  isi: string;
  foto: string;
  penulis: string;
  tanggal: string;
  status: "published" | "draft";
  featured: boolean;
  village_id: number | null;
}

export const BERITA_DATA: Berita[] = [
  {
    id: 1,
    slug: "festival-danau-toba-2025-harian",
    judul: "Festival Danau Toba 2025 Dipusatkan di Kecamatan Harian",
    kategori: "Wisata",
    village_id: null,
    ringkasan: "Kecamatan Harian ditunjuk sebagai tuan rumah Festival Danau Toba 2025 yang akan menampilkan pertunjukan budaya, pameran UMKM, dan berbagai atraksi wisata dari dua desa.",
    isi: `<p>Kecamatan Harian dengan bangga menjadi tuan rumah <strong>Festival Danau Toba 2025</strong> yang akan diselenggarakan pada 14-16 Agustus 2025.</p><p>Festival ini akan menampilkan berbagai acara dari dua desa, Turpuk Sihotang dan Sosor Dolok:</p><ul><li>Pertunjukan Tor-Tor dan Gondang Sambilan</li><li>Pameran dan Bazaar UMKM lokal</li><li>Workshop tenun ulos</li><li>Pameran foto Danau Toba</li><li>Kompetisi perahu tradisional</li><li>Demo memetik dan mengolah kopi arabika</li></ul><p>Camat Harian menyatakan, "Ini kesempatan emas untuk memperkenalkan budaya dan produk dua desa kami kepada dunia."</p>`,
    foto: "https://images.unsplash.com/photo-1773562629318-03fc9fcef40e?w=800&q=80",
    penulis: "Admin Kecamatan",
    tanggal: "2025-07-15",
    status: "published",
    featured: true,
  },
  {
    id: 2,
    slug: "digitalisasi-umkm-turpuk-sihotang",
    judul: "50 Pengrajin Ulos Turpuk Sihotang Ikuti Pelatihan Digital Marketing",
    kategori: "UMKM",
    village_id: 1,
    ringkasan: "Pemerintah Kecamatan Harian bersama Dinas Koperasi mengadakan pelatihan digital marketing bagi 50 pengrajin ulos di Desa Turpuk Sihotang.",
    isi: `<p>Sebanyak 50 pengrajin ulos di Desa Turpuk Sihotang mengikuti pelatihan <strong>Digital Marketing & E-Commerce</strong> selama tiga hari pada 10-12 Juli 2025.</p><p>Pelatihan mencakup fotografi produk, pemasaran via marketplace, dan manajemen toko online.</p>`,
    foto: "https://images.unsplash.com/photo-1767678233351-9308d8220fa5?w=800&q=80",
    penulis: "Admin Kecamatan",
    tanggal: "2025-07-12",
    status: "published",
    featured: false,
  },
  {
    id: 3,
    slug: "perbaikan-akses-air-terjun-efrata",
    judul: "Pembangunan Jalur Trekking Air Terjun Efrata Rampung",
    kategori: "Wisata",
    village_id: 2,
    ringkasan: "Proyek pembangunan jalur trekking sepanjang 2,5 km menuju Air Terjun Efrata di Desa Sosor Dolok berhasil diselesaikan dengan anggaran Dana Desa.",
    isi: `<p>Jalur trekking menuju <strong>Air Terjun Efrata</strong> di Desa Sosor Dolok kini telah selesai dibangun dengan total panjang 2,5 kilometer. Proyek ini didanai dari Dana Desa tahun 2025 senilai Rp 380 juta.</p><p>Pembangunan meliputi pemasangan papan petunjuk arah, perapian jalur trekking, penambahan rest area, dan pembangunan toilet umum di dekat lokasi.</p>`,
    foto: "https://images.unsplash.com/photo-1660749416929-0791645dd142?w=800&q=80",
    penulis: "Admin Desa Sosor Dolok",
    tanggal: "2025-07-08",
    status: "published",
    featured: false,
  },
  {
    id: 4,
    slug: "kopi-arabika-sosor-dolok-ekspor",
    judul: "Kopi Arabika Sosor Dolok Tembus Pasar Ekspor Korea Selatan",
    kategori: "UMKM",
    village_id: 2,
    ringkasan: "Kelompok tani kopi arabika Desa Sosor Dolok berhasil menembus pasar ekspor Korea Selatan dengan volume perdana 500 kg biji kopi green bean.",
    isi: `<p>Kelompok Tani Kopi Arabika Sosor Dolok berhasil melakukan ekspor perdana ke Korea Selatan sebanyak <strong>500 kg biji kopi green bean</strong>. Pencapaian ini menjadi tonggak sejarah bagi petani kopi di Kecamatan Harian.</p>`,
    foto: "https://images.unsplash.com/photo-1767678233351-9308d8220fa5?w=800&q=80",
    penulis: "Admin Desa Sosor Dolok",
    tanggal: "2025-07-01",
    status: "published",
    featured: true,
  },
  {
    id: 5,
    slug: "pelestarian-tari-tor-tor-harian",
    judul: "Sanggar Seni Harian Latih 60 Penari Tor-Tor Generasi Muda",
    kategori: "Budaya",
    village_id: 1,
    ringkasan: "Sanggar Seni Turpuk Sihotang berhasil melatih 60 penari muda dalam pertunjukan Tari Tor-Tor sebagai upaya pelestarian budaya Batak.",
    isi: `<p>Sanggar Seni Turpuk Sihotang di Kecamatan Harian terus bersemangat melestarikan budaya Batak, terutama <strong>Tari Tor-Tor</strong>. Saat ini 60 penari muda berusia 8-22 tahun aktif berlatih.</p>`,
    foto: "https://images.unsplash.com/photo-1773562629318-03fc9fcef40e?w=800&q=80",
    penulis: "Admin Kecamatan",
    tanggal: "2025-06-25",
    status: "published",
    featured: false,
  },
  {
    id: 6,
    slug: "posyandu-terbaik-samosir",
    judul: "Posyandu Kecamatan Harian Raih Predikat Terbaik Kabupaten Samosir",
    kategori: "Kesehatan",
    village_id: null,
    ringkasan: "Posyandu Kecamatan Harian meraih predikat posyandu terbaik tingkat Kabupaten Samosir berkat konsistensi pelayanan dan inovasi program gizi.",
    isi: `<p>Posyandu Kecamatan Harian berhasil meraih penghargaan sebagai <strong>Posyandu Terbaik Kabupaten Samosir 2025</strong>. Penghargaan diserahkan langsung oleh Bupati Samosir.</p>`,
    foto: "https://images.unsplash.com/photo-1660749416929-0791645dd142?w=800&q=80",
    penulis: "Admin Kecamatan",
    tanggal: "2025-06-20",
    status: "published",
    featured: false,
  },
];

// ============================================================
// EVENT (dengan village_id)
// ============================================================
export interface Event {
  id: number;
  judul: string;
  kategori: string;
  deskripsi: string;
  tanggal_mulai: string;
  tanggal_selesai: string;
  lokasi: string;
  warna: string;
  village_id: number | null;
  aktif: boolean;
}

export const EVENT_DATA: Event[] = [
  { id: 1, judul: "Festival Danau Toba 2025", kategori: "Festival", village_id: null, deskripsi: "Festival budaya tahunan dengan pertunjukan seni dan pameran UMKM dari dua desa", tanggal_mulai: "2026-05-14", tanggal_selesai: "2026-05-16", lokasi: "Lapangan Kecamatan Harian", warna: "#1A56A0", aktif: true },
  { id: 2, judul: "Pameran Ulos Turpuk Sihotang", kategori: "Budaya", village_id: 1, deskripsi: "Pameran dan bazaar ulos tradisional Batak Toba dari pengrajin Turpuk Sihotang", tanggal_mulai: "2026-05-20", tanggal_selesai: "2026-05-21", lokasi: "Desa Turpuk Sihotang", warna: "#E67E22", aktif: true },
  { id: 3, judul: "Festival Kopi Sosor Dolok", kategori: "Pasar", village_id: 2, deskripsi: "Festival kopi arabika dengan cupping, lomba barista, dan pameran produk kopi", tanggal_mulai: "2026-05-23", tanggal_selesai: "2026-05-24", lokasi: "Desa Sosor Dolok", warna: "#2E8B57", aktif: true },
  { id: 4, judul: "Lomba Perahu Tradisional", kategori: "Olahraga", village_id: null, deskripsi: "Lomba perahu tradisional di Danau Toba memperingati HUT RI ke-80", tanggal_mulai: "2026-05-17", tanggal_selesai: "2026-05-17", lokasi: "Dermaga Kecamatan Harian", warna: "#DC2626", aktif: true },
  { id: 5, judul: "Senam Sehat Kecamatan", kategori: "Olahraga", village_id: null, deskripsi: "Senam sehat bersama masyarakat kecamatan setiap hari Minggu", tanggal_mulai: "2026-05-10", tanggal_selesai: "2026-05-10", lokasi: "Lapangan Kecamatan Harian", warna: "#DC2626", aktif: true },
  { id: 6, judul: "Workshop Fotografi Wisata", kategori: "Festival", village_id: null, deskripsi: "Pelatihan fotografi untuk pelaku wisata dan UMKM lokal", tanggal_mulai: "2026-05-12", tanggal_selesai: "2026-05-12", lokasi: "Kantor Kecamatan Harian", warna: "#1A56A0", aktif: true },
  { id: 7, judul: "Pasar Rakyat Mingguan", kategori: "Pasar", village_id: null, deskripsi: "Pasar tradisional mingguan dengan produk lokal dan UMKM", tanggal_mulai: "2026-05-11", tanggal_selesai: "2026-05-11", lokasi: "Pusat Kecamatan Harian", warna: "#2E8B57", aktif: true },
  { id: 8, judul: "Gotong Royong Desa", kategori: "Pemerintahan", village_id: 1, deskripsi: "Kerja bakti membersihkan lingkungan desa Turpuk Sihotang", tanggal_mulai: "2026-05-15", tanggal_selesai: "2026-05-15", lokasi: "Desa Turpuk Sihotang", warna: "#7C3AED", aktif: true },
  { id: 9, judul: "Pertunjukan Gondang Sambilan", kategori: "Budaya", village_id: 1, deskripsi: "Pertunjukan musik tradisional Batak dengan ensembel Gondang Sambilan", tanggal_mulai: "2026-05-18", tanggal_selesai: "2026-05-18", lokasi: "Sanggar Budaya Turpuk Sihotang", warna: "#E67E22", aktif: true },
  { id: 10, judul: "Musyawarah Perencanaan Kecamatan", kategori: "Pemerintahan", village_id: null, deskripsi: "Musyawarah kecamatan untuk perencanaan pembangunan 2026", tanggal_mulai: "2026-06-05", tanggal_selesai: "2026-06-05", lokasi: "Kantor Kecamatan Harian", warna: "#7C3AED", aktif: true },
  { id: 11, judul: "Pesta Panen Raya Sosor Dolok", kategori: "Budaya", village_id: 2, deskripsi: "Perayaan pesta panen raya dengan upacara adat Marboru Jabu di Sosor Dolok", tanggal_mulai: "2026-06-12", tanggal_selesai: "2026-06-13", lokasi: "Desa Sosor Dolok", warna: "#E67E22", aktif: true },
  { id: 12, judul: "Turnamen Voli Antar Desa", kategori: "Olahraga", village_id: null, deskripsi: "Kompetisi bola voli antar desa se-Kecamatan Harian", tanggal_mulai: "2026-06-20", tanggal_selesai: "2026-06-21", lokasi: "Lapangan Kecamatan Harian", warna: "#DC2626", aktif: true },
];

// ============================================================
// PUPUK
// ============================================================
export interface Pupuk {
  id: number;
  nama: string;
  kategori: string;
  merek: string;
  deskripsi: string;
  kegunaan: string[];
  panduan: string;
  dosis: string;
  foto: string;
  harga: string;
  ketersediaan: "tersedia" | "habis" | "terbatas";
  subsidi: boolean;
  aktif: boolean;
}

export const PUPUK_DATA: Pupuk[] = [
  {
    id: 1,
    nama: "Pupuk Urea",
    kategori: "Kimia",
    merek: "Pupuk Kujang",
    deskripsi: "Pupuk nitrogen tinggi untuk pertumbuhan tanaman yang optimal. Cocok untuk tanaman padi, jagung, dan sayuran.",
    kegunaan: ["Padi", "Jagung", "Sayuran", "Perkebunan"],
    panduan: "Taburkan secara merata di sekitar tanaman pada saat pengolahan tanah atau saat tanaman berumur 2-3 minggu.",
    dosis: "100-150 kg/ha untuk padi; 75-100 kg/ha untuk jagung",
    foto: "https://images.unsplash.com/photo-1736259762078-2d2d6f327567?w=400&q=80",
    harga: "Rp 112.500/50 kg (subsidi)",
    ketersediaan: "tersedia",
    subsidi: true,
    aktif: true,
  },
  {
    id: 2,
    nama: "Pupuk NPK Phonska",
    kategori: "Kimia",
    merek: "Petrokimia Gresik",
    deskripsi: "Pupuk majemuk NPK dengan kandungan N, P, K yang seimbang untuk meningkatkan produktivitas hasil panen.",
    kegunaan: ["Padi", "Jagung", "Tebu", "Kopi"],
    panduan: "Aplikasikan pada awal tanam dan pemupukan susulan pada 30-35 HST.",
    dosis: "150-200 kg/ha",
    foto: "https://images.unsplash.com/photo-1736259762078-2d2d6f327567?w=400&q=80",
    harga: "Rp 115.000/50 kg (subsidi)",
    ketersediaan: "tersedia",
    subsidi: true,
    aktif: true,
  },
  {
    id: 3,
    nama: "Kompos Organik Samosir",
    kategori: "Organik",
    merek: "Samosir Organik",
    deskripsi: "Pupuk kompos organik produksi lokal dari bahan alami sisa panen, kotoran ternak, dan biomassa. Ramah lingkungan dan memperbaiki struktur tanah.",
    kegunaan: ["Semua Tanaman", "Kopi", "Sayuran", "Buah-buahan"],
    panduan: "Campurkan dengan tanah pada saat pengolahan dengan perbandingan 1:3 (kompos:tanah).",
    dosis: "2-5 ton/ha atau 2-5 kg/m²",
    foto: "https://images.unsplash.com/photo-1736259762078-2d2d6f327567?w=400&q=80",
    harga: "Rp 25.000/10 kg",
    ketersediaan: "tersedia",
    subsidi: false,
    aktif: true,
  },
  {
    id: 4,
    nama: "Bio-Fertilizer Rhizobium",
    kategori: "Hayati",
    merek: "BioAgro",
    deskripsi: "Pupuk hayati berbasis bakteri Rhizobium yang memfiksasi nitrogen dari udara secara alami.",
    kegunaan: ["Kedelai", "Kacang Tanah", "Kacang Hijau"],
    panduan: "Campurkan dengan benih sebelum tanam. Gunakan dalam kondisi tanah lembab.",
    dosis: "200-500 g/ha benih",
    foto: "https://images.unsplash.com/photo-1736259762078-2d2d6f327567?w=400&q=80",
    harga: "Rp 45.000/500 g",
    ketersediaan: "terbatas",
    subsidi: false,
    aktif: true,
  },
  {
    id: 5,
    nama: "Pupuk SP-36",
    kategori: "Kimia",
    merek: "Petrokimia Gresik",
    deskripsi: "Pupuk fosfat untuk pembentukan akar yang kuat dan pembungaan optimal.",
    kegunaan: ["Padi", "Kentang", "Ubi Kayu", "Hortikultura"],
    panduan: "Aplikasikan saat pengolahan tanah. Benam dalam tanah sedalam 5-10 cm.",
    dosis: "75-100 kg/ha",
    foto: "https://images.unsplash.com/photo-1736259762078-2d2d6f327567?w=400&q=80",
    harga: "Rp 120.000/50 kg (subsidi)",
    ketersediaan: "tersedia",
    subsidi: true,
    aktif: true,
  },
  {
    id: 6,
    nama: "Pupuk Organik Cair Toba",
    kategori: "Organik",
    merek: "Toba Organik",
    deskripsi: "Pupuk organik cair dari fermentasi limbah pertanian yang kaya mikronutrien.",
    kegunaan: ["Sayuran", "Kopi", "Buah-buahan", "Padi"],
    panduan: "Encerkan 10-20 ml/liter air dan semprotkan ke daun setiap 1-2 minggu.",
    dosis: "1-2 liter/ha",
    foto: "https://images.unsplash.com/photo-1736259762078-2d2d6f327567?w=400&q=80",
    harga: "Rp 35.000/1 liter",
    ketersediaan: "tersedia",
    subsidi: false,
    aktif: true,
  },
];

// ============================================================
// BUDAYA
// ============================================================
export const BUDAYA_DATA = [
  {
    id: 1,
    judul: "Tenun Ulos - Warisan Budaya Batak",
    deskripsi: "Ulos adalah kain tenun tradisional Batak Toba yang memiliki makna sakral dalam setiap upacara adat. Di Desa Turpuk Sihotang, tradisi menenun ulos masih diwariskan dari generasi ke generasi.",
    foto: "https://images.unsplash.com/photo-1761410201022-cae20bd6abcf?w=600&q=80",
    village_id: 1,
    kategori: "Kerajinan",
    aktif: true,
  },
  {
    id: 2,
    judul: "Tari Tor-Tor - Ekspresi Spiritual Batak",
    deskripsi: "Tari Tor-Tor adalah tarian sakral dalam setiap upacara adat Batak. Gerakannya yang dinamis diiringi Gondang Sambilan menciptakan harmoni yang memukau.",
    foto: "https://images.unsplash.com/photo-1773562629318-03fc9fcef40e?w=600&q=80",
    village_id: 1,
    kategori: "Tari",
    aktif: true,
  },
  {
    id: 3,
    judul: "Musik Gondang - Nada Kehidupan Batak",
    deskripsi: "Gondang Sambilan adalah ensembel musik tradisional Batak yang terdiri dari sembilan instrumen. Dimainkan dalam berbagai upacara adat dan perayaan.",
    foto: "https://images.unsplash.com/photo-1660749416929-0791645dd142?w=600&q=80",
    village_id: null,
    kategori: "Musik",
    aktif: true,
  },
  {
    id: 4,
    judul: "Rumah Adat Gorga - Arsitektur Batak Toba",
    deskripsi: "Rumah adat Batak Toba dengan ornamen gorga yang kaya makna filosofis. Setiap ukiran dan warna memiliki simbolisme mendalam dalam kepercayaan Batak.",
    foto: "https://images.unsplash.com/photo-1566205865731-51803de32a35?w=600&q=80",
    village_id: 1,
    kategori: "Arsitektur",
    aktif: true,
  },
  {
    id: 5,
    judul: "Ritual Pesta Panen Marboru Jabu",
    deskripsi: "Upacara adat syukuran panen yang masih dilaksanakan setiap tahun di Desa Sosor Dolok, dipimpin oleh datu (pemuka adat) sebagai ungkapan syukur kepada Mulajadi Na Bolon.",
    foto: "https://images.unsplash.com/photo-1736259762078-2d2d6f327567?w=600&q=80",
    village_id: 2,
    kategori: "Ritual",
    aktif: true,
  },
];

// ============================================================
// GALERI
// ============================================================
export const GALERI_DATA = [
  { id: 1, foto: "https://images.unsplash.com/photo-1643005264349-aae1772b2186?w=800&q=80", judul: "Panorama Danau Toba dari Kecamatan Harian", kategori: "Wisata", village_id: null },
  { id: 2, foto: "https://images.unsplash.com/photo-1773562629318-03fc9fcef40e?w=800&q=80", judul: "Pertunjukan Tari Tor-Tor", kategori: "Budaya", village_id: 1 },
  { id: 3, foto: "https://images.unsplash.com/photo-1761410201022-cae20bd6abcf?w=800&q=80", judul: "Pengrajin Ulos Turpuk Sihotang", kategori: "UMKM", village_id: 1 },
  { id: 4, foto: "https://images.unsplash.com/photo-1575221165108-1c5d11ee1c51?w=800&q=80", judul: "Air Terjun Efrata Sosor Dolok", kategori: "Wisata", village_id: 2 },
  { id: 5, foto: "https://images.unsplash.com/photo-1767678233351-9308d8220fa5?w=800&q=80", judul: "Kebun Kopi Arabika Sosor Dolok", kategori: "Kegiatan Desa", village_id: 2 },
  { id: 6, foto: "https://images.unsplash.com/photo-1770529932989-5b14015f5812?w=800&q=80", judul: "Pasar Tradisional Harian", kategori: "Event", village_id: null },
  { id: 7, foto: "https://images.unsplash.com/photo-1566205865731-51803de32a35?w=800&q=80", judul: "Rumah Adat Turpuk Sihotang", kategori: "Budaya", village_id: 1 },
  { id: 8, foto: "https://images.unsplash.com/photo-1719557051612-10473aaa90e0?w=800&q=80", judul: "Sawah Hijau Sosor Dolok", kategori: "Kegiatan Desa", village_id: 2 },
  { id: 9, foto: "https://images.unsplash.com/photo-1615009820619-d69e2f948e8d?w=800&q=80", judul: "Sunset di Tepi Danau Toba", kategori: "Wisata", village_id: null },
  { id: 10, foto: "https://images.unsplash.com/photo-1660749416929-0791645dd142?w=800&q=80", judul: "Kantor Kecamatan Harian", kategori: "Kegiatan Desa", village_id: null },
  { id: 11, foto: "https://images.unsplash.com/photo-1761520873942-407665deb1f8?w=800&q=80", judul: "Festival Budaya Kecamatan Harian", kategori: "Event", village_id: null },
  { id: 12, foto: "https://images.unsplash.com/photo-1736259762078-2d2d6f327567?w=800&q=80", judul: "Panen Raya Sosor Dolok", kategori: "Kegiatan Desa", village_id: 2 },
  { id: 13, foto: "https://images.unsplash.com/photo-1643005264349-aae1772b2186?w=800&q=80", judul: "Dermaga Kecamatan Harian", kategori: "Wisata", village_id: null },
  { id: 14, foto: "https://images.unsplash.com/photo-1773562629318-03fc9fcef40e?w=800&q=80", judul: "Musik Gondang Sambilan", kategori: "Budaya", village_id: 1 },
  { id: 15, foto: "https://images.unsplash.com/photo-1767678233351-9308d8220fa5?w=800&q=80", judul: "Petani Kopi Sosor Dolok", kategori: "Kegiatan Desa", village_id: 2 },
  { id: 16, foto: "https://images.unsplash.com/photo-1615009820619-d69e2f948e8d?w=800&q=80", judul: "Sunrise Danau Toba", kategori: "Wisata", village_id: null },
  { id: 17, foto: "https://images.unsplash.com/photo-1761410201022-cae20bd6abcf?w=800&q=80", judul: "Proses Tenun Ulos", kategori: "UMKM", village_id: 1 },
  { id: 18, foto: "https://images.unsplash.com/photo-1566205865731-51803de32a35?w=800&q=80", judul: "Interior Rumah Adat Batak", kategori: "Budaya", village_id: 1 },
];

// ============================================================
// PESAN KONTAK
// ============================================================
export const PESAN_KONTAK = [
  { id: 1, nama: "Budi Santoso", email: "budi@gmail.com", telepon: "081234567890", subjek: "Informasi Wisata Air Terjun Efrata", pesan: "Saya ingin mengetahui lebih lanjut tentang Air Terjun Efrata. Apakah ada paket wisata yang tersedia?", tanggal: "2025-07-10", dibaca: false },
  { id: 2, nama: "Sarah Wijaya", email: "sarah@yahoo.com", telepon: "082345678901", subjek: "Pemesanan Ulos untuk Acara Adat", pesan: "Kami membutuhkan ulos untuk acara pernikahan adat Batak bulan September. Bagaimana cara pemesanannya?", tanggal: "2025-07-08", dibaca: true },
  { id: 3, nama: "Agus Priyanto", email: "agus@hotmail.com", telepon: "083456789012", subjek: "Kerjasama Wisata Edukasi", pesan: "Kami dari lembaga pendidikan ingin mengadakan wisata edukasi budaya Batak untuk siswa SMA. Mohon informasi paket dan harga.", tanggal: "2025-07-05", dibaca: false },
  { id: 4, nama: "Lisa Kurnia", email: "lisa@gmail.com", telepon: "084567890123", subjek: "Permintaan Sample Kopi Arabika", pesan: "Saya tertarik dengan kopi arabika Sosor Dolok. Apakah tersedia sample untuk dicoba sebelum pemesanan dalam jumlah besar?", tanggal: "2025-07-03", dibaca: true },
];
