import clsx from 'clsx'
import { currencyFormat } from 'utils'

export const LawyerCard = ({ data, className, onClick = () => {} }) => {
  return (
    <div
      className={clsx('w-full rounded-lg p-4 relative bg-[#FBFBFB]', className)}
      onClick={() => onClick()}
    >
      <div className='flex gap-2 h-24 md:flex-col lg:flex-row'>
        <img
          src={data.image_url}
          alt={`name-${data.first_name}`}
          className='h-10 w-10 rounded-full'
        />
        <div className='md:mt-2 lg:mt-0'>
          <div className='font-semi-bold w-1/3 md:w-full'>
            {data.first_name} {data.last_name}
          </div>
          <div className='text-neutral-40 text-xs'>{data.city}</div>
        </div>
      </div>

      <div className='flex justify-between items-center mt-10 bg-[#F2F1EC] -mx-4 px-4 rounded-b-lg absolute bottom-0 w-full'>
        <div className='text-sm text-neutral-40 my-2'>Rate</div>
        <div className='text-xs'>
          <div className='font-semi-bold text-end'>$$</div>
          <div className='text-neutral-40'>
            {currencyFormat(data.min_price)} - {currencyFormat(data.max_price)}
          </div>
        </div>
      </div>

      <div className='bg-dark-50 rounded-bl-lg rounded-tr-md text-white absolute top-0 right-0 py-4 px-2'>
        <div className='flex items-center gap-1'>
          <div className='flex'>
            <div className='text-3xl'>{data.experince}</div>
            <div>+</div>
          </div>
          <div className='text-xs font-light'>
            <div>YEARS</div>
            <div>EXP</div>
          </div>
        </div>
      </div>
    </div>
  )
}
