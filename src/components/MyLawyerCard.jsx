import images from 'assets/images'
import clsx from 'clsx'
import { useWindowWidth } from 'hooks/useWindowWidth'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export const MyLawyerCard = ({ data, className, onClick = () => {} }) => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()

  const { windowWidth } = useWindowWidth()
  const isMobile = windowWidth <= 767

  return (
    <div className={clsx('bg-[#F2F1EC] px-3 pt-3 pb-1 rounded-2xl', className)} onClick={() => onClick()}>
      <div className="flex items-start gap-2 h-full justify-between">
        <div className="flex items-start gap-2">
          <img src={data.image_url || images.ic_avatar_placeholder} alt={`lawyer-${data.first_name}`} className="rounded-full h-10 w-10" />
          <div>
            <div className="font-futura-bold text-green-900">
              {data.first_name} {data.last_name && data.last_name}
            </div>
            <div className="text-xs">{data.city}</div>
          </div>
        </div>
        <img src={isMobile ? images.ic_vector_arrow_top_right_mobile : images.ic_vector_arrow_right} className={isMobile && 'opacity-50' } alt="arrows" />
      </div>

      <div
        className="max-h-44 overflow-y-scroll scroll-smooth my-4 rounded-xl"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        {data.thread_uuid?.map((item, index) => (
          <div
            className="bg-chat p-2 border-b border-b-neutral-30 last:border-none flex items-center justify-between px-4"
            key={index}
          >
            <div className="w-9/12 line-clamp-2">{item.name}</div>
            <div
              className="flex items-center gap-2 rounded-full border border-neutral-30 px-2 py-1 hover:cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                navigate('/thread/' + item?.uuid)
              }}
            >
              <div className="text-sm text-green-900 font-semi-bold hidden md:block">
                {t('context', { keyPrefix: 'my_lawyer' })}
              </div>
              <img src={images.ic_forum_svg} alt="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
