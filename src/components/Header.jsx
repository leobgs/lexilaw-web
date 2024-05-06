import images from 'assets/images'
import clsx from 'clsx'

export const Header = ({
  className,
  label,
  rightIcon = false,
  onBackClick = () => {},
}) => {
  return (
    <div
      className={clsx(
        `flex gap-4 items-center py-4 px-4 top-0 bg-white w-full ml-0 md:-ml-4 fixed ${
          rightIcon ? 'justify-between' : 'justify-start'
        }`,
        className
      )}
    >
      <img
        src={images.ic_back}
        alt='back'
        className=''
        onClick={() => {
          onBackClick()
        }}
      />
      <div className='text-xl font-futura-bold'>{label}</div>
      {rightIcon && (
        <img
          src={images.ic_close}
          alt='close'
          onClick={() => {
            onBackClick()
          }}
          className=''
        />
      )}
    </div>
  )
}
