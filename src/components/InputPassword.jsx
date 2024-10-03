import { useState } from 'react'
import images from 'assets/images'
import clsx from 'clsx'

export const InputPassword = ({
  className,
  label,
  placeholder,
  name,
  value,
  maxLength = 6,
  inputClassName,
  error,
  onChange,
}) => {
  const type = 'password'
  const [isPINVisible, setPINVisible] = useState(false)
  const [s_type, setType] = useState(type)

  const handleOnChange = (e) => {
    const { name, value } = e.target
    // if (/^\d{0,6}$/.test(e.target.value)) {
    onChange({ name: name, value: value })
    // }
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
  }

  console.log(s_type, value.length)

  return (
    <div className={clsx('text-sm', className)}>
      {label && (
        <div className="font-semi-bold text-neutral-30 mb-2">{label}</div>
      )}
      <div className="relative">
        <input
          className={`!rounded-full border-2 bg-gray-50 !border-gray-100 focus:outline-none focus:ring-none w-full bg-neutral-0 placeholder:text-sm ${
            inputClassName ? inputClassName : ''
          } ${error ? '!border-[#FF7878] !bg-[#FFF5DB] text-[#DB0000]' : ''} ${
            s_type === 'password'
              ? value?.length === 0
                ? 'text-sm px-4 py-2.5'
                : 'text-xl px-4 py-1.5'
              : 'text-sm px-4 py-2.5'
          }`}
          type={type === 'password' ? s_type : type}
          minLength={maxLength}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={handleOnChange}
          autoComplete="off"
          onKeyDown={handleOnKeyDown}
        />
        <img
          className={`absolute translate-y-1/2 right-4 cursor-pointer bottom-1/2 ${
            isPINVisible ? 'w-5 h-4' : 'w-4 h-3'
          }`}
          src={isPINVisible ? images.ic_eye : images.ic_eye_strike}
          alt=""
          onClick={toggleShowPassword}
        />
      </div>
      {error && (
        <div className="flex items-center mt-1 ml-1">
          <img className="w-3 h-3" src={images.ic_invalid} alt="" />
          <div className="text-error-base text-xs ml-1">{error}</div>
        </div>
      )}
    </div>
  )
}
