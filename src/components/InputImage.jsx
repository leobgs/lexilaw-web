import React, { useRef, useState } from 'react'
import images from 'assets/images'
import { Button } from 'components'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

export default function InputImage({ className, name, image, onImageSelect }) {
  const { t } = useTranslation()
  const fileInputRef = useRef(null)
  const [error, setError] = useState('')
  const handleImageSelect = (event) => {
    const file = event.target.files[0]

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // Max size: 5MB
        setError('File size exceeds the limit of 5MB.')
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const image = new Image()
        image.src = e.target.result

        image.onload = () => {
          if (image.width < 200 || image.height < 200) {
            setError('Image dimensions must be at least 200px x 200px.')
            onImageSelect(null)
          } else {
            setError('')
            onImageSelect(e.target.result)
          }
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleClick = () => {
    fileInputRef.current.click()
  }

  return (
    <div
      className={clsx(
        'text-sm flex flex-wrap items-center justify-stretch',
        className
      )}
    >
      <div className='flex w-full items-center md:items-start'>
        <img
          className={`h-16 w-16 flex-none rounded-full size-16 ${
            image === null ? '' : 'ring-[1.6px] ring-[#2E2C2B]'
          }`}
          src={image === null ? images.ic_avatar_placeholder : image}
          alt=''
          style={{ objectFit: 'cover' }}
        />
        <div className='pl-2'>
          <h3 className='font-medium text-base md:text-sm'>
            {t('image_picker_hint', { keyPrefix: 'auth.register' })}
          </h3>

          <input
            type='file'
            accept='image/*'
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleImageSelect}
            name={name}
          />

          <div className='hidden md:block'>
            {error ? (
              <InvalidButton
                onClick={() => {
                  setError('')
                }}
                textError={error}
              />
            ) : (
              <UploadButton onClick={handleClick} className='pt-2' />
            )}
          </div>
        </div>
      </div>

      <div className='block md:hidden'>
        {error ? (
          <InvalidButton
            onClick={() => {
              setError('')
            }}
            textError={error}
          />
        ) : (
          <UploadButton onClick={handleClick} className='pt-2' />
        )}
      </div>
    </div>
  )
}

function UploadButton({ onClick, className }) {
  const { t } = useTranslation()
  return (
    <div className={className}>
      <Button
        label={t('upload', { keyPrefix: 'common' })}
        onClick={onClick}
        iconRight={images.ic_upload}
        iconClassName={'object-scale-down w-4 h-4 p-1'}
        className={
          'h-8 md:h-7 w-[83px] rounded-full bg-[#DCE7FF] sm:font-bold md:font-regular text-base md:text-xs ring-1 ring-[#032E84]'
        }
      />
    </div>
  )
}

const InvalidButton = ({ onClick, textError }) => {
  const { t } = useTranslation()
  return (
    <>
      <div className='h-8 md:h-7w-full flex  items-center pt-2'>
        <div
          className='flex items-center rounded-md px-2 py-1 bg-[#FFF5DB] ring-2 ring-[#FF9D0B]'
          onClick={onClick}
        >
          {textError ? (
            <p className='inline font-regular text-sm text-[#DB0000]'>
              {textError}
            </p>
          ) : (
            <p className='inline font-regular text-sm text-[#DB0000]'>
              {t('image_error', { keyPrefix: 'auth.register.error_messages' })}
            </p>
          )}
          <img
            className='inline size-[13px]'
            src={images.ic_close_red}
            alt='close'
          />
        </div>
      </div>
    </>
  )
}
