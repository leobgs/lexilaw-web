import images from 'assets/images'
import { useTranslation } from 'react-i18next'
import { CardDocument } from './CardDocument'
import clsx from 'clsx'

export const CardFileDocument = ({ data, lawyer, lawyer_data, className }) => {
  const { t } = useTranslation()

  return (
    <div
      className={clsx(
        'bg-gradient-card-file h-[99%] w-[320px] mt-2 shadow-lg rounded-xl hidden md:flex flex-col px-4',
        className
      )}
    >
      <div className="overflow-y-auto no-scrollbar">
        <div className="flex items-center my-4 gap-2 sticky">
          <img src={images.ic_info_file} alt="upload" className="h-5 w-5" />
          <p className="text-xs">
            {t('lawyer_detail', {
              keyPrefix: 'lawyer_document',
            })}{' '}
          </p>
        </div>

        {/* Untuk saat ini hasil ai belum ada  */}
        {/* maka dari itu ai_result masih saya hidden */}
        {data?.map((item, index) =>
          item.from === 'SYSTEM' && false ? (
            <div key={`${index}-s`} className="mt-4">
              <p className="text-secondary-base text-sm mb-2.5">
                {t('ai_result', {
                  keyPrefix: 'lawyer_document',
                })}
              </p>

              <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                {item.data?.map((item, index) => (
                  <CardDocument item={item} key={item.id} />
                ))}
              </div>
            </div>
          ) : item.from === 'USER' ? (
            <div className="mt-5" key={`${index}-u`}>
              <p className="text-secondary-base text-sm mb-2.5 font-medium">
                {t('lawyer_result', {
                  keyPrefix: 'lawyer_document',
                })}
              </p>

              <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                {lawyer_data?.map((item) => (
                  <CardDocument key={item.uuid} item={item} />
                ))}
              </div>
            </div>
          ) : (
            ''
          )
        )}
      </div>

      {/* Divider */}
      <div className='flex-1' />

      <div className="bg-[#585858] w-full flex justify-between items-center px-3 py-2 rounded-md z-10">
        <div className="text-white">
          <p className="font-semi-bold">
            {lawyer?.first_name ? lawyer.first_name + ' ' + lawyer.last_name : 'Calvin Koss .SH'}
          </p>
          <p className="text-xs font-regular text-[#969090]">{lawyer?.city_name ? lawyer.city_name : 'Jakarta'}</p>
        </div>
        {/* Untuk saat ini button cek jadwal di hide dulu */}
        {/* <div className="bg-blue-sky text-xs items-center flex rounded-3xl p-2 h-7">
          {t('check_schedule', {
            keyPrefix: 'lawyer_document',
          })}
        </div> */}
      </div>
      <p className="text-xs text-secondary-base font-thin text-center mt-1 mb-2">
        {t('lawyer_reommend', {
          keyPrefix: 'lawyer_document',
        })}
      </p>
    </div>
  )
}
