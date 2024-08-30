import images from 'assets/images'

import { InputChat, NavChat, Tooltips, QuestionCard, CardFile, CardFileMobile } from 'components'
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
import { DEFAULT_QUESTION, FILE_LAWYER, RIWAYAT_OROLAN } from 'utils/dummy'
import { ThreadPage } from './ThreadPage'
import { Disclaimer } from 'components/Disclaimer'
import { Typewriter } from 'components/Typewriter'
import { extractLawyerUUID } from 'utils/extractLawyerUUID'
import { extractLawyerList } from 'utils/extractLawyerList'
import { useGetDocument } from 'hooks/useGetDocument'
import { CardFileDocument } from 'components/ChatFileDocument'

export const Chat = () => {
  const { t } = useTranslation()
  const storage = new LocalStorage()
  const navigate = useNavigate()
  const { currentLanguage, collection, bookingLawyerPayload, bookingLawyerReducer, collectionReset, collectionSet } =
    useGlobalContext()
  const { uuid } = useParams()
  const queryClient = useQueryClient()
  const [isHeader, setIsHeader] = useState(true)
  const [disableInput, setDisableInput] = useState(false)
  const [dataThreadList, setThreadList] = useState([])
  const [defaultQuestion, setDefaultQuestion] = useState([])
  const [headerText, setHeaderText] = useState(
    t('new_chat', {
      keyPrefix: 'chat',
    })
  )
  const [showLayerFile, setShowLawyerFile] = useState(false)
  const [userDetail, setUserDetail] = useState({
    first_name: '-',
    last_name: '-',
    image_url: '',
    is_disclaimer_accepted: '',
  })
  const [messageUUID, setMessageUUID] = useState(null)
  const { closeAlert, setIsFirstTime } = useGlobalContext()
  const [hasKoleksiData, setHasKoleksiData] = useState(false)

  const { pathname } = useLocation()
  const [isFirstTimeChat, setIsFirstTimeChat] = useState(false)

  const availableSchedules = queryClient.getQueryData(['available_schedules'])
  const threadDetail = queryClient.getQueryData(['thread_detail', uuid])
  const lawyerUUID = extractLawyerUUID(threadDetail)
  const showChatDocument = !isHeader && lawyerUUID && availableSchedules?.message === 'Done'
  const lawyerList = extractLawyerList(threadDetail)
  const lawyer = lawyerList?.find((item) => item.uuid === lawyerUUID)

  const { dataDocument } = useGetDocument(uuid, Boolean(showChatDocument))

  console.log(dataDocument?.data)

  useEffect(() => {
    if (uuid) {
      navigate(`/thread/${uuid}`)
      setIsHeader(false)
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
            if (dataItem.threads) {
              dataItem.threads.forEach((child) => {
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

  const { mutate: sendMessage } = useMutation((form) => getData(API.MESSAGE_SEND, form), {
    onSettled: (datas) => {
      if (datas?.status === 'Success') {
        const { data } = datas
        setMessageUUID(data?.thread_uuid)
        queryClient.invalidateQueries('newest_thread')
      } else {
        notifyError(datas?.message)
      }
    },
  })

  useQuery(['newest_thread'], () => getData(`${API.THREAD_LIST}?limit=100`), {
    onSettled: (datas) => {
      if (datas?.status === 'Success') {
        const { data } = datas
        let texts = t('new_chat', {
          keyPrefix: 'chat',
        })

        const previousData = data?.filter((item) => item.moment === 'Previous') || []
        const currentData = data?.filter((item) => item.moment === 'Current') || []
        let activeCollection = currentData[0]

        if (bookingLawyerPayload?.thread_uuid) {
          activeCollection = currentData.find((item) => item.uuid === bookingLawyerPayload.thread_uuid)
          if (!activeCollection) {
            activeCollection =
              previousData.find((item) => item.uuid === bookingLawyerPayload.thread_uuid) || currentData[0]
          }
          bookingLawyerReducer(['thread_uuid'], null)
        }

        const isThereAnyCollection = dataThreadList?.find((item) => item.type === 'koleksi')

        setHasKoleksiData(true)

        if (pathname === '/') {
          setHeaderText(texts)
        } else {
          setHeaderText(currentData[0]?.title ?? texts)
        }

        if (isFirstTimeChat) {
          currentData[0].title = texts
        }

        const newMessage = [
          {
            type: 'koleksi',
            data: isThereAnyCollection?.data?.length !== 0 ? isThereAnyCollection?.data : [],
          },
          { type: 'terkini', data: currentData },
          { type: 'riwayat', data: [...previousData, ...RIWAYAT_OROLAN] }, // ...RIWAYAT_OROLAN nanti dihapus kalo udh full api
        ]

        if (messageUUID && !uuid) {
          const selectedThread = data?.find((item) => item.uuid === messageUUID)
          setHeaderText(selectedThread?.title)
          navigate(`/thread/${selectedThread?.uuid}`, {
            state: messageUUID,
          })

          newMessage?.forEach((item) => {
            item.data?.forEach((itm) => {
              if (!itm.threads) {
                if (itm.uuid === selectedThread?.uuid) {
                  itm.isActive = true
                } else {
                  itm.isActive = false
                }
              } else if (itm.threads) {
                itm.threads?.forEach((itms) => {
                  if (itms.uuid === selectedThread?.uuid) {
                    itms.isActive = true
                  } else {
                    itms.isActive = false
                  }
                })
              }
            })
          })

          dataThreadList?.forEach((item) => {
            if (item.type === 'koleksi') {
              item.data?.forEach((dataItem) => {
                if (dataItem.threads) {
                  dataItem.threads.forEach((child) => {
                    if (child.uuid === uuid) {
                      texts = child.title ?? child.name
                    }
                  })
                }
              })
            } else {
              item.data?.forEach((dataItem) => {
                if (dataItem.title) {
                  if (dataItem.uuid === uuid) {
                    texts = dataItem.title
                  }
                }
              })
            }
          })

          setHeaderText(texts)
          setThreadList([...newMessage])
          setIsHeader(false)
          setDisableInput(false)
          collectionSet(selectedThread)
        } else if (!messageUUID && uuid) {
          const selectedThread = data?.find((item) => item.uuid === uuid)

          collectionSet(selectedThread)
          newMessage?.forEach((item) => {
            item.data?.forEach((itm) => {
              if (!itm.threads) {
                if (itm.uuid === uuid) {
                  itm.isActive = true
                } else {
                  itm.isActive = false
                }
              } else if (itm.threads) {
                itm.threads?.forEach((itms) => {
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
        } else {
          newMessage?.forEach((item) => {
            item.data?.forEach((itm) => {
              if (!itm.threads) {
                if (itm.uuid === uuid) {
                  itm.isActive = true
                } else {
                  itm.isActive = false
                }
              } else if (itm.threads) {
                itm.threads?.forEach((itms) => {
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
        }
      } else {
        notifyError(datas?.message)
      }
    },
  })

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
            return (item.data = data.map((item) => {
              const hasMatchingThread = item.threads?.some((thread) => thread.uuid === uuid)

              return {
                ...item,
                isExpand: hasMatchingThread,
              }
            }))
          } else {
            return item
          }
        })
        setThreadList([...dataThreadList])
      } else {
        notifyError(datas?.message)
      }
    },
    enabled: hasKoleksiData,
  })

  const handleAddChat = (e) => {
    const dataMessage = {
      message: e.message,
      document: e.file,
    }
    let texts = t('new_chat', {
      keyPrefix: 'chat',
    })
    const bodyFormData = new FormData()
    for (const [key, value] of Object.entries(dataMessage)) {
      bodyFormData.append(key, value)
    }
    sendMessage(bodyFormData)
    if (pathname === '/') {
      setIsFirstTimeChat((prev) => !prev)
      // setIsFirstTime(true)
    } else {
      texts = e?.message
    }
    setHeaderText(texts)
    setDisableInput(true)
  }

  const onClickColection = (id) => {
    navigate(`/thread/${id}`)
    setMessageUUID(null)
    let texts = t('new_chat', {
      keyPrefix: 'chat',
    })

    dataThreadList?.forEach((item) => {
      if (item.type === 'koleksi') {
        item.data?.forEach((dataItem) => {
          if (dataItem.threads) {
            dataItem.threads.forEach((child) => {
              if (child.uuid === id) {
                texts = child.title ?? child.name
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

    dataThreadList?.forEach((item) => {
      item.data?.forEach((itm) => {
        if (!itm.threads) {
          if (itm.uuid === id) {
            itm.isActive = true
          } else {
            itm.isActive = false
          }
        } else if (itm.threads) {
          itm.threads?.forEach((itms) => {
            if (itms.uuid === id) {
              itms.isActive = true
            } else {
              itms.isActive = false
            }
          })
        }
      })
    })

    setThreadList([...dataThreadList])
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

  const onResetThread = () => {
    dataThreadList?.forEach((item) => {
      item.data?.forEach((itm) => {
        if (!itm.threads) {
          itm.isActive = false
        } else if (itm.threads) {
          itm.threads?.forEach((itms) => {
            itms.isActive = false
          })
        }
      })
    })

    setThreadList([...dataThreadList])
  }

  return (
    <div className="bg-primary-base w-full h-screen flex flex-col">
      <div className="md:pr-4 md:pl-2 md:flex md:justify-between md:mt-12 md:gap-4 md:mb-2 w-full h-[calc(100%-56px)] flex-1">
        <NavChat
          isDisable={uuid !== '63926537'}
          onClickFile={() => setShowLawyerFile(true)}
          onDeleted={() => {
            setIsHeader(true)
            collectionReset()
            onResetThread()
            setHeaderText(
              t('new_chat', {
                keyPrefix: 'chat',
              })
            )
            navigate('/')
          }}
          onHeaderClick={() => {
            setIsHeader(true)
            setIsFirstTime(false)
            collectionReset()
            onResetThread()
            setHeaderText(
              t('new_chat', {
                keyPrefix: 'chat',
              })
            )
            navigate('/')
          }}
          dataLatest={dataThreadList}
          onEdit={(e) => onEdit(e)}
          headerText={headerText}
          userDetail={userDetail}
          onExpand={(e) => handleOnExpand(e)}
        />

        <main className="md:h-full p-4 md:rounded-xl md:w-10/12 md:bg-white border border-neutral-20 border-opacity-80 h-[calc(100%-76px)]">
          <header className="hidden justify-between items-center md:border-b md:border-b-neutral-30 md:flex md:pb-4 md:-mx-4 md:px-8">
            <div className="flex gap-2 items-center">
              {headerText === 'New Chat' || headerText === 'Obrolan Baru' ? (
                <>
                  <img src={images.ic_obrolan} alt="obrolan" className="h-5 w-5" />

                  <div className="font-futura-bold text-xl">
                    {t('new_chat', {
                      keyPrefix: 'chat',
                    })}
                  </div>
                </>
              ) : (
                <>
                  <img src={images.ic_obrolan} alt="obrolan" className="h-5 w-5" />

                  <div className="font-futura-bold text-xl">
                    <Typewriter
                      text={
                        headerText === ''
                          ? t('new_chat', {
                              keyPrefix: 'chat',
                            })
                          : headerText
                      }
                    />
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center gap-2" data-tooltip-id="profile-tooltip">
              <p className="font-futura-bold text-sm">
                {userDetail.first_name} {userDetail.last_name}
              </p>
              <img
                className="size-10 rounded-full ring-1 ring-[#C9BBA0] drop-shadow-[2px_2px_2px_rgba(240, 237, 232, 1)] cursor-pointer"
                src={userDetail.image_url ? userDetail.image_url : images.ic_avatar_placeholder}
                alt="profile"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null
                  currentTarget.src = images.ic_avatar_placeholder
                }}
              />
            </div>

            <Tooltips
              idToolTips="profile-tooltip"
              tooltipEffect="solid"
              tooltipPlace="bottom-end"
              className="bg-secondary-base hidden md:inline-block z-50"
              children={
                <div className="text-neutral-40 -mx-4">
                  <div className="bg-blue-dark w-full h-2 -mt-2 rounded-t-md" />
                  <div className="px-4 my-2 text-xxs">
                    {t('main_menu', {
                      keyPrefix: 'chat.profile_menu',
                    })}
                  </div>
                  <div className="border-b border-b-neutral-20 text-xs font-semi-bold">
                    <NavLink to="account" className="px-4 mb-2 text-black-darker">
                      {t('my_account', {
                        keyPrefix: 'chat.profile_option',
                      })}
                    </NavLink>
                    <div className="flex justify-between items-center my-2">
                      <div className="px-4 text-black-darker cursor-pointer" onClick={() => navigate('/my-lawyer')}>
                        {t('my_lawyer', {
                          keyPrefix: 'chat.profile_option',
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="px-4 mb-2 mt-2 text-xxs ">
                    {t('connected', {
                      keyPrefix: 'chat.profile_menu',
                    })}
                  </div>
                  <div className="flex justify-between items-center border-b border-b-neutral-20 pr-4 pb-2 font-semi-bold">
                    <div className="px-4 text-black-darker text-xs cursor-pointer">
                      {t('wa_activation', {
                        keyPrefix: 'chat.profile_option',
                      })}
                    </div>
                    <img src={images.ic_vector_green} alt="arrow" className="h-2.5 w-2.5" />
                  </div>

                  <div className="px-4 my-2 text-xxs">
                    {t('configure', {
                      keyPrefix: 'chat.profile_menu',
                    })}
                  </div>
                  <div className="mb-2 flex justify-center ml-4 items-start font-semi-bold">
                    <div className="text-black-darker text-xs w-full mt-1 cursor-pointer">
                      {t('menu_language', {
                        keyPrefix: 'chat.profile_option',
                      })}{' '}
                      {currentLanguage === 'id' ? '(ID)' : '(EN)'}
                    </div>
                    <div className="mr-2.5">
                      <Toggle labelClassName="!w-[50px]" className="!my-0" hideText={true} />
                    </div>
                  </div>

                  <div
                    className="font-semi-bold text-error-base px-4 bg-[#F0EDE8] py-2 -mb-2.5 rounded-b-lg text-sm cursor-pointer"
                    onClick={onLogout}
                  >
                    {t('logout', {
                      keyPrefix: 'chat.profile_option',
                    })}
                  </div>
                </div>
              }
            />
          </header>

          {isHeader ? (
            <div className="md:h-[calc(100%-56px)] h-full w-full xl:w-3/4">
              <div className="relative flex h-full flex-col select-text mb-2 mt-1">
                <QuestionCard
                  data={defaultQuestion}
                  onClick={(e) => handleAddChat(e)}
                  className="md:top-24 md:left-12 md:absolute"
                />

                <InputChat
                  onChange={(e) => handleAddChat(e)}
                  className="w-full md:w-full bottom-1 absolute md:ml-2"
                  disable={disableInput}
                />
              </div>
            </div>
          ) : (
            <div className="md:h-[calc(100%-56px)] h-full w-full flex gap-x-7">
              <ThreadPage
                className={`${!isHeader && uuid === '63926537' ? 'md:w-9/12' : ''} w-full`}
                hasFile={!isHeader && uuid === '63926537'}
                isFirstTimeChat={isFirstTimeChat}
                onFirstTimeChat={() => setIsFirstTimeChat((prev) => !prev)}
              />

              {/* TAMPILKAN DOC CHAT KETIKA */}
              {/* Status Message === Done dan */}
              {/* Ada Lawyer UUID di Thread_Detail queryKey */}
              {showChatDocument && <CardFileDocument data={FILE_LAWYER} lawyer={lawyer} />}

              {/* DUMMY JANGAN DIHAPUS */}
              {!isHeader && uuid === '63926537' && <CardFile data={FILE_LAWYER} />}
              {!isHeader && uuid === '63926537' && (
                <CardFileMobile
                  data={FILE_LAWYER}
                  show={showLayerFile}
                  onChangeVisibility={() => setShowLawyerFile(false)}
                />
              )}
            </div>
          )}
        </main>

        <Disclaimer disclaimerAgree={userDetail.is_disclaimer_accepted} />
      </div>
    </div>
  )
}
