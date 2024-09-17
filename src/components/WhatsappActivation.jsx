import { useState } from 'react'
import { PhoneNumberInput } from './PhoneNumberInput'
import images from 'assets/images'
import { Button } from './Button/Button'

export const WhatsappActivation = () => {
  const [phoneNumber, setPhoneNumber] = useState('')

  console.log(phoneNumber)

  return (
    <div className="rounded-md w-[536px] bg-neutral-80">
      <div className="p-8">
        {/* Whatsapp Logo */}
        <div className="flex justify-center">
          <img src={images.ic_whatsapp} alt="whatsapp_logo" />
        </div>

        <div className="flex items-center flex-col mb-6">
          {/* Header */}
          <h1 className="font-bold mb-1">Aktivasi WhatsApp</h1>
          {/* Keterangan */}
          <div className="w-[316px] flex">
            <p className="text-center text-sm tracking-wide">
              Kamu dapat mengakses Lexi AI kapanpun dengan smartphone Kamu.
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <div className="flex gap-x-4 items-center">
            <PhoneNumberInput setNumber={setPhoneNumber} />
            <Button
              label={'Kirim OTP'}
              className={'bg-blue-dark rounded-full text-white disabled:bg-blue-dark/30'}
              disabled={phoneNumber.length < 9}
            />
          </div>
        </form>
      </div>
    </div>
  )
}
