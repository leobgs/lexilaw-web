import images from 'assets/images'
import { AxiosError } from 'axios'
import { useGlobalContext } from 'hooks/context'
import { localServerData } from 'hooks/useLocalServerData'
import { usePostWhatsAppConnect } from 'hooks/usePostWhatsAppConnect'
import { usePostWhatsAppOTP } from 'hooks/usePostWhatsAppOTP'
import { notifyError } from 'hooks/useToas'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQueryClient } from 'react-query'

/**
 *
 * @deprecated Komponent ini sudah tidak digunakan lagi, gunakan komponen `WhatsAppFitBit`
 */
export const WhatsappOtp = ({ onClickButtonChange, onSuccessOTP }) => {
  const { phoneNumberObj } = useGlobalContext()
  const [second, setSecond] = useState(45)
  const [otp, setOtp] = useState('')

  const { t } = useTranslation()
  const { CURRENT_LANGUAGE } = localServerData()
  const isEnglish = CURRENT_LANGUAGE === 'en'

  const queryClient = useQueryClient()
  const { mutateAsyncWAOTP, isPendingWAOTP, isErrorWAOTP } =
    usePostWhatsAppOTP()
  const { mutateAsyncWAConnect } = usePostWhatsAppConnect()
  const isDisabled = second !== 0 || isPendingWAOTP
  const isError = otp.length === 6 && isErrorWAOTP

  /**
   *
   * @param {import('react').ChangeEvent<HTMLInputElement>} e
   */
  const handleOnChange = async (e) => {
    const cleaned = e.target.value.replace(/\D+/g, '')

    setOtp(cleaned)

    if (cleaned.length === 6) {
      try {
        await mutateAsyncWAOTP(otp)
        queryClient.invalidateQueries(['user'])
        onSuccessOTP && onSuccessOTP()
      } catch (e) {
        const code = e instanceof AxiosError ? e.response.data?.code : 500
        if ([500, 501, 502, 503, 504].includes(code)) {
          const message = e instanceof Error ? e.message : 'Unknown Error'
          notifyError(message)
        }
      }
    }
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
          <div className="flex justify-center md:hidden mb-4">
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
          <div
            className={`flex justify-center border-b-2 ${
              isError ? 'border-[#db0000]' : 'border-dark-50'
            } md:border-b-0 md:px-16 ${isError && 'text-[#db0000]'}`}
          >
            <input
              type="tel"
              placeholder={t('connect_whatsapp.whatsapp_otp_placeholder')}
              maxLength={6}
              onChange={handleOnChange}
              className={`md:w-full md:border-b-2 ${
                isError ? 'border-[#db0000]' : 'border-dark-50'
              } text-[28px] md:text-[32px] bg-transparent block placeholder:text-center text-center focus:outline-none mt-4 placeholder:text-[16px] placeholder:md:text-[20px] placeholder:font-regular pb-2 input-text-bold placeholder:text-gray-300/40 ${
                isError && 'text-[#db0000]'
              } `}
              value={otp}
              disabled={isPendingWAOTP}
            />
          </div>
          {isError && (
            <p className="font-medium text-[#DB0000] text-center">
              {t('connect_whatsapp.whatsapp_otp_invalid')}
            </p>
          )}
        </form>

        {/* footer */}
        <div className="mt-3 flex flex-col items-center md:items-start md:flex-row md:justify-center md:space-x-1">
          <p className="text-center font-medium text-gray-700">
            {isEnglish ? 'Please wait ' : 'Tunggu '}{' '}
            {second.toString().length <= 1 ? '0' + second : second}{' '}
            {t('connect_whatsapp.whatsapp_otp_waiting')}{' '}
          </p>
          <span
            className={`font-bold border-b-2 border-blue-dark ${
              !isDisabled
                ? 'hover:cursor-pointer text-blue-dark opacity-100'
                : 'hover:cursor-not-allowed opacity-50'
            }`}
            onClick={async () => {
              if (!isDisabled) {
                try {
                  await mutateAsyncWAConnect(phoneNumberObj.phoneNumber)
                  setSecond(45)
                } catch (e) {
                  const message =
                    e instanceof Error ? e.message : 'Unknown Error'
                  notifyError(message)
                }
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
