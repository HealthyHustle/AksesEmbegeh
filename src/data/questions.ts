import { Question } from '../types';

export const QUESTIONS_DATA: Question[] = [
  // ==========================================
  // TOPIC 1: BULLYING (15 SOAL)
  // ==========================================
  {
    id: 'q-bul-01',
    topic: 'bullying',
    caseStudy: 'Di sebuah SMA, seorang siswa bernama Rangga kerap diejek di grup percakapan WhatsApp kelas dengan stiker wajah editan yang merendahkan. Wali kelas menganggap hal ini hanya gurauan biasa antar-teman sebaya dan tidak perlu dibesar-besarkan.',
    question: 'Berdasarkan prinsip pemahaman masalah kekerasan di sekolah, mengapa tanggapan wali kelas tersebut bermasalah?',
    options: [
      'Karena gurauan tersebut dilakukan di luar jam sekolah formal.',
      'Karena normalisasi gurauan berbasis perendahan martabat mengabaikan dampak psikologis dan relasi kuasa yang tidak setara.',
      'Karena wali kelas tidak memiliki wewenang untuk memeriksa gawai pribadi siswa.',
      'Karena pihak sekolah seharusnya langsung melaporkan nomor pelaku ke aparat penegak hukum.'
    ],
    correctAnswer: 1,
    explanation: 'Meremehkan perundungan siber sebagai sekadar "candaan" mengabaikan ketimpangan relasi kuasa, sifat pengulangan, serta dampak intimidasi emosional yang dialami korban.',
    category: 'Memahami Masalah'
  },
  {
    id: 'q-bul-02',
    topic: 'bullying',
    caseStudy: 'Kepala Sekolah menyatakan: "Sekolah kami 100% bebas bullying karena selama semester ini tidak ada satu pun laporan resmi yang masuk ke meja bimbingan konseling (BK)."',
    question: 'Kelemahan logis paling mendasar dalam evaluasi bukti yang dikemukakan Kepala Sekolah adalah...',
    options: [
      'Menyamakan "ketiadaan laporan masuk" dengan "ketiadaan kejadian nyata" (Appeal to Ignorance).',
      'Tidak mencantumkan perbandingan statistik dengan sekolah tetangga.',
      'Mengasumsikan bahwa guru BK adalah satu-satunya pihak yang bertanggung jawab.',
      'Kurangnya survei kepuasan fasilitas sarana belajar siswa.'
    ],
    correctAnswer: 0,
    explanation: 'Ketiadaan laporan sering kali mencerminkan ketakutan korban terhadap viktimisasi sekunder atau tidak adanya kanal aduan yang aman, bukan bukti tidak adanya kasus.',
    category: 'Evaluasi Bukti'
  },
  {
    id: 'q-bul-03',
    topic: 'bullying',
    caseStudy: 'Perhatikan dua pernyataan berikut:\n(1) Data TPPK menunjukkan 43% siswa mengaku enggan melaporkan perundungan karena khawatir identitasnya bocor.\n(2) Pelaku bullying umumnya adalah anak yang memang memiliki tabiat buruk sejak lahir.',
    question: 'Bagaimanakah klasifikasi yang tepat untuk kedua pernyataan di atas?',
    options: [
      'Pernyataan (1) adalah opini, sedangkan Pernyataan (2) adalah fakta teruji.',
      'Kedua pernyataan tersebut merupakan fakta ilmiah yang tidak dapat dibantah.',
      'Pernyataan (1) adalah fakta empiris terukur, sedangkan Pernyataan (2) adalah opini deterministik tanpa basis data psikologis.',
      'Kedua pernyataan adalah opini subjektif pengamat pendidikan.'
    ],
    correctAnswer: 2,
    explanation: 'Pernyataan (1) menyajikan temuan data numerik terverifikasi, sedangkan pernyataan (2) adalah labeling reduksionis yang mengabaikan faktor lingkungan dan psikososial.',
    category: 'Fakta vs Opini'
  },
  {
    id: 'q-bul-04',
    topic: 'bullying',
    caseStudy: 'Seorang pendidik berargumen: "Hukuman skorsing dan mempermalukan pelaku di upacara bendera adalah solusi paling efektif agar pelaku jera dan orang lain takut meniru."',
    question: 'Kritik paling tepat terhadap evaluasi argumen tersebut berdasarkan pendekatan pedagogis adalah...',
    options: [
      'Hukuman publik justru memicu dendam, stigmatisasi berkepanjangan, dan tidak menyentuh akar disfungsi perilaku empati.',
      'Upacara bendera memakan waktu belajar efektif terlalu banyak.',
      'Orang tua pelaku pasti akan menggugat pihak sekolah secara perdata.',
      'Skorsing hanya boleh diberikan jika perundungan melibatkan tindakan kriminal berat.'
    ],
    correctAnswer: 0,
    explanation: 'Hukuman retributif yang mempermalukan terbukti tidak membangun kesadaran restoratif dan sering kali memperburuk agresivitas pelaku.',
    category: 'Evaluasi Argumen'
  },
  {
    id: 'q-bul-05',
    topic: 'bullying',
    caseStudy: 'Dalam kasus perundungan relasional (pengucilan siswa baru oleh geng dominan), sebagian siswa yang melihat memilih diam dan tertawa kecil.',
    question: 'Jika dianalisis dari perspektif bystander effect dan dinamika kelompok, apa motif utama yang mendorong sikap diam para saksi tersebut?',
    options: [
      'Saksi merasa pengucilan bukan bentuk kekerasan fisik sehingga tidak membahayakan nyawa.',
      'Saksi mengalami ketakutan akan menjadi target pengucilan berikutnya jika menunjukkan solidaritas kepada korban.',
      'Saksi menganggap urusan pertemanan sepenuhnya tanggung jawab pribadi korban.',
      'Saksi kekurangan waktu untuk melaporkan hal tersebut ke guru piket.'
    ],
    correctAnswer: 1,
    explanation: 'Bystander pasif sering kali dilumpuhkan oleh rasa takut kehilangan status sosial atau menjadi sasaran retaliasi dari kelompok dominan.',
    category: 'Sudut Pandang'
  },
  {
    id: 'q-bul-06',
    topic: 'bullying',
    caseStudy: 'Setelah program konseling sebaya (peer counseling) diterapkan selama 6 bulan, laporan perundungan di sekolah meningkat 80% dari tahun sebelumnya.',
    question: 'Inferensi logis paling rasional untuk menjelaskan fenomena peningkatan laporan tersebut adalah...',
    options: [
      'Program konseling sebaya gagal total dan menyebabkan peningkatan kekerasan di sekolah.',
      'Konseling sebaya berhasil meningkatkan literasi kekerasan dan kepercayaan siswa untuk berani menyuarakan pengalaman mereka.',
      'Guru BK berhenti bekerja sehingga siswa melapor ke teman sebayanya.',
      'Siswa mengarang laporan palsu demi mendapatkan perhatian konselor.'
    ],
    correctAnswer: 1,
    explanation: 'Peningkatan laporan pasca-intervensi edukasi sering kali merupakan indikator meningkatnya kesadaran dan rasa aman untuk bersuara, bukan kenaikan insiden riil.',
    category: 'Inferensi'
  },
  {
    id: 'q-bul-07',
    topic: 'bullying',
    caseStudy: 'Terjadi perselisihan verbal di media sosial antara dua murid yang merembet ke ancaman pemukulan di gerbang sekolah.',
    question: 'Sebagai ketua Tim Pencegahan dan Penanganan Kekerasan (TPPK), langkah keputusan berbasis bukti pertama apa yang paling tepat?',
    options: [
      'Segera memanggil polisi tanpa klarifikasi internal.',
      'Memisahkan kedua pihak, menjamin rasa aman fisik, mendokumentasikan bukti digital secara objektif, dan memfasilitasi mediasi terstruktur.',
      'Menyita gawai seluruh murid di satu angkatan selama 1 bulan.',
      'Memaksa kedua murid saling memaafkan di depan kelas tanpa penyelidikan lanjutan.'
    ],
    correctAnswer: 1,
    explanation: 'Pengambilan keputusan yang tepat memerlukan jaminan keselamatan langsung, perlindungan bukti obyektif, dan proses mediasi berbasis empati.',
    category: 'Pengambilan Keputusan'
  },
  {
    id: 'q-bul-08',
    topic: 'bullying',
    caseStudy: 'Survei iklim sekolah mengungkap bahwa toilet dan sudut belakang kantin menjadi lokasi dengan frekuensi perundungan fisik tertinggi.',
    question: 'Berdasarkan data spasial tersebut, identifikasi akar masalah lingkungan sekolah yang paling relevan adalah...',
    options: [
      'Kualitas kebersihan fasilitas toilet yang buruk.',
      'Adanya ruang-ruang mati (blind spots) yang minim pengawasan struktural dan penerangan memadai.',
      'Harga makanan kantin yang memicu konflik antar-siswa.',
      'Jam istirahat sekolah yang terlalu panjang.'
    ],
    correctAnswer: 1,
    explanation: 'Lingkungan fisik yang menciptakan blind spots tanpa kehadiran pendidik memfasilitasi terjadinya intimidasi tanpa saksi otoritas.',
    category: 'Memahami Masalah'
  },
  {
    id: 'q-bul-09',
    topic: 'bullying',
    caseStudy: 'Seorang wali murid menolak anaknya yang terbukti membully diberikan konseling dengan dalih: "Nilai rapor akademik anak saya selalu peringkat satu."',
    question: 'Kesalahan logika (logical fallacy) apa yang tercermin dalam pembelaan wali murid tersebut?',
    options: [
      'Ad Hominem (menyerang pribadi guru).',
      'Red Herring / False Equivalency (mengalihkan isu perilaku agresi dengan prestasi akademik).',
      'Slippery Slope (mengasumsikan konsekuensi berlebihan).',
      'Circular Reasoning (argumen berputar).'
    ],
    correctAnswer: 1,
    explanation: 'Wali murid mengalihkan substansi pelanggaran etika dan agresi dengan menggunakan capaian nilai kognitif sebagai pengalih isu.',
    category: 'Evaluasi Argumen'
  },
  {
    id: 'q-bul-10',
    topic: 'bullying',
    caseStudy: 'Pihak sekolah ingin mengetahui apakah kampanye poster "Stop Bullying" berdampak langsung pada penurunan kasus.',
    question: 'Instrumen evaluasi bukti mana yang paling valid untuk menguji dampak kampanye tersebut?',
    options: [
      'Menghitung jumlah poster yang masih menempel di dinding setelah 1 bulan.',
      'Membandingkan data pra- dan pasca-intervensi terkait indeks rasa aman siswa, frekuensi insiden, dan keterbukaan pelaporan.',
      'Menanyakan kesan Kepala Sekolah saat memeriksa lorong kelas.',
      'Mengadakan lomba menggambar poster bertema damai antarkelas.'
    ],
    correctAnswer: 1,
    explanation: 'Evaluasi kebijakan memerlukan pengukuran metrik komparatif sebelum dan sesudah intervensi pada parameter perilaku dan persepsi keamanan nyata.',
    category: 'Evaluasi Bukti'
  },
  {
    id: 'q-bul-11',
    topic: 'bullying',
    caseStudy: 'Seorang siswa korban perundungan tiba-tiba mengalami penurunan drastis pada performa akademik dan kerap membolos dengan keluhan sakit perut misterius.',
    question: 'Dari sudut pandang psikosomatis dan trauma pendidikan, kesimpulan apa yang paling dapat ditarik?',
    options: [
      'Siswa tersebut sengaja berpura-pura agar terhindar dari ujian sekolah.',
      'Kecemasan kronis akibat ancaman lingkungan sekolah termanifestasi menjadi gejala fisik nyata dan perilaku penghindaran (avoidance).',
      'Siswa memiliki daya tahan mental yang lemah secara genetik.',
      'Orang tua siswa terlalu memanjakan anak di rumah.'
    ],
    correctAnswer: 1,
    explanation: 'Gejala psikosomatis dan absensi sering kali merupakan manifestasi klinis dari stres berkepanjangan dan ketiadaan rasa aman di sekolah.',
    category: 'Sudut Pandang'
  },
  {
    id: 'q-bul-12',
    topic: 'bullying',
    caseStudy: 'Dalam sebuah forum alumni, seorang pembicara menyatakan: "Zaman saya dulu diplonco dan dihukum fisik malah jadi orang sukses dan bermental baja."',
    question: 'Mengapa penalaran survivor bias di atas cacat secara metodologis dalam konteks pencegahan kekerasan modern?',
    options: [
      'Karena hanya mengambil contoh dari mereka yang berhasil melewati sistem buruk tanpa memperhitungkan korban yang putus sekolah atau mengalami trauma abadi.',
      'Karena zaman dulu kurikulum sekolah belum berbasis digital.',
      'Karena pembicara tersebut bukan seorang psikolog berlisensi.',
      'Karena jumlah jam pelajaran masa lalu lebih sedikit dibanding sekarang.'
    ],
    correctAnswer: 0,
    explanation: 'Survivorship bias mengabaikan sampel individu yang terluka parah, gagal beradaptasi, atau mengalami disfungsi mental akibat kekerasan masa lalu.',
    category: 'Evaluasi Argumen'
  },
  {
    id: 'q-bul-13',
    topic: 'bullying',
    caseStudy: 'Sebuah sekolah swasta menerapkan kebijakan anonimitas digital di mana siswa dapat mengirim pesan evaluasi satu sama lain tanpa nama akun.',
    question: 'Potensi risiko etis dan konsekuensi logis yang perlu diantisipasi dari kebijakan tersebut adalah...',
    options: [
      'Meningkatnya biaya tagihan server sekolah.',
      'Tergelincirnya platform menjadi ajang pelecehan daring (cyberbullying) baru akibat hilangnya akuntabilitas individu.',
      'Siswa akan berhenti belajar dan hanya sibuk mengetik pesan.',
      'Guru kehilangan otoritas dalam menilai tugas harian.'
    ],
    correctAnswer: 1,
    explanation: 'Anonimitas tanpa moderasi dan batasan etis yang jelas kerap menurunkan inhibisi moral pengguna untuk melakukan agresi verbal.',
    category: 'Inferensi'
  },
  {
    id: 'q-bul-14',
    topic: 'bullying',
    caseStudy: 'Dua siswa terlibat perkelahian berulang. Salah satu siswa berasal dari keluarga dengan riwayat kekerasan dalam rumah tangga (KDRT).',
    question: 'Keputusan intervensi yang paling komprehensif dan berkeadilan adalah...',
    options: [
      'Mengeluarkan siswa tersebut dari sekolah agar reputasi sekolah tetap terjaga.',
      'Menggabungkan pendampingan psikoterapi trauma untuk pelaku dengan perlindungan ketat serta pemulihan psikologis bagi korban.',
      'Menghukum kedua siswa membersihkan lapangan sekolah selama seminggu penuh.',
      'Memindahkan siswa ke kelas khusus tanpa teman interaksi.'
    ],
    correctAnswer: 1,
    explanation: 'Pendekatan edukatif holistik harus mengatasi trauma akar pemicu agresi sekaligus memprioritaskan keselamatan korban.',
    category: 'Pengambilan Keputusan'
  },
  {
    id: 'q-bul-15',
    topic: 'bullying',
    caseStudy: 'Sebuah sekolah berhasil menurunkan tingkat kekerasan hingga 0% di atas kertas dengan cara menolak mendaftarkan kasus perundungan verbal ringan ke buku catatan BK.',
    question: 'Praktik manipulasi data di atas merupakan bentuk pelanggaran prinsip...',
    options: [
      'Efisiensi birokrasi sekolah.',
      'Integritas transparansi dan akuntabilitas evaluasi iklim keamanan pendidikan.',
      'Standar sarana prasarana sekolah rujukan.',
      'Manajemen keuangan dana bantuan operasional sekolah.'
    ],
    correctAnswer: 1,
    explanation: 'Menyembunyikan insiden demi mempertahankan citra institusi merusak integritas pengukuran dan menghalangi penanganan dini korban.',
    category: 'Fakta vs Opini'
  },

  // ==========================================
  // TOPIC 2: LITERASI DIGITAL (15 SOAL)
  // ==========================================
  {
    id: 'q-lit-01',
    topic: 'literasi-digital',
    caseStudy: 'Sebuah video beredar di WhatsApp grup guru yang mengklaim bahwa kurikulum baru akan menghapus mata pelajaran sains, disertai potongan gambar dokumen buram tanpa kop resmi.',
    question: 'Langkah nalar kritis "Lateral Reading" yang seharusnya pertama kali dilakukan seorang guru adalah...',
    options: [
      'Langsung meneruskan pesan tersebut ke grup wali murid agar bersiap-siap.',
      'Membuka tab peramban baru untuk memverifikasi keabsahan regulasi di portal resmi kementerian dan kantor berita kredibel.',
      'Membalas pesan dengan kemarahan kepada pengirim pertama.',
      'Mengubah RPP pembelajaran menjadi non-sains tanpa konfirmasi.'
    ],
    correctAnswer: 1,
    explanation: 'Lateral reading adalah teknik membuka sumber independen di luar dokumen bersangkutan untuk menguji kredibilitas sebelum mempercayai klaim.',
    category: 'Memahami Masalah'
  },
  {
    id: 'q-lit-02',
    topic: 'literasi-digital',
    caseStudy: 'Siswa menulis esai dengan klaim: "Kecerdasan Buatan (AI) terbukti 100% lebih adil dalam menilai esai dibanding manusia karena komputer tidak punya emosi."',
    question: 'Kelemahan paling krusial dalam evaluasi bukti pada argumen esai siswa tersebut adalah...',
    options: [
      'Mengabaikan fakta bahwa model AI dilatih menggunakan data historis manusia yang dapat mengandung bias inheren dan halusinasi.',
      'Tidak mencantumkan merek prosesor komputer yang digunakan.',
      'AI membutuhkan daya listrik tinggi yang merusak lingkungan.',
      'Guru manusia akan kehilangan tunjangan profesi jika digantikan AI.'
    ],
    correctAnswer: 0,
    explanation: 'AI merefleksikan bias dalam dataset pelatihannya (algorithmic bias) sehingga klaim "100% bebas bias" adalah kekeliruan pemahaman epistemik.',
    category: 'Evaluasi Bukti'
  },
  {
    id: 'q-lit-03',
    topic: 'literasi-digital',
    caseStudy: 'Teks A: "Berdasarkan rilis BPS 2024, 78% pengguna gawai usia 12-18 tahun mengakses internet lebih dari 5 jam per hari."\nTeks B: "Generasi muda saat ini pasti akan hancur moralnya karena terlalu sering bermain gawai."',
    question: 'Perbedaan mendasar antara Teks A dan Teks B adalah...',
    options: [
      'Teks A adalah opini pengamat sosial, Teks B adalah prediksi ilmiah yang pasti terjadi.',
      'Teks A menyajikan fakta deskriptif berbasis sensus, sedangkan Teks B adalah generalisasi evaluatif bermuatan prasangka emosional.',
      'Kedua teks sama-sama merupakan fakta yang tidak terbantahkan.',
      'Kedua teks tidak memiliki korelasi dengan dunia pendidikan.'
    ],
    correctAnswer: 1,
    explanation: 'Teks A menyajikan data empiris yang terukur, sementara Teks B adalah over-generalisasi berbasis pandangan moralistis subjektif.',
    category: 'Fakta vs Opini'
  },
  {
    id: 'q-lit-04',
    topic: 'literasi-digital',
    caseStudy: 'Seorang narasumber seminar berpendapat: "Satu-satunya cara melindungi anak dari dampak buruk internet adalah dengan melarang total penggunaan ponsel pintar di sekolah maupun di rumah."',
    question: 'Evaluasi nalar kritis terhadap argumen "Pelarangan Total" (Abstinence-only approach) tersebut adalah...',
    options: [
      'Sangat tepat karena anak di bawah 18 tahun belum memiliki otak yang berkembang sempurna.',
      'Merupakan solusi reduksionis yang mengabaikan urgensi literasi resiliensi digital, navigasi etika informasi, dan kebutuhan adaptasi teknologi masa depan.',
      'Hanya boleh diterapkan untuk sekolah yang berada di kota besar.',
      'Akan menghemat pengeluaran pulsa internet keluarga.'
    ],
    correctAnswer: 1,
    explanation: 'Proteksionisme ekstrem mengisolasi anak tanpa membekali kemampuan bernalar kritis dalam menghadapi risiko digital di dunia nyata.',
    category: 'Evaluasi Argumen'
  },
  {
    id: 'q-lit-05',
    topic: 'literasi-digital',
    caseStudy: 'Ketika sebuah konten hoaks bernada provokatif viral, banyak warganet membagikannya dengan komentar: "Saya tidak tahu ini benar atau tidak, tapi yang penting waspada."',
    question: 'Ditinjau dari perspektif bias konfirmasi dan psikologi media sosial, mengapa perilaku tersebut sangat destruktif?',
    options: [
      'Karena kuota internet pengguna akan terbuang percuma.',
      'Karena menyamarkan tindakan amplifikasi disinformasi di balik tameng niat baik semu, yang memicu kepanikan moral masyarakat.',
      'Karena pemilik platform akan memblokir akun pengguna secara permanen.',
      'Karena gambar dalam konten tersebut berkualitas rendah.'
    ],
    correctAnswer: 1,
    explanation: 'Membagikan klaim yang belum terverifikasi dengan alasan "waspada" tetap memperluas paparan disinformasi dan merusak ekosistem informasi publik.',
    category: 'Sudut Pandang'
  },
  {
    id: 'q-lit-06',
    topic: 'literasi-digital',
    caseStudy: 'Hasil asesmen menunjukkan bahwa siswa yang sering terpapar video pendek dengan durasi kurang dari 15 detik mengalami kesulitan membaca teks panjang lebih dari 3 paragraf.',
    question: 'Inferensi logis yang paling relevan terkait kapasitas kognitif siswa adalah...',
    options: [
      'Teks panjang harus segera dihapuskan dari seluruh kurikulum nasional.',
      'Paparan stimulasi dopamin instan yang konstan dapat mengikis rentang atensi mendalam (sustained attention) yang diperlukan untuk nalar analitis.',
      'Siswa tersebut secara medis mengalami kebutaan huruf mendadak.',
      'Penerbit buku harus mencetak buku dengan huruf yang lebih besar.'
    ],
    correctAnswer: 1,
    explanation: 'Fragmentasi atensi akibat konsumsi mikro-konten berdampak langsung pada kemampuan membaca mendalam (deep reading) dan berpikir reflektif.',
    category: 'Inferensi'
  },
  {
    id: 'q-lit-07',
    topic: 'literasi-digital',
    caseStudy: 'Sebuah sekolah mendapati siswanya menggunakan aplikasi Generative AI untuk menyalin seluruh jawaban tugas proyek esai sejarah.',
    question: 'Keputusan pedagogis paling bijak dan transformatif yang sebaiknya diambil oleh tim kurikulum adalah...',
    options: [
      'Memberikan nilai nol permanen dan melarang komputer di sekolah.',
      'Menggeser tugas dari sekadar hafalan fakta menjadi analisis perbandingan sudut pandang serta mewajibkan siswa mempresentasikan proses sintesis nalar mereka.',
      'Meminta siswa menulis ulang esai tersebut dengan tulisan tangan sebanyak 100 lembar.',
      'Mengabaikan penggunaan AI karena yang terpenting tugas terkumpul tepat waktu.'
    ],
    correctAnswer: 1,
    explanation: 'Respons terhadap AI bukanlah pelarangan mekanis, melainkan perancangan asesmen yang menuntut metakognisi, nalar kritis, dan penalaran tingkat tinggi (HOTS).',
    category: 'Pengambilan Keputusan'
  },
  {
    id: 'q-lit-08',
    topic: 'literasi-digital',
    caseStudy: 'Siswa menemukan artikel yang mencantumkan grafik kenaikan suhu bumi, namun sumbu vertikal (Y-axis) dimulai dari angka 99.8 ke 100.2 sehingga grafik terlihat melonjak tajam secara dramatis.',
    question: 'Keterampilan dekonstruksi visual apa yang sedang diuji pada kasus manipulasi data di atas?',
    options: [
      'Mendeteksi manipulasi skala grafis (Truncated Graph Fallacy) yang sengaja dibuat untuk membesar-besarkan efek visual.',
      'Menilai keindahan kombinasi warna latar belakang grafik.',
      'Memeriksa jenis font tulisan yang digunakan pada judul grafik.',
      'Menghitung jumlah kata dalam artikel pendukung.'
    ],
    correctAnswer: 0,
    explanation: 'Pemotongan skala sumbu Y secara tidak proporsional adalah trik manipulasi visual umum untuk membelokkan persepsi pembaca.',
    category: 'Memahami Masalah'
  },
  {
    id: 'q-lit-09',
    topic: 'literasi-digital',
    caseStudy: 'Sebuah situs berita mengutip pernyataan "Seorang Pakar yang Tidak Disebutkan Namanya" yang menyatakan bahwa minum air rebusan rempah tertentu dapat membunuh seluruh jenis virus dalam 10 detik.',
    question: 'Kelemahan epistemik dalam evaluasi bukti pada artikel tersebut adalah...',
    options: [
      'Penggunaan sumber anonim tanpa peer-review ilmiah dan klaim kausalitas absolut tanpa uji klinis terkontrol.',
      'Rempah-rempah tradisional berharga terlalu mahal di pasar lokal.',
      'Artikel tidak dilengkapi dengan tautan video siaran langsung.',
      'Pemerintah belum membagikan rempah tersebut secara gratis.'
    ],
    correctAnswer: 0,
    explanation: 'Klaim medis luar biasa memerlukan bukti ilmiah luar biasa (extraordinary claims require extraordinary evidence), bukan otoritas tanpa nama.',
    category: 'Evaluasi Bukti'
  },
  {
    id: 'q-lit-10',
    topic: 'literasi-digital',
    caseStudy: 'Pernyataan politisi: "Siapa pun yang mengkritik kurikulum digital nasional ini adalah antek asing yang ingin melihat anak bangsa tertinggal dalam kebodohan."',
    question: 'Logical fallacy apa yang dilakukan oleh pembuat pernyataan di atas?',
    options: [
      'False Dilemma & Ad Hominem (membagi realitas menjadi dua kutub ekstrem sembari mendiskreditkan karakter pengkritik).',
      'Appeal to Nature (menganggap semua yang alami pasti baik).',
      'Gambler\'s Fallacy (kesalahan logika peluang).',
      'Anecdotal Evidence (menggunakan cerita tunggal).'
    ],
    correctAnswer: 0,
    explanation: 'Pernyataan tersebut memaksa oposisi biner yang salah (pro-kurikulum vs antek asing) dan menyerang niat pengkritik alih-alih menjawab substansi evaluasi.',
    category: 'Evaluasi Argumen'
  },
  {
    id: 'q-lit-11',
    topic: 'literasi-digital',
    caseStudy: 'Pengguna internet cenderung hanya membaca konten yang sesuai dengan keyakinan politiknya dan langsung mengabaikan data tandingan yang disajikan kelompok lain.',
    question: 'Mekanisme psikologis algoritma dan kognisi apa yang saling memperkuat fenomena tersebut?',
    options: [
      'Kombinasi antara Filter Bubble / Echo Chamber pada algoritma rekomendasi dan Bias Konfirmasi pada psikologi kognitif manusia.',
      'Kurangnya bandwidth kecepatan internet di wilayah perumahan.',
      'Tingginya harga langganan media daring berbayar.',
      'Ketidakmampuan gawai dalam menampilkan lebih dari satu tab artikel.'
    ],
    correctAnswer: 0,
    explanation: 'Algoritma yang memaksimalkan engagement memperkuat bias konfirmasi manusia dengan hanya menyodorkan konten yang memuaskan praduga awal.',
    category: 'Sudut Pandang'
  },
  {
    id: 'q-lit-12',
    topic: 'literasi-digital',
    caseStudy: 'Data riset membuktikan bahwa akun-akun bot di media sosial menghasilkan ribuan komentar seragam dalam hitungan detik untuk menciptakan ilusi bahwa mayoritas publik mendukung suatu kebijakan kontroversial.',
    question: 'Inferensi strategis yang harus dipahami peserta didik dalam membaca opini publik di media sosial adalah...',
    options: [
      'Jumlah komentar terbanyak selalu mencerminkan kebenaran moral.',
      'Popularitas numerik di dunia maya dapat direkayasa secara artifisial (Astroturfing) dan tidak boleh disamakan dengan konsensus ilmiah atau kebenaran faktual.',
      'Semua pengguna media sosial di internet sebenarnya adalah robot.',
      'Membaca kolom komentar adalah cara terbaik melakukan riset ilmiah.'
    ],
    correctAnswer: 1,
    explanation: 'Astroturfing memanfaatkan otomasi digital untuk memanipulasi persepsi kerumunan (bandwagon effect).',
    category: 'Inferensi'
  },
  {
    id: 'q-lit-13',
    topic: 'literasi-digital',
    caseStudy: 'Seorang guru menemukan bahwa foto profil muridnya diedit menjadi konten tidak senonoh menggunakan fitur AI Face Swap dan diunggah ke platform publik.',
    question: 'Urutan pengambilan keputusan darurat berbasis perlindungan hak anak yang harus dieksekusi adalah...',
    options: [
      'Menyuruh murid tersebut tutup akun dan melupakan kejadian tersebut.',
      'Mendokumentasikan bukti digital (tangkap layar + URL), melaporkan take down ke platform & Kominfo, memberikan pendampingan psikologis, dan menempuh jalur hukum perlindungan anak.',
      'Membalas dengan mengedit balik foto akun pengunggah.',
      'Mengumumkan nama korban di depan rapat terbuka dewan guru.'
    ],
    correctAnswer: 1,
    explanation: 'Penanganan Kekerasan Berbasis Gender Online (KBGO) menuntut preservasi bukti forensik, mitigasi penyebaran konten, dan pendampingan trauma komprehensif.',
    category: 'Pengambilan Keputusan'
  },
  {
    id: 'q-lit-14',
    topic: 'literasi-digital',
    caseStudy: 'Sebuah aplikasi kuis belajar online gratis mewajibkan izin akses ke daftar kontak, galeri foto, riwayat lokasi GPS, dan mikrofon ponsel pengguna.',
    question: 'Analisis kritis terhadap syarat privasi (Terms of Service) aplikasi tersebut mengindikasikan bahwa...',
    options: [
      'Aplikasi tersebut sangat canggih dan memerlukan data untuk mempercepat pengunduhan tugas.',
      'Terjadi pelanggaran prinsip minimalisasi data (Data Minimization), di mana pengembang mengumpulkan data sensitif yang tidak relevan dengan fungsionalitas kuis.',
      'Pengguna akan mendapatkan poin belajar ekstra jika memberikan izin lokasi.',
      'Semua aplikasi di Google Play Store memang wajib meminta seluruh izin akses tersebut.'
    ],
    correctAnswer: 1,
    explanation: 'Prinsip perlindungan data pribadi menuntut agar data yang diminta sebatas yang benar-benar esensial bagi fungsi operasional aplikasi.',
    category: 'Memahami Masalah'
  },
  {
    id: 'q-lit-15',
    topic: 'literasi-digital',
    caseStudy: 'Dalam sebuah diskusi daring, seseorang menulis: "Fakta membuktikan bahwa semua orang yang sering bermain media sosial pasti memiliki IQ rendah."',
    question: 'Pernyataan tersebut cacat secara penalaran kritis karena...',
    options: [
      'Menggunakan label "fakta membuktikan" untuk menyelubungi klaim absolut tanpa menyertakan referensi metodologis dan data empiris yang valid.',
      'IQ adalah satu-satunya indikator kecerdasan manusia yang diakui dunia.',
      'Media sosial diciptakan oleh orang-orang dengan IQ tertinggi di dunia.',
      'Pernyataan tersebut ditulis dengan ejaan bahasa yang terlalu baku.'
    ],
    correctAnswer: 0,
    explanation: 'Klaim generalisasi absolut yang mengatasnamakan fakta tanpa bukti riset adalah bentuk retorika manipulatif.',
    category: 'Fakta vs Opini'
  },

  // ==========================================
  // TOPIC 3: KETIMPANGAN SOSIAL (15 SOAL)
  // ==========================================
  {
    id: 'q-ket-01',
    topic: 'ketimpangan-sosial',
    caseStudy: 'Pemerintah meluncurkan platform pembelajaran berbasis kecerdasan buatan dan video interaktif 4K secara nasional. Namun, 35% sekolah di wilayah 3T belum memiliki suplai listrik stabil dan jaringan internet memadai.',
    question: 'Berdasarkan analisis kesetaraan sistemik, dampak paling nyata dari kebijakan seragam tersebut adalah...',
    options: [
      'Sekolah di kota besar akan menurun kualitasnya.',
      'Memperlebar kesenjangan hasil belajar (Learning Divide) antara wilayah urban yang terfasilitasi dan daerah terluar yang terisolir.',
      'Mendorong seluruh siswa di wilayah 3T untuk segera pindah ke ibu kota.',
      'Mengurangi anggaran belanja buku fisik secara serentak di seluruh provinsi.'
    ],
    correctAnswer: 1,
    explanation: 'Kebijakan digitalisasi yang tidak diimbangi pemerataan prasyarat infrastruktur fisik memperdalam polarisasi disparitas capaian pendidikan.',
    category: 'Memahami Masalah'
  },
  {
    id: 'q-ket-02',
    topic: 'ketimpangan-sosial',
    caseStudy: 'Sebuah artikel menyimpulkan: "Rendahnya skor literasi siswa di pedalaman semata-mata disebabkan oleh kurangnya etos kerja dan motivasi belajar siswa setempat."',
    question: 'Kelemahan evaluasi bukti dari kesimpulan artikel tersebut adalah...',
    options: [
      'Menyederhanakan persoalan struktural kompleks (kurangnya buku bermutu, malnutrisi, jarak tempuh fisik ke sekolah, ketiadaan guru tetap) menjadi kesalahan individual (Fundamental Attribution Error).',
      'Tidak membandingkan skor matematika dengan negara-negara Skandinavia.',
      'Mengabaikan fakta bahwa siswa kota juga sering malas belajar.',
      'Artikel tidak mencantumkan foto wajah para siswa yang disurvei.'
    ],
    correctAnswer: 0,
    explanation: 'Menyalahkan korban (victim blaming) mengaburkan akar ketimpangan struktural seperti sarana dasar, akses nutrisi, dan disparitas alokasi pendidik.',
    category: 'Evaluasi Bukti'
  },
  {
    id: 'q-ket-03',
    topic: 'ketimpangan-sosial',
    caseStudy: 'Pernyataan (1): "Rasio guru berpendidikan S2 di DKI Jakarta mencapai 32%, sedangkan di pedalaman Papua Barat kurang dari 4%."\nPernyataan (2): "Masyarakat di daerah terpencil memang tidak memiliki minat untuk mengenyam pendidikan tinggi."',
    question: 'Bagaimana evaluasi nalar kritis membedakan kedua pernyataan tersebut?',
    options: [
      'Pernyataan (1) adalah opini diskriminatif, sedangkan Pernyataan (2) adalah fakta lapangan.',
      'Pernyataan (1) adalah data demografi statistik obyektif, sedangkan Pernyataan (2) adalah prasangka stereotipikal tanpa bukti sosiologis.',
      'Kedua pernyataan merupakan hipotesis yang belum pernah diteliti.',
      'Kedua pernyataan merupakan kesepakatan umum para sosiolog.'
    ],
    correctAnswer: 1,
    explanation: 'Pernyataan (1) merupakan data faktual representasi statistik, sedangkan pernyataan (2) adalah stereotip derogatory yang mengabaikan keterbatasan akses biaya dan jarak geografis.',
    category: 'Fakta vs Opini'
  },
  {
    id: 'q-ket-04',
    topic: 'ketimpangan-sosial',
    caseStudy: 'Seorang pejabat berargumen: "Standar soal ujian kelulusan harus disamakan dari Sabang sampai Merauke tanpa kompromi agar kualitas bangsa setara."',
    question: 'Kritik paling fundamental terhadap validitas argumen kesetaraan semu (Equality vs Equity) tersebut adalah...',
    options: [
      'Menyamakan alat ukur pada populasi dengan kondisi awal sarana dan proses input yang timpang bukanlah keadilan, melainkan pelembagaan diskriminasi.',
      'Biaya pencetakan naskah ujian seragam terlalu mahal.',
      'Bahasa Indonesia di setiap daerah memiliki dialek yang berbeda-beda.',
      'Siswa di perkotaan akan merasa tersaingi jika siswa pelosok mendapat soal yang sama.'
    ],
    correctAnswer: 0,
    explanation: 'Equality (memberikan hal yang sama rata) mengabaikan ketimpangan titik berangkat; keadilan sejati menuntut Equity (dukungan afirmatif sesuai kebutuhan riil).',
    category: 'Evaluasi Argumen'
  },
  {
    id: 'q-ket-05',
    topic: 'ketimpangan-sosial',
    caseStudy: 'Banyak anak usia sekolah di daerah pesisir membantu orang tua melaut pada musim tangkap ikan sehingga kerap absen dari kelas formal.',
    question: 'Dari sudut pandang sosiologi ekonomi dan pendidikan inklusif, langkah paling kontekstual adalah...',
    options: [
      'Memberhentikan anak-anak tersebut dari sekolah karena tidak disiplin.',
      'Merancang kalender akademik fleksibel dan kurikulum maritim kontekstual yang mengakomodasi siklus nafkah komunitas lokal.',
      'Menghukum orang tua nelayan dengan denda uang tunai.',
      'Memindahkan seluruh keluarga nelayan ke kawasan industri perkotaan.'
    ],
    correctAnswer: 1,
    explanation: 'Pendidikan adaptif harus menyelaraskan ritme pembelajaran dengan realitas sosio-ekologis masyarakat setempat tanpa mengorbankan capaian kompetensi dasar.',
    category: 'Sudut Pandang'
  },
  {
    id: 'q-ket-06',
    topic: 'ketimpangan-sosial',
    caseStudy: 'Pemerintah memberikan tunjangan khusus daerah terpencil sebesar 2x gaji pokok untuk guru 3T. Namun, angka pergantian guru tetap tinggi setelah masa tugas 1 tahun.',
    question: 'Inferensi logis yang paling akurat dari fenomena ini adalah...',
    options: [
      'Seluruh guru di Indonesia serakah dan tidak memiliki jiwa pengabdian.',
      'Insentif finansial tidak mampu mengompensasi isolasi sosial, ancaman keamanan, ketiadaan air bersih/listrik, dan minimnya jaminan jenjang karier berkelanjutan.',
      'Dua kali gaji pokok adalah nominal yang terlalu kecil dibanding biaya hidup di ibu kota.',
      'Masyarakat lokal menolak kehadiran guru dari luar daerah.'
    ],
    correctAnswer: 1,
    explanation: 'Retensi tenaga profesional di wilayah terpencil memerlukan ekosistem pendukung holistik (fasilitas hidup dasar, keselamatan, pengakuan karier), bukan sekadar insentif moneter.',
    category: 'Inferensi'
  },
  {
    id: 'q-ket-07',
    topic: 'ketimpangan-sosial',
    caseStudy: 'Alokasi anggaran renovasi gedung sekolah rusak di sebuah kabupaten terbatas hanya untuk 5 dari 20 sekolah yang mengajukan proposal.',
    question: 'Kriteria pengambilan keputusan berbasis keadilan distributif yang paling tepat diterapkan dinas pendidikan adalah...',
    options: [
      'Memilih sekolah yang kepala sekolahnya memiliki kedekatan personal dengan pejabat dinas.',
      'Memprioritaskan berdasarkan matriks risiko keselamatan struktural bangunan dan ketiadaan ruang belajar alternatif bagi siswa.',
      'Mengundi nama sekolah secara acak agar adil bagi semua pengusul.',
      'Membagi rata anggaran yang sedikit ke 20 sekolah sehingga tidak ada yang selesai diperbaiki.'
    ],
    correctAnswer: 1,
    explanation: 'Keadilan distributif dalam situasi keterbatasan sumber daya menuntut prioritas berbasis tingkat keparahan risiko dan kerentanan subjek didik.',
    category: 'Pengambilan Keputusan'
  },
  {
    id: 'q-ket-08',
    topic: 'ketimpangan-sosial',
    caseStudy: 'Di sebuah pulau terluar, satu-satunya guru SMP harus mengajar matematika, IPA, seni rupa, dan olahraga untuk tiga tingkatan kelas sekaligus dalam satu ruangan.',
    question: 'Identifikasi tantangan pedagogis struktural yang dialami pendidik tersebut dikenal sebagai fenomena...',
    options: [
      'Multi-grade and Multi-subject Teaching di bawah defisit tenaga pendidik formal.',
      'Inovasi pembelajaran futuristik terintegrasi.',
      'Kegagalan kurikulum merdeka dalam memetakan minat siswa.',
      'Kelebihan kuota beban kerja guru tersertifikasi.'
    ],
    correctAnswer: 0,
    explanation: 'Kondisi multi-grade teaching di daerah 3T menuntut pelatihan strategi pedagogis khusus yang sering kali tidak diajarkan di program LPTK konvensional.',
    category: 'Memahami Masalah'
  },
  {
    id: 'q-ket-09',
    topic: 'ketimpangan-sosial',
    caseStudy: 'Sebuah yayasan mengirimkan 1.000 komputer bekas ke sekolah di pedalaman hutan tropis tanpa mengecek ketersediaan instalasi listrik dan pelatihan teknisi lokal.',
    question: 'Evaluasi nalar kritis terhadap program filantropi tersebut adalah...',
    options: [
      'Program tersebut sangat sukses karena nilai donasi di atas kertas mencapai miliaran rupiah.',
      'Merupakan wujud "Cargo Cult Philanthropy" yang berfokus pada simbol pemberian barang tanpa memperhitungkan ekosistem keberlanjutan dan utilisasi fungsional.',
      'Sekolah harus menjual komputer tersebut ke pasar kota untuk membeli genset.',
      'Pemerintah harus mengganti seluruh komputer bekas tersebut dengan laptop baru.'
    ],
    correctAnswer: 1,
    explanation: 'Bantuan materi yang mengabaikan kesiapan infrastruktur pendukung dan transfer kapabilitas lokal berujung pada pemborosan aset tanpa dampak belajar nyata.',
    category: 'Evaluasi Argumen'
  },
  {
    id: 'q-ket-10',
    topic: 'ketimpangan-sosial',
    caseStudy: 'Laporan menunjukkan bahwa rasio anak putus sekolah di jenjang SMA perempuan di daerah perdesaan 3x lebih tinggi dibanding laki-laki.',
    question: 'Data pendukung kualitatif mana yang paling penting untuk mengevaluasi akar ketimpangan gender tersebut?',
    options: [
      'Investigasi faktor perkawinan usia anak, beban domestik rumah tangga, dan ketiadaan transportasi aman menuju sekolah terdekat.',
      'Daftar nilai mata pelajaran tata boga siswa perempuan.',
      'Jumlah guru wanita yang telah menikah di kabupaten tersebut.',
      'Tinggi badan rata-rata siswa perempuan saat mendaftar SMA.'
    ],
    correctAnswer: 0,
    explanation: 'Ketimpangan gender pada akses pendidikan menengah sering kali berakar pada norma perkawinan dini, beban ganda domestik, dan hambatan mobilitas spasial yang aman.',
    category: 'Evaluasi Bukti'
  },
  {
    id: 'q-ket-11',
    topic: 'ketimpangan-sosial',
    caseStudy: 'Buku teks nasional menggunakan contoh cerita: "Ibu pergi berbelanja ke supermarket naik taksi online dan membayar dengan dompet digital," yang dibaca oleh siswa di pegunungan yang belum pernah melihat jalan beraspal.',
    question: 'Kritik perspektif dekolonisasi kurikulum terhadap teks bacaan tersebut adalah...',
    options: [
      'Buku tersebut kurang tebal untuk dibaca siswa pedalaman.',
      'Buku teks bersifat urban-bias yang mengasingkan realitas kultural dan spasial peserta didik daerah non-metropolitan dari proses pembelajaran.',
      'Siswa pegunungan harus diwajibkan melakukan karya wisata ke mall ibu kota.',
      'Taksi online harus membuka cabang operasional di atas pegunungan.'
    ],
    correctAnswer: 1,
    explanation: 'Kurikulum yang seragam dan sentralistik kerap mencerminkan bias pengalaman hidup masyarakat kelas menengah perkotaan sehingga kurang bermakna bagi siswa pelosok.',
    category: 'Sudut Pandang'
  },
  {
    id: 'q-ket-12',
    topic: 'ketimpangan-sosial',
    caseStudy: 'Sebuah riset menunjukkan bahwa investasi pada intervensi gizi anak usia dini (makanan tambahan kaya protein) di daerah rawan pangan meningkatkan skor tes kognitif siswa sebesar 28% di jenjang SD.',
    question: 'Inferensi kebijakan lintas-sektoral yang paling logis adalah...',
    options: [
      'Pendidikan adalah ranah murni kognitif yang tidak memiliki kaitan dengan urusan pangan atau kesehatan.',
      'Peningkatan mutu capaian belajar tidak dapat dipisahkan dari jaminan kesehatan, kecukupan gizi mikro, dan ketahanan pangan rumah tangga anak.',
      'Sekolah cukup membagikan makanan tanpa perlu menyediakan guru yang berkualitas.',
      'Dinas Kesehatan harus mengambil alih seluruh pengelolaan gedung sekolah.'
    ],
    correctAnswer: 1,
    explanation: 'Perkembangan neurologis dan daya serap otak peserta didik sangat bergantung pada fondasi nutrisi fisik pada masa tumbuh kembang emas.',
    category: 'Inferensi'
  },
  {
    id: 'q-ket-13',
    topic: 'ketimpangan-sosial',
    caseStudy: 'Terdapat dana afirmasi untuk pembelian buku bacaan di sekolah kepulauan. Jalur ekspedisi kapal reguler hanya datang sekali dalam dua bulan.',
    question: 'Keputusan logistik paling efektif untuk memastikan ketersediaan bahan bacaan bermutu tepat waktu adalah...',
    options: [
      'Menunggu proses tender kapal hingga anggaran tahun berikutnya hangus.',
      'Mengkombinasikan pengadaan buku cetak berdaya tahan tinggi melalui kemitraan pelayaran lokal dengan penyediaan perangkat digital offline berdaya surya (solar-powered offline library).',
      'Meminta siswa berlayar sendiri ke ibu kota provinsi untuk membeli buku.',
      'Membatalkan program dan mengembalikan dana ke kas negara.'
    ],
    correctAnswer: 1,
    explanation: 'Kombinasi solusi teknologi mandiri energi (solar offline hub) dan optimasi rantai pasok lokal mengatasi kendala isolasi geografis secara berkelanjutan.',
    category: 'Pengambilan Keputusan'
  },
  {
    id: 'q-ket-14',
    topic: 'ketimpangan-sosial',
    caseStudy: 'Seorang komentator media menyatakan: "Pendidikan gratis di sekolah negeri sudah menjamin 100% kesetaraan bagi anak dari keluarga termiskin."',
    question: 'Kelemahan paling fatal dalam mengevaluasi fakta pembiayaan pendidikan di atas adalah...',
    options: [
      'Mengabaikan biaya kesempatan (opportunity cost), seragam, transportasi harian, alat tulis, dan kehilangan kontribusi ekonomi anak bagi keluarga prasejahtera.',
      'Sekolah swasta memiliki guru yang lebih ramah.',
      'Biaya pembangunan gedung sekolah gratis ditanggung oleh donatur luar negeri.',
      'Sekolah negeri tidak pernah memungut sumbangan sukarela dalam bentuk apa pun.'
    ],
    correctAnswer: 0,
    explanation: 'Bebas SPP (free tuition) bukan berarti bebas biaya total (zero cost); pengeluaran tersembunyi dan opportunity cost tetap menjadi rintangan berat keluarga prasejahtera.',
    category: 'Fakta vs Opini'
  },
  {
    id: 'q-ket-15',
    topic: 'ketimpangan-sosial',
    caseStudy: 'Dalam seleksi beasiswa afirmasi, siswa dari daerah 3T harus bersaing nilai tes skolastik murni dengan siswa dari sekolah unggulan berstandar internasional di Jakarta.',
    question: 'Ditinjau dari prinsip keadilan distributif John Rawls, mekanisme seleksi tersebut cacat karena...',
    options: [
      'Mengukur kemampuan bawaan yang murni tanpa memperhitungkan bahwa tes standar mencerminkan akumulasi privilese modal sosial dan fasilitas belajar sejak usia dini.',
      'Siswa Jakarta tidak boleh mendaftar beasiswa dari pemerintah.',
      'Jumlah kuota beasiswa terlalu banyak dibanding peminat yang mendaftar.',
      'Materi tes skolastik terlalu mudah bagi seluruh peserta.'
    ],
    correctAnswer: 0,
    explanation: 'Meritokrasi semu yang mengabaikan disparitas fasilitas belajar sejak lahir melegitimasi reproduksi ketimpangan kelas sosial atas nama "kemampuan individu".',
    category: 'Evaluasi Argumen'
  }
];
