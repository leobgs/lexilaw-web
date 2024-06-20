import images from 'assets/images'

import { InputChat, NavChat, Tooltips, QuestionCard } from 'components'
import { Toggle } from 'components/Toggle/Toggle'
import { API } from 'config/api'
import { StorageKey } from 'config/storage'
import { useGlobalContext } from 'hooks/context'
import { deleteData, getData } from 'hooks/useRequest'
import { notifyError } from 'hooks/useToas'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { LocalStorage } from 'utils'
import { DEFAULT_QUESTION, KOLEKSI_CHAT, RIWAYAT_OROLAN } from 'utils/dummy'
import { ThreadPage } from './ThreadPage'

export const Chat = () => {
  const { t } = useTranslation()
  const storage = new LocalStorage()
  const navigate = useNavigate()

  const {
    currentLanguage,
    collection,
    bookingLawyerPayload,
    bookingLawyerReducer,
    collectionReset,
    collectionSet,
  } = useGlobalContext()
  const { uuid } = useParams()
  const queryClient = useQueryClient()
  const [isHeader, setIsHeader] = useState(true)
  const [isDisplayImage, setDisplayImage] = useState()
  const [disableInput, setDisableInput] = useState(false)
  const [dataMessage, setMessage] = useState([])
  const [defaultQuestion, setDefaultQuestion] = useState([])
  const [headerText, setHeaderText] = useState('Obrolan Baru')
  const [userDetail, setUserDetail] = useState({
    first_name: '-',
    last_name: '-',
    image_url: '',
  })
  const [threadMessageId, setThreadMessageId] = useState({
    thread_id: '',
    message_id: '',
  })

  useEffect(() => {
    switch (true) {
      case collection.clickColection:
        return onClickColection(collection.uuid)
      default:
        break
    }
  }, [collection])

  useEffect(() => {
    dataMessage?.forEach((item) => {
      item.data?.forEach((itm) => {
        if (!itm.value) {
          if (itm.uuid === uuid) {
            itm.isActive = true
          } else {
            itm.isActive = false
          }
        } else if (itm.value) {
          itm.childs?.forEach((itms) => {
            if (itms.uuid === uuid) {
              itms.isActive = true
            } else {
              itms.isActive = false
            }
          })
        }
      })
    })

    setMessage([...dataMessage])
  }, [uuid])

  useQuery(['suggestion_list'], () => getData(API.SUGGESTION_LIST), {
    onSettled: (datas) => {
      if (datas?.status === 'Success') {
        const { data } = datas

        setDefaultQuestion(data)
      } else {
        setDefaultQuestion(DEFAULT_QUESTION)
      }
    },
  })

  const { mutate: onLogout } = useMutation(() => deleteData(API.LOGOUT), {
    onSettled: (data) => {
      if (data?.status === 'Success') {
        storage.remove(StorageKey.ACCESS_TOKEN)
        storage.remove(StorageKey.IS_LOGIN)
        navigate('/auth')
      } else {
        notifyError(data?.message)
      }
    },
  })

  useQuery(['newest_thread'], () => getData(API.THREAD_LIST), {
    onSettled: (datas) => {
      if (datas?.status === 'Success') {
        const { data } = datas
        let texts = 'Obrolan Baru'

        const previousData =
          data?.filter((item) => item.moment === 'Previous') || []
        const currentData =
          data?.filter((item) => item.moment === 'Current') || []
        let activeCollection = currentData[0]

        if (bookingLawyerPayload?.thread_uuid) {
          activeCollection = currentData.find(
            (item) => item.uuid === bookingLawyerPayload.thread_uuid
          )
          if (!activeCollection) {
            activeCollection =
              previousData.find(
                (item) => item.uuid === bookingLawyerPayload.thread_uuid
              ) || currentData[0]
          }
          bookingLawyerReducer(['thread_uuid'], null)
        }

        const newMessage = [
          { type: 'koleksi', data: KOLEKSI_CHAT },
          { type: 'terkini', data: currentData },
          { type: 'riwayat', data: [...previousData, ...RIWAYAT_OROLAN] }, // ...RIWAYAT_OROLAN nanti dihapus kalo udh full api
        ]

        newMessage?.forEach((item) => {
          item.data?.forEach((itm) => {
            if (!itm.value) {
              if (itm.uuid === uuid) {
                itm.isActive = true
              } else {
                itm.isActive = false
              }
            } else if (itm.value) {
              itm.childs?.forEach((itms) => {
                if (itms.uuid === uuid) {
                  itms.isActive = true
                } else {
                  itms.isActive = false
                }
              })
            }
          })
        })

        setMessage([...newMessage])
        setHeaderText(texts)

        if (threadMessageId.thread_id && !uuid) {
          const selectedThread = data?.find(
            (item) => item.open_thread_id === threadMessageId.thread_id
          )
          setHeaderText(selectedThread.title)
          navigate(`/thread/${selectedThread?.uuid}`, {
            state: threadMessageId,
          })
          setIsHeader(false)
          setDisableInput(false)
          collectionSet(selectedThread)
        } else if (!threadMessageId.thread_id && uuid) {
          const selectedThread = data?.find((item) => item.uuid === uuid)
          onClickColection(uuid)
          collectionSet(selectedThread)
        }
      } else {
        notifyError(datas?.message)
      }
    },
  })

  const { mutate: sendMessage } = useMutation(
    (form) => getData(API.MESSAGE_SEND, form),
    {
      onSettled: (datas) => {
        if (datas?.status === 'Success') {
          const { data } = datas
          setThreadMessageId({
            thread_id: data?.thread_id,
            message_id: data?.message_id,
          })
          queryClient.invalidateQueries('newest_thread')
        } else {
          notifyError(datas?.message)
        }
      },
    }
  )

  useQuery(['user'], () => getData(API.USER_DETAIL), {
    onSettled: (datas) => {
      if (datas?.status === 'Success') {
        setUserDetail(datas?.data)
      } else {
        notifyError(datas?.message)
      }
    },
  })

  const handleAddChat = (e) => {
    const dataMessage = {
      message: e.message,
      thread_id: collection.thread_id,
      document: e.file,
    }
    setHeaderText(e?.message)
    const bodyFormData = new FormData()
    for (const [key, value] of Object.entries(dataMessage)) {
      bodyFormData.append(key, value)
    }
    sendMessage(bodyFormData)
    setDisableInput(true)
  }

  const onClickColection = (id) => {
    navigate(`/thread/${id}`)
    setThreadMessageId({ message_id: '', thread_id: '' })
    let texts = 'Obrolan Baru'

    dataMessage?.forEach((item) => {
      if (item.type === 'koleksi') {
        item.data.forEach((dataItem) => {
          if (dataItem.childs) {
            dataItem.childs.forEach((child) => {
              if (child.uuid === id) {
                texts = child.title ?? child.message
              }
            })
          }
        })
      } else {
        item.data.forEach((dataItem) => {
          if (dataItem.title) {
            if (dataItem.uuid === id) {
              texts = dataItem.title
            }
          }
        })
      }
    })

    setHeaderText(texts)
    setIsHeader(false)
  }

  const onEdit = (e) => {
    dataMessage?.forEach((item) => {
      item.data?.forEach((itm) => {
        if (itm.isActive) {
          itm.title = e
        }
      })
    })
    setMessage([...dataMessage])
  }

  const handleOnExpand = (id) => {
    dataMessage?.forEach((item) => {
      if (item.type === 'koleksi') {
        item.data?.forEach((items) => {
          if (items.uuid === id) {
            items.isExpand = !items.isExpand
          } else {
            items.isExpand = false
          }
        })
      }
    })
    setMessage([...dataMessage])
  }

  return (
    <div className='bg-primary-base w-full h-screen flex flex-col'>
      <div className='md:px-4 md:flex md:justify-between md:mt-12 md:gap-4 md:mb-2 w-full h-[calc(100%-56px)] flex-1'>
        <NavChat
          onHeaderClick={() => {
            setIsHeader(true)
            collectionReset()
            setHeaderText('Obrolan Baru')
            navigate('/')
          }}
          onClickNav={(item) => {
            onClickColection(item.uuid)
            console.log('clicked')
          }}
          dataLatest={dataMessage}
          onEdit={(e) => onEdit(e)}
          headerText={headerText}
          userDetail={userDetail}
          onExpand={(e) => handleOnExpand(e)}
        />

        <main className='md:h-full p-4 md:rounded-xl md:w-10/12 md:bg-white border border-neutral-20 border-opacity-80 h-[calc(100%-76px)]'>
          <header className='hidden justify-between items-center md:border-b md:border-b-neutral-30 md:flex md:pb-4 md:-mx-4 md:px-8'>
            <div className='flex gap-2'>
              <img src={images.ic_obrolan} alt='obrolan' />
              <div className='font-futura-bold'>{headerText}</div>
            </div>

            <div className='flex items-center gap-2'>
              <p className='font-bold'>
                {userDetail.first_name} {userDetail.last_name}
              </p>
              <img
                className='size-10 rounded-full ring-1 ring-[#C9BBA0] drop-shadow-[2px_2px_2px_rgba(240, 237, 232, 1)]'
                src={userDetail.image_url}
                alt='profile'
                data-tooltip-id='profile-tooltip'
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null
                  currentTarget.src = images.ic_avatar_placeholder
                }}
              />
            </div>

            <Tooltips
              idToolTips='profile-tooltip'
              tooltipEffect='solid'
              tooltipPlace='bottom-end'
              className='bg-secondary-base hidden md:inline-block z-50'
              children={
                <div className='text-neutral-40 -mx-4'>
                  <div className='bg-blue-dark w-full h-2 -mt-2 rounded-t-md' />
                  <div className='px-4 my-2 text-xxs'>
                    {t('main_menu', {
                      keyPrefix: 'chat.profile_menu',
                    })}
                  </div>
                  <div className='border-b border-b-neutral-20 text-xs font-semi-bold'>
                    <NavLink
                      to='account'
                      className='px-4 mb-1 text-black-darker'
                    >
                      {t('my_account', {
                        keyPrefix: 'chat.profile_option',
                      })}
                    </NavLink>
                    <div className='flex justify-between items-center  mb-2'>
                      <div
                        className='px-4 text-black-darker'
                        onClick={() => navigate('/my-lawyer')}
                      >
                        {t('my_lawyer', {
                          keyPrefix: 'chat.profile_option',
                        })}
                      </div>
                    </div>
                  </div>
                  <div className='px-4 mb-2 mt-2 text-xxs'>
                    {t('connected', {
                      keyPrefix: 'chat.profile_menu',
                    })}
                  </div>
                  <div className='flex justify-between items-center border-b border-b-neutral-20 pr-4 pb-2'>
                    <div className='px-4 text-black-darker text-sm'>
                      {t('wa_activation', {
                        keyPrefix: 'chat.profile_option',
                      })}
                    </div>
                    <img
                      src={images.ic_arrow_cornering}
                      alt='arrow'
                      className='h-2.5 w-2.5'
                    />
                  </div>

                  <div className='px-4 my-2 text-xxs'>
                    {t('configure', {
                      keyPrefix: 'chat.profile_menu',
                    })}
                  </div>
                  <div className='mb-4 flex justify-center ml-4 items-start'>
                    <div className='text-black-darker text-sm w-full'>
                      {t('menu_language', {
                        keyPrefix: 'chat.profile_option',
                      })}{' '}
                      {currentLanguage === 'id' ? '(ID)' : '(EN)'}
                    </div>
                    <div className='mr-1'>
                      <Toggle
                        labelClassName='!w-[50px]'
                        className='!my-0'
                        hideText={true}
                      />
                    </div>
                  </div>

                  <div
                    className='font-semi-bold text-error-base px-6 bg-error-lighter bg-opacity-10 py-2 -mb-2.5 rounded-b-lg text-sm'
                    onClick={onLogout}
                  >
                    Logout
                  </div>
                </div>
              }
            />
          </header>

          <div className='md:h-[calc(100%-56px)]'>
            {isHeader ? (
              <div className='relative flex h-full flex-col select-text mb-2'>
                <QuestionCard
                  data={defaultQuestion}
                  onClick={(e) => handleAddChat(e)}
                  className={`md:absolute ${
                    isDisplayImage ? 'md:top-[20%]' : 'md:top-1/4'
                  }`}
                />

                <InputChat
                  onChange={(e) => handleAddChat(e)}
                  onDisplayImage={(e) => setDisplayImage(e)}
                  className='w-full md:w-3/4 bottom-0 absolute'
                  disable={disableInput}
                />
              </div>
            ) : (
              <ThreadPage />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
