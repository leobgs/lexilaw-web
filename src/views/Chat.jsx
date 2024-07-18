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
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom'
import { LocalStorage } from 'utils'
import { DEFAULT_QUESTION, RIWAYAT_OROLAN } from 'utils/dummy'
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
  const [dataThreadList, setThreadList] = useState([])
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
  const { openAlert, closeAlert } = useGlobalContext()
  const location = useLocation()

  useEffect(() => {
    if (location?.state?.isScheduled) {
      openAlert({
        title: t('success', { keyPrefix: 'schedule' }),
        icon: images.ic_tick,
      })
      let timeOut = setTimeout(() => {
        closeAlert({ isConfirm: false, showLoading: false })
      }, 2000)
      navigate('/')
      return () => clearTimeout(timeOut)
    }
  }, [])

  useEffect(() => {
    let texts = ''
    switch (true) {
      case collection.clickColection:
        return onClickColection(collection.uuid)
      default:
        break
    }

    if (collection.uuid) {
      dataThreadList?.forEach((item) => {
        if (item.type === 'koleksi') {
          item.data?.forEach((dataItem) => {
            if (dataItem.childs) {
              dataItem.childs.forEach((child) => {
                if (child.uuid === collection.uuid) {
                  texts = child.title ?? child.message
                }
              })
            }
          })
        } else {
          item.data?.forEach((dataItem) => {
            if (dataItem.title) {
              if (dataItem.uuid === collection.uuid) {
                texts = dataItem.title
              }
            }
          })
        }
      })

      setHeaderText(texts)
    }
  }, [collection])

  useEffect(() => {
    dataThreadList?.forEach((item) => {
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

    setThreadList([...dataThreadList])
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

  useQuery(['newest_thread'], () => getData(`${API.THREAD_LIST}?limit=100`), {
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

        const isThereAnyCollection = dataThreadList?.find(
          (item) => item.type === 'koleksi'
        )

        const newMessage = [
          {
            type: 'koleksi',
            data:
              isThereAnyCollection?.data?.length !== 0
                ? isThereAnyCollection?.data
                : [],
          },
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

        setThreadList([...newMessage])
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

  useQuery(['collection'], () => getData(API.COLLECTION_LIST), {
    onSettled: (datas) => {
      if (datas?.status === 'Success') {
        const { data } = datas
        dataThreadList?.forEach((item) => {
          if (item.type === 'koleksi') {
            item.data = data
          }
        })
      } else {
        notifyError(datas?.message)
      }
    },
    enabled: dataThreadList?.length !== 0,
  })

  const handleAddChat = (e) => {
    const dataMessage = {
      message: e.message,
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

    dataThreadList?.forEach((item) => {
      if (item.type === 'koleksi') {
        item.data?.forEach((dataItem) => {
          if (dataItem.childs) {
            dataItem.childs.forEach((child) => {
              if (child.uuid === id) {
                texts = child.title ?? child.message
              }
            })
          }
        })
      } else {
        item.data?.forEach((dataItem) => {
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
    dataThreadList?.forEach((item) => {
      item.data?.forEach((itm) => {
        if (itm.isActive) {
          itm.title = e
        }
      })
    })
    setThreadList([...dataThreadList])
  }

  const handleOnExpand = (id) => {
    dataThreadList?.forEach((item) => {
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
    setThreadList([...dataThreadList])
  }

  return (
    <div className='bg-primary-base w-full h-screen flex flex-col'>
      <div className='md:px-4 md:flex md:justify-between md:mt-12 md:gap-4 md:mb-2 w-full h-[calc(100%-56px)] flex-1'>
        <NavChat
          onDeleted={() => {
            setIsHeader(true)
            collectionReset()
            setHeaderText('Obrolan Baru')
            navigate('/')
          }}
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
          dataLatest={dataThreadList}
          onEdit={(e) => onEdit(e)}
          headerText={headerText}
          userDetail={userDetail}
          onExpand={(e) => handleOnExpand(e)}
        />

        <main className='md:h-full p-4 md:rounded-xl md:w-10/12 md:bg-white border border-neutral-20 border-opacity-80 h-[calc(100%-76px)]'>
          <header className='hidden justify-between items-center md:border-b md:border-b-neutral-30 md:flex md:pb-4 md:-mx-4 md:px-8'>
            <div className='flex gap-2 items-center'>
              {headerText === 'Obrolan Baru' && (
                <img
                  src={images.ic_obrolan}
                  alt='obrolan'
                  className='h-5 w-5'
                />
              )}
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
                      className='px-4 mb-2 text-black-darker'
                    >
                      {t('my_account', {
                        keyPrefix: 'chat.profile_option',
                      })}
                    </NavLink>
                    <div className='flex justify-between items-center my-2'>
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
                  <div className='flex justify-between items-center border-b border-b-neutral-20 pr-4 pb-2 font-semi-bold'>
                    <div className='px-4 text-black-darker text-xs'>
                      {t('wa_activation', {
                        keyPrefix: 'chat.profile_option',
                      })}
                    </div>
                    <img
                      src={images.ic_vector_green}
                      alt='arrow'
                      className='h-2.5 w-2.5'
                    />
                  </div>

                  <div className='px-4 my-2 text-xxs'>
                    {t('configure', {
                      keyPrefix: 'chat.profile_menu',
                    })}
                  </div>
                  <div className='mb-4 flex justify-center ml-4 items-start font-semi-bold'>
                    <div className='text-black-darker text-xs w-full'>
                      {t('menu_language', {
                        keyPrefix: 'chat.profile_option',
                      })}{' '}
                      {currentLanguage === 'id' ? '(ID)' : '(EN)'}
                    </div>
                    <div className='mr-2.5'>
                      <Toggle
                        labelClassName='!w-[50px]'
                        className='!my-0'
                        hideText={true}
                      />
                    </div>
                  </div>

                  <div
                    className='font-semi-bold text-error-base px-4 bg-error-lighter bg-opacity-10 py-2 -mb-2.5 rounded-b-lg text-sm'
                    onClick={onLogout}
                  >
                    Logout
                  </div>
                </div>
              }
            />
          </header>

          <div className='md:h-[calc(100%-56px)] h-full'>
            {isHeader ? (
              <div className='relative flex h-full flex-col select-text mb-2'>
                <QuestionCard
                  data={defaultQuestion}
                  onClick={(e) => handleAddChat(e)}
                  className={`md:absolute ${
                    isDisplayImage ? 'md:top-1/3' : 'md:top-24 md:left-12'
                  }`}
                />

                <InputChat
                  onChange={(e) => handleAddChat(e)}
                  onDisplayImage={(e) => setDisplayImage(e)}
                  className='w-full md:w-3/4 bottom-1 absolute ml-4'
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
