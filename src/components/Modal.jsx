import clsx from 'clsx'
import { useEffect } from 'react'

export const Modal = ({
  children,
  dialogClassName,
  contentClassName,
  classNameBox,
  show,
  className,
  onHide,
}) => {
  const handleOnHide = () => {
    if (onHide) onHide()
  }

  useEffect(() => {
    if (show) {
      document.body.classList.add('modal_opened')
    } else {
      document.body.classList.remove('modal_opened')
    }
  }, [show])

  return (
    <>
      <div
        className={`bg-neutral-20 fixed top-0 left-0 z-[55] w-screen h-screen transition-opacity ease-linear duration-150 ${
          show ? 'opacity-50' : 'opacity-0 z-[-1] hidden'
        } ${className}`}
      />
      <div
        className={`fixed top-0 left-0 z-[60] w-full h-full transition-opacity ease-linear duration-150 ${
          show ? 'opacity-100' : 'opacity-0 z-[-1] hidden'
        } ${classNameBox}`}
        onClick={handleOnHide}
      >
        <div
          className={clsx(
            'flex items-center justify-center max-w-content h-screen mx-auto',
            dialogClassName
          )}
        >
          <div
            className={clsx('w-full', contentClassName)}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
