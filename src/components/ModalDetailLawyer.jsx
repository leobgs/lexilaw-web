import images from 'assets/images'
import { Modal } from './Modal'

export const ModalDetailLawyer = ({
  data,
  show = false,
  onHide = () => {},
}) => {
  return (
    <Modal
      show={show}
      onHide={() => onHide()}
      contentClassName='bg-white h-full px-4 md:!w-1/3 md:!h-[90%] md:rounded-xl'
      className='bg-neutral-40'
    >
      <div className='bg-neutral-60 -mx-4 px-4 py-4 rounded-t-xl flex items-center gap-2'>
        <img
          src={images.ic_back}
          alt='back'
          onClick={() => onHide()}
          className='h-6 w-4'
        />
        <div className='flex items-center'>
          <img
            src='https://picsum.photos/id/64/200/200'
            alt='images'
            className='rounded-full w-12 h-12'
          />
          <div className='ml-2'>
            <div className='font-semi-bold text-secondary-base'>
              {'Umabachi'}
            </div>
            <div className='text-xs text-neutral-40'>{'Medan'}</div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
