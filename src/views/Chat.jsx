import images from 'assets/images'
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
import { useMutation, useQuery } from 'react-query'
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
  const { currentLanguage } = useGlobalContext()
  const [isDisplayImage, setDisplayImage] = useState()
  const [isHeader, setIsHeader] = useState(true)
  const [dataMessage, setMessage] = useState([
    { type: 'koleksi', data: KOLEKSI_CHAT },
    { type: 'terkini', data: OROLAN_TERKINI },
    { type: 'riwayat', data: [...RIWAYAT_OROLAN] },
  ])
  const [renderedMessage, setRenderedMessage] = useState(null)
  const [headerText, setHeaderText] = useState('Obrolan Baru')

  useQuery(['newest_thread'], () => getData(API.THREAD_LIST), {
    onSettled: (datas) => {
      if (datas?.status === 'Success') {
        const { data } = datas
        dataMessage?.map((item) => {
          if (item.type === 'terkini') {
            setMessage([
              { type: 'koleksi', data: KOLEKSI_CHAT },
              {
                type: 'terkini',
                data: data ? [...data, ...OROLAN_TERKINI] : [...OROLAN_TERKINI],
              },
              { type: 'riwayat', data: [...RIWAYAT_OROLAN] },
            ])
          }
        })
      } else {
        console.log('error', datas)
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

  useEffect(() => {
    let activeData = null

    dataMessage?.map((itm) =>
      itm.data?.map((items) => {
        if (!items.value) {
          if (items.isActive) {
            activeData = items
          }
        } else if (items.value) {
          items.childs?.map((itms) => {
            if (itms.isActive) {
              activeData = itms
            }
          })
        }
      })
    )

    setRenderedMessage(activeData?.chat ?? null)
  }, [dataMessage])

  const handleAddChat = (e) => {
    let dataTerkini = dataMessage.find((itm) => itm.type === 'terkini')

    if (dataTerkini?.data?.length === 0) {
      dataTerkini.data = [
        {
          title: e.text,
          chat: [e],
          isActive: true,
          id: Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000,
        },
      ]
      setIsHeader(false)
    } else if (dataTerkini?.data?.length !== 0 && !isHeader) {
      console.log(dataTerkini?.data)
      dataTerkini?.data?.map((item) => {
        if (item.isActive) {
          if (item.chat) {
            return (item.chat = [
              ...item?.chat,
              {
                ...e,
                id:
                  Math.floor(Math.random() * (99999999 - 10000000 + 1)) +
                  10000000,
              },
            ])
          } else {
            item.chat = [
              {
                ...e,
                id:
                  Math.floor(Math.random() * (99999999 - 10000000 + 1)) +
                  10000000,
              },
            ]
          }
        }
      })
    } else if (dataTerkini?.data?.length !== 0 && isHeader) {
      dataTerkini.data = [
        ...dataTerkini.data,
        {
          title: e.text,
          id: Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000,
          chat: [
            e,
            {
              text: `Sengketa lahan girik merujuk pada konflik atau perselisihan yang berkaitan dengan hak kepemilikan tanah yang diakui melalui girik. Girik adalah bentuk sertifikat tanah tradisional di Indonesia yang mengakui hak kepemilikan tanah secara turun-temurun dalam masyarakat adat atau lokal.
    Sengketa lahan girik dapat muncul karena beberapa alasan, termasuk ketidakjelasan batas tanah, klaim ganda terhadap lahan, perubahan kebijakan pemerintah terkait tanah, atau perselisihan warisan antara keluarga atau komunitas. Sengketa semacam itu seringkali kompleks dan memerlukan penyelesaian yang cermat dan adil untuk menghindari konflik lebih lanjut.
    Penyelesaian sengketa lahan girik biasanya melibatkan berbagai pihak, termasuk pemilik tanah, pemerintah daerah, badan hukum, dan masyarakat setempat. Prosesnya bisa melalui mediasi, arbitrase, atau bahkan pengadilan tergantung pada tingkat kompleksitas dan kesepakatan antara pihak-pihak terlibat.
    Di Indonesia, pemerintah telah berupaya untuk mengatasi masalah sengketa lahan girik melalui berbagai kebijakan dan program reformasi agraria. Namun, tantangan dalam penyelesaian sengketa lahan girik masih ada dan seringkali memerlukan pendekatan yang komprehensif dan berkelanjutan.`,
              from: 'Lexi',
              id:
                Math.floor(Math.random() * (99999999 - 10000000 + 1)) +
                10000000,
            },
          ],
          isActive: true,
          id: Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000,
        },
      ]

      dataTerkini?.data?.map((item) => {
        if (item.title === e.text) {
          return (item.isActive = true)
        } else {
          return (item.isActive = false)
        }
      })
      setIsHeader(false)
    }
    dataMessage?.map((item) => {
      if (item.type === 'terkini') {
        item.data = dataTerkini.data
      } else {
        item.data?.map((itm) => (itm.isActive = false))
      }
    })
    setMessage([...dataMessage])
  }

  const onClickColection = (e) => {
    dataMessage?.map((item) => {
      item.data?.map((itm) => {
        if (!itm.value) {
          if (itm.title === e) {
            itm.isActive = true
          } else {
            itm.isActive = false
          }
        } else if (itm.value) {
          itm.childs?.map((itms) => {
            if (itms.title === e) {
              itms.isActive = true
            } else {
              itms.isActive = false
            }
          })
        }
      })
    })
    setMessage([...dataMessage])
    setHeaderText(e)
    setIsHeader(false)
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
      data: category.data.filter((item) => item.id !== e),
    }))

    setMessage(newData)
  }

  const handleOnExpand = (id) => {
    dataMessage?.map((item) => {
      if (item.type === 'koleksi') {
        item.data?.map((items) => {
          if (items.id === id) {
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
    <div className='pt-4 bg-primary-base h-screen md:p-4'>
      <div className='h-calculate md:flex md:justify-between md:mt-12'>
        <NavChat
          onHeaderClick={() => setIsHeader(true)}
          dataLatest={dataMessage}
          onClickColection={(e) => onClickColection(e)}
          onEdit={(e) => onEdit(e)}
          onDelete={(e) => onDelete(e)}
          headerText={headerText}
          onExpand={(e) => handleOnExpand(e)}
        />

        <main className='h-full p-4 md:rounded-xl md:w-10/12 md:bg-white border-t border-neutral-20'>
          <div className='hidden justify-between items-center md:border-b md:border-b-neutral-30 md:flex md:pb-4 md:-mx-4 md:px-8'>
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
          </div>
          <div
            className={`flex h-[96%] md:h-[92%] xl:h-[92%] flex-col select-text`}
          >
            <AutoScrollingDiv
              content={
                dataMessage?.length !== 0 && !isHeader ? (
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
