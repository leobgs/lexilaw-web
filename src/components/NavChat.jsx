import images from 'assets/images'
import { useEffect, useState } from 'react'
import { Input } from './Input'
import { NavComponent } from './NavComponent'
import { useTranslation } from 'react-i18next'
import { Toggle } from './Toggle/Toggle'
import { LocalStorage } from 'utils'
import { StorageKey } from 'config/storage'
import { useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import { API } from 'config/api'
import { notifyError } from 'hooks/useToas'
import { deleteData } from 'hooks/useRequest'
import { useGlobalContext } from 'hooks/context'

export const NavChat = ({
  onHeaderClick,
  dataLatest = [],
  // onEdit,
  headerText,
  onExpand,
}) => {
  const { collectionClick, collection } = useGlobalContext()
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [showNav, setShowNav] = useState(false)
  const [showSearchNav, setShowSearchNav] = useState(false)
  const [showSetting, setShowSetting] = useState(false)
  const storage = new LocalStorage()
  const navigate = useNavigate()

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

  return (
    <nav
      className={`md:w-3/12 md:py-1 md:h-full flex flex-col ${
        showNav ? '' : 'py-4'
      }`}
    >
      <div className='hidden md:inline'>
        <img src={images.logo_lexilaw} alt='LexiLaw' className='' />
        <div className='flex justify-between gap-2 mr-4 mt-4 w-full'>
          <Input
            onChange={(e) => setSearch(e.value)}
            value={search}
            name='search'
            className='w-10/12'
            placeholder={t('search', {
              keyPrefix: 'chat.chat_text',
            })}
            rowed='w-2/3 mx-auto'
            iconClassName='!w-6'
            icon={images.ic_search}
          />
          <div
            className='bg-neutral-20 w-2/12 rounded-full outline outline-neutral-30 py-1 flex items-center'
            onClick={() => onHeaderClick()}
          >
            <img
              src={images.ic_add_convo}
              alt='add converstaion'
              className='mx-auto'
            />
          </div>
        </div>
      </div>

      <div
        className={`md:hidden flex justify-between px-4 items-center gap-4 ${
          showNav ? ' hidden' : ' inline-block'
        }`}
      >
        <img
          src={images.ic_navbar_hidden}
          alt='navbar hide'
          className='h-4 w-6'
          onClick={() => setShowNav(!showNav)}
        />
        <div className='flex w-full justify-between items-center'>
          <div className='font-futura-bold font-bold text-xl line-clamp-1'>
            {headerText}
          </div>
          <div className='bg-neutral-20 px-3 py-2 rounded-full'>
            <img src={images.ic_attachment_upload} alt='upload' className='' />
          </div>
        </div>
      </div>

      <div className='hidden justify-center md:my-4 md:inline-block h-4/5 overflow-y-auto'>
        {dataLatest?.map((item, index) => {
          if (item.type === 'koleksi') {
            return (
              <div key={`${index}-k`}>
                {item.data.length !== 0 && (
                  <div className='flex justify-between items-end mr-2 my-4'>
                    <div className='text-[#AEB3BF] text-sm'>
                      {t('collection', {
                        keyPrefix: 'chat.chat_text',
                      })}
                    </div>
                    <img
                      src={images.ic_menu_down}
                      alt='dropdown'
                      className='h-6'
                    />
                  </div>
                )}

                {item.data?.map((items) => (
                  <div key={items.uuid}>
                    <div
                      className={`flex justify-start gap-2 items-center text-sm text-neutral-40 mb-2 mr-4 py-1 ${
                        items.isExpand
                          ? 'bg-blue-sky rounded-2xl pl-2 -ml-2'
                          : ''
                      }`}
                      onClick={() => onExpand(items.uuid)}
                    >
                      <img
                        src={
                          items.isExpand
                            ? images.ic_folder_colection_active
                            : images.ic_folder_colection
                        }
                        alt='ic_folder_colection'
                        className='h-7 w-7'
                      />
                      <div>{items.label}</div>
                    </div>

                    {items.isExpand &&
                      items.childs?.map((itms) => (
                        <div
                          key={itms.uuid}
                          className='border-l-2 border-blue-sky ml-3.5 pl-5 pb-2 text-neutral-40 last:mb-4 text-sm'
                          onClick={() => {
                            collectionClick(itms)
                            setShowNav(false)
                          }}
                        >
                          {itms.message}
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
                className={`${item.data.length !== 0 ? 'my-4' : ''}`}
              >
                {item.data.length !== 0 && (
                  <div className='text-[#AEB3BF] mt-4'>
                    {' '}
                    {t('current', {
                      keyPrefix: 'chat.chat_text',
                    })}
                  </div>
                )}

                {item.data.length !== 0 &&
                  item.data?.map((itms) => (
                    <NavComponent
                      item={itms}
                      key={itms.uuid}
                      // onEdit={(e) => onEdit(e)}
                    />
                  ))}
              </div>
            )
          } else if (item.type === 'riwayat') {
            return (
              <div key={`${index}-r`}>
                {item.data.length !== 0 && (
                  <div className='text-[#AEB3BF] mt-4 text-sm'>
                    {t('past_chat', {
                      keyPrefix: 'chat.chat_text',
                    })}
                  </div>
                )}

                {item.data.length !== 0 &&
                  item.data?.map((items) => (
                    <NavComponent
                      item={items}
                      key={items.uuid}
                      // onEdit={(e) => onEdit(e)}
                    />
                  ))}
              </div>
            )
          }
        })}
      </div>

      {/* <div className='mt-20 flex-col justify-center hidden md:flex'>
        <img
          src={images.ic_chat_bubbles}
          alt='chat bubbles'
          className='w-24 h-20 mx-auto'
        />
        <div className='mx-auto mt-2 text-center md:w-4/5'>
          Kamu belum memiliki topik apapun,{' '}
          <span className='font-semi-bold'>Mulai Obrolan Baru!</span>
        </div>
      </div> */}

      {showNav && (
        <div className='md:hidden h-full w-full absolute flex z-50 '>
          <div className='bg-neutral-50 w-3/4 h-full px-2 pt-4'>
            <div className='h-[92%] overflow-y-auto pb-4'>
              <div className='flex justify-between items-center'>
                <img
                  src={images.logo_lexilaw}
                  alt='LexiLaw'
                  className='my-4 w-1/2'
                />
                <div
                  className='p-2 bg-white rounded-full flex justify-center border border-neutral-20'
                  onClick={() => setShowSearchNav(!showSearchNav)}
                >
                  <img src={images.ic_search} alt='search' className='h-4' />
                </div>
              </div>

              {showSearchNav && (
                <div className='flex justify-between gap-2'>
                  <Input
                    onChange={(e) => setSearch(e.value)}
                    value={search}
                    name='search'
                    className='w-10/12'
                    inputClass='!rounded-full'
                    placeholder={t('search', {
                      keyPrefix: 'chat.chat_text',
                    })}
                    rowed
                    iconClassName='!w-6'
                    icon={images.ic_search}
                  />
                  <div
                    className='bg-neutral-20 w-2/12 rounded-xl'
                    onClick={() => onHeaderClick(true)}
                  >
                    <img
                      src={images.ic_add_convo}
                      alt='add converstaion'
                      className='my-2 mx-auto'
                    />
                  </div>
                </div>
              )}

              {dataLatest?.map((item, index) => {
                if (item.type === 'koleksi') {
                  return (
                    <div key={index}>
                      {item.data.length !== 0 && (
                        <div className='flex justify-between items-end mr-2 my-4'>
                          <div className='text-neutral-40'>Koleksi</div>
                          <img
                            src={images.ic_menu_down}
                            alt='dropdown'
                            className='h-6'
                          />
                        </div>
                      )}

                      {item.data?.map((items) => (
                        <div key={items.uuid}>
                          <div
                            className={`flex justify-start gap-2 items-center text-sm text-neutral-40 mb-2 mr-4 py-1 ${
                              items.isExpand
                                ? 'bg-blue-sky rounded-2xl pl-2 -ml-2'
                                : ''
                            }`}
                            onClick={() => onExpand(items.uuid)}
                          >
                            <img
                              src={
                                items.isExpand
                                  ? images.ic_folder_colection_active
                                  : images.ic_folder_colection
                              }
                              alt='ic_folder_colection'
                              className='h-7 w-7'
                            />
                            <div>{items.label}</div>
                          </div>

                          {items.isExpand &&
                            items.childs?.map((itms) => (
                              <div
                                key={itms.uuid}
                                className='border-l-2 border-blue-sky ml-3.5 pl-4 pb-2 text-neutral-40 last:mb-4 text-sm'
                                onClick={() => {
                                  collectionClick(itms.title)
                                  setShowNav(false)
                                }}
                              >
                                {itms.title}
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
                      className={`${item.data.length !== 0 ? 'my-4' : ''}`}
                    >
                      {item.data.length !== 0 && (
                        <div className='text-neutral-40 mt-4'>Terkini</div>
                      )}

                      {item.data.length !== 0 &&
                        item.data?.map((itms) => (
                          <NavComponent
                            item={itms}
                            key={itms.uuid}
                            // onEdit={(e) => onEdit(e)}
                          />
                        ))}
                    </div>
                  )
                } else if (item.type === 'riwayat') {
                  return (
                    <div key={index}>
                      {item.data.length !== 0 && (
                        <div className='text-neutral-40 mt-4'>
                          Obrolan Lampau
                        </div>
                      )}

                      {item.data.length !== 0 &&
                        item.data?.map((items) => (
                          <NavComponent
                            item={items}
                            key={items.uuid}
                            // onClickColection={() => {
                            //   onClickColection(item.title)
                            //   setShowNav(false)
                            // }}
                            // onEdit={(e) => onEdit(e)}
                            // onSetEdit={() => onSetEdit(item.uuid)}
                          />
                        ))}
                    </div>
                  )
                }
              })}
            </div>

            <div className='h-[8%] -mx-2 bg-white flex items-center px-2 justify-between top-shadow z-40'>
              <div className='font-semi-bold'>Prima Kusumo</div>
              <div>
                <img
                  src={images.ic_thumbnail_profile}
                  alt='profile'
                  onClick={() => setShowSetting(true)}
                />
              </div>
            </div>
          </div>

          <div
            className='bg-black-lightest bg-opacity-70 w-1/4 h-full'
            onClick={() => setShowNav(false)}
          />
        </div>
      )}

      {showSetting && (
        <div className='md:hidden absolute w-full h-full bg-white  p-4 pt-8 z-50'>
          <div className='flex justify-start gap-4 items-center shadow-md -mx-4 px-4 pb-4'>
            <img
              src={images.ic_chevron_left}
              alt='back'
              onClick={() => setShowSetting(false)}
              className='h-6'
            />
            <div className='text-xl font-semi-bold'>Setting</div>
          </div>

          <div className='text-neutral-40 mt-8'>
            <div className='px-4 my-2'>
              {t('main_menu', {
                keyPrefix: 'chat.profile_menu',
              })}
            </div>
            <div className='border-b border-b-neutral-20 text-base font-semi-bold'>
              <div className='px-4 mb-2 text-black-darker'>
                {t('my_account', {
                  keyPrefix: 'chat.profile_option',
                })}
              </div>
              <div className='flex justify-between items-center mb-2'>
                <div
                  className='px-4 text-black-darker'
                  onClick={() => navigate('/my-lawyer')}
                >
                  {t('my_lawyer', {
                    keyPrefix: 'chat.profile_option',
                  })}
                </div>
                <div className='py-0.5 px-2.5 bg-error-lighter text-base mr-2 rounded-full text-white flex items-center justify-center'>
                  1
                </div>
              </div>
            </div>
            <div className='px-4 mb-2 mt-2'>
              {t('connected', {
                keyPrefix: 'chat.profile_menu',
              })}
            </div>
            <div className='flex justify-between items-center border-b border-b-neutral-20'>
              <div className='px-4 mb-1 text-black-darker text-base font-semi-bold pb-2'>
                {t('wa_activation', {
                  keyPrefix: 'chat.profile_option',
                })}
              </div>
              <img
                src={images.ic_arrow_cornering}
                alt='arrow'
                className='h-2.5 w-2.5 md:hidden'
              />
            </div>

            <div className='px-4 my-2'>
              {t('configure', {
                keyPrefix: 'chat.profile_menu',
              })}
            </div>
            <div className='mb-1 flex justify-between items-start'>
              <div className='px-4 text-black-darker text-base font-semi-bold'>
                {t('menu_language', {
                  keyPrefix: 'chat.profile_option',
                })}
              </div>
              <div className=''>
                <Toggle labelClassName='!w-[50px]' className='!my-0' />
              </div>
            </div>

            <div
              className='font-semi-bold text-error-base px-6 bg-neutral-60 -mx-1 py-2 text-center rounded-lg text-base mt-8'
              onClick={onLogout}
            >
              Logout
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
