import { HookQuestion } from '../types';

export const HOOK_QUESTIONS: HookQuestion[] = [
  {
    id: 'hook-ai-literacy',
    topic: 'literasi-digital',
    question: 'Menurut kamu, apakah penggunaan AI dalam pembelajaran selalu meningkatkan kemampuan berpikir kritis siswa?',
    contextNote: 'Kritis terhadap ilusi pemahaman instan: membedakan adopsi teknologi efisien vs degradasi proses reflektif mandiri.',
    suggestedAnswerStarts: [
      'Menurut saya, AI membantu jika difungsikan sebagai mitra dialektika, bukan penyedia jawaban instan...',
      'Ada risiko siswa kehilangan daya analisis mendalam jika bergantung penuh pada rangkuman AI...',
      'Bagi calon guru, tantangannya adalah merancang pertanyaan yang tidak bisa dijawab mentah oleh mesin...'
    ]
  },
  {
    id: 'hook-bullying',
    topic: 'bullying',
    question: 'Jika kamu menemukan kasus perundungan di sekolah, bagaimana kamu menganalisis penyebabnya sebelum menentukan solusi?',
    contextNote: 'Membedah relasi kuasa tersembunyi, iklim keamanan sekolah, dan budaya bystander ketimbang sekadar hukuman individual.',
    suggestedAnswerStarts: [
      'Saya akan memetakan relasi kuasa antara pelaku dan korban, serta mencari tahu faktor pembiaran oleh teman sebaya...',
      'Perundungan sering berakar dari normalisasi kekerasan verbal di lingkungan pergaulan atau keluarga...',
      'Solusinya bukan sekadar menghukum pelaku, melainkan memulihkan iklim aman di seluruh kelas (restorative justice)...'
    ]
  },
  {
    id: 'hook-ketimpangan-3t',
    topic: 'ketimpangan-sosial',
    question: 'Bagaimana kondisi sosial dan lingkungan sekolah memengaruhi cara seorang guru mengajar?',
    contextNote: 'Perspektif Critical Pedagogy of Place: sekolah tidak berada di ruang hampa, keadilan menuntut kurikulum kontekstual.',
    suggestedAnswerStarts: [
      'Guru di daerah 3T harus mengadaptasi kurikulum nasional agar relevan dengan realitas geografis dan kearifan lokal...',
      'Keterbatasan fasilitas menuntut prinsip keadilan distributif (equity), bukan menyamaratakan perlakuan (equality)...',
      'Lingkungan sosio-ekologis murid harus menjadi laboratorium belajar, bukan hambatan...'
    ]
  },
  {
    id: 'hook-digital-bias',
    topic: 'literasi-digital',
    question: 'Mengapa masyarakat berpendidikan tinggi sekalipun masih kerap terjebak bias konfirmasi dan hoaks digital?',
    contextNote: 'Analisis psikososial ruang gema (echo chamber), kecepatan algoritma media sosial, dan minimnya verifikasi lateral.',
    suggestedAnswerStarts: [
      'Karena algoritma medsos memperkuat apa yang ingin kita percayai, bukan kebenaran faktual...',
      'Pendidikan kita sering menekankan hafalan daripada keterampilan verifikasi sumber silang (lateral reading)...',
      'Emosi dan identitas kelompok sering mendahului pertimbangan rasional saat menerima informasi viral...'
    ]
  }
];
