import images from 'assets/images'
import { CardFileComponent } from './CardFileComponent'
import { SwipeableDiv } from './SwipeableDiv'
import { useTranslation } from 'react-i18next'

export const CardFileMobile = ({
  show,
  data,
  onChangeVisibility = () => {},
}) => {
  const { t } = useTranslation()

  return (
    <SwipeableDiv
      visibility={show}
      onChangeVisibility={() => onChangeVisibility()}
      className=''
    >
      <div className='bg-gradient-card-file shadow-lg rounded-t-xl p-4 h-[92%]'>
        <div className='overflow-y-auto no-scrollbar h-full'>
          <div className='flex items-center my-4 gap-2 sticky'>
            <img src={images.ic_info_file} alt='upload' className='h-5 w-5' />
            <p className='text-xs'>
              {t('lawyer_detail', {
                keyPrefix: 'lawyer_document',
              })}
            </p>
          </div>

          {data?.map((item, index) =>
            item.from === 'SYSTEM' ? (
              <div key={`${index}-s`} className='mt-4'>
                <p className='text-secondary-base text-sm mb-2.5'>
                  {t('ai_result', {
                    keyPrefix: 'lawyer_document',
                  })}
                </p>

                <div className=''>
                  {item.data?.map((item, index) => (
                    <CardFileComponent item={item} key={item.id} />
                  ))}
                </div>
              </div>
            ) : item.from === 'USER' ? (
              <div className='mt-5' key={`${index}-u`}>
                <p className='text-secondary-base text-sm mb-2.5'>
                  {t('lawyer_result', {
                    keyPrefix: 'lawyer_document',
                  })}
                </p>

                <div className=''>
                  {item.data?.map((item) => (
                    <CardFileComponent item={item} key={item.id} />
                  ))}
                </div>
              </div>
            ) : (
              ''
            )
          )}
        </div>

        <div className='bg-[#585858] w-full flex justify-between items-center py-2 rounded-md mt-4 px-4'>
          <div className='text-white'>
            <p className='font-semi-bold'>Calvin Koss .SH</p>
            <p className='text-xs font-regular text-[#969090]'>Jakarta</p>
          </div>
          <div className='bg-blue-sky text-xs items-center flex rounded-3xl p-2 h-7'>
            Cek Jadwal
          </div>
        </div>
      </div>
    </SwipeableDiv>
  )
}
