import images from 'assets/images'

export const ChatCard = ({ item }) => {
  return (
    <div
      className={`flex gap-2 first:mt-4 mb-4 items-start py-2 px-4 md:w-3/4 md:mx-4 ${
        item.from === 'Lexi'
          ? 'bg-chat rounded-3xl md:rounded-xl border border-neutral-70'
          : ''
      }`}
    >
      <img
        src={
          item.from === 'Lexi'
            ? images.ic_profile_lexi
            : images.ic_thumbnail_profile
        }
        alt='profile'
        className={`object-contain ${item.from === 'Lexi' ? 'h-12 w-12' : ''}`}
      />
      <div className='w-full'>
        <div className='font-bold text-secondary-base'>
          {item.from || 'You'}
        </div>

        {item.file && <img src={item.images} alt='files' />}

        <div className=''>{item.text}</div>

        {item.from === 'Lexi' && (
          <div className='border-t border-neutral-70 -mx-4 -ml-20 px-4 md:border-t-0 md:mx-0'>
            <div className='my-4 justify-between flex'>
              <div className='bg-blue-sky rounded-2xl py-1 px-2 w-fit border border-blue-dark flex items-center gap-2'>
                <img
                  src={images.ic_change_style_lang}
                  alt='change language style'
                />
                <div>Gunakan bahasa santai, dong</div>
              </div>
              <div className='flex justify-between items-center'>
                <div className='hidden md:inline-block bg-neutral-50 p-2 rounded-full'>
                  <img src={images.ic_copy} alt='copy' className='h-4 w-4' />
                </div>
                <div className='bg-neutral-50 p-2 rounded-full'>
                  <img src={images.ic_redo} alt='redo' className='h-4 w-4' />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
