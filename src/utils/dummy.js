export const DEFAULT_QUESTION = [
  { text: 'Undang-undang tentang pajak apa?', value: 1 },
  { text: 'UU ITE dan PTSE terkait A.I gimana?', value: 2 },
  { text: 'Pasal perjanjian 1313 KUHP perdata?', value: 3 },
  { text: 'Pencuri dipotong tangan, emg boleh?', value: 4 },
  { text: 'Sengketa lahan girik', value: 5 },
  { text: 'UU soal HAM', value: 6 },
  { text: 'UU 39 1999 intinya apa', value: 7 },
  { text: 'Pokok dari TKDN', value: 8 },
]

export const KOLEKSI_CHAT = [
  {
    label: 'Semua Draft',
    value: 'semua_draft',
    childs: [
      {
        label: 'Mengganti akta kelahiran',
        isActive: false,
        value: 'mengganti_akte_kelahiran',
      },
      {
        label: 'Mengganti nomor plat kendaraan',
        isActive: false,
        value: 'mengganti_plat_kendaraan',
      },
      {
        label: 'Balik sertifikat tanah',
        isActive: false,
        value: 'balik_sertifikat_tanah',
      },
    ],
  },
  {
    label: 'Kasus Bpk Luki',
    value: 'kasus_bpk_luki',
    childs: [
      {
        label: 'Sengketa Lahan Girik',
        isActive: false,
        value: 'sengketa_lahan_girik',
        chat: [
          {
            text: 'Sengketa Lahan Girik',
            value: 'sengketa_lahan_girik',
            from: 'you',
          },
          {
            text: 'UU 39 1999 mengandung apa?',
            value: 'UU_39_1999_mengandung_apa',
            from: 'you',
          },
          {
            text: 'UU 39 1999 mengandung apa?',
            value:
              '(1) Setiap warga negara berhak atas jaminan sosial yang dibutuhkan untuk hidup layak serta untuk perkembangan pribadinya secara utuh. (2) Setiap penyandang cacat, orang yang berusia lanjut, wanita hamil, dan anak-anak, berhak memperoleh kemudahan dan perlakuan khusus.',
            from: 'lexi',
          },
        ],
      },
      {
        label: 'Penggelapan pajak',
        isActive: false,
        value: 'penggelapan_pajak',
      },
    ],
  },
]

export const OBROLAN_LAMPAU = [
  {
    text: 'UU 39 1999 mengandung apa?',
    value: 'UU_39_1999_mengandung_apa',
    chat: [
      {
        text: 'UU 39 1999 mengandung apa?',
        value: 'UU_39_1999_mengandung_apa',
        from: 'you',
      },
      {
        text: 'UU 39 1999 mengandung apa?',
        value:
          '(1) Setiap warga negara berhak atas jaminan sosial yang dibutuhkan untuk hidup layak serta untuk perkembangan pribadinya secara utuh. (2) Setiap penyandang cacat, orang yang berusia lanjut, wanita hamil, dan anak-anak, berhak memperoleh kemudahan dan perlakuan khusus.',
        from: 'lexi',
      },
    ],
  },
]

export const OROLAN_TERKINI = []
