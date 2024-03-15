import images from 'assets/images'
import { InputChat, NavChat, QuestionCard } from 'components'
import { AutoScrollingDiv } from 'components/AutoScrollDiv'
import { ChatCard } from 'components/ChatCard'
import { useEffect, useState } from 'react'
import {
  DEFAULT_QUESTION,
  KOLEKSI_CHAT,
  OROLAN_TERKINI,
  RIWAYAT_OROLAN,
} from 'utils/dummy'

export const Chat = () => {
  const [isDisplayImage, setDisplayImage] = useState()
  const [isHeader, setIsHeader] = useState(true)
  const [dataMessage, setMessage] = useState([
    { type: 'koleksi', data: KOLEKSI_CHAT },
    { type: 'terkini', data: OROLAN_TERKINI },
    { type: 'riwayat', data: [...RIWAYAT_OROLAN] },
  ])
  const [renderedMessage, setRenderedMessage] = useState(null)
  const [headerText, setHeaderText] = useState('Obrolan Baru')

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
      dataTerkini?.data?.map((item) => {
        if (item.isActive) {
          return (item.chat = [
            ...item.chat,
            {
              ...e,
              id:
                Math.floor(Math.random() * (99999999 - 10000000 + 1)) +
                10000000,
            },
          ])
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
              <div className='font-futura-bolds font-bold'>{headerText}</div>
            </div>
            <img src={images.ic_thumbnail_profile} alt='profile' />
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
