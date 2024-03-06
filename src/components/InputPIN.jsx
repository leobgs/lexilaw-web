import images from 'assets/images'
import clsx from 'clsx'
import { useState } from 'react'

export const InputPIN = ({
  className,
  label,
  placeholder,
  name,
  value,
  maxLength = 6,
  error,
  onChange,
  isNumberOnly,
}) => {
  const type = 'password'
  const [isPINVisible, setPINVisible] = useState(false)
  const [s_type, setType] = useState(type)

  const handleOnChange = (e) => {
    const { name, value } = e.target
    if (isNumberOnly) {
      if (/^\d{0,6}$/.test(e.target.value)) {
        onChange({ name: name, value: value })
      }
    } else {
      onChange({ name: name, value: value })
    }
  }

  const toggleShowPassword = () => {
    if (s_type === 'password' || !isPINVisible) {
      setType('text')
      setPINVisible(true)
    } else {
      setType(type)
      setPINVisible(false)
    }
  }

  const handleOnKeyDown = (e) => {
    if (
      !/[0-9A-Za-z!@#$%^&*()_+`='"{}\[\]:;<>,.?~\\/]/.test(e.key) &&
      e.key !== 'Backspace'
    ) {
      e.preventDefault()
    }
    if (e.target.value.length <= e.target.maxLength && e.key !== 'Backspace') {
      e.preventDefault()
    }
  }
  return (
    <div className={clsx('text-sm', className)}>
      {label && (
        <div className='font-semi-bold text-neutral-30 mb-2'>{label}</div>
      )}

      <div className='relative'>
        <img
          className={`absolute right-3 ${
            isPINVisible ? 'w-6 h-6 translate-y-1/2' : 'top-4 w-5 h-4'
          }`}
          src={isPINVisible ? images.ic_eye : images.ic_eye_strike}
          alt=''
          onClick={toggleShowPassword}
        />
        <input
          className='appearance-none focus:outline-none w-full rounded-md border border-neutral-20 bg-white focus:border-active pr-12 pl-3 py-3'
          type={type === 'password' ? s_type : type}
          minLength={maxLength}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={handleOnChange}
          autoComplete='off'
          onKeyDown={handleOnKeyDown}
        />
      </div>
      {error && (
        <div className='flex items-center mt-1 ml-1'>
          <img className='w-3 h-3' src={images.ic_invalid} alt='' />
          <div className='text-error text-xs ml-1'>{error}</div>
        </div>
      )}
    </div>
  )
}
