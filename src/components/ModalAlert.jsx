import { Modal } from './Modal'
import { useGlobalContext } from '../hooks/context'
import { useEffect } from 'react'
import renderMessageError from '../utils/renderMessageError'
import { Spinner } from './Spinner'


export const ModalAlert = () => {
  const { alert, closeAlert } = useGlobalContext()

  useEffect(() => {
    window.onpopstate = () => {
      if (alert.isOpen) {
        closeAlert({ isConfirm: false, showLoading: false })
      }
    }
    // console.log(alert, 'alert')
  }, [alert])

  return (
    <Modal
      dialogClassName={alert.showLoading ? 'z-50 w-fit' : 'p-8 md:w-1/2 xl:w-1/3'}
      contentClassName={
        alert.showLoading
          ? 'bg-yellow-50 p-4 rounded-3xl'
          : 'bg-yellow-50 rounded-3xl p-[2rem]'
      }
      className={alert.showLoading ? '!z-[66]' : ''}
      show={alert.isOpen}
      // show
      classNameBox={alert.showLoading ? '!z-[68] opacity-100' : ''}
      onHide={() => closeAlert({ isConfirm: false })}
    >
      {alert.showLoading ? (
        <div className='justify-between flex gap-4 items-center'>
          <Spinner className='!h-8 !w-8' />
          <div className='animate-pulse font-semi-bold'>Loading...</div>
        </div>
      ) : (
        <div>

          {alert.icon && (
            <img
              className='w-[120px] h-[120px] mx-auto'
              src={alert.icon}
              alt=''
            />
          )}

            {alert.title && (
              <div className='font-bold text-dark-50 text-2xl text-center'>
                {alert.title}
              </div>
          )}


            {alert.messages && (
              <div className='font-bold text-dark-50 text-2xl text-center'>
                {alert.messages}
              </div>
            )}

            {/* <div
            className={`my-2 text-center text-dark-50 text-xl	 mx-4 ${alert.messages ? ' ' : ''
              }`}
          >
            <div className='!text-base font-semi-bold'>
              {renderMessageError(alert.messages, true, 'text-base')}
            </div>
          </div> */}


        </div>
      )}
    </Modal>
  )
}