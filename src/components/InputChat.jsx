import images from 'assets/images'
import clsx from 'clsx'
import { useState } from 'react'

export const InputChat = ({ onChange, className }) => {
  const [displayImage, setDisplayImage] = useState([])
  const [form, setForm] = useState({
    content_type: 'TEXT',
    text: '',
    file: null,
    caption: null,
  })
  const [error, setError] = useState('')

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 || e.key === 'Enter') {
      e.preventDefault()
      onChange(form)
    }
  }

  const handleChat = (e) => {
    setForm({ ...form, text: e.target?.value })
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

  return (
    <>
      <div
        className={clsx(
          'border border-neutral-30 py-2 rounded-3xl bg-neutral-30 bg-opacity-35 pr-4',
          className
        )}
      >
        <div className=' gap-1 flex items-center justify-between'>
          <label htmlFor='file' className='w-1/12 ml-4 md:ml-0'>
            <div className='w-full flex justify-center'>
              <div className='bg-neutral-20 p-3 rounded-full'>
                <img src={images.ic_attach_black} alt='' className='w-3 h-4' />
              </div>
            </div>
            <input
              accept='application/pdf,image/*'
              type='file'
              name='file'
              onChange={changeHandler}
              style={{ display: 'none' }}
              id='file'
            />
          </label>

          <div className='w-full text-xs max-h-20 flex justify-center'>
            <textarea
              className='max-h-20 w-full focus:outline-none bg-neutral-30 bg-opacity-0 text-base'
              autoFocus
              onChange={handleChat}
              onKeyDown={handleKeyDown}
              placeholder='tanyakan ke Lexi'
              rows={1}
              value={form.text}
              style={{ resize: 'none' }}
            />
          </div>
        </div>

        {displayImage && (
          <div className='flex top-0 mx-2'>
            {form.content_type === 'IMAGE' ? (
              <img
                src={displayImage}
                alt=''
                className='max-w-48 max-h-24 aspect-auto ml-4 mt-4 rounded-sm'
              />
            ) : (
              <div className='max-w-48 max-h-24 ml-4 mt-4 border border-neutral-10 rounded px-2'>
                <p className='text-sm font-semi-bold'>{form.caption}</p>
              </div>
            )}

            <img
              src={images.ic_close_black}
              alt='hapus gambar'
              className={`${
                form.content_type === 'IMAGE'
                  ? 'right-0 -ml-8 mt-4 z-10 opacity-75'
                  : ' -ml-4'
              } w-8 h-8 `}
              onClick={handleDeleteImageDetail}
            />
          </div>
        )}
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
