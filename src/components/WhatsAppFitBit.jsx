import images from 'assets/images'
import { useGlobalContext } from 'hooks/context'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Storage } from 'utils/LocalStorage'

/**
 *
 * @param {{
 * onCloseButton: () => void
 * onChangeNumber: () => void
 * }}
 *
 * @returns {React.ReactNode}
 */
export const WhatsAppFitBIt = ({ onCloseButton, onChangeNumber }) => {
  const { t, i18n } = useTranslation()
  const { phoneNumberObj } = useGlobalContext()

  const handleDownload = (url, name) => {
    const link = document.createElement('a')
    link.href = url
    link.download = name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="h-[90dvh] bg-neutral-80 px-7 md:px-12 py-4 w-[400px] md:w-[560px] relative shadow-2xl rounded-md overflow-y-auto mx-auto">
      {/* Close Button */}
      <div
        className="absolute top-4 right-4 hover:cursor-pointer"
        onClick={() => {
          onCloseButton && onCloseButton()
        }}
      >
        <img src={images.ic_circle_cross} alt="ic_circle_cross" />
      </div>

      {/* Aktivasi Whatsapp */}
      <div className="flex items-start justify-center mt-10 border-b border-slate-10">
        <h1 className="font-futura-bold mb-8">
          {t('chat.profile_option.wa_activation')}
        </h1>
      </div>

      {/* Your Phone Number */}
      <div className="border-b border-slate-10 flex flex-col py-10 items-center justify-center">
        <h1 className="font-futura-bold">{t('whatsapp_fitbit.your_number')}</h1>
        <div className="my-4 flex space-x-4">
          <p className="font-bold text-xl">
            {phoneNumberObj?.countryCode?.dial_code}
            {Storage.getItem('phone-number', '878745459696')}
          </p>

          <span
            className="font-bold py-1 px-2 border border-[#BCBCBC] rounded-full text-xs bg-blue-sky hover:cursor-pointer text-dark-50"
            onClick={onChangeNumber}
          >
            {t('connect_whatsapp.whatsapp_otp_change_button')}
          </span>
        </div>
      </div>

      {/* Instruction */}
      {dummyData.map((item, index) => (
        <>
          <div className="py-10 flex flex-col" key={item.msg_ind}>
            {/* Text */}
            <div className="flex space-x-2 font-medium text-[14px]">
              <span>{index + 1}.</span>
              <p
                dangerouslySetInnerHTML={{
                  __html: i18n.language === 'en' ? item.msg_eng : item.msg_ind,
                }}
              ></p>
            </div>

            {/* Image */}
            <img src={item.img} alt="img_instruction" className="mt-4" />
          </div>

          {
            index === 0 && 
            <div className="border border-slate-10 rounded-md flex flex-col justify-center items-center py-20 my-8">
              {/* Image QR Code */}
              <img src={images.img_qrcode_dummy} alt="qr-code" />

              {/* Download button */}
              <button
                className="font-bold py-1 px-2 border border-[#BCBCBC] rounded-full text-xs bg-blue-sky hover:cursor-pointer text-dark-50 flex items-center space-x-2 mt-4"
                onClick={() => {
                  handleDownload(images.img_qrcode_dummy, 'qr-code')
                }}
              >
                <img src={images.ic_download} alt="ic_download" />
                <span>
                  {i18n.language === 'en' ? 'Download Picture' : 'Unduh Gambar'}
                </span>
              </button>
            </div>
          }
        </>
      ))}
    </div>
  )
}

// Dummy Data
// #TODO Hapus ketika API sudah ada
const dummyData = [
  {
    msg_ind:
      'Untuk mengaktifkan Lexi di WhatsApp, scan QR code atau tambahkan nomor <strong>4827466474</strong> ke dalam kontak WhatsApp Anda.',
    msg_eng:
      'To activate Lexi on WhatsApp, scan the QR code or add the number <strong>4827466474</strong> to your WhatsApp contacts.',
    img: images.img_instruction_1,
  },
  {
    msg_ind: 'Kirim pesan yang telah terisi otomatis.',
    msg_eng: 'Send a pre-filled message.',
    img: images.img_instruction_2,
  },
  {
    msg_ind: 'Klik Yes untuk mengkonfirmasi aktivasi.',
    msg_eng: 'Click Yes to confirm the activation.',
    img: images.img_instruction_3,
  },
  {
    msg_ind: 'Jika aktivasi berhasil maka akan muncul pesan aktivasi berhasil',
    msg_eng:
      'If the activation is successful, a message confirming the successful activation will appear.',
    img: images.img_instruction_4,
  },
  {
    msg_ind: 'Asisten Lexi siap digunakan di WhatsApp Anda.',
    msg_eng: 'Lexi Assistant is ready to be used on your WhatsApp.',
    img: images.img_instruction_5,
  },
]
