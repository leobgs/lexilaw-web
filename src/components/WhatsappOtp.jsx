import images from 'assets/images'
import { useGlobalContext } from 'hooks/context'
import { localServerData } from 'hooks/useLocalServerData'
import { notifyInfo } from 'hooks/useToas'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const WhatsappOtp = ({ onClickButtonChange }) => {
  const { phoneNumberObj } = useGlobalContext()
  const [second, setSecond] = useState(45)
  const [otp, setOtp] = useState('')
  const isDisabled = second !== 0

  const { t } = useTranslation()
  const { CURRENT_LANGUAGE } = localServerData()
  const isEnglish = CURRENT_LANGUAGE === 'en'

  // TODO, ketika BE udh siap
  // LOGIC SUBMIT DISINI
  const handleOnSubmit = () => {}

  const handleOnChange = (e) => {
    const cleaned = e.target.value.replace(/\D+/g, '')

    setOtp(cleaned)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (second > 0) {
        setSecond((prev) => prev - 1)
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [second])

  useEffect(() => {
    return () => {
      setOtp('')
    }
  }, [])

  return (
    <div className="rounded-md max-w-[536px] md:w-[536px] bg-neutral-80 mx-auto">
      <div className="p-8">
        {/* Header */}
        <div>
          {/* Whatsapp Logo */}
          <div className="flex justify-center md:hidden">
            <img src={images.ic_whatsapp} alt="whatsapp_logo" />
          </div>
          <h1 className="text-center font-futura-bold mb-2 text-[24px] md:text-[22px]">
            {t('connect_whatsapp.whatsapp_otp_header')}
          </h1>
          <div className="flex items-center gap-x-2 justify-center">
            <h1 className="font-semi-bold text-[16px] md:font-futura-bold md:text-[22px]">
              +62 {phoneNumberObj.maskedPhoneNumber}
            </h1>
            <span
              className="font-bold py-1 px-2 border border-[#BCBCBC] rounded-full text-xs bg-blue-sky hover:cursor-pointer text-dark-50"
              onClick={onClickButtonChange}
            >
              {t('connect_whatsapp.whatsapp_otp_change_button')}
            </span>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <div className="flex justify-center border-b-2 border-dark-50 md:border-b-0 md:px-16">
            <input
              type="tel"
              placeholder={t('connect_whatsapp.whatsapp_otp_placeholder')}
              maxLength={6}
              onChange={handleOnChange}
              className="md:w-full md:border-b-2 text-[28px] md:text-[32px] bg-transparent block placeholder:text-center text-center focus:outline-none mt-4 placeholder:text-[16px] placeholder:md:text-[20px] placeholder:font-regular pb-2 input-text-bold placeholder:text-gray-300/40"
              value={otp}
            />
          </div>
        </form>

        {/* footer */}
        <div className="mt-6 flex flex-col items-center md:items-start md:flex-row md:justify-center md:space-x-1">
          <p className="text-center font-medium text-gray-700">
            {isEnglish ? 'Please wait ' : 'Tunggu '} {second.toString().length <= 1 ? '0' + second : second}{' '}
            {t('connect_whatsapp.whatsapp_otp_waiting')}{' '}
          </p>
          <span
            className={`font-bold border-b-2 border-blue-dark${
              !isDisabled ? 'hover:cursor-pointer text-blue-dark opacity-100' : 'hover:cursor-not-allowed opacity-50'
            }`}
            onClick={() => {
              if (!isDisabled) {
                notifyInfo('Handle Kirim Ulang [menunggu BE]')
                setSecond(45)
              }
            }}
          >
            {isEnglish ? 'Resend' : 'Kirim Ulang'}
          </span>
        </div>
      </div>
    </div>
  )
}
