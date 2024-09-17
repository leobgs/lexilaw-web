import { useState } from 'react'

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

const PhoneNumberInput = ({ setNumber }) => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [startWithZero, setStartWithZero] = useState(false)

  const handleOnChange = (e) => {
    const input = e.target.value
    if (input.startsWith('0')) {
      setStartWithZero(true)
    } else {
      setStartWithZero(false)
    }
    const maskedNUmber = formatPhoneNumber(input)
    setPhoneNumber(maskedNUmber)
    setNumber(maskedNUmber.replaceAll(' ', ''))
  }

  return (
    <div className='relative flex-1'>
      {/* span +62 */}
      <div className='absolute top-2 left-4'>
        <span className='font-semi-bold'>+62</span>
      </div>
      <input
        onChange={handleOnChange}
        value={phoneNumber}
        maxLength={startWithZero ? 16 : 15}
        id="phone-number"
        className='pl-14 py-2 rounded-full bg-white focus:outline-none w-full font-semi-bold'
      />
    </div>
  )
}

export { PhoneNumberInput }
