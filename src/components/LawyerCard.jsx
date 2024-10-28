import images from 'assets/images'
import clsx from 'clsx'
import { formatPrice } from 'utils'

export const LawyerCard = ({
  data,
  className,
  rateData,
  onClick = () => {},
}) => {
  function renderRange(min, max) {
    if (max < 1000000) {
      return '0 - 1 JT'
    } else {
      const minStr = Math.floor(min / 1000000)
      const maxStr = Math.floor(max / 1000000)
      return `${minStr} - ${maxStr} JT`
    }
  }

  const rangePriceText = renderRange(data.min_price, data.max_price)
  const dolarSign = formatPrice(
    data.max_price,
    rateData?.price_rate_per_symbol,
    rateData?.price_rate_symbol
  )

  return (
    <div
      className={clsx(
        'w-full rounded-lg p-4 relative bg-[#FBFBFB] cursor-pointer h-fit',
        className
      )}
      onClick={() => onClick()}
    >
      <div className="flex gap-2 h-24 md:flex-col lg:flex-row">
        <img
          src={!data?.image_url ? images.ic_avatar_placeholder : data.image_url}
          alt={`name-${data.first_name}`}
          className="h-10 w-10 rounded-full object-cover aspect-square"
        />
        <div className="md:mt-2 lg:mt-0 md:w-9/12">
          <div className="font-semi-bold w-2/3 md:w-3/4 break-words">
            {data.first_name} {data.last_name}
          </div>
          <div className="text-neutral-40 text-xs">{data.city_name}</div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-10 bg-[#F2F1EC] -mx-4 px-4 rounded-b-lg absolute bottom-0 w-full">
        <div className="text-sm text-neutral-40 my-2">Rate</div>
        <div className="text-xs">
          <div className="font-semi-bold text-end line-clamp-2 max-w-1/2">
            {dolarSign}
          </div>
          <div className="text-neutral-40 text-end">{rangePriceText}</div>
        </div>
      </div>

      <div className="bg-dark-50 rounded-bl-lg rounded-tr-md text-white absolute top-0 right-0 py-4 px-2">
        <div className="flex items-center gap-1">
          <div className="flex">
            <div className="text-3xl">{data.experience}</div>
            <div>+</div>
          </div>
          <div className="text-xs font-light">
            <div>YEARS</div>
            <div>EXP</div>
          </div>
        </div>
      </div>
    </div>
  )
}
