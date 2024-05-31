export const DEFAULT_QUESTION = [
  { message: 'Undang-undang tentang pajak apa?', value: 1 },
  { message: 'UU ITE dan PTSE terkait A.I gimana?', value: 2 },
  { message: 'Pasal perjanjian 1313 KUHP perdata?', value: 3 },
  { message: 'Pencuri dipotong tangan, emg boleh?', value: 4 },
  { message: 'Sengketa lahan girik', value: 5 },
  { message: 'UU soal HAM', value: 6 },
  { message: 'UU 39 1999 intinya apa', value: 7 },
  { message: 'Pokok dari TKDN', value: 8 },
  { message: 'Apakah ada aturan menggunakan lampu strobo', value: 9 },
]

export const KOLEKSI_CHAT = [
  {
    label: 'Semua Draft',
    value: 'semua_draft',
    uuid: Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000,
    childs: [
      {
        message: 'Mengganti akta kelahiran',
        isActive: false,
        value: 'mengganti_akte_kelahiran',
        uuid: Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000,
      },
      {
        message: 'Mengganti nomor plat kendaraan',
        isActive: false,
        value: 'mengganti_plat_kendaraan',
        uuid: Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000,
      },
      {
        message: 'Balik sertifikat tanah',
        isActive: false,
        value: 'balik_sertifikat_tanah',
        uuid: Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000,
      },
    ],
  },
  {
    label: 'Kasus Bpk Luki',
    value: 'kasus_bpk_luki',
    uuid: Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000,
    childs: [
      {
        message: 'Sengketa Lahan Girik',
        isActive: false,
        value: 'sengketa_lahan_girik',
        from: 'cb87b9a5-e1da-4410-85e5-4e1d4a9c463e',
        uuid: Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000,
        chat: [
          {
            message: 'Sengketa Lahan Girik',
            value: 'sengketa_lahan_girik',
            from: 'you',
            uuid:
              Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000,
          },
          {
            message: 'UU 39 1999 mengandung apa?',
            value: 'UU_39_1999_mengandung_apa',
            from: 'you',
            uuid:
              Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000,
          },
          {
            message: 'UU 39 1999 mengandung apa?',
            value:
              '(1) Setiap warga negara berhak atas jaminan sosial yang dibutuhkan untuk huuidup layak serta untuk perkembangan pribadinya secara utuh. (2) Setiap penyandang cacat, orang yang berusia lanjut, wanita hamil, dan anak-anak, berhak memperoleh kemudahan dan perlakuan khusus.',
            from: 'ai',
            uuid:
              Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000,
          },
        ],
      },
      {
        message: 'Penggelapan pajak',
        isActive: false,
        value: 'penggelapan_pajak',
        uuid: Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000,
      },
    ],
  },
]

export const OROLAN_TERKINI = []

export const RIWAYAT_OROLAN = [
  {
    title: 'dummy - Bagaimana cara melihat semua feature?',
    uuid: Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000,
    chat: [
      {
        message: 'Bagaimana cara melihat rekomendasi lawyer?',
        file: null,
        from: 'cb87b9a5-e1da-4410-85e5-4e1d4a9c463e',
        uuid: Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000,
        type: '',
      },
      {
        message: 'Oke, silahkan cek kenalan Saya yang bisa bantu Kamu',
        from: '000000',
        uuid: Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000,
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
    last_name: 'Magdalena,.S.H',
    image_url: 'https://picsum.photos/id/64/200/200',
    description:
      'Berkomitmen untuk Menyelesaikan Perselisihan | Konsultasi Hukum dan Penyelesaian SengketaBerkomitmen untuk Menyelesaikan Perselisihan | Konsultasi Hukum dan Penyelesaian Sengketa Advokat Hukum | Hukum Perdata | ....',
    lawyer_filed: ['Hukum Pertanahan', 'Hukum Keluarga', 'Hukum Perdata'],
    city: 'Jakarta',
    experince: 3,
    min_price: 8000000,
    max_price: 15000000,
    total_price: 20540000,
    service_price: [
      {
        id: 1,
        service_name: 'Opini Hukum',
        price: 800000,
      },
      {
        id: 2,
        service_name: 'Legal Memorandum',
        price: 1000000,
      },
      {
        id: 3,
        service_name: 'Document Hukum : Perjanjian',
        price: 1000000,
      },
      {
        id: 4,
        service_name: 'Document Hukum : Kontrak',
        price: 1000000,
      },
    ],
    service_summary: {
      jasa_pajak: [
        {
          id: 0,
          name: 'Rate Jasa',
          price: 18500000,
        },
        {
          id: 1,
          name: 'Biaya PPN (11%)',
          price: 2100000,
        },
      ],
      transaction_price: [
        {
          id: 1,
          name: 'Biaya Platform',
          price: 5000,
        },
      ],
    },
  },
  {
    uuid: '5r16913f-50ht-4d97-b359-fe5ythh44059',
    first_name: 'Harry',
    last_name: 'Puter',
    image_url: 'https://picsum.photos/id/453/200/200',
    description:
      'Advokat Hukum | Hukum Perdata | Berkomitmen untuk Menyelesaikan Perselisihan | Konsultasi Hukum dan Penyelesaian SengketaBerkomitmen untuk Menyelesaikan Perselisihan | Konsultasi Hukum dan Penyelesaian Sengketa',
    lawyer_filed: [
      'Hukum Pertanahan',
      'Hukum Perceraian',
      'Hukum Perdata',
      'Hukum transaksi elektronik',
      'Hukum pernikahan',
    ],
    city: 'Tangerang',
    experince: 5,
    min_price: 10000000,
    max_price: 20000000,
    total_price: 20540000,
    service_price: [
      {
        id: 1,
        service_name: 'Opini Hukum',
        price: 800000,
      },
      {
        id: 2,
        service_name: 'Legal Memorandum',
        price: 1000000,
      },
      {
        id: 3,
        service_name: 'Document Hukum : Proposal',
        price: 1300000,
      },
      {
        id: 4,
        service_name: 'Kontrak',
        price: 2000000,
      },
    ],
    service_summary: {
      jasa_pajak: [
        {
          id: 0,
          name: 'Rate Jasa',
          price: 18500000,
        },
        {
          id: 1,
          name: 'Biaya PPN (11%)',
          price: 2100000,
        },
      ],
      transaction_price: [
        {
          id: 1,
          name: 'Biaya Platform',
          price: 50000,
        },
      ],
    },
  },
  {
    uuid: '1s16913f-50ht-4d97-b339-fe5ythh44059',
    first_name: 'Umabachi',
    last_name: '',
    image_url: 'https://picsum.photos/id/342/200/200',
    description:
      'Hukum Adat Advokat Perdata | Membela Keadilan dengan Hukum | Ahli dalam Kasus Perdata | Berkomitmen untuk Menyelesaikan Perselisihan | Konsultasi Hukum dan Penyelesaian Sengketa | #LawyerLife 🏛️⚖️"',
    lawyer_filed: ['Hukum Adat', 'Hukum Perceraian'],
    city: 'Tangerang',
    experince: 2,
    min_price: 10000000,
    max_price: 20000000,
    total_price: 20540000,
    service_price: [
      {
        id: 1,
        service_name: 'Opini Hukum',
        price: 500000,
      },
      {
        id: 2,
        service_name: 'Legal Memorandum',
        price: 1000000,
      },
      {
        id: 3,
        service_name: 'Document Hukum : Perjanjian',
        price: 1900000,
      },
      {
        id: 4,
        service_name: 'Document Hukum : Kontrak',
        price: 1400000,
      },
    ],
    service_summary: {
      jasa_pajak: [
        {
          id: 0,
          name: 'Rate Jasa',
          price: 18500000,
        },
        {
          id: 1,
          name: 'Biaya PPN (11%)',
          price: 2100000,
        },
      ],
      transaction_price: [
        {
          id: 1,
          name: 'Biaya Platform',
          price: 50000,
        },
      ],
    },
  },
  {
    uuid: '1s16913f-33ht-4d97-b339-fe5ythh44059',
    first_name: 'Irwan',
    last_name: '',
    image_url: 'https://picsum.photos/id/409/200/200',
    description:
      'Hukum Adat Advokat Perdata | Membela Keadilan dengan Hukum | Ahli dalam Kasus Perdata | Berkomitmen untuk Menyelesaikan Perselisihan | Konsultasi Hukum dan Penyelesaian Sengketa | #LawyerLife 🏛️⚖️"',
    lawyer_filed: ['Hukum Adat'],
    city: 'Bekasi',
    experince: 2,
    min_price: 10000000,
    max_price: 20000000,
    total_price: 20540000,
    service_price: [
      {
        id: 1,
        service_name: 'Opini Hukum',
        price: 500000,
      },
      {
        id: 2,
        service_name: 'Legal Memorandum',
        price: 1000000,
      },
      {
        id: 3,
        service_name: 'Document Hukum : Perjanjian',
        price: 1900000,
      },
      {
        id: 4,
        service_name: 'Document Hukum : Kontrak',
        price: 1400000,
      },
    ],
    service_summary: {
      jasa_pajak: [
        {
          id: 0,
          name: 'Rate Jasa',
          price: 18500000,
        },
        {
          id: 1,
          name: 'Biaya PPN (11%)',
          price: 2100000,
        },
      ],
      transaction_price: [
        {
          id: 1,
          name: 'Biaya Platform',
          price: 50000,
        },
      ],
    },
  },
]

export const PAYMENT_METHOD = [
  {
    id: 1,
    name: `Credut / Debit Cards`,
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/1024px-MasterCard_Logo.svg.png',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/1024px-MasterCard_Logo.svg.png',
      'https://zeevector.com/wp-content/uploads/Master-Card-and-Visa-Logo-Vector.png',
    ],
    isSelected: false,
  },
  {
    id: 2,
    name: `ATM / Bank Transfer`,
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/1024px-MasterCard_Logo.svg.png',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/1024px-MasterCard_Logo.svg.png',
      'https://zeevector.com/wp-content/uploads/Master-Card-and-Visa-Logo-Vector.png',
    ],
    isSelected: false,
  },
  {
    id: 3,
    name: `E-Wallet`,
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/1024px-MasterCard_Logo.svg.png',
      'https://zeevector.com/wp-content/uploads/Master-Card-and-Visa-Logo-Vector.png',
    ],
    isSelected: false,
  },
]

export const MY_LAWYER = [
  {
    first_name: 'Lucia',
    last_name: 'Zulauf',
    image_url: 'https://picsum.photos/id/409/200/200',
    city: 'Bali',
    thread: ['Case 01', 'Case 02'],
    uuid: 11,
  },
  {
    first_name: 'Jeff',
    last_name: 'Nippard',
    image_url: 'https://picsum.photos/id/419/200/200',
    city: 'Tangerang',
    thread: ['Case 01'],
    uuid: 2,
  },
  {
    first_name: 'Mike',
    last_name: 'Ehrmantraut',
    image_url: 'https://picsum.photos/id/40/200/200',
    city: 'Bali',
    thread: ['Case 01', 'Case 02', 'Case 03', 'Case 04', 'Case 05', 'Case 06'],
    uuid: 3,
  },
  {
    first_name: 'Jose',
    last_name: 'Callejon',
    image_url: 'https://picsum.photos/id/469/200/200',
    city: 'Jakarta',
    thread: ['Case 01', 'case 02', 'Case 03', 'Case 04'],
    uuid: 4,
  },
  {
    first_name: 'Umabachi',
    last_name: '',
    image_url: 'https://picsum.photos/id/64/200/200',
    city: 'Jakarta',
    thread: ['Case 01', 'case 02'],
    uuid: 5,
  },
  {
    first_name: 'Muhammad',
    last_name: 'Huda',
    image_url: 'https://picsum.photos/id/409/200/200',
    city: 'Medan',
    thread: ['Case 01', 'Case 02'],
    uuid: 11,
  },
  {
    first_name: 'Akmal',
    last_name: 'Nizzar',
    image_url: 'https://picsum.photos/id/419/200/200',
    city: 'Tangerang',
    thread: ['Case 01'],
    uuid: 12,
  },
  // {
  //   first_name: 'Jusuf ',
  //   last_name: 'Baharrudin',
  //   image_url: 'https://picsum.photos/id/40/200/200',
  //   city: 'Tangeran',
  //   thread: ['Case 01', 'Case 02', 'Case 03', 'Case 04', 'Case 05', 'Case 06'],
  //   uuid: 13,
  // },
  // {
  //   first_name: 'Kiki',
  //   last_name: 'Saputri',
  //   image_url: 'https://picsum.photos/id/469/200/200',
  //   city: 'Tangerang',
  //   thread: ['Case 01', 'case 02', 'Case 03', 'Case 04'],
  //   uuid: 14,
  // },
  // {
  //   first_name: 'Risma',
  //   last_name: '',
  //   image_url: 'https://picsum.photos/id/64/200/200',
  //   city: 'Jakarta',
  //   thread: ['Case 01', 'case 02'],
  //   uuid: 15,
  // },
  // {
  //   first_name: 'Jusuf ',
  //   last_name: 'Baharrudin',
  //   image_url: 'https://picsum.photos/id/40/200/200',
  //   city: 'Tangeran',
  //   thread: ['Case 01'],
  //   uuid: 131,
  // },
  // {
  //   first_name: 'Kiki',
  //   last_name: 'Saputri',
  //   image_url: 'https://picsum.photos/id/469/200/200',
  //   city: 'Tangerang',
  //   thread: ['Case 01'],
  //   uuid: 141,
  // },
  // {
  //   first_name: 'Risma',
  //   last_name: '',
  //   image_url: 'https://picsum.photos/id/64/200/200',
  //   city: 'Jakarta',
  //   thread: ['Case 01', 'case 02'],
  //   uuid: 105,
  // },
]

export const DOCUMMENT_HASIL = [
  {
    title: 'Draft Kontrak over kredit',
    uuid: 111,
    documments: [
      {
        title: 'Draft memorendum',
        image_url:
          'https://placehold.co/200x200/EEE/31343C?font=raleway&text=RalewayLorem%20ipsum%20dolor%20sit%20amet%20consectetur,%20adipisicing%20elit.%20Ipsum,%20asperiores!',
      },
      {
        title: 'Draft perjanjian',
        image_url:
          'https://placehold.co/200x200/EEE/31343C?font=raleway&text=RalewayLorem%20ipsum%20dolor%20sit%20amet%20consectetur,%20adipisicing%20elit.%20Ipsum,%20asperiores!',
      },
      {
        title: 'Opini Hukum',
        image_url:
          'https://placehold.co/200x200/EEE/31343C?font=raleway&text=RalewayLorem%20ipsum%20dolor%20sit%20amet%20consectetur,%20adipisicing%20elit.%20Ipsum,%20asperiores!',
      },
      {
        title: 'Dokumen Hukum',
        image_url:
          'https://placehold.co/200x200/EEE/31343C?font=raleway&text=RalewayLorem%20ipsum%20dolor%20sit%20amet%20consectetur,%20adipisicing%20elit.%20Ipsum,%20asperiores!',
      },
    ],
  },
  {
    title: 'Kerjasama dan HAKI',
    uuid: 1230,
    documments: [
      {
        title: 'draft_contract.jpg',
        image_url:
          'https://placehold.co/200x200/EEE/31343C?font=raleway&text=RalewayLorem%20ipsum%20dolor%20sit%20amet%20consectetur,%20adipisicing%20elit.%20Ipsum,%20asperiores!',
      },
    ],
  },
]

export const LAWYER_SCHEDULE = [
  {
    title: 'Draft kontrak over kredit',
    scheduled_at: 'Senin, December 18',
    time_at: '10:00 – 11:00am',
    url: 'https://meet.google.com/tsl-092',
  },
  {
    title: 'Perjanjian pergantian warga negara',
    scheduled_at: 'Selasa, December 19',
    time_at: '10:00 – 14:00am',
    url: 'https://meet.google.com/tsl-192',
  },
]
