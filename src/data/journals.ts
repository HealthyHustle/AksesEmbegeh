import { Journal } from '../types';

export const JOURNALS_DATA: Journal[] = [
  // Bullying
  {
    id: 'jrn-01',
    title: 'Analisis Efektivitas Tim Pencegahan dan Penanganan Kekerasan (TPPK) di Sekolah Menengah',
    author: 'Dr. Hendra Kusuma, M.Pd. & Tim Peneliti UI',
    institution: 'Pusat Studi Kebijakan Pendidikan Indonesia',
    year: 2024,
    issue: 'bullying',
    issueLabel: 'Bullying',
    abstract: 'Penelitian kuantitatif korelasional ini mengevaluasi implementasi regulasi anti-kekerasan di 120 satuan pendidikan. Hasil menunjukkan bahwa keberadaan TPPK yang aktif mendampingi korban menurunkan tingkat kejadian perundungan hingga 34.2%, namun masih terkendala beban administratif dan minimnya pelatihan psikologis guru BK.',
    source: 'Jurnal Ilmu Pendidikan Indonesia (JIPI), Vol. 18, No. 2',
    methodology: 'Survei Kuantitatif & Mixed Method FGD (N=1.240 responden)',
    citationCount: 48,
    tags: ['TPPK', 'Perundungan', 'Iklim Sekolah', 'Kebijakan Pendidikan'],
    isPeerReviewed: true
  },
  {
    id: 'jrn-02',
    title: 'Dinamika Cyberbullying di Kalangan Remaja Urban: Peran Anonimitas Media Sosial dan Pengawasan Orang Tua',
    author: 'Anisa Rahmawati, S.Psi., M.A. & Prof. Bambang Sutrisno',
    institution: 'Fakultas Psikologi Universitas Gadjah Mada',
    year: 2024,
    issue: 'bullying',
    issueLabel: 'Bullying',
    abstract: 'Studi ini meneliti keterkaitan antara fitur anonimitas pada aplikasi pesan instan dan media sosial terhadap peningkatan tendensi perundungan siber. Temuan mengindikasikan bahwa 67% pelaku cyberbullying merasa terlindungi oleh identitas samaran, sementara edukasi literasi digital di rumah berperan signifikan sebagai faktor protektif.',
    source: 'Indonesian Journal of Educational Psychology, Vol. 12, No. 1',
    methodology: 'Structural Equation Modeling (SEM) pada 850 siswa SMP-SMA',
    citationCount: 36,
    tags: ['Cyberbullying', 'Kesehatan Mental', 'Pola Asuh Digital', 'Media Sosial'],
    isPeerReviewed: true
  },
  {
    id: 'jrn-03',
    title: 'Model Restorative Justice dalam Resolusi Konflik Perundungan di Lingkungan Pesantren & Boarding School',
    author: 'Drs. Ahmad Fauzi, M.Ed. & Siti Nurjanah, M.Pd.',
    institution: 'UIN Sunan Kalijaga & Balai Penelitian Pendidikan',
    year: 2023,
    issue: 'bullying',
    issueLabel: 'Bullying',
    abstract: 'Pendekatan hukuman fisik terbukti tidak memutus siklus perundungan di asrama. Penelitian kualitatif fenomenologis ini menguji efektivitas model keadilan restoratif yang menitikberatkan pada pemulihan empati pelaku, rekonsiliasi bersama korban, dan pembangunan kesepakatan komunal yang adil.',
    source: 'Jurnal Studi Pendidikan Islam Nusantara, Vol. 9, No. 3',
    methodology: 'Studi Kasus Multi-Situs & Etnografi Pendidikan',
    citationCount: 29,
    tags: ['Restorative Justice', 'Boarding School', 'Resolusi Konflik', 'Karakter'],
    isPeerReviewed: true
  },

  // Literasi Digital
  {
    id: 'jrn-04',
    title: 'Evaluasi Kritis Informasi Digital: Menguji Kesiapan Peserta Didik Gen Z Menghadapi Deepfake dan Disinformasi AI',
    author: 'Rian Pratama, M.Kom. & Dr. Wahyu Hidayat',
    institution: 'Laboratorium Komunikasi Digital Institut Teknologi Bandung',
    year: 2024,
    issue: 'literasi-digital',
    issueLabel: 'Literasi Digital',
    abstract: 'Eksperimen terkontrol ini menguji kemampuan 600 siswa SMA dalam mengidentifikasi konten sintetis deepfake dan artikel berita hoaks bermuatan emosional. Hasil menunjukkan hanya 23.5% peserta yang melakukan pengecekan sumber secara lateral, menegaskan perlunya kurikulum verifikasi fakta (Lateral Reading) di jenjang menengah.',
    source: 'Jurnal Teknologi & Pendidikan Nasional, Vol. 15, No. 4',
    methodology: 'Quasi-Experimental Design & Cognitive Task Analysis',
    citationCount: 52,
    tags: ['Deepfake', 'Lateral Reading', 'Disinformasi', 'Gen Z', 'AI Literacy'],
    isPeerReviewed: true
  },
  {
    id: 'jrn-05',
    title: 'Integrasi Socratic Questioning dalam Pembelajaran Bahasa Indonesia untuk Menangkal Bias Konfirmasi',
    author: 'Dr. Sri Mulyani, M.Hum. & Irvan Zulfikar, S.Pd.',
    institution: 'Universitas Pendidikan Indonesia (UPI)',
    year: 2023,
    issue: 'literasi-digital',
    issueLabel: 'Literasi Digital',
    abstract: 'Penelitian Tindakan Kelas (PTK) selama dua siklus ini mengintegrasikan metode dialog Sokrates pada materi analisis teks argumentasi. Hasil tes pra dan pasca-tindakan membuktikan peningkatan signifikan pada skor nalar kritis siswa dalam membedakan antara premis berbasis data vs opini spekulatif.',
    source: 'Jurnal Pengajaran Bahasa & Sastra, Vol. 22, No. 1',
    methodology: 'Penelitian Tindakan Kelas (PTK) Kolaboratif',
    citationCount: 41,
    tags: ['Socratic Method', 'Nalar Kritis', 'Bias Konfirmasi', 'PTK'],
    isPeerReviewed: true
  },
  {
    id: 'jrn-06',
    title: 'Kesiapan Etika Digital Guru Abad 21: Studi Komparatif Antara Guru Urban dan Pedesaan',
    author: 'Eko Prasetyo, Ph.D. & Ratna Dewi, M.Si.',
    institution: 'Pusat Kajian Media dan Budaya Informasi UNY',
    year: 2024,
    issue: 'literasi-digital',
    issueLabel: 'Literasi Digital',
    abstract: 'Studi komparatif ini menganalisis pemahaman hak cipta digital, perlindungan data pribadi siswa, dan etika komunikasi daring pada 450 pendidik. Terdapat gap pemahaman regulasi UU ITE dan PDP sebesar 38% antara guru di wilayah perkotaan dan pelosok.',
    source: 'Jurnal Pedagogik & Profesi Keguruan, Vol. 11, No. 2',
    methodology: 'Survei Nasional Cross-Sectional',
    citationCount: 19,
    tags: ['Etika Digital', 'Kompetensi Guru', 'Perlindungan Data', 'Komparasi'],
    isPeerReviewed: true
  },

  // Ketimpangan Sosial
  {
    id: 'jrn-07',
    title: 'Disparitas Kualitas Pembelajaran 3T: Analisis Faktor Sarana Energi, Konektivitas Satelit, dan Retensi Pendidik',
    author: 'Prof. Markus Wenda & Dr. Maya Kartika, M.Ed.',
    institution: 'Konsorsium Riset Pendidikan Indonesia Timur',
    year: 2024,
    issue: 'ketimpangan-sosial',
    issueLabel: 'Ketimpangan Sosial',
    abstract: 'Melalui analisis spasial data dapodik di 80 kabupaten 3T, riset ini memetakan dampak ketiadaan pasokan listrik stabil terhadap penurunan efektivitas platform digital Kemendikbud. Studi merekomendasikan intervensi hybrid learning berbasis offline memory box yang tidak bergantung pada koneksi real-time.',
    source: 'Jurnal Pembangunan Pendidikan Indonesia, Vol. 16, No. 3',
    methodology: 'Spatial Econometrics & Field Observation',
    citationCount: 64,
    tags: ['Daerah 3T', 'Infrastruktur', 'Disparitas', 'Offline Learning Hub'],
    isPeerReviewed: true
  },
  {
    id: 'jrn-08',
    title: 'Insentif Finansial vs Dukungan Psikososial: Faktor Retensi Guru Perintis di Wilayah Pedalaman Papua dan NTT',
    author: 'Yuliana Leto, M.Pd. & Dian Permana, Ph.D.',
    institution: 'Lembaga Studi Kebijakan & Afirmasi Pendidikan',
    year: 2023,
    issue: 'ketimpangan-sosial',
    issueLabel: 'Ketimpangan Sosial',
    abstract: 'Tingkat pergantian guru (teacher turnover) di daerah terpencil mencapai 42% dalam dua tahun pertama. Temuan penelitian menunjukkan bahwa insentif finansial semata tidak cukup; kepastian keamanan, jaminan perumahan layak, dan komunitas belajar sebaya menjadi kunci keberlanjutan masa pengabdian.',
    source: 'Jurnal Manajemen & Supervisi Pendidikan, Vol. 14, No. 2',
    methodology: 'Survival Analysis & In-depth Longitudinal Interviews',
    citationCount: 38,
    tags: ['Guru Perintis', 'Retensi Guru', 'Afirmasi 3T', 'Kesejahteraan Guru'],
    isPeerReviewed: true
  },
  {
    id: 'jrn-09',
    title: 'Pemanfaatan Dana BOS Afirmasi dan Kinerja Pembelajaran di Sekolah Dasar Pelosok',
    author: 'Dr. Agus Triyono, S.E., M.Ak. & Budi Santoso, M.Pd.',
    institution: 'Pusat Analisis Anggaran Pendidikan Nasional',
    year: 2024,
    issue: 'ketimpangan-sosial',
    issueLabel: 'Ketimpangan Sosial',
    abstract: 'Evaluasi akuntabilitas dan efektivitas alokasi Bantuan Operasional Sekolah (BOS) Afirmasi di 200 sekolah sasaran. Penelitian menemukan 27% sekolah mengalami keterlambatan pencairan akibat kendala perbankan di daerah kepulauan terpencil, berdampak langsung pada pengadaan buku teks kurikulum.',
    source: 'Indonesian Journal of Educational Finance & Governance, Vol. 8, No. 1',
    methodology: 'Policy Impact Evaluation (Difference-in-Differences)',
    citationCount: 22,
    tags: ['Dana BOS', 'Akuntabilitas', 'Finansial Pendidikan', 'BOS Afirmasi'],
    isPeerReviewed: true
  }
];
