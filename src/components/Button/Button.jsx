import clsx from 'clsx'
import { Spinner } from 'components/Spinner'
import './Button.scss'

export const Button = ({
  className,
  iconClassName,
  label,
  icon,
  disabled,
  isLoading,
  iconRight,
  onClick,
  type,
}) => {
  const handleOnClick = (e) => {
    if (isLoading || disabled) return
    e.stopPropagation()
    onClick()
  }
  return (
    <button
      className={clsx(
        'flex items-center justify-center w-fit h-[3rem] font-semi-bold rounded-md py-3 px-4 transition duration-150 ease-in-out',
        className,
        disabled ? 'disabled' : ''
      )}
      onClick={handleOnClick}
      type={type}
      disabled={disabled}
    >
      {isLoading ? (
        <Spinner className='btn-spinner' />
      ) : (
        <>
          {iconRight && <div />}
          {icon && (
            <img
              className={clsx(`w-6 h-6 ${label ? 'mr-2' : ''}`, iconClassName)}
              src={icon}
              alt=''
            />
          )}
          <div className='w-full'>{label}</div>
          {iconRight && (
            <img
              className={clsx(`w-6 h-6 ${label ? 'ml-2' : ''}`, iconClassName)}
              src={iconRight}
              alt=''
            />
          )}
          {icon && <div />}
        </>
      )}
    </button>
  )
}
