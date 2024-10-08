import images from 'assets/images'
import { useEffect, useRef, useState } from 'react'
import { NavComponent } from './NavComponent'
import { useTranslation } from 'react-i18next'
import { Toggle } from './Toggle/Toggle'
import { LocalStorage } from 'utils'
import { StorageKey } from 'config/storage'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from 'react-query'
import { API } from 'config/api'
import { notifyError, notifyInfo } from 'hooks/useToas'
import { deleteData } from 'hooks/useRequest'
import { useGlobalContext } from 'hooks/context'
import { ModalSearch } from './ModalSearch'
import { NavCollection } from './NavCollection'
import { SearchCard } from './SearchCard/SearchCard'
import { ObrolanCard } from './SearchCard/ObrolanCard'
import { DokumenCard } from './SearchCard/DokumenCard'
import { TopicObrolan } from './SearchCard/TopikObrolan'
import { SearchCardSpinner } from './SearchCard/SearchCardSpinner'
import { useDebounce } from 'hooks/useDebounce'
import { useSearch } from '../hooks/useSearch'
import { EmptySearchResult } from './SearchCard/EmptySearchResult'
import { Modal } from './Modal'
import { WhatsappActivation } from './WhatsappActivation'
import { WhatsAppFitBIt } from './WhatsAppFitBit'

export const NavChat = ({
  onHeaderClick,
  dataLatest = [],
  headerText,
  userDetail,
  isDisable,
  onDeleted = () => {},
  onExpand = () => {},
  onClickFile = () => {},
}) => {
  const queryClient = useQueryClient()
  const { collection, collectionClick, resetPhoneNumber } = useGlobalContext()
  const { t, i18n } = useTranslation()
  const [search, setSearch] = useState('')
  const [showNav, setShowNav] = useState(false)
  const [showSearchNav, setShowSearchNav] = useState(false)
  const [showSetting, setShowSetting] = useState(false)
  const [showColetion, setShowColetion] = useState(false)
  const [showPendingWA, setShowPendingWA] = useState(false)
  const [showConnectedWA, setShowConnectedWA] = useState(false)
  const isEng = i18n.language === 'en'

  const [showWhatsAppActivation, setShowWhatsAppActivation] = useState(false)
  const openModalWAActivation = () => {
    setShowWhatsAppActivation(true)
    resetPhoneNumber()
  }

  const closeModalWAActivation = () => {
    setShowWhatsAppActivation(false)
  }

  const storage = new LocalStorage()
  const navigate = useNavigate()

  const debounceText = useDebounce(search)
  const debounceSearch = search.length > 0 ? debounceText : ''

  const { isPendingSearch, searchData } = useSearch(debounceSearch)

  const phoneNumberRef = useRef(null)

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

  const { mutate: deleteCollection } = useMutation(
    (uuid) => deleteData(`${API.COLLECTION_DELETE}${uuid}`),
    {
      onSettled: (data) => {
        if (data.status === 'Success') {
          queryClient.invalidateQueries('collection')

          onDeleted()
        } else {
          notifyError(data?.message)
        }
      },
    }
  )

  useEffect(() => {
    if (collection.editState === 'stop') {
      setShowNav(false)
    }
  }, [collection.editState])

  useEffect(() => {
    dataLatest.forEach((category) => {
      category?.data.forEach((item) => {
        const lowerSearchString = search?.toLowerCase()
        const lowerTitle = item.title?.toLowerCase()
        const lowerLabel = item.label ? item.label?.toLowerCase() : ''
        if (
          lowerTitle?.includes(lowerSearchString) ||
          lowerLabel?.includes(lowerSearchString)
        ) {
          item.isHeadlight = true
        } else {
          item.isHeadlight = false
        }
      })
    })
  }, [search])

  useEffect(() => {
    if (showWhatsAppActivation && phoneNumberRef.current) {
      phoneNumberRef.current.focus()
    }
  }, [showWhatsAppActivation])

  return (
    <nav
      className={`md:w-3/12 md:py-1 md:h-full flex flex-col ${
        showNav ? '' : 'py-4'
      }`}
    >
      {showNav && <div className="pb-4 pt-3.5" />}
      <div className="hidden md:inline">
        <img src={images.logo_lexilaw} alt="LexiLaw" className="mb-8" />
        <div className="flex gap-2">
          <div className="!rounded-full !border-gray-100 focus:outline-none py-2.5 border-2 bg-white flex items-center gap-2 px-4 basis-10/12 relative">
            <img
              className="!w-[13.81px] !h-[13.81px] aspect-square mt-0.5 left-3"
              src={images.ic_search_black}
              alt=""
            />
            <input
              className="placeholder:text-sm focus:outline-none w-full pr-4"
              type="text"
              placeholder={t('search', {
                keyPrefix: 'chat.chat_text',
              })}
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              name="search"
              autoComplete="off"
            />

            {/* Icon Cross atau silang */}
            <div
              className={`w-4 h-4 rounded-full right-4 hover:cursor-pointer hover:bg-base ${
                search.length > 0 ? 'absolute' : 'hidden'
              }`}
              onClick={() => {
                setSearch('')
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.095 9L14.25 13.155V14.25H13.155L9 10.095L4.845 14.25H3.75V13.155L7.905 9L3.75 4.845V3.75H4.845L9 7.905L13.155 3.75H14.25V4.845L10.095 9Z"
                  fill="#FF7878"
                />
              </svg>
            </div>
          </div>

          <div
            className="bg-[#F0EDE8] basis-2/12 rounded-full outline outline-[#E0DBD1] py-1 flex items-center cursor-pointer"
            onClick={() => onHeaderClick()}
          >
            <img
              src={images.ic_add_convo2}
              alt="add converstaion"
              className="mx-auto w-6 h-6"
            />
          </div>
        </div>
      </div>

      <div
        className={`md:hidden flex justify-between px-4 items-center gap-4 ${
          showNav ? 'my-2 -mt-4' : ' inline-block'
        }`}
      >
        <img
          src={images.ic_navbar_hidden}
          alt="navbar hide"
          className="h-4 w-5"
          onClick={() => setShowNav(!showNav)}
        />
        <div className="flex w-full justify-between items-center h-10">
          <div className="font-futura-bold font-bold text-xl line-clamp-1 text-[#00153F] basis-10/12">
            {headerText === '' ? t('chat.new_chat') : headerText}
          </div>
          <div className="mx-auto basis-2/12">
            <div
              className={`rounded-full px-1.5 py-1 w-10 h-10 mx-auto flex justify-center items-center ${
                isDisable ? 'bg-neutral-10' : 'bg-neutral-20 '
              }`}
            >
              <img
                src={
                  isDisable
                    ? images.ic_attachment_upload_disabled
                    : images.ic_attachment_upload
                }
                alt="upload"
                className=""
                onClick={isDisable ? void 0 : () => onClickFile()}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="hidden justify-center md:inline-block md:my-4 h-4/5 overflow-y-auto no-scrollbar">
        {debounceSearch.length > 0 ? (
          <>
            <SearchCardSpinner isPending={isPendingSearch} />

            {/* Jika hasil search kosong */}
            {!searchData?.data && !isPendingSearch && (
              <EmptySearchResult
                searchText={debounceSearch}
                onHeaderClick={() => {
                  onHeaderClick()
                  setSearch('')
                }}
              />
            )}

            {/* Topik obrolan */}
            {searchData?.data && (
              <SearchCard
                title={isEng ? 'Thread Chat' : 'Topik Obrolan'}
                isPending={isPendingSearch}
              >
                {searchData?.data &&
                  searchData.data.map((item) => (
                    <TopicObrolan
                      title={item.title}
                      uuid={item.uuid}
                      searchText={debounceSearch}
                      search_uuid={item.uuid}
                      key={item.uuid}
                    />
                  ))}
              </SearchCard>
            )}
          </>
        ) : null}

        {debounceSearch.length === 0 &&
          dataLatest?.map((item, index) => {
            if (item.type === 'koleksi') {
              return (
                <div key={`${index}-k`}>
                  {item.data?.length !== 0 && (
                    <div className="flex justify-between items-end mr-2 my-4 pl-1">
                      <div className="text-[#AEB3BF] text-sm">
                        {t('collection', {
                          keyPrefix: 'chat.chat_text',
                        })}
                      </div>
                      <img
                        src={images.ic_menu_down}
                        alt="dropdown"
                        className={`h-6 cursor-pointer ${
                          showColetion ? '' : 'rotate-180'
                        }`}
                        onClick={() => setShowColetion(!showColetion)}
                      />
                    </div>
                  )}

                  {showColetion &&
                    item.data?.map((items) => (
                      <div key={items.uuid}>
                        <NavCollection
                          items={items}
                          onDeleteCollection={() =>
                            deleteCollection(items.uuid)
                          }
                          onExpand={() => onExpand(items.uuid)}
                        />

                        {items.isExpand &&
                          items.threads?.map((itms) => (
                            <div
                              key={itms.uuid}
                              className="border-l-2 border-blue-sky ml-5 pl-3 pb-2 text-neutral-40 last:mb-4 text-sm"
                              onClick={() => {
                                collectionClick({
                                  ...itms,
                                  activeBy: 'collection',
                                })
                              }}
                            >
                              <NavComponent
                                item={{
                                  ...itms,
                                  title: itms.name,
                                  type: 'collection',
                                }}
                                key={itms.uuid}
                                typeClick={'collection'}
                                onDeleted={() => onDeleted()}
                                isActivated={true}
                              />
                            </div>
                          ))}
                      </div>
                    ))}
                </div>
              )
            } else if (item.type === 'terkini') {
              return (
                <div
                  key={`${index}-t`}
                  className={`${item.data?.length !== 0 ? 'my-4' : ''}`}
                >
                  {item.data?.length !== 0 && (
                    <div className="text-[#AEB3BF] mt-4 text-sm mb-3 pl-1">
                      {t('current', {
                        keyPrefix: 'chat.chat_text',
                      })}
                    </div>
                  )}

                  {item.data?.length !== 0 &&
                    item.data?.map((itms) => (
                      <NavComponent
                        item={{ ...itms, type: 'thread' }}
                        key={itms.uuid}
                        typeClick={'thread'}
                        onDeleted={() => onDeleted()}
                        isActivated={true}
                      />
                    ))}
                </div>
              )
            } else if (item.type === 'riwayat') {
              return (
                <div key={`${index}-r`}>
                  {item.data?.length !== 0 && (
                    <div className="text-[#AEB3BF] mt-4 text-sm mb-3 pl-1">
                      {t('past_chat', {
                        keyPrefix: 'chat.chat_text',
                      })}
                    </div>
                  )}

                  {item.data?.length !== 0 &&
                    item.data?.map((items) => (
                      <NavComponent
                        item={{ ...items, type: 'thread' }}
                        key={items.uuid}
                        typeClick={'thread'}
                        onDeleted={() => onDeleted()}
                        isActivated={true}
                      />
                    ))}
                </div>
              )
            }
          })}
      </div>

      {/* ============================ responsive mobile ============================*/}
      {showNav && (
        <div className="md:hidden h-[100dvh] w-full absolute flex z-50 ">
          <div className="bg-neutral-50 w-3/4 h-full px-2 pt-4">
            <div className="h-[92%] overflow-y-auto pb-4 no-scrollbar">
              <div className="flex justify-between items-center">
                <img
                  src={images.logo_lexilaw}
                  alt="LexiLaw"
                  className="my-4 w-1/2"
                />
                <div className="flex justify-between gap-1">
                  <div
                    className="p-2 bg-white rounded-full flex justify-center border border-neutral-20 w-1/2"
                    onClick={() => setShowSearchNav(!showSearchNav)}
                  >
                    <img src={images.ic_search} alt="search" className="h-4" />
                  </div>
                  <div
                    className="p-2 bg-[#F0EDE8] rounded-full flex justify-center border border-neutral-20 w-1/2"
                    onClick={() => {
                      setShowNav(false)
                      onHeaderClick()
                    }}
                  >
                    <img
                      src={images.ic_add_convo3}
                      alt="add convo"
                      className="h-5 w-[20.11px]"
                    />
                  </div>
                </div>
              </div>

              {dataLatest?.map((item, index) => {
                if (item.type === 'koleksi') {
                  return (
                    <div key={index}>
                      {item.data?.length !== 0 && (
                        <div className="flex justify-between items-center mr-2 mt-4">
                          <div className="text-neutral-40 mb-3">
                            {t('collection', {
                              keyPrefix: 'chat.chat_text',
                            })}
                          </div>
                          <img
                            src={images.ic_menu_down}
                            alt="dropdown"
                            className="h-6"
                          />
                        </div>
                      )}

                      {item.data?.map((items) => (
                        <div key={items.uuid}>
                          <NavCollection
                            items={items}
                            onDeleteCollection={() =>
                              deleteCollection(items.uuid)
                            }
                            onExpand={() => onExpand(items.uuid)}
                          />

                          {/* ==========================Mobile========================== */}
                          {items.isExpand &&
                            items.threads?.map((itms) => (
                              <div
                                key={itms.uuid}
                                className="border-l-2 border-blue-sky ml-5 pl-2.5 pb-2 text-neutral-40 last:mb-4 text-sm"
                                onClick={() => {
                                  collectionClick({
                                    ...itms,
                                    activeBy: 'collection',
                                  })
                                }}
                              >
                                <NavComponent
                                  item={{
                                    ...itms,
                                    title: itms.name,
                                    type: 'collection',
                                  }}
                                  key={items.uuid}
                                  typeClick={'collection'}
                                  onClick={() => {
                                    setShowNav(false)
                                    collectionClick({
                                      ...itms,
                                      activeBy: 'collection',
                                    })
                                  }}
                                  onDeleted={() => onDeleted()}
                                  isActivated={
                                    collection.activeBy === 'collection' ||
                                    (collection.uuid && !collection.activeBy)
                                  }
                                />
                              </div>
                            ))}
                        </div>
                      ))}
                    </div>
                  )
                } else if (item.type === 'terkini') {
                  return (
                    <div
                      key={index}
                      className={`${
                        item.data?.length !== 0 ? 'my-4 mb-3' : ''
                      }`}
                    >
                      {item.data?.length !== 0 && (
                        <div className="text-neutral-40 mt-4 mb-3">
                          {t('current', {
                            keyPrefix: 'chat.chat_text',
                          })}
                        </div>
                      )}

                      {item.data?.length !== 0 &&
                        item.data?.map((itms) => (
                          <NavComponent
                            item={{ ...itms, type: 'thread' }}
                            key={itms.uuid}
                            typeClick={'thread'}
                            onDeleted={() => onDeleted()}
                            isActivated={
                              collection.activeBy === 'thread' ||
                              (collection.uuid && !collection.activeBy)
                            }
                          />
                        ))}
                    </div>
                  )
                } else if (item.type === 'riwayat') {
                  return (
                    <div key={index}>
                      {item.data?.length !== 0 && (
                        <div className="text-neutral-40 mt-4 mb-3">
                          {t('past_chat', {
                            keyPrefix: 'chat.chat_text',
                          })}
                        </div>
                      )}

                      {item.data?.length !== 0 &&
                        item.data?.map((items) => (
                          <NavComponent
                            item={{ ...items, type: 'thread' }}
                            key={items.uuid}
                            typeClick={'thread'}
                            onDeleted={() => onDeleted()}
                            isActivated={
                              collection.activeBy === 'thread' ||
                              (collection.uuid && !collection.activeBy)
                            }
                          />
                        ))}
                    </div>
                  )
                }
              })}
            </div>

            <div className="h-[8%] -mx-2 bg-white flex items-center px-2 justify-between top-shadow z-40">
              <div className="font-semi-bold">
                {userDetail.first_name} {userDetail.last_name}
              </div>
              <div>
                <img
                  className="size-10 rounded-full ring-1 ring-[#2E2C2B]"
                  src={userDetail.image_url}
                  alt="profile"
                  onClick={() => setShowSetting(true)}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null
                    currentTarget.src = images.ic_avatar_placeholder
                  }}
                />
              </div>
            </div>
          </div>

          <div
            className="bg-black-lightest bg-opacity-70 w-1/4 h-full"
            onClick={() => setShowNav(false)}
          />
        </div>
      )}

      {showSetting && (
        <div className="md:hidden absolute w-full h-full bg-white p-4 pt-4 z-50 text-[14px]">
          <div className="flex justify-start gap-3 items-center shadow-md -mx-4 px-4 pb-4">
            <img
              src={images.ic_chevron_left}
              alt="back"
              onClick={() => setShowSetting(false)}
              className="h-6"
            />
            <div className="font-futura-bold text-[20px]">
              {t('setting', {
                keyPrefix: 'chat.profile_menu',
              })}
            </div>
          </div>

          <div className="text-neutral-40 mt-8">
            <div className="px-4 my-2">
              {t('main_menu', {
                keyPrefix: 'chat.profile_menu',
              })}
            </div>
            <div className="border-b border-b-neutral-20 text-sm font-semi-bold">
              <div
                className="px-4 mb-2 text-black-darker cursor-pointer font-medium text-base"
                onClick={() => navigate('/account')}
              >
                {t('my_account', {
                  keyPrefix: 'chat.profile_option',
                })}
              </div>
              <div className="flex justify-between items-center mb-2">
                <div
                  className="px-4 text-black-darker cursor-pointer font-medium text-base"
                  onClick={() => navigate('/my-lawyer')}
                >
                  {t('my_lawyer', {
                    keyPrefix: 'chat.profile_option',
                  })}
                </div>
                <div className="py-0.5 px-2.5 bg-error-lighter text-base mr-2 rounded-full text-white flex items-center justify-center">
                  1
                </div>
              </div>
            </div>
            <div className="px-4 mb-2 mt-2">
              {t('connected', {
                keyPrefix: 'chat.profile_menu',
              })}
            </div>
            <div
              className="flex justify-between items-center border-b border-b-neutral-20 pb-2"
              onClick={() => {
                switch (userDetail?.connect_whatsapp_status) {
                  case 'CONNECTED':
                    break
                  case 'PENDING':
                    setShowSetting(false)
                    setShowPendingWA(true)
                    break
                  default:
                    openModalWAActivation()
                    break
                }
              }}
            >
              <div
                className={`px-4 mb-1 text-black-darker text-[14px] text-base ${
                  userDetail?.connect_whatsapp_status === 'CONNECTED'
                    ? 'font-light'
                    : 'font-medium'
                }`}
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
                className={`md:hidden ${
                  userDetail?.connect_whatsapp_status === 'PENDING' &&
                  'h-4 w-4 mr-4'
                } ${
                  userDetail?.connect_whatsapp_status === 'CONNECTED' &&
                  'h-[26px] w-[26px] mr-2'
                } `}
                onClick={(e) => {
                  if (userDetail?.connect_whatsapp_status === 'CONNECTED') {
                    e.stopPropagation()
                    e.preventDefault()

                    setShowConnectedWA(true)
                  }
                }}
              />
            </div>

            <div className="px-4 my-2">
              {t('configure', {
                keyPrefix: 'chat.profile_menu',
              })}
            </div>
            <div className="mb-1 flex justify-between items-start">
              <div className="px-4 text-black-darker text-base font-medium">
                {t('menu_language', {
                  keyPrefix: 'chat.profile_option',
                })}
              </div>
              <div className="">
                <Toggle labelClassName="!w-[50px]" className="!my-0" />
              </div>
            </div>

            <div
              className="font-semi-bold text-error-base px-6 bg-neutral-60 -mx-1 py-2 text-center rounded-lg text-base mt-8"
              onClick={onLogout}
            >
              Logout
            </div>
          </div>
        </div>
      )}

      <ModalSearch
        show={showSearchNav}
        onHide={() => setShowSearchNav(false)}
        searchText={debounceSearch}
        setShowNav={setShowNav}
        onHeaderClick={onHeaderClick}
      />

      <Modal
        classNameBox={'bg-gray-700/70'}
        contentClassName={'flex justify-center px-4'}
        show={showWhatsAppActivation}
        onHide={() => {
          closeModalWAActivation()
          resetPhoneNumber()
        }}
      >
        <WhatsappActivation
          onHandleSubmit={() => {
            closeModalWAActivation()
            setShowPendingWA(true)
          }}
          onClose={() => {
            closeModalWAActivation()
          }}
          ref={phoneNumberRef}
        />
      </Modal>

      <Modal
        classNameBox={'bg-gray-700/70'}
        contentClassName={''}
        show={showPendingWA}
        onHide={() => {
          setShowPendingWA(false)
        }}
      >
        {showPendingWA && (
          <WhatsAppFitBIt
            onChangeNumber={() => {
              setShowPendingWA(false)
              openModalWAActivation()
            }}
            onCloseButton={() => {
              setShowPendingWA(false)
            }}
            key="Whatsapp-InfoBip-Mobile"
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
        <div className="relative bg-[#F0EDE8] rounded-md py-8 px-2 border border-[#F3E8D0]">
          {/* button close */}
          <div
            className="absolute top-4 right-4 hover:cursor-pointer"
            onClick={() => {
              setShowConnectedWA(false)
            }}
          >
            <img alt="cross" src={images.ic_cross} />
          </div>
          {/* Header */}
          <div className="px-4 my-2">
            <h1 className="font-futura-bold text-[24px] text-dark-50 text-center w-64 mx-auto mt-4">
              {t('chat.profile_menu.connected_whatsapp_heading')}
            </h1>

            <p className="font-medium text-[14px] text-gray-700 text-center my-4">
              {t('chat.profile_menu.connected_whatsapp_description')}
            </p>

            {/* Button Action */}
            <div className="px-2 my-2">
              <button
                className="block rounded-full w-full bg-gray-500 text-center font-medium text-[16px] py-2 border border-[#F3E8D0]/50"
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
        <div className="relative bg-[#F0EDE8] rounded-md py-8 px-2 border border-[#F3E8D0]">
          {/* button close */}
          <div
            className="absolute top-4 right-4 hover:cursor-pointer"
            onClick={() => {
              setShowConnectedWA(false)
            }}
          >
            <img alt="cross" src={images.ic_cross} />
          </div>
          {/* Header */}
          <div className="px-4 my-2">
            <h1 className="font-futura-bold text-[24px] text-dark-50 text-center w-64 mx-auto mt-4">
              {t('chat.profile_menu.connected_whatsapp_heading')}
            </h1>

            <p className="font-medium text-[14px] text-gray-700 text-center my-4">
              {t('chat.profile_menu.connected_whatsapp_description')}
            </p>

            {/* Button Action */}
            <div className="px-2 my-2">
              <button
                className="block rounded-full w-full bg-gray-500 text-center font-medium text-[16px] py-2 border border-[#F3E8D0]/50"
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
    </nav>
  )
}
