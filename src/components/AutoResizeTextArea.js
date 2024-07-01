import images from 'assets/images'
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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      const trimmedValue = textareaValue.replace(/\n/g, ' ').trim()
      if (trimmedValue.trim() !== '') {
        if (onChange) {
          e.target.value = trimmedValue
          onChange(e)
        }
        setTimeout(() => {
          setTextareaValue('')
        }, 100)
      }
    }
  }

  return (
    <div className='w-full text-xs flex justify-center items-center'>
      <textarea
        ref={textareaRef}
        value={textareaValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disable}
        className={`max-h-20 w-full focus:outline-none bg-opacity-0 text-sm ${
          disable ? 'bg-neutral-10' : ''
        }`}
        rows={1}
        style={{
          width: '100%',
          resize: 'none',
          overflow: 'hidden',
          minHeight: '30px',
          boxSizing: 'border-box',
          padding: '8px',
          fontSize: '16px',
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
        className='md:hidden bg-blue-dark px-2 py-1.5 rounded-3xl flex items-center h-8'
      >
        <img src={images.ic_send} alt='kirim' />
      </div>
    </div>
  )
}

export default AutoResizeTextarea
