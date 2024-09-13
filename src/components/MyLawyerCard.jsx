import images from 'assets/images'
import clsx from 'clsx'
import { useTranslation } from "react-i18next";

export const MyLawyerCard = ({ data, className, onClick = () => { } }) => {
  const { t, i18n } = useTranslation();

  return (
    <div
      className={clsx('bg-[#F2F1EC] px-3 pt-3 pb-1 rounded-2xl', className)}
      onClick={() => onClick()}
    >
      <div className='flex items-start gap-2 h-full justify-between'>
        <div className='flex items-start gap-2'>
          <img
            src={data.image_url}
            alt={`lawyer-${data.first_name}`}
            className='rounded-full h-10 w-10'
          />
          <div>
            <div className='font-futura-bold text-green-900'>
              {data.first_name} {data.last_name && data.last_name}
            </div>
            <div className='text-xs'>{data.city}</div>
          </div>
        </div>
        <img src={images.ic_vector_green} alt='arrows' />
      </div>

      <div className='max-h-44 overflow-y-scroll scroll-smooth my-4 rounded-xl'>
        {data.thread_uuid?.map((item, index) => (
          <div
            className='bg-chat p-2 border-b border-b-neutral-30 last:border-none flex items-center justify-between px-4'
            key={index}
          >
            <div className='w-9/12 line-clamp-2'>{item.name}</div>
            <div className='flex items-center gap-2 rounded-full border border-neutral-30 px-2 py-1'>
              <div className='text-sm text-green-900'>{t("context", { keyPrefix: "my_lawyer" })}</div>
              <img src={images.ic_forum} alt='' />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
