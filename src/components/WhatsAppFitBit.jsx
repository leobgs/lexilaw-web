import images from 'assets/images'
import { useGlobalContext } from 'hooks/context'
import { useGetWhatsappTuorial } from 'hooks/useGetWhatsappTutorial'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Storage } from 'utils/LocalStorage'
import { QRCodeCanvas } from 'qrcode.react'

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

  const { dataWATutorial } = useGetWhatsappTuorial()

  const handleDownload = (name) => {
    const canvas = document.getElementById('qr-code-download')
    const link = document.createElement('a')

    if (canvas) {
      const pngUrl = canvas.toDataURL()
      link.href = pngUrl
      link.download = name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      return
    }
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
      {dataWATutorial?.data?.steps?.map((item, index) => (
        <>
          <div className="py-10 flex flex-col" key={item.description_indonesia}>
            {/* Text */}
            <div className="flex space-x-2 font-medium text-[14px]">
              <span>{item.order}.</span>
              <p
                dangerouslySetInnerHTML={{
                  __html:
                    i18n.language === 'en'
                      ? item.description_english
                      : item.description_indonesia,
                }}
              ></p>
            </div>

            {/* Image */}
            <img src={item.image_url} alt="img_instruction" className="mt-4" />
          </div>

          {index === 0 && (
            <div className="border border-slate-10 rounded-md flex flex-col justify-center items-center py-20 my-8">
              {/* Image QR Code */}
              {/* <img src={images.img_qrcode_dummy} alt="qr-code" /> */}
              <QRCodeCanvas
                id="qr-code-download"
                value={dataWATutorial?.data?.whatsapp_contact}
                size={256}
              />

              {/* Download button */}
              <button
                className="font-bold py-1 px-2 border border-[#BCBCBC] rounded-full text-xs bg-blue-sky hover:cursor-pointer text-dark-50 flex items-center space-x-2 mt-4"
                onClick={() => {
                  handleDownload('qr-code-infobip')
                }}
              >
                <img src={images.ic_download} alt="ic_download" />
                <span>
                  {i18n.language === 'en' ? 'Download Picture' : 'Unduh Gambar'}
                </span>
              </button>
            </div>
          )}
        </>
      ))}
    </div>
  )
}
