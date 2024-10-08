import images from 'assets/images'

import {
  InputChat,
  NavChat,
  Tooltips,
  QuestionCard,
  CardFile,
  CardFileMobile,
  Modal,
} from 'components'
import { Toggle } from 'components/Toggle/Toggle'
import { API } from 'config/api'
import { StorageKey } from 'config/storage'
import { useGlobalContext } from 'hooks/context'
import { deleteData, getData } from 'hooks/useRequest'
import { notifyError, notifyInfo } from 'hooks/useToas'
import { useEffect, useRef, useState } from 'react'
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
import { CardFileDocument } from 'components/CardFileDocument'
import { WhatsappActivation } from 'components/WhatsappActivation'
import { useGetAvailableSchedule } from 'hooks/useGetAvailableSchedule'
import { useWindowWidth } from 'hooks/useWindowWidth'
import { useGetEncryptKey } from 'hooks/useGetEncryptKey'
import { encryptAESGCM } from 'hooks/useEncryptDecryption'
import { WhatsAppFitBIt } from 'components/WhatsAppFitBit'
import { useDocumentEncryptor } from 'hooks/useDocumentEncryptor'

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
    resetPhoneNumber,
  } = useGlobalContext()
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
  const { setIsFirstTime } = useGlobalContext()
  const [hasKoleksiData, setHasKoleksiData] = useState(false)
  const { encryptFile } = useDocumentEncryptor()
  const { pathname } = useLocation()
  const [isFirstTimeChat, setIsFirstTimeChat] = useState(false)

  const [showWhatsAppActivation, setShowWhatsAppActivation] = useState(false)
  const openModalWAActivation = () => {
    setShowWhatsAppActivation(true)
  }

  const closeModalWAActivation = () => {
    setShowWhatsAppActivation(false)
  }

  const [showWhatsappOtp, setShowWhatsappOtp] = useState(false)
  const openModalWaOTP = () => {
    setShowWhatsappOtp(true)
  }
  const closeModalWaOtp = () => {
    setShowWhatsappOtp(false)
    resetPhoneNumber()
  }

  const [showConnectedWA, setShowConnectedWA] = useState(false)

  const [responseThreadDetail, setResponseThreadDetail] = useState([])

  const lawyerUUID = extractLawyerUUID(responseThreadDetail)

  const { dataDocument, isPendingDocument } = useGetDocument(uuid)

  const lawyerList = extractLawyerList(responseThreadDetail)
  const lawyer = lawyerList?.find((item) => item.uuid === lawyerUUID)

  const { dataAvailableSchedule } = useGetAvailableSchedule(lawyer?.uuid, uuid)
  const { message: encryptKey, refetch } = useGetEncryptKey()

  const showChatDocument =
    (!isHeader &&
      (dataAvailableSchedule?.message === 'Done' ||
        dataAvailableSchedule?.message === 'Success get data')) ||
    dataDocument?.data?.system?.length > 0

  const { windowWidth } = useWindowWidth()
  const isMobile = windowWidth < 768

  const phoneNumberRef = useRef(null)

  useEffect(() => {
    if (showWhatsAppActivation && phoneNumberRef.current) {
      phoneNumberRef.current.focus()
    }
  }, [showWhatsAppActivation])

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

  const { mutate: sendMessage } = useMutation(
    (form) => getData(API.MESSAGE_SEND, form),
    {
      onSettled: (datas) => {
        if (datas?.status === 'Success') {
          const { data } = datas
          setMessageUUID(data?.thread_uuid)
          queryClient.invalidateQueries('newest_thread')
        } else {
          notifyError(datas?.message)
        }
      },
    }
  )

  useQuery(['newest_thread'], () => getData(`${API.THREAD_LIST}?limit=1000`), {
    onSettled: (datas) => {
      refetch()
      if (datas?.status === 'Success') {
        const { data } = datas
        let texts = t('new_chat', {
          keyPrefix: 'chat',
        })

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
            data:
              isThereAnyCollection?.data?.length !== 0
                ? isThereAnyCollection?.data
                : [],
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
              const hasMatchingThread = item.threads?.some(
                (thread) => thread.uuid === uuid
              )

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

  const handleAddChat = async (e) => {
    let encryptMessage = ''
    let encryptedFile = ''
    try {
      encryptMessage = await encryptAESGCM(e.message, encryptKey)
    } catch (error) {
      notifyError('Encryption failed:', error)
    }

    if (e.file && encryptKey) {
      try {
        encryptedFile = await encryptFile(e.file, encryptKey)
      } catch (error) {
        notifyError(error.message)
      }
    } else {
      notifyError('Please select a file and enter a password.')
    }

    const dataMessage = {
      message: encryptMessage,
      document: encryptedFile,
      filename: e.file?.name,
    }

    let texts = t('new_chat', {
      keyPrefix: 'chat',
    })

    sendMessage(dataMessage)
    if (pathname === '/') {
      setIsFirstTimeChat((prev) => !prev)
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
          isDisable={!showChatDocument}
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
            refetch()
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
                  <img
                    src={images.ic_obrolan}
                    alt="obrolan"
                    className="h-5 w-5"
                  />

                  <div className="font-futura-bold text-xl">
                    {t('new_chat', {
                      keyPrefix: 'chat',
                    })}
                  </div>
                </>
              ) : (
                <>
                  <img
                    src={images.ic_obrolan}
                    alt="obrolan"
                    className="h-5 w-5"
                  />

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

            <div
              className="flex items-center gap-2"
              data-tooltip-id="profile-tooltip"
            >
              <p className="font-futura-bold text-sm">
                {userDetail.first_name} {userDetail.last_name}
              </p>
              <img
                className="size-10 rounded-full ring-1 ring-[#C9BBA0] drop-shadow-[2px_2px_2px_rgba(240, 237, 232, 1)] cursor-pointer"
                src={
                  userDetail.image_url
                    ? userDetail.image_url
                    : images.ic_avatar_placeholder
                }
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
                  <div className="px-4 my-2 text-xxs font-semi-bold">
                    {t('main_menu', {
                      keyPrefix: 'chat.profile_menu',
                    })}
                  </div>
                  <div className="border-b border-b-neutral-20 text-xs font-semi-bold">
                    <NavLink
                      to="account"
                      className="px-4 mb-2 text-black-darker"
                    >
                      {t('my_account', {
                        keyPrefix: 'chat.profile_option',
                      })}
                    </NavLink>
                    <div className="flex justify-between items-center my-2">
                      <div
                        className="px-4 text-black-darker cursor-pointer"
                        onClick={() => navigate('/my-lawyer')}
                      >
                        {t('my_lawyer', {
                          keyPrefix: 'chat.profile_option',
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="px-4 mb-2 mt-2 text-xxs font-semi-bold">
                    {t('connected', {
                      keyPrefix: 'chat.profile_menu',
                    })}
                  </div>
                  <div className="flex justify-between items-center border-b border-b-neutral-20 pr-4 pb-2">
                    <div
                      className={`px-4 text-black-darker text-xs  ${
                        userDetail?.connect_whatsapp_status === 'DISCONNECTED'
                          ? 'cursor-pointer font-semi-bold'
                          : `font-light ${
                              userDetail?.connect_whatsapp_status ===
                                'PENDING' && 'cursor-pointer'
                            }`
                      }`}
                      onClick={() => {
                        switch (userDetail?.connect_whatsapp_status) {
                          case 'CONNECTED':
                            break
                          case 'PENDING':
                            openModalWaOTP()
                            break
                          default:
                            openModalWAActivation()
                            break
                        }
                      }}
                    >
                      {userDetail?.connect_whatsapp_status === 'CONNECTED'
                        ? t('chat.profile_option.wa_connected')
                        : userDetail?.connect_whatsapp_status === 'PENDING'
                        ? t('chat.profile_option.wa_pending')
                        : t('wa_activation', {
                            keyPrefix: 'chat.profile_option',
                          })}
                    </div>
                    <img
                      src={
                        userDetail?.connect_whatsapp_status === 'CONNECTED'
                          ? images.ic_disconnected
                          : userDetail?.connect_whatsapp_status === 'PENDING'
                          ? images.ic_sand_time_mini
                          : images.ic_arrow_cornering
                      }
                      alt="arrow"
                      className={`${
                        userDetail?.connect_whatsapp_status === 'CONNECTED'
                          ? 'h-5 w-5 cursor-pointer'
                          : 'h-2.5 w-2.5'
                      }`}
                      onClick={(e) => {
                        if (
                          userDetail?.connect_whatsapp_status === 'CONNECTED'
                        ) {
                          e.preventDefault()
                          e.stopPropagation()

                          setShowConnectedWA(true)
                        }
                      }}
                    />
                  </div>

                  <div className="px-4 my-2 text-xxs font-semi-bold">
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
                      <Toggle
                        labelClassName="!w-[50px]"
                        className="!my-0"
                        hideText={true}
                      />
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
            <div className="md:h-[calc(100%-56px)] h-full w-full xl:w-3/4 flex flex-col justify-between">
              <QuestionCard
                data={defaultQuestion}
                onClick={(e) => handleAddChat(e)}
                className="mt-20"
              />
              <div className="relative select-text mb-2 mt-1 justify-center">
                <InputChat
                  onChange={(e) => handleAddChat(e)}
                  disable={disableInput}
                />
              </div>
            </div>
          ) : (
            <div className="md:h-[calc(100%-56px)] h-full w-full flex gap-x-7">
              <ThreadPage
                className={`${
                  !isHeader && uuid === '63926537' ? 'md:w-9/12 relative' : ''
                } w-full`}
                hasFile={
                  (!isHeader && uuid === '63926537') ||
                  (showChatDocument && !isPendingDocument)
                }
                isFirstTimeChat={isFirstTimeChat}
                onFirstTimeChat={() => setIsFirstTimeChat((prev) => !prev)}
                currKey={encryptKey}
                setResponseThreadDetail={setResponseThreadDetail}
              />

              {/* TAMPILKAN DOC CHAT KETIKA */}
              {/* Status Message === Done dan */}
              {/* Ada Lawyer UUID di Thread_Detail queryKey */}
              {showChatDocument && !isPendingDocument && !isMobile && (
                <CardFileDocument
                  // className='absolute z-50 right-10 md:md:h-[calc(100%-146px)]'
                  data={FILE_LAWYER}
                  lawyer={lawyer}
                  lawyer_data={dataDocument?.data?.lawyer}
                  system_data={dataDocument?.data?.system}
                />
              )}

              {/* Mobile View */}
              {showChatDocument && !isPendingDocument && (
                <CardFileMobile
                  data={FILE_LAWYER}
                  show={showLayerFile}
                  onChangeVisibility={() => setShowLawyerFile(false)}
                  lawyer_data={dataDocument?.data?.lawyer}
                  lawyer={lawyer}
                  system_data={dataDocument?.data?.system}
                />
              )}

              {/* DUMMY JANGAN DIHAPUS */}
              {!isHeader && uuid === '63926537' && (
                <CardFile data={FILE_LAWYER} />
              )}
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

      <Modal
        classNameBox={'flex justify-center bg-gray-700/70'}
        show={showWhatsAppActivation}
        onHide={() => {
          closeModalWAActivation()
          resetPhoneNumber()
        }}
      >
        <WhatsappActivation
          onHandleSubmit={() => {
            closeModalWAActivation()
            openModalWaOTP()
          }}
          ref={phoneNumberRef}
        />
      </Modal>

      <Modal
        classNameBox={'flex justify-center bg-gray-700/70'}
        show={showWhatsappOtp}
        onHide={closeModalWaOtp}
      >
        {showWhatsappOtp && (
          <WhatsAppFitBIt
            onCloseButton={() => {
              closeModalWaOtp()
            }}
            onChangeNumber={() => {
              closeModalWaOtp()
              openModalWAActivation()
            }}
            key='Whatsapp-Infobip-Desktop'
          />
        )}
      </Modal>

      {/* Modal Disconnect WA */}
      <Modal
        classNameBox={'bg-gray-700/70'}
        contentClassName={'flex justify-center px-4'}
        show={showConnectedWA}
        onHide={() => {
          setShowConnectedWA(false)
        }}
      >
        {/* Card */}
        <div className="relative bg-[#F0EDE8] rounded-md py-8 px-2 border border-[#F3E8D0] w-[622px]">
          {/* button close */}
          <div
            className="absolute top-4 right-4 hover:cursor-pointer"
            onClick={() => {
              setShowConnectedWA(false)
            }}
          >
            <img alt="cross" src={images.ic_circle_cross} />
          </div>

          {/* Header */}
          <div className="px-4 my-2 w-[483px] mx-auto">
            <h1 className="font-futura-bold text-3xl text-dark-50 text-center mx-auto mt-4">
              {t('chat.profile_menu.connected_whatsapp_heading')}
            </h1>

            <p className="font-medium text-[20px] text-gray-700 text-center my-4">
              {t('chat.profile_menu.connected_whatsapp_description')}
            </p>

            {/* Button Action */}
            <div className="px-2 my-2">
              <button
                className="block rounded-full w-full bg-gray-500 text-center font-bold text-[16px] py-2 border border-[#F3E8D0]/50 text-dark-50"
                onClick={() => {
                  notifyInfo('Belum ada Fitur nya')
                  setShowConnectedWA(false)
                }}
              >
                {t('chat.profile_menu.connected_whatsapp_button')}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
