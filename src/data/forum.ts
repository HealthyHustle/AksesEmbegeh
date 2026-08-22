import { ForumRoom, RoomChatMessage, RoomParticipant, ForumThread } from '../types';

export const FORUM_ROOMS: ForumRoom[] = [
  {
    id: 'room-1',
    slug: 'bullying',
    name: 'Anti-Bullying & Iklim Sekolah',
    tagline: 'Dialektika pencegahan kekerasan, TPPK, dan iklim aman satuan pendidikan.',
    description: 'Diskusi strategi perlindungan anak, penguatan peran TPPK, penanganan trauma korban, dan keadilan restoratif di satuan pendidikan.',
    activeOnline: 18,
    threadsCount: 46,
    iconName: 'ShieldAlert',
    badgeColor: 'bg-red-50 text-red-700 border-red-200'
  },
  {
    id: 'room-2',
    slug: 'literasi-digital',
    name: 'Literasi Digital & Etika Informasi',
    tagline: 'Kolaborasi verifikasi fakta, mitigasi hoaks AI, dan kurikulum digital.',
    description: 'Ruang kolaborasi seputar etika bermedia digital, verifikasi informasi di ruang kelas, dan mitigasi disinformasi berbasis AI.',
    activeOnline: 24,
    threadsCount: 58,
    iconName: 'Smartphone',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  {
    id: 'room-3',
    slug: 'ketimpangan-sosial',
    name: 'Ketimpangan Sosial & Pendidikan 3T',
    tagline: 'Advokasi keadilan akses sarana, retensi guru perintis, dan modul luring.',
    description: 'Wadah bagi pemerhati pendidikan pedalaman, advokasi sarana listrik/internet, dan strategi pedagogi kontekstual di wilayah kepulauan.',
    activeOnline: 19,
    threadsCount: 39,
    iconName: 'Scale',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200'
  }
];

export const ROOM_PINNED_PROMPTS = {
  'bullying': {
    title: '📌 Topik Kajian Aktif Hari Ini: Bystander Effect & TPPK',
    prompt: 'Bagaimana sekolah dapat mengubah mayoritas siswa yang pasif menonton (silent bystanders) menjadi pembela aktif (upstanders) tanpa rasa takut akan ancaman retaliasi geng pelaku?',
    facilitator: 'Tim Fasilitator Sekolah Ramah Anak'
  },
  'literasi-digital': {
    title: '📌 Topik Kajian Aktif Hari Ini: Uji Coba Lateral Reading di Kelas',
    prompt: 'Ketika video deepfake AI kian sempurna secara visual, pembiasaan nalar kritis apa yang paling mendesak diujicobakan pada siswa saat membedah informasi viral?',
    facilitator: 'Divisi Inovasi Kurikulum Digital'
  },
  'ketimpangan-sosial': {
    title: '📌 Topik Kajian Aktif Hari Ini: Solar Offline Hub vs Ketergantungan Sinyal',
    prompt: 'Apakah investasi pada modul pembelajaran digital luring mandiri energi (solar offline hub) lebih realistis untuk daerah 3T dibanding menunggu jaringan kabel fiber optik?',
    facilitator: 'Forum Pendidik Daerah Terdepan'
  }
};

export const INITIAL_ROOM_PARTICIPANTS: Record<string, RoomParticipant[]> = {
  'bullying': [
    {
      id: 'p-1',
      name: 'Rudi Hartono, S.Pd.',
      role: 'Guru BK SMA',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      isOnline: true,
      statusText: 'Sedang menelaah kasus mediasi'
    },
    {
      id: 'p-2',
      name: 'Dr. Siti Rahayu, M.Psi.',
      role: 'Dosen Psikologi Perkembangan',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
      isOnline: true,
      statusText: 'Aktif berdiskusi'
    },
    {
      id: 'p-3',
      name: 'Nadia Putri',
      role: 'Mahasiswa Bimbingan Konseling',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
      isOnline: true,
      statusText: 'Online'
    },
    {
      id: 'p-4',
      name: 'Bambang Irawan, M.Pd.',
      role: 'Ketua TPPK Kab. Sleman',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      isOnline: true,
      statusText: 'Online'
    }
  ],
  'literasi-digital': [
    {
      id: 'p-5',
      name: 'Dewi Lestari, M.Pd.',
      role: 'Guru Bahasa Indonesia SMA',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80',
      isOnline: true,
      statusText: 'Berbagi modul Lateral Reading'
    },
    {
      id: 'p-6',
      name: 'Ahmad Fauzan',
      role: 'Peneliti Media & Komunikasi',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      isOnline: true,
      statusText: 'Aktif berdiskusi'
    },
    {
      id: 'p-7',
      name: 'Maya Safitri',
      role: 'Mahasiswa Pendidikan TIK',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      isOnline: true,
      statusText: 'Online'
    },
    {
      id: 'p-8',
      name: 'Hendra Wijaya, S.Kom.',
      role: 'Pegiat Literasi Digital Gen Z',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
      isOnline: true,
      statusText: 'Online'
    }
  ],
  'ketimpangan-sosial': [
    {
      id: 'p-9',
      name: 'Markus Kogoya, S.Pd.',
      role: 'Guru Perintis Pegunungan Papua',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
      isOnline: true,
      statusText: 'Berbagi pengalaman lapangan 3T'
    },
    {
      id: 'p-10',
      name: 'Dr. Indah Pratiwi',
      role: 'Peneliti Sosiologi Pendidikan BRIN',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      isOnline: true,
      statusText: 'Aktif berdiskusi'
    },
    {
      id: 'p-11',
      name: 'Yohanes Bria',
      role: 'Relawan Pengajar NTT',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
      isOnline: true,
      statusText: 'Online'
    },
    {
      id: 'p-12',
      name: 'Kartika Sari, M.Ed.',
      role: 'Praktisi Kebijakan Pendidikan',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
      isOnline: true,
      statusText: 'Online'
    }
  ]
};

export const INITIAL_ROOM_MESSAGES: RoomChatMessage[] = [
  // =========================================================================
  // ROOM: BULLYING & IKLIM SEKOLAH
  // =========================================================================
  {
    id: 'msg-b-1',
    roomId: 'bullying',
    authorName: 'Rudi Hartono, S.Pd.',
    authorRole: 'Guru BK SMA',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    content: 'Selamat pagi rekan-rekan pendidik. Di sekolah kami, tantangan terbesar mediasi perundungan adalah ketika pelaku berdalih "hanya bercanda" dan didukung oleh geng sebayanya. Bagaimana cara efektif memecah normalisasi agresi verbal seperti ini?',
    timestamp: '10.15',
    upvotes: 14,
    insightfulCount: 8,
    tag: '💡 Solusi Konkret'
  },
  {
    id: 'msg-b-2',
    roomId: 'bullying',
    authorName: 'Dr. Siti Rahayu, M.Psi.',
    authorRole: 'Dosen Psikologi Perkembangan',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
    content: 'Kuncinya ada pada pembongkaran "bystander effect". Saat saksi pasif dilatih untuk berani menunjukkan gestur tidak nyaman atau mengalihkan perhatian korban, pelaku kehilangan panggung sosialnya. Di Finlandia (program KiVa), intervensi difokuskan 80% pada saksi, bukan cuma pada pelaku.',
    timestamp: '10.22',
    upvotes: 21,
    insightfulCount: 15,
    replyTo: {
      authorName: 'Rudi Hartono, S.Pd.',
      content: 'Di sekolah kami, tantangan terbesar mediasi perundungan adalah ketika pelaku berdalih "hanya bercanda"...'
    },
    tag: '📊 Berbasis Data Lapangan'
  },
  {
    id: 'msg-b-3',
    roomId: 'bullying',
    authorName: 'Bambang Irawan, M.Pd.',
    authorRole: 'Ketua TPPK Kab. Sleman',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    content: 'Setuju dengan Bu Siti. Berdasarkan Permendikbudristek 46/2023, TPPK diwajibkan memiliki kanal aduan anonim. Ketika siswa tahu identitas mereka 100% terlindungi dari ancaman balas dendam geng, laporan perundungan naik 3 kali lipat dan bisa dicegah sebelum eskalasi fisik.',
    timestamp: '10.35',
    upvotes: 18,
    insightfulCount: 12,
    tag: '⚖️ Perspektif Kebijakan'
  },

  // =========================================================================
  // ROOM: LITERASI DIGITAL & ETIKA INFORMASI
  // =========================================================================
  {
    id: 'msg-l-1',
    roomId: 'literasi-digital',
    authorName: 'Dewi Lestari, M.Pd.',
    authorRole: 'Guru Bahasa Indonesia SMA',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80',
    content: 'Rekan-rekan, kemarin kami menguji metode "Lateral Reading" pada 36 siswa kelas 11. Daripada membaca artikel mencurigakan sampai habis, siswa diajarkan membuka tab baru dan mencari siapa pemilik situs tersebut. Waktu deteksi hoaks turun dari 5 menit menjadi kurang dari 40 detik!',
    timestamp: '09.40',
    upvotes: 28,
    insightfulCount: 19,
    tag: '💡 Solusi Konkret'
  },
  {
    id: 'msg-l-2',
    roomId: 'literasi-digital',
    authorName: 'Ahmad Fauzan',
    authorRole: 'Peneliti Media & Komunikasi',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    content: 'Luar biasa Bu Dewi. Ini membuktikan bahwa literasi digital bukan soal mahir mengoperasikan gawai (skill teknis), melainkan pembiasaan jeda kognitif (cognitive pause). Otak Gen Z sangat rentan pada umpan clickbait emosional, jadi teknik tab komparasi ini wajib masuk RPP.',
    timestamp: '09.55',
    upvotes: 19,
    insightfulCount: 14,
    replyTo: {
      authorName: 'Dewi Lestari, M.Pd.',
      content: 'Rekan-rekan, kemarin kami menguji metode "Lateral Reading" pada 36 siswa kelas 11...'
    },
    tag: '📊 Berbasis Data Lapangan'
  },
  {
    id: 'msg-l-3',
    roomId: 'literasi-digital',
    authorName: 'Hendra Wijaya, S.Kom.',
    authorRole: 'Pegiat Literasi Digital Gen Z',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
    content: 'Bagaimana dengan tantangan AI Deepfake audio/video? Sekarang banyak hoaks yang meniru suara tokoh publik atau guru. Apakah sekolah sudah mulai mengajarkan cara memeriksa metadata digital dan jejak forensik sederhana?',
    timestamp: '10.10',
    upvotes: 15,
    insightfulCount: 9,
    tag: '❓ Pertanyaan Kritis'
  },

  // =========================================================================
  // ROOM: KETIMPANGAN SOSIAL & PENDIDIKAN 3T
  // =========================================================================
  {
    id: 'msg-k-1',
    roomId: 'ketimpangan-sosial',
    authorName: 'Markus Kogoya, S.Pd.',
    authorRole: 'Guru Perintis Pegunungan Papua',
    authorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
    content: 'Salam dari Wamena. Di tempat tugas kami, listrik hanya menyala 4 jam di malam hari menggunakan genset desa. Pengiriman tablet digital dari pusat akhirnya tidak terpakai optimal. Yang kami butuhkan adalah modul ajar mandiri energi berbasis panel surya dan buku fisik bermutu.',
    timestamp: '08.50',
    upvotes: 35,
    insightfulCount: 26,
    tag: '📊 Berbasis Data Lapangan'
  },
  {
    id: 'msg-k-2',
    roomId: 'ketimpangan-sosial',
    authorName: 'Dr. Indah Pratiwi',
    authorRole: 'Peneliti Sosiologi Pendidikan BRIN',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    content: 'Ini adalah contoh nyata dari kegagalan "Cargo Cult Policy"—mengirimkan gadget tanpa ekosistem utilitas dasar. Kebijakan afirmasi ke depan harus berbasis "Appropriate Technology": teknologi tepat guna yang berdaya tahan tinggi terhadap iklim tropis dan ketiadaan sinyal.',
    timestamp: '09.15',
    upvotes: 24,
    insightfulCount: 18,
    replyTo: {
      authorName: 'Markus Kogoya, S.Pd.',
      content: 'Salam dari Wamena. Di tempat tugas kami, listrik hanya menyala 4 jam di malam hari...'
    },
    tag: '⚖️ Perspektif Kebijakan'
  },
  {
    id: 'msg-k-3',
    roomId: 'ketimpangan-sosial',
    authorName: 'Kartika Sari, M.Ed.',
    authorRole: 'Praktisi Kebijakan Pendidikan',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    content: 'Kami sedang mengadvokasi alokasi BOS Kinerja Afirmasi agar sekolah di daerah kepulauan terluar (seperti Kepulauan Aru dan Sangihe) memiliki fleksibilitas anggaran untuk bahan bakar perahu jemputan murid dan honor guru lokal.',
    timestamp: '09.30',
    upvotes: 21,
    insightfulCount: 15,
    tag: '💡 Solusi Konkret'
  }
];

// Fallback initial threads for backward compatibility
export const INITIAL_THREADS: ForumThread[] = [];
