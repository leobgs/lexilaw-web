import images from 'assets/images'
import clsx from 'clsx'
import React, { useState, useRef, useEffect } from 'react'

const AutoResizeTextarea = ({
  value,
  onChange,
  onSubmit,
  placeholder,
  className,
  disable,
}) => {
  const textareaRef = useRef(null)
  const [textareaValue, setTextareaValue] = useState(value || '')
  const [form, setForm] = useState()

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [textareaValue])

  const handleChange = (e) => {
    setTextareaValue(e.target.value)

    if (onChange) {
      onChange(e)
    }

    setForm(e.target.value)
  }

  return (
    <div
      className={clsx(
        'w-full text-xs flex justify-center items-center',
        className
      )}
    >
      <textarea
        ref={textareaRef}
        value={textareaValue}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disable}
        className={`max-h-20 w-full focus:outline-none md:bg-opacity-0 bg-[#FCFAF7] text-sm ${
          disable ? 'md:bg-neutral-10' : ''
        }`}
        rows={1}
        style={{
          width: '100%',
          resize: 'none',
          overflow: 'hidden',
          minHeight: '30px',
          boxSizing: 'border-box',
          padding: '8px',
          fontSize: '14px',
        }}
      />
      <div
        onClick={() => {
          if (textareaValue.trim() !== '') {
            onSubmit(form)
            setTimeout(() => {
              setTextareaValue('')
              setForm('')
            }, 600)
          }
        }}
        className='bg-blue-dark px-4 py-1.5 rounded-3xl flex items-center h-8 w-[52px]'
      >
        <img src={images.ic_send} alt='kirim' className='w-[22.5px] h-[18px]' />
      </div>
    </div>
  )
}

export default AutoResizeTextarea
