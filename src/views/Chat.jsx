import images from 'assets/images'
import axios from 'axios'
import { InputChat, NavChat, QuestionCard, Tooltips } from 'components'
import { AutoScrollingDiv } from 'components/AutoScrollDiv'
import { ChatCard } from 'components/ChatCard'
import { Toggle } from 'components/Toggle/Toggle'
import { API } from 'config/api'
import { StorageKey } from 'config/storage'
import { useGlobalContext } from 'hooks/context'
import { deleteData, getData } from 'hooks/useRequest'
import { notifyError } from 'hooks/useToas'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { NavLink, useNavigate } from 'react-router-dom'
import { LocalStorage } from 'utils'
import {
  DEFAULT_QUESTION,
  KOLEKSI_CHAT,
  OROLAN_TERKINI,
  RIWAYAT_OROLAN,
} from 'utils/dummy'

export const Chat = () => {
  const { t } = useTranslation()
  const storage = new LocalStorage()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { currentLanguage, collection, collectionReset } = useGlobalContext()
  const [isDisplayImage, setDisplayImage] = useState()
  const [isHeader, setIsHeader] = useState(true)
  const [dataMessage, setMessage] = useState([
    { type: 'koleksi', data: KOLEKSI_CHAT },
    { type: 'terkini', data: OROLAN_TERKINI },
    { type: 'riwayat', data: [...RIWAYAT_OROLAN] },
  ])
  const [renderedMessage, setRenderedMessage] = useState(null)
  const [headerText, setHeaderText] = useState('Obrolan Baru')
  const [threadMessageId, setThreadMessageId] = useState({
    thread_id: '',
    message_id: '',
  })
  const [currUUID, setCurrUUID] = useState(null)

  useEffect(() => {
    switch (true) {
      case collection.clickColection:
        return onClickColection(collection.uuid)
      case collection.deleteColection:
        return onDelete(collection.uuid)
      case collection.setEditColection:
        return handleSetEdit(collection.uuid)
      default:
        break
    }
  }, [collection])

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
        let activeData = null

        const previousData = data?.filter((item) => item.moment === 'Previous')
        const currentData = data?.filter((item) => item.moment === 'Current')
        const collectionUUID = isHeader
          ? currentData && currentData[0]?.uuid
          : collection?.uuid

        const newMessage = [
          { type: 'koleksi', data: KOLEKSI_CHAT },
          {
            type: 'terkini',
            data:
              currentData?.length !== 0 && currentData ? [...currentData] : [],
          },
          {
            type: 'riwayat',
            data:
              previousData?.length !== 0 && previousData
                ? [...previousData, ...RIWAYAT_OROLAN]
                : [...RIWAYAT_OROLAN], //nanti dihapus kalo udh full api
          },
        ]

        setMessage([...newMessage])

        newMessage?.forEach((item) => {
          if (item.type === 'koleksi') {
            item.data.forEach((dataItem) => {
              if (dataItem.childs) {
                dataItem.childs.forEach((child) => {
                  if (child.uuid === collectionUUID) {
                    texts = child.title ?? child.message
                    activeData = child
                  }
                })
              }
            })
          } else {
            item.data.forEach((dataItem) => {
              if (dataItem.title) {
                if (dataItem.uuid === collectionUUID) {
                  texts = dataItem.title
                  activeData = dataItem
                }
              }
            })
          }
        })

        newMessage?.map((item) => {
          item.data?.map((itm) => {
            if (!itm.value) {
              if (itm.uuid === collectionUUID) {
                itm.isActive = true
              } else {
                itm.isActive = false
              }
            } else if (itm.value) {
              itm.childs?.map((itms) => {
                if (itms.uuid === collectionUUID) {
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

        setCurrUUID(collectionUUID)
      } else {
        notifyError(datas?.message)
      }
    },
  })

  const { refetch: refetchDetail } = useQuery(
    ['thread_detail', currUUID],
    () => getData(API.THREAD_DETAIL + currUUID),
    {
      onSettled: (datas) => {
        if (datas?.status === 'Success') {
          const { data } = datas
          setRenderedMessage(data)
          // onClickColection(collection.uuid)
        } else {
          notifyError(datas?.message)
        }
      },
      enabled: !!currUUID,
    }
  )

  useQuery(
    ['respond_chat', threadMessageId.thread_id],
    () => getData(API.MESSAGE_RESPONSE + threadMessageId.thread_id),
    {
      onSettled: (datas) => {
        if (datas?.status === 'Success') {
          const { data } = datas
          queryClient.invalidateQueries('thread_detail')
        } else {
          notifyError(datas?.message)
        }
      },
      enabled: !!threadMessageId.thread_id,
    }
  )

  useQuery(
    ['check_status', threadMessageId],
    () =>
      getData(
        API.MESSAGE_STATUS +
          `${threadMessageId.thread_id}/${threadMessageId.message_id}/status`
      ),
    {
      onSettled: (datas) => {
        if (datas?.status === 'Success') {
          const { data } = datas
          if (data.status === 'completed') {
            queryClient.invalidateQueries('respond_chat')
          }
        }
      },
      refetchInterval: (query) => {
        if (query?.data?.status !== 'in_progress') {
          return false
        } else {
          return 3000
        }
      },
      onError: (e) => console.log('eh error', e),
      enabled: !!threadMessageId.thread_id && !!threadMessageId.message_id,
    }
  )

  const { mutate: sendMessage } = useMutation(
    (form) => getData(API.MESSAGE_SEND, form),
    {
      onSettled: (datas) => {
        if (datas?.status === 'Success') {
          const { data } = datas
          queryClient.invalidateQueries('newest_thread')
          setCurrUUID(collection.uuid)
          refetchDetail()
          setThreadMessageId({
            thread_id: data.thread_id,
            message_id: data.message_id,
          })
        } else {
          notifyError(datas?.message)
        }
      },
    }
  )

  const handleAddChat = (e) => {
    const dataMessage = {
      message: e.message,
      thread_id: collection.thread_id,
      document: e.file,
    }

    const bodyFormData = new FormData()
    for (const [key, value] of Object.entries(dataMessage)) {
      bodyFormData.append(key, value)
    }
    sendMessage(bodyFormData)
  }

  const onClickColection = (id) => {
    let texts = 'Obrolan Baru'
    let activeData = null

    dataMessage?.forEach((item) => {
      if (item.type === 'koleksi') {
        item.data.forEach((dataItem) => {
          if (dataItem.childs) {
            dataItem.childs.forEach((child) => {
              if (child.uuid === id) {
                texts = child.title ?? child.message
                activeData = child
              }
            })
          }
        })
      } else {
        item.data.forEach((dataItem) => {
          if (dataItem.title) {
            if (dataItem.uuid === id) {
              texts = dataItem.title
              activeData = dataItem
            }
          }
        })
      }
    })

    dataMessage?.map((item) => {
      item.data?.map((itm) => {
        if (!itm.value) {
          if (itm.uuid === id) {
            itm.isActive = true
          } else {
            itm.isActive = false
          }
        } else if (itm.value) {
          itm.childs?.map((itms) => {
            if (itms.uuid === id) {
              itms.isActive = true
            } else {
              itms.isActive = false
            }
          })
        }
      })
    })

    setMessage([...dataMessage])
    setHeaderText(texts)
    setIsHeader(false)

    if (activeData?.update_at) {
      setCurrUUID(id)
    } else {
      setCurrUUID(null)
      setRenderedMessage(activeData?.chat ?? null)
    }
  }

  const onEdit = (e) => {
    dataMessage?.map((item) => {
      item.data?.map((itm) => {
        if (itm.isActive) {
          itm.title = e
        }
      })
    })
    setMessage([...dataMessage])
  }

  const onDelete = (e) => {
    const newData = dataMessage.map((category) => ({
      ...category,
      data: category.data.filter((item) => item.uuid !== e),
    }))

    setMessage([...newData])
  }

  const handleOnExpand = (id) => {
    dataMessage?.map((item) => {
      if (item.type === 'koleksi') {
        item.data?.map((items) => {
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

  const handleSetEdit = (id) => {
    dataMessage.map((item) => {
      if (item.type !== 'koleksi') {
        item.data?.map((items) => {
          if (items.uuid === id) {
            items.isEdit = collection.editState === 'start' ? true : false
          } else {
            items.isEdit = false
          }
        })
      }
    })
    setMessage([...dataMessage])
  }

  const handleResetThread = () => {
    dataMessage.map((item) => {
      if (item.type !== 'koleksi') {
        item.data?.map((items) => {
          items.isActive = false
        })
      }
    })
    setMessage([...dataMessage])
  }

  console.log(currUUID, dataMessage)
  return (
    <div className='bg-primary-base w-full h-screen flex flex-col'>
      <div className='md:px-4 md:flex md:justify-between md:mt-12 md:gap-4 md:mb-2 w-full h-[calc(100%-56px)] flex-1'>
        <NavChat
          onHeaderClick={() => {
            setIsHeader(true)
            collectionReset()
            setCurrUUID(null)
            setHeaderText('Obrolan Baru')
            handleResetThread()
          }}
          dataLatest={dataMessage}
          onEdit={(e) => onEdit(e)}
          headerText={headerText}
          onExpand={(e) => handleOnExpand(e)}
        />

        <main className='md:h-full p-4 md:rounded-xl md:w-10/12 md:bg-white border border-neutral-20 border-opacity-80 h-[calc(100%-76px)]'>
          <header className='hidden justify-between items-center md:border-b md:border-b-neutral-30 md:flex md:pb-4 md:-mx-4 md:px-8'>
            <div className='flex gap-2'>
              <img src={images.ic_obrolan} alt='obrolan' />
              <div className='font-futura-bold'>{headerText}</div>
            </div>

            <div className='flex items-center gap-2'>
              <p className='font-bold'>Prima Kusumo</p>
              <img
                src={images.ic_thumbnail_profile}
                alt='profile'
                data-tooltip-id='profile-tooltip'
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
                      <div className='px-4 text-black-darker'>
                        {t('my_lawyer', {
                          keyPrefix: 'chat.profile_option',
                        })}
                      </div>
                      <div className='py-1 px-2 bg-error-lighter text-xs mr-2 rounded-full text-white flex items-center justify-center'>
                        1
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

          <div className='flex h-full md:h-[calc(100%-56px)] flex-col select-text relative'>
            <AutoScrollingDiv
              content={
                !isHeader ? (
                  renderedMessage?.map((itms, index) => (
                    <ChatCard key={index} item={itms} />
                  ))
                ) : (
                  <QuestionCard
                    data={DEFAULT_QUESTION}
                    onClick={(e) => handleAddChat(e)}
                    className={`md:absolute ${
                      isDisplayImage ? 'md:top-[20%]' : 'md:top-1/4'
                    }`}
                  />
                )
              }
            />

            <div>
              <InputChat
                onChange={(e) => handleAddChat(e)}
                onDisplayImage={(e) => setDisplayImage(e)}
                className='w-full md:w-3/4'
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
