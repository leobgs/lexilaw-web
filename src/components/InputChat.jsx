import images from 'assets/images'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { byteConversion } from 'utils/byteConversion'
import { useTranslation } from 'react-i18next'
import AutoResizeTextarea from './AutoResizeTextArea'
import { useWindowWidth } from 'hooks/useWindowWidth'

export const InputChat = ({ onChange, className, disable }) => {
  const [displayImage, setDisplayImage] = useState()
  const [displayExt, setDisplayExt] = useState()
  const [form, setForm] = useState({
    message: '',
    file: null,
  })
  const [error, setError] = useState('')
  const { t } = useTranslation()
  const [inputValue, setInputValue] = useState('')

  const { windowWidth } = useWindowWidth()
  const isMobile = windowWidth <= 767

  useEffect(() => {
    setDisplayImage(null)
  }, [disable])

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleSubmitButton = (e) => {
    onChange({ ...form, message: e?.replace(/\n+$/, '').trim() })
    setInputValue('')
    setForm({
      message: '',
      file: null,
    })

    const url = window.location.href.split('#')[0]
    window.history.replaceState(null, null, url)
  }

  const changeHandler = (e) => {
    let file = e.target.files[0]
    let url = URL.createObjectURL(file)
    let type = file.type.substring(0, file.type.lastIndexOf('/')).toUpperCase()
    const extension = file.name.split('.').pop()
    const sizeInMB = file.size / 1024 / 1024
    const allowedExt = [
      'txt',
      'csv',
      'json',
      'xml',
      'md',
      'docx',
      'doc',
      'pdf',
      'rtf',
      'odt',
      'xlsx',
      'jpg',
      'jpeg',
      'png',
      'gif',
      'tiff',
      'bmp',
      'mp3',
      'wav',
      'aac',
      'ogg',
      'mp4',
      'avi',
      'mov',
      'mkv',
      'zip',
      'rar',
      'tar',
      '7z',
      'go',
      'java',
      'py',
      'cpp',
      'class',
      'exe',
      'pptx',
      'odp',
      'sql',
      'sqlite',
      'sqlite3',
    ]

    if (type && allowedExt.includes(extension)) {
      if (sizeInMB < 100) {
        setDisplayImage(url)
        setDisplayExt(extension.toUpperCase())
        setForm({
          ...form,
          file: e.target.files[0],
          caption: file.name,
          images: url,
          content_type: type,
        })
        setError(null)
      } else {
        setError('Ukuran file tidak bisa lebih dari 100 Mb')
        setTimeout(() => {
          setError(null)
        }, 3000)
      }
    } else {
      setError('Type file tidak didukung')
      setTimeout(() => {
        setError(null)
      }, 2000)
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
          'border border-neutral-30 py-2 rounded-3xl bg-[#FCFAF7] bg-opacity-35 pr-1.5 mt-2',
          className
        )}
      >
        {displayImage && (
          <div className="flex top-0 mx-2 mb-4">
            <div className="w-full md:w-1/3 bg-white rounded-l-xl rounded-br-xl border border-neutral-60 flex items-center shadow-md">
              {form.content_type === 'IMAGE' ? (
                <img
                  src={displayImage}
                  alt="displayed file"
                  className="w-12 h-12 aspect-auto m-2 rounded-lg shadow"
                />
              ) : (
                <div className="px-2 max-w-12 h-12 text-sm bg-secondary-base bg-opacity-90 text-white font-futura-bold items-center flex justify-center m-2 shadow rounded-sm">
                  {displayExt}
                </div>
              )}
              <div className="text-xs w-full">
                <p className="text-sm font-semi-bold text-secondary-base break-words size max-w-[60%]">
                  {form.caption}
                </p>
                <p className="text-neutral-40">
                  {byteConversion(form.file?.size)}
                </p>
              </div>
            </div>

            <img
              src={images.ic_close_black}
              alt="hapus gambar"
              className="-right-0 top-0 -ml-4 -mt-2 z-10 opacity-75 w-8 h-8 cursor-pointer"
              onClick={handleDeleteImageDetail}
            />
          </div>
        )}
        <div className="gap-1 flex items-center justify-between">
          <label htmlFor="file" className="md:ml-2 hover:cursor-pointer">
            <div className="w-full flex justify-center">
              <div className="bg-[#F8F5F1] rounded-full ml-1.5 md:ml-0">
                <img
                  src={images.ic_attach_black}
                  alt="attach"
                  className="w-3 h-4 hidden md:inline-block m-2 cursor-pointer"
                />
                <img
                  src={images.ic_attach_black}
                  alt="attach"
                  className="w-3 h-4 md:hidden m-2"
                />
              </div>
            </div>
            <input
              accept="*"
              type="file"
              name="file"
              onChange={changeHandler}
              style={{ display: 'none' }}
              id="file"
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
            className="max-h-20 w-full focus:outline-none bg-[#FCFAF7] md:bg-opacity-0 text-sm"
            placeholder={`${
              disable
                ? t('Wait_for_lexi_to_answer', { keyPrefix: 'input_chat' })
                : isMobile
                ? t('input_chat.ask_lexi_mobile')
                : t('ask_lexi', { keyPrefix: 'input_chat' })
            }`}
          />
        </div>
      </div>

      {error && (
        <div className="flex items-center mt-2 ml-5">
          <img className="w-3 h-3" src={images.ic_invalid} alt="" />
          <div className="text-error text-xs ml-1 text-error-base">{error}</div>
        </div>
      )}
    </>
  )
}
