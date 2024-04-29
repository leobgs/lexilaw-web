import images from 'assets/images'
import { Modal } from './Modal'
import { LAWYER_DATA } from 'utils/dummy'
import { LawyerCard } from './LawyerCard'
import { useEffect, useState } from 'react'
import { Button } from './Button/Button'
import { useWidthSize } from 'hooks/useWidthSize'

export const LawyerRecommendation = ({ isShow, onHide = () => {} }) => {
  const [dataLawyer, setDataLawyer] = useState()
  const [selectedLawyer, setSelectedLawyer] = useState()
  const currWidth = useWidthSize()

  useEffect(() => {
    setDataLawyer(LAWYER_DATA)
  }, [])

  const handleSelectLawyer = (id) => {
    dataLawyer?.forEach((item) => {
      if (item.uuid === id) {
        item.isActive = true
      } else {
        item.isActive = false
      }
    })
    setDataLawyer([...dataLawyer])
  }

  return (
    <Modal
      show={isShow}
      onHide={() => onHide()}
      contentClassName='bg-white h-full px-4 md:!w-5/6 md:!h-5/6 md:rounded-xl lg:!w-3/4'
      className='bg-neutral-40'
    >
      <div>
        <div className='flex justify-between items-center mx-2 py-4'>
          <div className='text-xl font-futura-bold'>Opsi Lain</div>
          <img src={images.ic_close} alt='close' onClick={() => onHide()} />
        </div>
        <div className='bg-gradient-to-b from-[#FBEFD8] from-10% to-white to-100% -mx-4 px-8 py-2 text-sm border-b border-t border-b-[#F2F2F2] border-t-[#F2F2F2] flex items-center gap-4'>
          <img src={images.ic_blink} alt='blink' />
          <div className='text-sm'>
            Berdasarkan kebutuhanmu, berikut pengacara rekomendasi Saya
          </div>
        </div>
      </div>

      <div className='h-[86%] flex justify-between text-sm my-2 gap-4'>
        <div className='h-full w-full overflow-auto mt-8 gap-2 overflow-x-hidden md:grid md:grid-cols-2 md:grid-rows-3 md:gap-4 md:w-2/3 md:h-[90%] lg:gap-2'>
          {dataLawyer?.map((item, index) => (
            <LawyerCard
              onClick={() => {
                handleSelectLawyer(item.uuid)
                setSelectedLawyer(item)
              }}
              key={index}
              data={item}
              className={`shadow-sm mb-4 ${
                item.isActive
                  ? 'border-2 border-secondary-base'
                  : 'border-2 border-white'
              }`}
            />
          ))}
        </div>

        {selectedLawyer && currWidth > 768 && (
          <div
            className={`w-1/3 bg-blue-dark rounded-xl h-[95%] -mt-4 pb-6 hidden bg-selected-lawyer relative md:flex md:justify-between md:flex-col overflow-y-auto overflow-x-hidden`}
          >
            <div>
              <img
                src={selectedLawyer?.image_url}
                alt={`lawyer-${selectedLawyer?.first_name}`}
                className='rounded-full mx-auto w-24 h-24'
              />
              <div className='text-center text-2xl font-semi-bold mb-2 mt-4 md:mx-4 lg:mx-0 text-white'>
                {selectedLawyer?.first_name} {selectedLawyer?.last_name}
              </div>
              <div className='text-center text-xs mb-2 mt-4 mx-4 text-opacity-60 text-white'>
                {selectedLawyer?.description}
              </div>
              <div className='mt-8 grid grid-cols-4 mx-4 gap-2 mb-8'>
                {selectedLawyer?.lawyer_filed.map((item) => (
                  <div className='bg-white rounded-2xl py-1 px-2 text-center col-span-2'>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className='mx-4'>
              <Button
                onClick={() => console.log('pesan sekarang')}
                label='Pesan Pengacara'
                iconRight={images.ic_briefcase}
                className={
                  'btn-secondary-hover w-full mt-1 rounded-full font-medium relative px-8'
                }
              />
            </div>
          </div>
        )}

        <Modal
          show={
            selectedLawyer && currWidth < 768
              ? true
              : selectedLawyer && currWidth > 768 && false
          }
          onHide={() => setSelectedLawyer(null)}
          contentClassName='bg-blue-dark px-4 py-8 md:!w-5/6 md:!h-5/6 md:rounded-xl lg:!w-3/4 rounded-t-2xl'
          classNameBox='!top-[25%]'
        >
          <div>
            <img
              src={images.ic_close_white}
              alt='close'
              className='float-end'
              onClick={() => setSelectedLawyer(null)}
            />
            <img
              src={selectedLawyer?.image_url}
              alt={`lawyer-${selectedLawyer?.first_name}`}
              className='rounded-full mx-auto w-24 h-24'
            />
            <div className='text-center text-2xl font-semi-bold mb-2 mt-4 md:mx-4 lg:mx-0 text-white'>
              {selectedLawyer?.first_name} {selectedLawyer?.last_name}
            </div>
            <div className='text-center text-xs mb-2 mt-4 mx-4 text-opacity-60 text-white'>
              {selectedLawyer?.description}
            </div>
            <div className='mt-8 grid grid-cols-4 mx-4 gap-2 mb-8'>
              {selectedLawyer?.lawyer_filed.map((item) => (
                <div className='bg-white rounded-2xl py-1 px-2 text-center col-span-2'>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className='mx-4'>
            <Button
              onClick={() => console.log('pesan sekarang')}
              label='Pesan Pengacara'
              iconRight={images.ic_briefcase}
              className={
                'btn-secondary-hover w-full mt-1 rounded-full font-medium relative px-8'
              }
            />
          </div>
        </Modal>
      </div>
    </Modal>
  )
}
