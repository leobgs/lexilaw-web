import images from 'assets/images'
import { byteConversion } from 'utils/byteConversion'
import { ChatRespond } from './ChatRespond'

export const ChatCard = ({ item, index }) => {
  return (
    <>
      {item.from === '000000' && item.type === 'loading' ? (
        <div className='card-animated-chat ml-4'>
          <div className='bg-white rounded-lg flex gap-2 px-4'>
            <img
              src={
                item.from === '000000'
                  ? images.ic_profile_lexi
                  : images.ic_thumbnail_profile
              }
              alt='profile'
              className={`object-contain ${
                item.from === 'ai' ? 'h-12 w-12' : ''
              }`}
            />

            <div className=''>
              <div className='font-futura-bold text-secondary-base text-sm'>
                {item.from === '000000' ? 'Lexi' : 'You'}
              </div>
              <div className='flex gap-2 mt-2'>
                <div className='h-2 w-2 animate-pulse bg-black-lightest bg-opacity-30' />
                <div className='h-2 w-2 animate-pulse bg-black-lightest bg-opacity-30' />
                <div className='h-2 w-2 animate-pulse bg-black-lightest bg-opacity-30' />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`flex gap-2 first:mt-4 mb-4 items-start py-2 px-4 md:w-3/4 md:mx-4 ${
            item.from === '000000'
              ? 'bg-neutral-70 rounded-3xl md:rounded-xl border border-neutral-70'
              : ''
          }`}
        >
          <img
            src={
              item.from === '000000'
                ? images.ic_profile_lexi
                : images.ic_thumbnail_profile
            }
            alt='profile'
            className={`object-contain ${
              item.from === 'ai' ? 'h-12 w-12' : ''
            }`}
          />
          <div className='w-full'>
            <div className='font-futura-bold text-secondary-base text-sm'>
              {item.from === '000000' ? 'Lexi' : 'You'}
            </div>

            <div className='whitespace-pre-line text-sm'>{item.message}</div>

            {item.file && (
              <>
                <p className='text-xs mt-2 mb-0.5 text-neutral-40 ml-2 hidden md:inline-block'>
                  Attached
                </p>
                <div className='w-full md:w-1/3 bg-secondary-lightest bg-opacity-60 rounded-xl border border-secondary-lighter flex items-center mt-1 md:mt-0'>
                  {item.content_type === 'IMAGE' ? (
                    <img
                      src={item.images}
                      alt='displayed file'
                      className='w-12 h-12 aspect-auto m-2 rounded-lg shadow'
                    />
                  ) : (
                    <img
                      src={images.ic_pdf_thumbnail}
                      alt='displayed pdf'
                      className='w-12 h-12 aspect-auto m-2 rounded-sm shadow'
                    />
                  )}
                  <div className='text-xs'>
                    <p className='text-sm font-semi-bold text-secondary-base line-clamp-2'>
                      {item.caption}
                    </p>
                    <p className='text-neutral-40'>
                      {byteConversion(item.file?.size)}
                    </p>
                  </div>
                </div>
              </>
            )}

            {item.from === '000000' && item.type !== 'loading' && (
              <ChatRespond item={item} index={index} />
            )}
          </div>
        </div>
      )}
    </>
  )
}
