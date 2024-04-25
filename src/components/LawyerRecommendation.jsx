import images from 'assets/images'
import { Modal } from './Modal'
import { LAWYER_DATA } from 'utils/dummy'

export const LawyerRecommendation = ({ isShow, onHide = () => {} }) => {
  return (
    <Modal
      show={isShow}
      onHide={() => onHide()}
      contentClassName='bg-white !w-3/4 h-5/6 rounded-xl p-4'
      className='bg-neutral-40'
    >
      <div>
        <div className='flex justify-between items-center mx-4 py-2'>
          <div className='text-xl font-futura-bold'>Opsi Lain</div>
          <img src={images.ic_close} alt='close' onClick={() => onHide()} />
        </div>
        <div className='bg-gradient-to-b from-[#FBEFD8] from-10% to-white to-100% -mx-4 px-8 py-2 text-sm border-b border-t border-b-[#F2F2F2] border-t-[#F2F2F2] flex items-center gap-4'>
          <img src={images.ic_blink} alt='blink' />
          <div>Berdasarkan kebutuhanmu, berikut pengacara rekomendasi Saya</div>
        </div>
      </div>

      <div className='my-2 flex justify-between text-sm h-5/6'>
        <div className='grid grid-cols-1 grid-rows-3 md:grid-cols-2 w-2/3'>
          {LAWYER_DATA?.map((item) => (
            <div className=''>
              <div>
                {item.first_name} {item.last_name}
              </div>
            </div>
          ))}
        </div>
        <div className='w-1/3 bg-blue-dark rounded-xl h-full -mt-8'></div>
      </div>
    </Modal>
  )
}
