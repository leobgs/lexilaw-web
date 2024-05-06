import images from 'assets/images'
import clsx from 'clsx'
import { numberSeparator } from 'utils/numberSeparator'

export const PriceItem = ({
  data,
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
              alt={`delete ${data?.service_name}`}
              className='w-5 h-5'
            />
          </div>
        )}
        <div className={clsx('text-[#666666] w-full', classNameText)}>
          {data?.service_name}
        </div>
      </div>
      <div className='font-semi-bold'>{numberSeparator(data?.price, 'Rp')}</div>
    </div>
  )
}
