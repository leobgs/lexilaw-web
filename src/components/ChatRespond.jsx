import images from 'assets/images'
import { copyToClipboard } from 'utils'
import { Button } from './Button/Button'
import { useState } from 'react'
import { LawyerRecommendation } from './LawyerRecommendation'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { getData } from 'hooks/useRequest'
import { API } from 'config/api'
import { notifyError } from 'hooks/useToas'

export const ChatRespond = ({ item, index }) => {
  const [showLawyerRecommendation, setLawyerRecommendation] = useState(false)
  const { t } = useTranslation()
  const [dataLawyer, setDataLawyer] = useState([]);
  useQuery(
    ["lawyer_recomendation"],
    () => getData(API.LAWYER_RECOMMENDATION, { lawyer_uuid: ["71059093-d800-46d5-89d7-a5f5848a9272", "71059093-d800-46d5-89d7-a5f5848a9271", "ce291454-e0e6-4cff-b78f-81fbc2c80f36"] }),
    {
      enabled: item.type === "recommendation",
      onSettled: (data) => {
        if (data.status === "Success") {
          setDataLawyer(data.data);
        } else {
          notifyError(data?.message);
        }
      },
    }
  );

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
                    {moreValue > 0 &&  <div className='ml-3 font-semi-bold text-neutral-40 hidden md:inline-block'>
                      +{moreValue} more
                    </div>}
                  </div>
                  <div className='text-sm text-neutral-40'>
                    {dataLawyer[0]?.city}
                  </div>
                  {moreValue > 0 && <div className='font-semi-bold text-neutral-40 md:hidden'>
                    +{moreValue} more
                  </div>}
                </div>
              </div>
              <img src={images.ic_arrow_cornering} alt='' />
            </div>
            <div className='mb-2 mt-4 flex flex-col md:flex-row gap-2'>
              <Button
                onClick={() => console.log('pemesanan')}
                className='border-blue-dark border rounded-3xl bg-blue-sky gap-2 !py-0 !font-regular !h-[2rem]'
                iconLeft={images.ic_arrow_cornering}
                iconClassName='!h-4 !w-4 !-ml-1'
                label={t('place_an_order', { keyPrefix: 'chat_respond' })}
              />
              <Button
                onClick={() => setLawyerRecommendation(true)}
                className='border-blue-dark border rounded-3xl gap-2 !py-0 !font-regular !h-[2rem]'
                iconLeft={images.ic_arrow_cornering}
                iconClassName='!h-4 !w-4 !-ml-1'
                label={t('another_option', { keyPrefix: 'chat_respond' })}
              />
            </div>
            <LawyerRecommendation
              isShow={showLawyerRecommendation}
              onHide={() => setLawyerRecommendation(false)}
              dataLawyer={dataLawyer}
              thread_uuid={ item?.thread_uuid }
            />
          </div>
        )

      default:
        return (
          <div className='border-t border-neutral-70 -mx-4 -ml-20 px-4 md:border-t-0 md:-mx-4 mt-2'>
            {index === 1 && (
              <div className='my-4 justify-between flex'>
                <Button
                  onClick={() => console.log('switch cassual language')}
                  className='border-blue-dark border rounded-3xl bg-blue-sky gap-2 !py-0 !font-regular !h-[2rem]'
                  iconLeft={images.ic_change_style_lang}
                  iconClassName='!h-4 !w-3'
                  label={t('switch_lang', {
                    keyPrefix: 'chat.chat_text',
                  })}
                />

                <div className='flex justify-between items-center'>
                  <div
                    className='hidden md:inline-block bg-neutral-50 p-2 rounded-full'
                    onClick={() => copyToClipboard(item.message)}
                  >
                    <img src={images.ic_copy} alt='copy' className='h-4 w-4' />
                  </div>
                  <div className='bg-neutral-50 p-2 rounded-full'>
                    <img src={images.ic_redo} alt='redo' className='h-4 w-4' />
                  </div>
                </div>
              </div>
            )}
          </div>
        )
    }
  }

  return <>{renderMessage(item.type)}</>
}
