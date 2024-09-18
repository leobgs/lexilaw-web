import { PhoneNumberInput } from './PhoneNumberInput'
import images from 'assets/images'
import { Button } from './Button/Button'
import { useTranslation } from 'react-i18next'
import { useGlobalContext } from 'hooks/context'

export const WhatsappActivation = ({ onHandleSubmit }) => {
  const { phoneNumberObj } = useGlobalContext()

  const { t } = useTranslation()

  return (
    <div className="rounded-md max-w-[536px] md:w-[536px] bg-neutral-80">
      <div className="p-8">
        {/* Whatsapp Logo */}
        <div className="flex justify-center">
          <img src={images.ic_whatsapp} alt="whatsapp_logo" />
        </div>

        <div className="flex items-center flex-col mb-6">
          {/* Header */}
          <h1 className="font-bold mb-1">{t('connect_whatsapp.whatsapp_activation_header')}</h1>
          {/* Keterangan */}
          <div className="w-[316px] flex">
            <p className="text-center text-sm tracking-wide">{t('connect_whatsapp.whatsapp_activation_description')}</p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            onHandleSubmit()
          }}
        >
          <div className="flex gap-x-4 items-center">
            <PhoneNumberInput />
            <Button
              label={t('connect_whatsapp.whatsapp_activation_send_otp')}
              className={'bg-blue-dark rounded-full text-white disabled:bg-blue-dark/30'}
              disabled={phoneNumberObj.maskedPhoneNumber.length < 10}
            />
          </div>
        </form>
      </div>
    </div>
  )
}
