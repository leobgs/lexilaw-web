import { useGlobalContext } from 'hooks/context'
import { forwardRef, useState } from 'react'
import { DropdownCountryCode } from './DropdownCountryCode'

/**
 *
 * @param {string} input
 * @returns {string}
 */
const formatPhoneNumber = (input) => {
  // Hapus karakter selain angka
  const cleaned = input.replace(/\D+/g, '')

  // Masking input, jika 4 digit kasih spasi
  let formattedNumber = ''
  if (cleaned.length > 0) {
    if (cleaned.length <= 4) {
      formattedNumber = cleaned.slice(0, 4)
    } else {
      const firstPart = cleaned.length >= 4 ? cleaned.slice(0, 4) : cleaned
      const rest = cleaned.slice(4)
      formattedNumber = `${firstPart} ${rest.match(/.{1,4}/g)?.join(' ') || ''}`
    }
  }

  return formattedNumber.trim()
}

const PhoneNumberInput = forwardRef((props, ref) => {
  const [startWithZero, setStartWithZero] = useState(false)
  const { setMaskedPhoneNumber, setPhoneNumber, phoneNumberObj } =
    useGlobalContext()

  const handleOnChange = (e) => {
    const input = e.target.value
    if (input.startsWith('0')) {
      setStartWithZero(true)
    } else {
      setStartWithZero(false)
    }
    const maskedNUmber = formatPhoneNumber(input?.replace(/^0/, ''))
    setMaskedPhoneNumber(maskedNUmber)
    setPhoneNumber(maskedNUmber.replaceAll(' ', ''))
  }

  return (
    <div className="relative flex-1">
      {/* span country code */}
      <div className="absolute top-[5px] left-2">
        <DropdownCountryCode />
      </div>

      {/* garis */}
      <div className="absolute h-6 top-3 left-[4.5rem] w-[2px] bg-gray-100" />
      <input
        onChange={handleOnChange}
        value={phoneNumberObj.maskedPhoneNumber}
        maxLength={startWithZero ? 16 : 15}
        id="phone-number"
        type="tel"
        className="pl-[5rem] pr-2 py-3 rounded-full bg-white focus:outline-none w-full font-semi-bold border border-gray-100"
        ref={ref}
      />
    </div>
  )
})

export { PhoneNumberInput }
