import images from 'assets/images'
import { ChatRespond } from './ChatRespond'
import Markdown from 'markdown-to-jsx'
import { useQuery, useQueryClient } from 'react-query'
import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { Button } from './Button/Button'
import { useTranslation } from 'react-i18next'
import './ChatCard.scss'
import { isValidJson } from 'utils/isJsonChec'
import { cleanTextFn } from 'utils/cleanText'
import { isConsultFn } from 'utils/isConsult'
import { getData } from 'hooks/useRequest'
import { API } from 'config/api'
import { transformMarkdown } from 'utils/transformMarkdown'
import { MyDocMD } from './MyDocMD'
import { copyToClipboard } from 'utils'

export const ChatCard = ({
  item,
  index,
  onClickChangeLangStyle,
  length,
  onLike = (e) => {},
  onDislike = (e) => {},
  className,
  disableInput,
}) => {
  const queryClient = useQueryClient()
  const cachedData = queryClient.getQueryData('user')
  const [responseText, setResponseText] = useState('')
  const { t } = useTranslation()
  const [dataLawyer, setDataLawyer] = useState([])
  const [fileCategory, setFileCategory] = useState('')
  const [displayExt, setDisplayExt] = useState()
  const [consult, setConsult] = useState(false)
  const [copyText, setCopyText] = useState('')

  const { data: statusData, isFetching } = useQuery(
    ['available_schedules'],
    () =>
      getData(
        API.AVAILABLE_SCHEDULES +
          `/${item.lawyer_uuid}/${item.thread_uuid}?page=1&limit=5`
      ),
    {
      enabled: Boolean(item?.lawyer_uuid),
    }
  )

  const boxRef = useRef(null)
  let angle = useRef(0).current

  useEffect(() => {
    if (item.filename) {
      const extension = item.filename.split('.').pop().toLowerCase()

      const imageExtensions = ['png', 'jpeg', 'jpg']
      const documentExtensions = ['pdf', 'xls', 'doc', 'xlsx', 'docx']

      if (imageExtensions.includes(extension)) {
        setFileCategory('IMAGE')
      } else if (documentExtensions.includes(extension)) {
        setFileCategory('DOKUMEN')
        setDisplayExt(extension.toUpperCase())
      } else {
        setDisplayExt(extension.toUpperCase())
        setFileCategory('UNKNOWN')
      }
    }
  }, [item.filename])

  useEffect(() => {
    let cleanText = cleanTextFn(item?.message)
    const isConsult = isConsultFn(item?.message)
    setConsult(isConsult)
    cleanText = cleanText?.replace(/consult\s*=\s*true/gi, '')

    const { copiedText, responseText } = transformMarkdown(cleanText)
    cleanText = responseText

    if (copiedText) {
      setCopyText(copiedText)
    }

    const possibleJson = item.message
      .substring(item.message.lastIndexOf('\n') + 1)
      .trim()
    const stringBeforeJson = item.message
      .substring(0, item.message.lastIndexOf('\n'))
      .trim()

    if (isValidJson(possibleJson)) {
      const parsedLawyers = JSON.parse(possibleJson)
      setDataLawyer(parsedLawyers)

      // Gabungkan kembali teks dan hasil parsing JSON
      setResponseText(
        `${stringBeforeJson}\n\n${parsedLawyers.length !== 0 ? '' : ''}`
      )
    } else if (
      cleanText === '' &&
      statusData?.message === 'Success get data' &&
      !isFetching
    ) {
      setResponseText(
        'Booking berhasil kamu sudah bersama pengacara pilhanmu, cek Pengacara Saya pada menu kanan atas untuk melihat dan meng-kontak pengacara kamu. Kamu dapat melakukan diskusi selama 1 jam bersama pengacaramu. Opsi schedule berikut hanya berlaku 16 jam setelah kamu melakukan booking.'
      )
    } else if (
      cleanText === '' &&
      statusData?.message === 'Done' &&
      !isFetching
    ) {
      setResponseText('Pemesanan telah selesai')
    } else {
      setResponseText(cleanText)
    }
  }, [item.message, statusData?.message, isFetching])

  useEffect(() => {
    const animate = () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      angle = (angle + 1) % 360
      boxRef.current?.style.setProperty('--angle', `${angle}deg`)
      requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animate)
  }, [angle])

  return (
    <>
      {item.from_display === 'SYSTEM' && item.type === 'loading' ? (
        <div
          className={clsx(
            'card-animated-chat ml-4 mb-2 pt-1 w-1/3 select-none'
          )}
          ref={boxRef}
        >
          <div className="bg-white rounded-lg flex gap-2 px-4">
            <img
              src={
                item.from_display === 'SYSTEM'
                  ? images.ic_profile_lexi
                  : images.ic_thumbnail_profile
              }
              alt="profile"
              className={`object-contain ${
                item.from_display === 'SYSTEM' ? '' : 'h-12 w-12'
              } select-none`}
            />

            <div className="">
              <div className="font-futura-bold text-secondary-base text-sm select-none">
                {item.from_display === 'SYSTEM' ? (
                  <div className="flex items-center gap-0.5">
                    <p>{'Lexi'}</p>
                    <p className="bg-secondary-base rounded-md text-white px-1 text-xs select-none">
                      AI
                    </p>
                  </div>
                ) : (
                  'You'
                )}
              </div>
              <div className="flex gap-2 mt-2">
                <div className="h-2 w-2 animate-pulse bg-black-lightest bg-opacity-30" />
                <div className="h-2 w-2 animate-pulse bg-black-lightest bg-opacity-30" />
                <div className="h-2 w-2 animate-pulse bg-black-lightest bg-opacity-30" />
              </div>
            </div>
          </div>
        </div>
      ) : item.from_display === 'SYSTEM' && item.type === 'error' ? (
        <div className="md:w-3/4">
          <div
            id={item?.uuid}
            className={clsx(
              `flex gap-2 first:mt-4 mb-4 items-start py-2 px-4 bg-[#FFF5DB] rounded-3xl border border-[#FF9D0B] md:mx-4 md:rounded-xl`,
              className
            )}
          >
            <img
              src={images.ic_profile_lexi}
              alt="profile"
              className={`object-contain ${
                item.from_display === 'SYSTEM' ? 'h-12 w-12' : ''
              } select-none`}
            />
            <div className="w-full">
              <div className="font-futura-bold text-secondary-base text-sm select-none">
                <div className="flex items-center gap-0.5">
                  <p>{'Lexi'}</p>
                  <p className="bg-secondary-base rounded-md text-white px-1 text-xs select-none">
                    AI
                  </p>
                </div>
              </div>
              <div className="chat-wrap text-sm">{responseText}</div>
            </div>
          </div>

          {item.type !== 'loading' && (
            <Button
              className={
                'btn-secondary-hover w-1/6 mt-6 mb-[1rem] rounded-full font-medium mx-auto'
              }
              label="Retry"
              // onClick={}
            />
          )}
        </div>
      ) : item.from_display === 'SYSTEM' ? (
        <div
          id={item?.uuid}
          className={clsx(
            `flex gap-2 first:mt-4 mb-4 items-start py-2 px-4 md:mx-4 bg-neutral-70 rounded-3xl md:rounded-xl border border-neutral-70`,
            className
          )}
        >
          <img
            src={images.ic_profile_lexi}
            alt="profile"
            className={`object-contain ${
              item.from_display === 'SYSTEM' ? 'h-12 w-12 select-none' : ''
            }`}
          />
          <div className="w-full">
            <div className="font-futura-bold text-secondary-base text-sm select-none">
              <div className="flex items-center gap-0.5">
                <p>{'Lexi'}</p>
                <p className="bg-secondary-base rounded-md text-white px-1 text-xs select-none">
                  AI
                </p>
              </div>
            </div>

            <div className="chat-wrap text-sm-chat style-card-chat">
              <Markdown
                options={{
                  wrapper: 'main',
                  forceWrapper: true,
                  overrides: {
                    mydiv: {
                      component: MyDocMD,
                      props: {
                        handleClick: () => {
                          copyToClipboard({
                            text: copyText,
                            title: t('copy_doc'),
                          })
                        },
                      },
                    },
                  },
                }}
              >
                {responseText}
              </Markdown>
            </div>

            {item.url_file && (
              <>
                <p className="text-xs mt-2 mb-0.5 text-neutral-40 hidden md:inline-block">
                  {t('attached', { keyPrefix: 'chat_respond' })}
                </p>
                <div className="w-1/2 md:w-1/3 bg-secondary-lightest bg-opacity-60 rounded-xl border border-secondary-lighter flex items-center mt-1 md:mt-0">
                  {fileCategory === 'IMAGE' ? (
                    <img
                      src={item.url_file}
                      alt="displayed file"
                      className="w-12 h-12 aspect-auto m-2 rounded-lg shadow"
                    />
                  ) : (
                    <img
                      src={images.ic_pdf_thumbnail}
                      alt="displayed pdf"
                      className="w-12 h-12 aspect-auto m-2 rounded-sm shadow"
                    />
                  )}

                  <div className="text-xs w-full">
                    <p className="text-sm font-semi-bold text-secondary-base break-words w-full select-none">
                      {item.caption}
                    </p>
                    {/* <p className='text-neutral-40'>
                      {byteConversion(item.file?.size)}
                    </p> */}
                  </div>
                </div>
              </>
            )}

            {item.type !== 'loading' && (
              <ChatRespond
                item={item}
                index={index}
                onClickChangeLangStyle={(e) => onClickChangeLangStyle(e)}
                isLast={index === length - 1}
                onLike={() => onLike(1)}
                onDislike={() => onDislike(0)}
                disable={disableInput}
                isButtonYes={consult}
              />
            )}
          </div>
        </div>
      ) : (
        <div>
          <div
            id={item?.uuid}
            className={clsx(
              'flex gap-2 first:mt-4 mb-4 items-start py-2 px-4 w-10/12 md:w-3/4 md:mx-4 rounded-3xl md:rounded-x',
              className
            )}
          >
            <img
              src={
                cachedData?.data?.image_url
                  ? cachedData?.data?.image_url
                  : images.ic_avatar_placeholder
              }
              alt="profile"
              className={`object-contain rounded-full p-1 h-12 w-12 select-none`}
            />

            <div className="w-full">
              <div className="font-futura-bold text-secondary-base text-sm select-none">
                {'You'}
              </div>

              <div className="whitespace-pre-line text-sm">{item.message}</div>

              {item.url_file && (
                <>
                  <p className="text-xs mt-2 mb-0.5 text-neutral-40 hidden md:inline-block">
                    {t('attached', { keyPrefix: 'chat_respond' })}
                  </p>
                  <div className="w-10/12 xs:w-8/12 md:w-3/4 lg:w-1/3 bg-secondary-lightest bg-opacity-60 rounded-xl border border-secondary-lighter flex items-center mt-1 md:mt-0">
                    {fileCategory === 'IMAGE' ? (
                      <img
                        src={item.url_file}
                        alt="displayed file"
                        className="w-12 h-12 aspect-auto m-2 rounded-lg shadow"
                      />
                    ) : (
                      <div className="px-2 max-w-12 h-12 text-sm bg-secondary-base bg-opacity-90 text-white font-futura-bold items-center flex justify-center m-2 shadow rounded-sm">
                        {displayExt}
                      </div>
                    )}
                    {/* <div className='text-xs'> */}
                    <p className="text-sm font-semi-bold text-secondary-base break-words line-clamp-2 max-w-[60%] style-card select-none">
                      {item.filename}
                    </p>
                    {/* <p className='text-neutral-40'>
                        {byteConversion(item.file?.size)}
                      </p> */}
                    {/* </div> */}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
