import images from 'assets/images'
import { useEffect, useState } from 'react'

export const CardFileComponent = ({ item }) => {
  const [fileCategory, setFileCategory] = useState('UNKNOWN')

  useEffect(() => {
    if (item.file) {
      const extension = item.file.split('.').pop().toLowerCase()
      const imageExtensions = ['png', 'jpeg', 'jpg']
      const documentExtensions = ['pdf', 'xls', 'doc']

      if (imageExtensions.includes(extension)) {
        setFileCategory('IMAGE')
      } else if (documentExtensions.includes(extension)) {
        setFileCategory('DOKUMEN')
      } else {
        setFileCategory('UNKNOWN')
      }
    }
  }, [item.file])

  console.log(item)
  return (
    <div className='h-full w-full'>
      {fileCategory === 'IMAGE' ? (
        <div className='flex items-center justify-start gap-2 my-2 py-2 border-b border-b-[#D7D7D7] md:border-none md:block md:mb-0 md:py-0'>
          <div className='rounded-md h-full relative shadow-card-file md:shadow-none'>
            <img
              src={item.file}
              alt='displayed file'
              className='md:w-full md:h-full aspect-square shadow border-2 border-secondary-base rounded-md h-[72px] w-[72px]'
            />
            {item.seen_by_lawyer && (
              <div className='absolute bottom-0 backdrop-blur-2xl w-full items-center justify-center rounded-b-lg hidden md:flex'>
                <div className='h-20px text-center text-xxs text-white py-1.5 font-semi-bold'>
                  Dilihat Pengacara
                </div>
                <img src={images.ic_two_check} alt='centang' className='w-4' />
              </div>
            )}
          </div>
          <p className='text-xs md:mt-2'>{item.name}</p>
        </div>
      ) : fileCategory === 'DOKUMEN' ? (
        <div className='flex items-center justify-start gap-2 my-2 py-2 border-b border-b-[#D7D7D7] md:border-none md:block md:mb-0 md:py-0'>
          <div className='border-2 border-secondary-base rounded-md relative shadow-card-file md:shadow-none'>
            <iframe
              src={`${encodeURIComponent(item?.file)}#zoom=FitH`}
              title={item.name}
              className='rounded-md md:w-full md:h-[128px] w-[72px] h-[72px]'
            />
            {item.seen_by_lawyer && (
              <div className='absolute bottom-0 backdrop-blur-2xl w-full items-center justify-center rounded-b-lg hidden md:flex'>
                <div className='h-20px text-center text-xxs text-white py-1.5 font-semi-bold'>
                  Dilihat Pengacara
                </div>
                <img src={images.ic_two_check} alt='centang' className='w-4' />
              </div>
            )}
          </div>
          <p className='text-xs md:mt-2'>{item.name}</p>
        </div>
      ) : (
        <div className='flex items-center justify-start gap-2 my-2 py-2 border-b border-b-[#D7D7D7] md:border-none md:block md:mb-0 md:py-0'>
          <div className='bg-[#0042250D] aspect-square border-[#0042250D] items-center justify-center flex md:w-full md:h-full h-[72px] w-[72px] border-2 border-secondary-base rounded-md relative shadow-card-file md:shadow-none'>
            <img
              src={images.ic_sand_time}
              alt='displayed file'
              className='w-4 h-4 aspect-auto m-2 rounded-lg'
            />
          </div>
          <p className='text-xs md:mt-2'>{item.name}</p>
        </div>
      )}
    </div>
  )
}
