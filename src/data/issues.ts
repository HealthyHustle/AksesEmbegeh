import { Issue } from '../types';

export const ISSUES_DATA: Issue[] = [
  {
    id: 'bullying',
    title: 'Bullying & Cyberbullying',
    shortTitle: 'Bullying',
    description: 'Persoalan perundungan verbal, fisik, relasional, dan cyberbullying yang berdampak pada kesehatan mental dan iklim belajar peserta didik di lingkungan pendidikan.',
    percentage: 72,
    icon: 'ShieldAlert',
    color: '#EF4444',
    accentColor: '#F87171',
    bgLight: '#FEF2F2',
    keyStats: [
      { label: 'Siswa Pernah Mengalami', value: '41.1%' },
      { label: 'Kasus Terjadi di Dunia Digital', value: '58.4%' },
      { label: 'Sekolah dengan Tim Pencegahan (TPPK)', value: '64.2%' },
      { label: 'Dampak Penurunan Motivasi Belajar', value: '72.0%' }
    ],
    impactDescription: 'Perundungan bukan sekadar persoalan antar-individu, melainkan kegagalan sistemik dalam menciptakan iklim keamanan sekolah yang inklusif, suportif, dan tanggap.'
  },
  {
    id: 'literasi-digital',
    title: 'Literasi Digital & Etika Informasi',
    shortTitle: 'Literasi Digital',
    description: 'Tantangan kemampuan peserta didik dan pendidik dalam mengevaluasi validitas informasi, menangkis hoaks, menjaga keamanan data pribadi, dan mempraktikkan etika bermedia digital.',
    percentage: 84,
    icon: 'Smartphone',
    color: '#3B82F6',
    accentColor: '#60A5FA',
    bgLight: '#EFF6FF',
    keyStats: [
      { label: 'Indeks Literasi Digital Nasional', value: '3.54 / 5.0' },
      { label: 'Kesulitan Membedakan Fakta/Opini', value: '62.7%' },
      { label: 'Akses Internet Peserta Didik Harian', value: '84.0%' },
      { label: 'Guru Terlatih Verifikasi Fakta', value: '38.2%' }
    ],
    impactDescription: 'Kecakapan digital bukan sebatas kemampuan mengoperasikan gawai, melainkan penalaran kritis saat mengonsumsi, mengolah, dan membagikan informasi dalam ekosistem digital.'
  },
  {
    id: 'ketimpangan-sosial',
    title: 'Ketimpangan Sosial & Akses Pendidikan 3T',
    shortTitle: 'Ketimpangan Sosial',
    description: 'Kesenjangan aksesibilitas, infrastruktur sarana belajar, rasio guru tersertifikasi, dan kualitas pendidikan antar-wilayah urban versus daerah Tertinggal, Terdepan, dan Terluar (3T).',
    percentage: 68,
    icon: 'Scale',
    color: '#F59E0B',
    accentColor: '#FBBF24',
    bgLight: '#FFFBEB',
    keyStats: [
      { label: 'Kesenjangan Sarana Digital 3T vs Kota', value: '4.8x' },
      { label: 'Distribusi Guru Berkualifikasi S1/S2', value: '54.6%' },
      { label: 'Sekolah Belum Terjangkau Listrik Stabil', value: '18.9%' },
      { label: 'Disparitas Skor Capaian Belajar', value: '68.0%' }
    ],
    impactDescription: 'Ketimpangan pendidikan memperlebar jurang sosio-ekonomi generasi masa depan jika pemerataan fasilitas, tunjangan guru, dan kurikulum kontekstual tidak diprioritaskan.'
  }
];
