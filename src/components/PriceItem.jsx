import images from 'assets/images'
import clsx from 'clsx'
import { numberSeparator } from 'utils/numberSeparator'

export const PriceItem = ({
  data,
  language,
  className,
  classNameText,
  onDelete = () => {},
}) => {
  return (
    <div
      className={clsx(
        'flex justify-between items-center py-4 border-b-2 border-dashed border-neutral-60 last:border-none',
        className
      )}
    >
      <div className='flex gap-1 items-center justify-start w-1/2'>
        {data?.isEdit && (
          <div onClick={() => onDelete()} className='w-2/12'>
            <img
              src={images.ic_delete}
              alt={`delete ${data?.name_indonesia}`}
              className='w-5 h-5'
            />
          </div>
        )}
        <div className={clsx('text-[#2E2C2B] w-full', classNameText)}>
          {language === 'id' ? data?.name_indonesia : data?.name_english}
        </div>
      </div>
      <div className='font-semi-bold'>{numberSeparator(data?.price, 'Rp')}</div>
    </div>
  )
}
