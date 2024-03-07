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
  }, [alert])

  return (
    <Modal
      dialogClassName={alert.showLoading ? 'z-50 w-fit' : 'p-8 w-full lg:w-1/3'}
      contentClassName={
        alert.showLoading
          ? 'bg-white p-4 rounded-3xl'
          : 'bg-white rounded-3xl p-4'
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
          {alert.title && (
            <div className='font-semi-bold text-sm mb-2 text-center'>
              {alert.title}
            </div>
          )}

          <div
            className={`my-2 text-center mx-4 ${
              alert.messages ? 'border-t border-t-neutral-20 pt-2' : ''
            }`}
          >
            <div className='!text-base font-semi-bold'>
              {renderMessageError(alert.messages, true, 'text-base')}
            </div>
          </div>

          {alert.showFooter && (
            <div
              className={
                'flex items-center justify-center font-semi-bold text-xs mt-4'
              }
            >
              {alert.showBtnClose && (
                <div
                  className='px-2 w-32 h-12 rounded-3xl border grid place-items-center border-primary-base'
                  onClick={() => closeAlert({ isConfirm: false })}
                >
                  <p className='text-center my-auto text-sm text-primary-base'>
                    {alert.btnCloseText}
                  </p>
                </div>
              )}

              {alert.isConfirm && (
                <div
                  className={`ml-3 px-2 bg-primary-base w-32 h-12 rounded-3xl grid place-items-center ${alert.btnConfirmTextClass}`}
                  onClick={() => closeAlert({ isConfirm: true })}
                >
                  <p className='text-neutral-10 text-center text-sm'>
                    {alert.btnConfirmText}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </Modal>
  )
}
