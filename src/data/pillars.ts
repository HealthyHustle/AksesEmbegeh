import { PillarDetail } from '../types';

export const PILLARS_DATA: PillarDetail[] = [
  {
    id: 'bullying',
    title: 'Bullying & Iklim Keamanan Sekolah',
    subtitle: 'Dekonstruksi Relasi Kuasa & Restorative Justice di Satuan Pendidikan',
    badge: 'Pilar 01 • Perlindungan Peserta Didik',
    iconName: 'ShieldAlert',
    color: '#EF4444',
    accentColor: '#F87171',
    bgLight: '#FEF2F2',
    description: 'Menangani dinamika perundungan verbal, relasional, fisik, dan cyberbullying melalui pembedahan relasi kuasa struktural dalam ekosistem persekolahan.',
    placeContext: 'Dalam perspektif Critical Pedagogy of Place, iklim sekolah dibentuk oleh norma komunitas sekitar, hierarki sosial lingkungan, dan budaya permisif setempat. Calon guru diajak menelaah bagaimana ruang-ruang tak terawasi di sekolah (lorong, kantin, grup percakapan daring) menjadi medan hegemoni relasi kuasa antar-peserta didik.',
    learningObjectives: [
      'Mengidentifikasi manifestasi relasi kuasa terselubung dan hierarki informal di kalangan peserta didik.',
      'Membedakan penanganan punitif tradisional versus pendekatan keadilan restoratif (restorative justice).',
      'Menerapkan instrumen pencegahan dan penanganan kekerasan sesuai Permendikbudristek No. 46/2023 (TPPK).',
      'Membangun budaya empati aktif dan memutus rantai perilaku pembiaran (bystander effect) di kelas.'
    ],
    contextualCase: {
      headline: 'Normalisasi Senioritas & Cyberbullying Anonim di Sekolah Menengah',
      locationExample: 'SMP/SMA Wilayah Urban & Sub-Urban (Jawa & Sumatera)',
      problemDescription: 'Tradisi perpeloncoan informal berkedok "bimbingan senior" berpindah ke platform media sosial melalui akun anonim (fess/confession account). Korban mengalami penarikan diri sosial dan penurunan drastis motivasi belajar, sementara guru sering menganggapnya sekadar dinamika wajar pergaulan remaja.',
      reflectionPrompt: 'Sebagai calon guru, bagaimana Anda mendesain mekanisme pendampingan yang melindungi korban tanpa membuat mereka diintimidasi kembali sebagai pelapor?'
    },
    competencies: [
      {
        domain: 'Kepribadian',
        description: 'Menampilkan keteladanan moral, empati mendalam, dan komitmen teguh terhadap keselamatan psikologis setiap murid tanpa diskriminasi.'
      },
      {
        domain: 'Sosial',
        description: 'Mampu membangun komunikasi dialogis dengan orang tua, konselor BK, dan komunitas sekitar dalam memulihkan iklim damai sekolah.'
      },
      {
        domain: 'Pedagogik',
        description: 'Mengintegrasikan manajemen kelas partisipatif dan pembelajaran sosio-emosional (SEL) ke dalam kegiatan belajar sehari-hari.'
      },
      {
        domain: 'Profesional',
        description: 'Menguasai regulasi perlindungan anak, kode etik pendidik, dan protokol penanganan trauma kekerasan di satuan pendidikan.'
      }
    ],
    urgencyMetric: {
      percentage: 72,
      label: 'Urgensi Isu Nasional',
      stats: [
        { label: 'Siswa Pernah Mengalami Perundungan', value: '41.1%' },
        { label: 'Kasus Berpindah ke Ranah Digital', value: '58.4%' },
        { label: 'Sekolah Memiliki Tim TPPK Aktif', value: '64.2%' },
        { label: 'Dampak Penurunan Motivasi Belajar', value: '72.0%' }
      ]
    },
    actionLinks: {
      aiTopic: 'bullying',
      testRoute: '/critical-thinking-test/bullying',
      forumTopic: 'bullying'
    }
  },
  {
    id: 'literasi-digital',
    title: 'Literasi Digital & Etika Informasi',
    subtitle: 'Nalar Kritis Verifikasi, Etika AI, dan Perlindungan Data Pribadi',
    badge: 'Pilar 02 • Ekosistem Informasi Modern',
    iconName: 'Smartphone',
    color: '#3B82F6',
    accentColor: '#60A5FA',
    bgLight: '#EFF6FF',
    description: 'Membekali calon pendidik dan peserta didik dengan keterampilan mengevaluasi validitas sumber, menepis bias ruang gema, dan memposisikan Artificial Intelligence secara bijak.',
    placeContext: 'Pendidikan berbasis tempat di era digital tidak lagi dibatasi dinding fisik; arus informasi global masuk langsung ke saku peserta didik di pelosok daerah. Calon guru harus memahami realitas budaya konsumsi digital lokal peserta didik, sehingga dapat mengajarkan verifikasi fakta yang kontekstual dan relevan dengan persoalan komunitas mereka.',
    learningObjectives: [
      'Menguasai strategi verifikasi fakta tingkat lanjut, termasuk teknik lateral reading dan reverse media investigation.',
      'Menganalisis dampak algoritma rekomendasi dan bias konfirmasi terhadap polarisasi opini peserta didik.',
      'Merancang pembelajaran yang memposisikan Generative AI sebagai sparring partner berpikir, bukan pengganti nalar.',
      'Mengedukasi peserta didik mengenai etika digital, jejak digital, dan perlindungan privasi data pribadi (UU PDP).'
    ],
    contextualCase: {
      headline: 'Konsumsi Berita Viral Tanpa Verifikasi & Ketergantungan Tugas pada Generative AI',
      locationExample: 'Satuan Pendidikan Jenjang Menengah & Perguruan Tinggi',
      problemDescription: 'Sebanyak 62.7% peserta didik kesulitan membedakan artikel opini dengan fakta empiris. Penugasan karya tulis sering kali di-generate secara mentah menggunakan AI generatif tanpa proses refleksi maupun sitasi yang sahih, memicu ilusi kompetensi semu pada calon pendidik dan siswa.',
      reflectionPrompt: 'Bagaimana Anda merancang model asesmen kelas yang mengharuskan siswa bernalar kritis sehingga tugas tersebut tidak dapat sekadar disalin-tempel dari AI?'
    },
    competencies: [
      {
        domain: 'Profesional',
        description: 'Menguasai substansi literasi media, teknik kurasi informasi ilmiah, serta dinamika perkembangan teknologi kecerdasan buatan dalam pendidikan.'
      },
      {
        domain: 'Pedagogik',
        description: 'Mampu mendesain skenario pembelajaran berbasis inquiry dan problem-solving yang melatih nalar kritis siswa terhadap teks multimedia.'
      },
      {
        domain: 'Kepribadian',
        description: 'Menjunjung integritas akademik tinggi, kejujuran intelektual dalam sitasi, dan etika bermedia digital yang bermartabat.'
      },
      {
        domain: 'Sosial',
        description: 'Menjadi literator digital di lingkungan sekolah dan keluarga dalam memerangi hoaks edukasi dan penipuan digital.'
      }
    ],
    urgencyMetric: {
      percentage: 84,
      label: 'Urgensi Isu Nasional',
      stats: [
        { label: 'Indeks Literasi Digital Nasional', value: '3.54 / 5.0' },
        { label: 'Kesulitan Membedakan Fakta vs Opini', value: '62.7%' },
        { label: 'Akses Internet Peserta Didik Harian', value: '84.0%' },
        { label: 'Guru Terlatih Verifikasi Fakta Digital', value: '38.2%' }
      ]
    },
    actionLinks: {
      aiTopic: 'literasi-digital',
      testRoute: '/critical-thinking-test/literasi-digital',
      forumTopic: 'literasi-digital'
    }
  },
  {
    id: 'ketimpangan-sosial',
    title: 'Ketimpangan Sosial & Akses Pendidikan 3T',
    subtitle: 'Keadilan Distributif, Kurikulum Kontekstual, dan Penguatan Guru Perintis',
    badge: 'Pilar 03 • Keadilan Sosio-Spasial Nusantara',
    iconName: 'Scale',
    color: '#F59E0B',
    accentColor: '#FBBF24',
    bgLight: '#FFFBEB',
    description: 'Menelaah kesenjangan fasilitas sarana, ketimpangan distribusi pendidik berkualifikasi, dan pentingnya diferensiasi kurikulum bagi wilayah Terdepan, Terluar, dan Tertinggal (3T).',
    placeContext: 'Inilah inti sari dari Critical Pedagogy of Place: menolak sentralisasi kurikulum yang menyeragamkan semua anak seolah berada di Jakarta atau kota metropolitan. Calon pendidik diajak menyadari keunikan potensi, kearifan lokal, dan tantangan geografis riil di kepulauan serta pedalaman Indonesia guna mewujudkan pendidikan yang membebaskan.',
    learningObjectives: [
      'Memahami distingsi filosofis mendasar antara kesetaraan (equality) dan keadilan distributif (equity).',
      'Mengidentifikasi disparitas struktural sarana belajar, akses jaringan listrik/internet, dan retensi guru di 3T.',
      'Merancang kurikulum kontekstual berbasis tempat (place-based education) yang mengangkat potensi kearifan lokal.',
      'Mengembangkan media pembelajaran inovatif yang mandiri listrik/sinyal (offline learning resources).'
    ],
    contextualCase: {
      headline: 'Asesmen Nasional Berbasis Komputer di Tengah Keterbatasan Listrik 6 Jam',
      locationExample: 'Kepulauan Maluku, NTT, dan Pedalaman Papua',
      problemDescription: 'Pelaksanaan asesmen terstandar nasional sering menuntut koneksi internet stabil dan perangkat laptop yang tidak dimiliki sekolah terpencil. Guru perintis harus menempuh perjalanan laut berjam-jam membawa siswa ke ibu kota kecamatan hanya untuk mengunggah lembar jawaban, memperlihatkan disparitas sistemik nyata.',
      reflectionPrompt: 'Jika Anda ditempatkan di sekolah tanpa aliran listrik stabil, bagaimana Anda menyusun pengalaman belajar sains/literasi bermakna dengan memanfaatkan alam sekitar?'
    },
    competencies: [
      {
        domain: 'Sosial',
        description: 'Memiliki kepekaan sosio-kultural tinggi, kerendahan hati untuk belajar dari kearifan lokal masyarakat adat, serta adaptif terhadap kemajemukan.'
      },
      {
        domain: 'Pedagogik',
        description: 'Mampu melakukan diferensiasi pembelajaran kontekstual dan memanfaatkan sumber daya lingkungan alam lokal sebagai media ajar konkret.'
      },
      {
        domain: 'Kepribadian',
        description: 'Memiliki resiliensi mental, dedikasi pengabdian kebangsaan, dan daya juang sebagai pendidik garda depan bangsa.'
      },
      {
        domain: 'Profesional',
        description: 'Mampu merancang perangkat ajar adaptif yang relevan dengan tantangan sosial-ekonomi riil yang dihadapi keluarga peserta didik.'
      }
    ],
    urgencyMetric: {
      percentage: 68,
      label: 'Urgensi Isu Nasional',
      stats: [
        { label: 'Kesenjangan Sarana Digital 3T vs Urban', value: '4.8x' },
        { label: 'Distribusi Guru Berkualifikasi S1/S2', value: '54.6%' },
        { label: 'Sekolah Belum Terjangkau Listrik Stabil', value: '18.9%' },
        { label: 'Disparitas Skor Capaian Belajar Antarwilayah', value: '68.0%' }
      ]
    },
    actionLinks: {
      aiTopic: 'ketimpangan-sosial',
      testRoute: '/critical-thinking-test/ketimpangan-sosial',
      forumTopic: 'ketimpangan-sosial'
    }
  }
];
