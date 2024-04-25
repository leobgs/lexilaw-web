export const DEFAULT_QUESTION = [
  { text: 'Undang-undang tentang pajak apa?', value: 1 },
  { text: 'UU ITE dan PTSE terkait A.I gimana?', value: 2 },
  { text: 'Pasal perjanjian 1313 KUHP perdata?', value: 3 },
  { text: 'Pencuri dipotong tangan, emg boleh?', value: 4 },
  { text: 'Sengketa lahan girik', value: 5 },
  { text: 'UU soal HAM', value: 6 },
  { text: 'UU 39 1999 intinya apa', value: 7 },
  { text: 'Pokok dari TKDN', value: 8 },
  { text: 'Apakah ada aturan menggunakan lampu strobo', value: 9 },
]

export const KOLEKSI_CHAT = [
  {
    label: 'Semua Draft',
    value: 'semua_draft',
    id: Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000,
    childs: [
      {
        title: 'Mengganti akta kelahiran',
        isActive: false,
        value: 'mengganti_akte_kelahiran',
        id: Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000,
      },
      {
        title: 'Mengganti nomor plat kendaraan',
        isActive: false,
        value: 'mengganti_plat_kendaraan',
        id: Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000,
      },
      {
        title: 'Balik sertifikat tanah',
        isActive: false,
        value: 'balik_sertifikat_tanah',
        id: Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000,
      },
    ],
  },
  {
    label: 'Kasus Bpk Luki',
    value: 'kasus_bpk_luki',
    id: Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000,
    childs: [
      {
        title: 'Sengketa Lahan Girik',
        isActive: false,
        value: 'sengketa_lahan_girik',
        id: Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000,
        chat: [
          {
            text: 'Sengketa Lahan Girik',
            value: 'sengketa_lahan_girik',
            from: 'you',
            id:
              Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000,
          },
          {
            text: 'UU 39 1999 mengandung apa?',
            value: 'UU_39_1999_mengandung_apa',
            from: 'you',
            id:
              Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000,
          },
          {
            text: 'UU 39 1999 mengandung apa?',
            value:
              '(1) Setiap warga negara berhak atas jaminan sosial yang dibutuhkan untuk hidup layak serta untuk perkembangan pribadinya secara utuh. (2) Setiap penyandang cacat, orang yang berusia lanjut, wanita hamil, dan anak-anak, berhak memperoleh kemudahan dan perlakuan khusus.',
            from: 'Lexi',
            id:
              Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000,
          },
        ],
      },
      {
        title: 'Penggelapan pajak',
        isActive: false,
        value: 'penggelapan_pajak',
        id: Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000,
      },
    ],
  },
]

export const OROLAN_TERKINI = []

export const RIWAYAT_OROLAN = [
  {
    title: 'Apa boleh tidak memperpanjang surat Kendaraan?',
    id: Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000,
    chat: [
      {
        text: 'Apa boleh tidak memperpanjang surat Kendaraan?',
        file: null,
        id: Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000,
        type: '',
      },
      {
        text: 'sadsd',
        file: null,
        id: Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000,
        type: '',
      },
    ],
    isActive: false,
  },
  {
    title: 'Hukum tidak melapor pajak bagi wajib pajak?',
    id: Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000,
    chat: [
      {
        text: 'Hukum tidak melapor pajak bagi wajib pajak?',
        file: null,
        id: Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000,
        type: '',
      },
      {
        text: 'Sengketa lahan girik merujuk pada konflik atau perselisihan yang berkaitan dengan hak kepemilikan tanah yang diakui melalui girik. Girik adalah bentuk sertifikat tanah tradisional di Indonesia yang mengakui hak kepemilikan tanah secara turun-temurun dalam masyarakat adat atau lokal.\n    Sengketa lahan girik dapat muncul karena beberapa alasan, termasuk ketidakjelasan batas tanah, klaim ganda terhadap lahan, perubahan kebijakan pemerintah terkait tanah, atau perselisihan warisan antara keluarga atau komunitas. Sengketa semacam itu seringkali kompleks dan memerlukan penyelesaian yang cermat dan adil untuk menghindari konflik lebih lanjut.\n    Penyelesaian sengketa lahan girik biasanya melibatkan berbagai pihak, termasuk pemilik tanah, pemerintah daerah, badan hukum, dan masyarakat setempat. Prosesnya bisa melalui mediasi, arbitrase, atau bahkan pengadilan tergantung pada tingkat kompleksitas dan kesepakatan antara pihak-pihak terlibat.\n    Di Indonesia, pemerintah telah berupaya untuk mengatasi masalah sengketa lahan girik melalui berbagai kebijakan dan program reformasi agraria. Namun, tantangan dalam penyelesaian sengketa lahan girik masih ada dan seringkali memerlukan pendekatan yang komprehensif dan berkelanjutan.',
        from: 'Lexi',
        id: Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000,
        type: '',
      },
    ],
    isActive: false,
  },
  {
    title: 'Bagaimana cara melihat semua feature?',
    id: Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000,
    chat: [
      {
        text: 'Bagaimana cara melihat semua feature?',
        file: null,
        id: Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000,
        type: '',
      },
      {
        text: 'Oke, silahkan cek kenalan Saya yang bisa bantu Kamu',
        from: 'Lexi',
        id: Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000,
        type: 'recommendation',
      },
    ],
    isActive: false,
  },
]

export const LAWYER_DATA = [
  {
    uuid: '4b16913f-30ef-4d97-b359-fe549f444059',
    first_name: 'Lena',
    last_name: 'Magdalena',
    image_url: 'https://picsum.photos/id/64/200/200',
    description: 'Advokat Hukum | Hukum Perdata | ....',
    lawyer_filed: ['Hukum Pertanahan', 'Hukum Keluarga', 'Hukum Perdata'],
    city: 'Jakarta',
    experince: 3,
    min_price: 8000000,
    max_price: 15000000,
  },
  {
    uuid: '5r16913f-50ht-4d97-b359-fe5ythh44059',
    first_name: 'Harry',
    last_name: 'Puter',
    image_url: 'https://picsum.photos/id/453/200/200',
    description: 'Advokat Hukum | Hukum Perdata | ....',
    lawyer_filed: ['Hukum Pertanahan', 'Hukum Perceraian', 'Hukum Perdata'],
    city: 'Tangerang',
    experince: 5,
    lowest_price: 10000000,
    highest_price: 20000000,
  },
  {
    uuid: '1s16913f-50ht-4d97-b339-fe5ythh44059',
    first_name: 'Umabachi',
    last_name: '',
    image_url: 'https://picsum.photos/id/342/200/200',
    description: 'Hukum Adat',
    lawyer_filed: ['Hukum Adat', 'Hukum Perceraian'],
    city: 'Tangerang',
    experince: 2,
    lowest_price: 10000000,
    highest_price: 20000000,
  },
]
