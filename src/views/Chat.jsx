import images from 'assets/images'
import { InputChat, NavChat, QuestionCard } from 'components'
import { AutoScrollingDiv } from 'components/AutoScrollDiv'
import { ChatCard } from 'components/ChatCard'
import { useEffect, useState } from 'react'
import { DEFAULT_QUESTION, OROLAN_TERKINI } from 'utils/dummy'

export const Chat = () => {
  const [isDisplayImage, setDisplayImage] = useState()
  const [isHeader, setIsHeader] = useState(false)
  const [dataMessage, setMessage] = useState(OROLAN_TERKINI)
  const [renderedMessage, setRenderedMessage] = useState(null)
  const [headerText, setHeaderText] = useState('Obrolan Baru')

  useEffect(() => {
    const activeMessage = dataMessage?.find((itm) => itm.isActive)
    setRenderedMessage(activeMessage?.chat ?? null)
  }, [dataMessage])

  const handleAddChat = (e) => {
    if (dataMessage?.length === 0) {
      setMessage([...dataMessage, { text: e.text, chat: [e], isActive: true }])
    } else if (dataMessage?.length !== 0 && !isHeader) {
      dataMessage?.map((item) => {
        if (item.isActive) {
          item.chat = [...item.chat, e]
        }
      })
      setMessage([...dataMessage])
    } else if (dataMessage?.length !== 0 && isHeader) {
      setMessage([
        ...dataMessage,
        {
          text: e.text,
          chat: [
            e,
            {
              text: `Sengketa lahan girik merujuk pada konflik atau perselisihan yang berkaitan dengan hak kepemilikan tanah yang diakui melalui girik. Girik adalah bentuk sertifikat tanah tradisional di Indonesia yang mengakui hak kepemilikan tanah secara turun-temurun dalam masyarakat adat atau lokal.
      Sengketa lahan girik dapat muncul karena beberapa alasan, termasuk ketidakjelasan batas tanah, klaim ganda terhadap lahan, perubahan kebijakan pemerintah terkait tanah, atau perselisihan warisan antara keluarga atau komunitas. Sengketa semacam itu seringkali kompleks dan memerlukan penyelesaian yang cermat dan adil untuk menghindari konflik lebih lanjut.
      Penyelesaian sengketa lahan girik biasanya melibatkan berbagai pihak, termasuk pemilik tanah, pemerintah daerah, badan hukum, dan masyarakat setempat. Prosesnya bisa melalui mediasi, arbitrase, atau bahkan pengadilan tergantung pada tingkat kompleksitas dan kesepakatan antara pihak-pihak terlibat.
      Di Indonesia, pemerintah telah berupaya untuk mengatasi masalah sengketa lahan girik melalui berbagai kebijakan dan program reformasi agraria. Namun, tantangan dalam penyelesaian sengketa lahan girik masih ada dan seringkali memerlukan pendekatan yang komprehensif dan berkelanjutan.`,
              from: 'Lexi',
            },
          ],
          isActive: true,
        },
      ])
      dataMessage?.map((item) => {
        if (item.text === e.text) {
          item.isActive = true
        } else {
          item.isActive = false
        }
      })
      setIsHeader(false)
    }
  }

  const onClickColection = (e) => {
    dataMessage?.map((item) => {
      if (item.text === e) {
        item.isActive = true
      } else {
        item.isActive = false
      }
    })
    setMessage([...dataMessage])
    setHeaderText(e)
    setIsHeader(false)
  }

  const onEdit = (e) => {
    dataMessage?.map((item) => {
      if (item.isActive) {
        item.text = e
      }
    })
    setMessage([...dataMessage])
  }

  const onDelete = (e) => {
    let newData = dataMessage?.filter((itm) => itm.text !== e)
    setMessage(newData)
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
