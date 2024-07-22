import images from 'assets/images'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { byteConversion } from 'utils/byteConversion'
import { useTranslation } from 'react-i18next'
import AutoResizeTextarea from './AutoResizeTextArea'

export const InputChat = ({ onChange, className, disable }) => {
  const [displayImage, setDisplayImage] = useState()
  const [form, setForm] = useState({
    message: '',
    file: null,
  })
  const [error, setError] = useState('')
  const { t } = useTranslation()
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    setDisplayImage(null)
  }, [disable])

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleSubmitButton = (e) => {
    onChange({ ...form, message: e?.replace(/\n+$/, '').trim() })
    setInputValue('')
  }

  const changeHandler = (e) => {
    let file = e.target.files[0]
    let url = URL.createObjectURL(file)
    let type = file.type.substring(0, file.type.lastIndexOf('/')).toUpperCase()

    setDisplayImage(url)
    setForm({
      ...form,
      file: e.target.files[0],
      caption: file.name,
      images: url,
      content_type: type === 'IMAGE' ? 'IMAGE' : 'DOCUMENT',
    })

    e.target.value = null
  }

  const handleDeleteImageDetail = () => {
    setForm({ ...form, file: null, content_type: 'TEXT', caption: null })
    setDisplayImage(null)
  }

  return (
    <>
      <div
        className={clsx(
          'border border-neutral-30 py-2 rounded-3xl bg-[#FCFAF7] bg-opacity-35 pr-4 mt-2',
          className
        )}
      >
        {displayImage && (
          <div className='flex top-0 mx-2 mb-4'>
            <div className='w-full md:w-1/3 bg-white rounded-l-xl rounded-br-xl border border-neutral-60 flex items-center shadow-md'>
              {form.content_type === 'IMAGE' ? (
                <img
                  src={displayImage}
                  alt='displayed file'
                  className='w-12 h-12 aspect-auto m-2 rounded-lg shadow'
                />
              ) : (
                <img
                  src={images.ic_pdf_thumbnail}
                  alt='displayed pdf'
                  className='w-12 h-12 aspect-auto m-2 rounded-sm shadow'
                />
              )}
              <div className='text-xs w-full'>
                <p className='text-sm font-semi-bold text-secondary-base break-words line-clamp-2 max-w-[60%]'>
                  {form.caption}
                </p>
                <p className='text-neutral-40'>
                  {byteConversion(form.file?.size)}
                </p>
              </div>
            </div>

            <img
              src={images.ic_close_black}
              alt='hapus gambar'
              className='-right-0 top-0 -ml-4 -mt-2 z-10 opacity-75 w-8 h-8'
              onClick={handleDeleteImageDetail}
            />
          </div>
        )}
        <div className='gap-1 flex items-center justify-between mx-2'>
          <label htmlFor='file' className='md:ml-0'>
            <div className='w-full flex justify-center'>
              <div className='bg-[#F8F5F1] rounded-full'>
                <img
                  src={images.ic_attach_black}
                  alt='attach'
                  className='w-3 h-4 hidden md:inline-block m-2'
                />
                <img
                  src={images.ic_attach_black_sm}
                  alt='attach'
                  className='w-3 h-4 md:hidden m-2'
                />
              </div>
            </div>
            <input
              accept='image/*, application/pdf'
              type='file'
              name='file'
              onChange={changeHandler}
              style={{ display: 'none' }}
              id='file'
            />
          </label>

          <AutoResizeTextarea
            value={inputValue}
            onChange={(e) => {
              handleInputChange(e)
              // handleSubmit(e)
            }}
            onSubmit={handleSubmitButton}
            disable={disable}
            className={`max-h-20 w-full focus:outline-none bg-[#FCFAF7] md:bg-opacity-0 text-sm ${
              disable ? 'bg-neutral-10' : ''
            }`}
            placeholder={`${
              disable
                ? t('Wait_for_lexi_to_answer', { keyPrefix: 'input_chat' })
                : t('ask_lexi', { keyPrefix: 'input_chat' })
            }`}
          />
        </div>
      </div>

      {error && (
        <div className='flex items-center mt-1 ml-1'>
          <img className='w-3 h-3' src={images.ic_invalid} alt='' />
          <div className='text-error text-xs ml-1'>{error}</div>
        </div>
      )}
    </>
  )
}
