import images from 'assets/images'
import { copyToClipboard } from 'utils'
import { useState } from 'react'
import { LawyerRecommendation } from './LawyerRecommendation'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { getData } from 'hooks/useRequest'
import { API } from 'config/api'
import { notifyError } from 'hooks/useToas'

export const ChatRespond = ({
  item,
  index,
  onClickChangeLangStyle,
  isLast,
  onLike = () => {},
  onDislike = () => {},
}) => {
  const [showLawyerRecommendation, setLawyerRecommendation] = useState(false)
  const { t } = useTranslation()
  const [dataLawyer, setDataLawyer] = useState([])

  useQuery(
    ['lawyer_recomendation'],
    () =>
      getData(API.LAWYER_RECOMMENDATION, {
        lawyer_uuid: [
          '71059093-d800-46d5-89d7-a5f5848a9272',
          '71059093-d800-46d5-89d7-a5f5848a9271',
          'ce291454-e0e6-4cff-b78f-81fbc2c80f36',
        ],
      }),
    {
      enabled: item.type === 'recommendation',
      onSettled: (data) => {
        if (data.status === 'Success') {
          setDataLawyer(data.data)
        } else {
          notifyError(data?.message)
        }
      },
    }
  )

  const renderMessage = (type) => {
    switch (type) {
      case 'recommendation':
        const moreValue = dataLawyer?.length - 1

        return (
          <div className='mx-4 -ml-10 px-4 md:border-t-0 md:-mx-4 mt-2'>
            <div
              className='bg-[#EFEDE8] p-4 rounded-lg md:w-2/3 flex gap-3 items-start justify-between border border-[#E0DCD4] shadow-md'
              onClick={() => setLawyerRecommendation(true)}
            >
              <div className='flex items-center'>
                <img
                  src={dataLawyer[0]?.image_url}
                  alt='lawyer'
                  className='h-9 w-9 rounded-full'
                />
                <div className='ml-3'>
                  <div className='flex items-center'>
                    <div className='text-secondary-base font-semi-bold'>
                      {dataLawyer[0]?.first_name} {dataLawyer[0]?.last_name}
                    </div>
                    {moreValue > 0 && (
                      <div className='ml-3 font-semi-bold text-neutral-40 hidden md:inline-block'>
                        +{moreValue} more
                      </div>
                    )}
                  </div>
                  <div className='text-sm text-neutral-40'>
                    {dataLawyer[0]?.city}
                  </div>
                  {moreValue > 0 && (
                    <div className='font-semi-bold text-neutral-40 md:hidden'>
                      +{moreValue} more
                    </div>
                  )}
                </div>
              </div>
              <img src={images.ic_arrow_cornering} alt='' />
            </div>

            <div className='-mx-8'>
              <div className='mb-2 mt-4 flex flex-row justi gap-2 border-t border-t-[#D8D8D8] pt-4 md:border-none md:pt-0'>
                <button
                  className='border-blue-dark border rounded-3xl bg-blue-sky gap-2 !py-0 !font-regular !h-[2rem] flex items-center text-sm px-2'
                  onClick={() => console.log('pemesanan')}
                >
                  <img src={images.ic_arrow_cornering} alt='place order' />
                  <div>
                    {t('place_an_order', { keyPrefix: 'chat_respond' })}
                  </div>
                </button>

                <button
                  className='border-[#E0DBD1] bg-white border rounded-3xl gap-2 !py-0 !font-regular !h-[2rem] flex items-center text-sm px-2'
                  onClick={() => console.log('another option')}
                >
                  <img src={images.ic_arrow_cornering} alt='place order' />
                  <div>
                    {t('another_option', { keyPrefix: 'chat_respond' })}
                  </div>
                </button>
              </div>
            </div>

            <LawyerRecommendation
              isShow={showLawyerRecommendation}
              onHide={() => setLawyerRecommendation(false)}
              dataLawyer={dataLawyer}
              thread_uuid={item?.thread_uuid}
            />
          </div>
        )

      default:
        return (
          <div className=' -mx-4 -ml-20 px-4 md:border-t-0 md:-mx-4 mt-2 flex justify-between flex-col md:flex-row'>
            {
              <div className='border-t border-neutral-30 px-2 md:hidden pb-1.5' />
            }
            {index === 1 ? (
              <div className='my-4'>
                <div
                  className='border-blue-dark border rounded-3xl bg-blue-sky gap-2 py-1.5 font-regular text-sm flex items-center px-2 text-center md:w-full cursor-pointer'
                  onClick={() =>
                    onClickChangeLangStyle(
                      t('switch_lang', {
                        keyPrefix: 'chat.chat_text',
                      })
                    )
                  }
                >
                  <img
                    src={images.ic_change_style_lang}
                    alt='change style'
                    className='h-4 w-3'
                  />
                  {t('switch_lang', {
                    keyPrefix: 'chat.chat_text',
                  })}
                </div>
              </div>
            ) : index === 4 ? (
              <div className='my-4 flex gap-2 no-scrollbar overflow-x-auto w-full flex-col md:flex-row'>
                <div
                  className='border-blue-dark border rounded-3xl bg-blue-sky gap-2 py-1.5 font-regular text-sm flex items-center px-2 text-center sm:basis-1/3 cursor-pointer'
                  onClick={() =>
                    onClickChangeLangStyle(
                      t('more_detail', {
                        keyPrefix: 'chat.chat_text',
                      })
                    )
                  }
                >
                  <img
                    src={images.ic_change_style_lang}
                    alt='change style'
                    className='h-4 w-3'
                  />
                  {t('more_detail', {
                    keyPrefix: 'chat.chat_text',
                  })}
                </div>

                <div
                  className='border-[#E0DBD1] border rounded-3xl bg-white gap-2 py-1.5 font-regular text-sm flex items-center px-2 text-center cursor-pointer'
                  onClick={() =>
                    onClickChangeLangStyle(
                      t('fit_lang', {
                        keyPrefix: 'chat.chat_text',
                      })
                    )
                  }
                >
                  <img
                    src={images.ic_change_style_lang}
                    alt='change style'
                    className='h-4 w-3'
                  />
                  {t('fit_lang', {
                    keyPrefix: 'chat.chat_text',
                  })}
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        )
    }
  }

  return (
    <>
      {renderMessage(item.type)}

      <div className='flex md:justify-between items-center float-end'>
        <div className='flex'>
          <img
            src={
              item.reaction === true ? images.ic_active_like : images.ic_like
            }
            alt='like'
            className='h-7 w-7 mx-1 shadow-sm rounded-full'
            // onClick={item.reaction ? void 0 : () => onLike()}
            onClick={() => onLike()}
          />

          <img
            src={
              item.reaction === false
                ? images.ic_active_dislike
                : images.ic_dislike
            }
            alt='dislike'
            className='h-7 w-7 mx-1 shadow-sm rounded-full'
            // onClick={item.reaction ? void 0 : () => onDislike()}
            onClick={() => onDislike()}
          />
        </div>

        <div
          className='bg-neutral-50 rounded-full border border-[#E7E7E7] flex justify-center mx-1.5 shadow-sm'
          onClick={() => copyToClipboard({ text: item.message })}
        >
          <img
            src={images.ic_copy}
            alt='copy'
            className='h-4 w-4 m-0.5 mx-2 my-1'
          />
        </div>

        {(isLast || item.type === 'recommendation') && (
          <div className='bg-neutral-50 rounded-full border border-[#E7E7E7] flex justify-center shadow-sm'>
            <img
              src={images.ic_redo}
              alt='redo'
              className='h-4 w-4 m-0.5 mx-2 my-1'
            />
          </div>
        )}
      </div>
    </>
  )
}
