import { PhoneNumberInput } from './PhoneNumberInput'
import images from 'assets/images'
import { Button } from './Button/Button'
import { useTranslation } from 'react-i18next'
import { useGlobalContext } from 'hooks/context'
import { usePostWhatsAppConnect } from 'hooks/usePostWhatsAppConnect'
import { useQueryClient } from 'react-query'

export const WhatsappActivation = ({ onHandleSubmit, onClose }) => {
  const { phoneNumberObj } = useGlobalContext()
  const { mutateAsyncWAConnect, isPendingWAConnect } = usePostWhatsAppConnect()
  const queryClient = useQueryClient()

  const { t } = useTranslation()

  return (
    <div className="rounded-md max-w-[536px] md:w-[536px] bg-neutral-80">
      <div className="p-8 relative">
        {/* ic_cross */}
        <div
          className="absolute top-4 right-4 md:hidden hover:cursor-pointer"
          onClick={onClose}
        >
          <img src={images.ic_cross} alt="" />
        </div>
        {/* Whatsapp Logo */}
        <div className="flex justify-center mb-4">
          <img src={images.ic_whatsapp} alt="whatsapp_logo" />
        </div>

        <div className="flex items-center flex-col mb-6">
          {/* Header */}
          <h1 className="font-futura-bold mb-1 text-dark-50">
            {t('connect_whatsapp.whatsapp_activation_header')}{' '}
          </h1>
          {/* Keterangan */}
          <div className="md:w-[316px] flex">
            <p className="text-center text-sm tracking-wide font-medium text-gray-700">
              {t('connect_whatsapp.whatsapp_activation_description')}
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            await mutateAsyncWAConnect(phoneNumberObj.phoneNumber)
            queryClient.invalidateQueries(['user'])
            onHandleSubmit()
          }}
        >
          <div className="flex flex-col space-y-2 items-stretch md:space-y-0 md:flex-row gap-x-4 md:items-center">
            {/* Country Code and Phone number */}
            <PhoneNumberInput />
            <Button
              label={t('connect_whatsapp.whatsapp_activation_send_otp')}
              className={
                'btn-secondary-otp disabled:opacity-50 rounded-full relative md:w-fit w-full'
              }
              disabled={
                phoneNumberObj.maskedPhoneNumber.length < 10 ||
                isPendingWAConnect
              }
            />
          </div>
        </form>
      </div>
    </div>
  )
}
