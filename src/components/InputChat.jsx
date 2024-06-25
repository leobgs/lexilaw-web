import images from 'assets/images'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { byteConversion } from 'utils/byteConversion'
import { useTranslation } from 'react-i18next'

export const InputChat = ({ onChange, className, onDisplayImage, disable }) => {
  const [displayImage, setDisplayImage] = useState()
  let maxRows = 4
  const [form, setForm] = useState({
    message: '',
    file: null,
  })
  const [error, setError] = useState('')
  const [rows, setRows] = useState(1)
  const { t } = useTranslation()

  useEffect(() => {
    onDisplayImage(displayImage)
  }, [displayImage])

  const handleKeyDown = (e) => {
    e.preventDefault()
    if (e.keyCode === 13) {
      if (e.shiftKey) {
        setRows(rows)
      } else {
        onSubmit()
      }
    } else if (e.keyCode === 8) {
      if (!form.message) {
        setRows(1)
      }
    }
  }

  const handleChat = (e) => {
    const prevRows = e.target.rows
    const currentRows = ~~(e.target.scrollHeight / 18)

    if (currentRows === prevRows) {
      e.target.rows = currentRows
    }

    if (currentRows >= maxRows) {
      e.target.rows = maxRows
      e.target.scrollTop = e.target.scrollHeight
    }

    setRows(currentRows < maxRows ? currentRows : maxRows)
    setForm({ ...form, message: e.target?.value })
  }

  const changeHandler = (e) => {
    let file = e.target.files[0]
    let url = URL.createObjectURL(file)
    let type = file.type.substring(0, file.type.lastIndexOf('/')).toUpperCase()

    if (file.size < 2000000) {
      setDisplayImage(url)
      setForm({
        ...form,
        file: e.target.files[0],
        caption: file.name,
        images: url,
        content_type: type === 'IMAGE' ? 'IMAGE' : 'DOCUMENT',
      })
    } else if (file.size > 2000000) {
      setError('Maksimum Ukuran File 2 Mb')
    }
    e.target.value = null
  }

  const handleDeleteImageDetail = () => {
    setForm({ ...form, file: null, content_type: 'TEXT', caption: null })
    setDisplayImage(null)
  }

  const onSubmit = () => {
    if (form.message) {
      onChange(form)
    }
    setRows(1)
    setDisplayImage(null)
    setForm({
      message: '',
      file: null,
    })
  }

  return (
    <>
      <div
        className={clsx(
          'border border-neutral-30 py-2 rounded-3xl bg-neutral-30 bg-opacity-35 pr-4',
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
              <div className='text-xs'>
                <p className='text-sm font-semi-bold text-secondary-base line-clamp-2'>
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
        <div className='gap-1 flex items-center justify-between '>
          <label htmlFor='file' className='w-1/12 ml-4 md:ml-0'>
            <div className='w-full flex justify-center'>
              <div className='bg-neutral-20 rounded-full md:-ml-4 -ml-3'>
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

          <div className='w-full text-xs flex justify-center'>
            <textarea
              className={`max-h-20 w-full focus:outline-none bg-neutral-30 bg-opacity-0 text-sm ${
                disable ? 'bg-neutral-10' : ''
              }`}
              autoFocus
              onChange={handleChat}
              onKeyUp={handleKeyDown}
              placeholder={`${
                disable
                  ? t('Wait_for_lexi_to_answer', { keyPrefix: 'input_chat' })
                  : t('ask_lexi', { keyPrefix: 'input_chat' })
              }`}
              rows={rows}
              value={form.message}
              style={{ resize: 'none' }}
              disabled={disable}
            />
          </div>
          <div
            onClick={() => onSubmit()}
            className='md:hidden bg-blue-dark px-2 py-1.5 rounded-3xl'
          >
            <img src={images.ic_send} alt='kirim' />
          </div>
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
