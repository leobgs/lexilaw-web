import clsx from 'clsx'

export const Input = ({
  className,
  inputClass,
  label,
  placeholder,
  type = 'text',
  name,
  value,
  maxLength,
  rows,
  icon,
  error,
  rowed,
  labeblClassName,
  iconClassName,
  isDisabled,
  onChange,
}) => {
  const handleOnChange = (e) => {
    const { name, value } = e.target
    onChange({ name: name, value: value })
  }

  const handleOnKeyDown = (e) => {
    if (
      e.target.value.length >= e.target.maxLength &&
      e.key !== 'Backspace' &&
      type === 'number'
    ) {
      e.preventDefault()
    }
  }

  return (
    <div
      className={clsx('text-sm flex items-center justify-stretch', className)}
    >
      {label && (
        <div
          className={`text-black-dark mb-2 ${
            rowed ? 'w-full' : 'w-1/3'
          } ${labeblClassName}`}
        >
          {label}
        </div>
      )}

      {type === 'text-area' ? (
        <textarea
          className={`resize-none appearance-none focus:outline-none w-full rounded-md bg-neutral-0 focus:outline-black-lightest ${
            icon ? 'pl-12 pr-3 py-3' : 'p-3'
          } ${error ? '!border-error' : ''}
          ${inputClass ? inputClass : ''}
          ${rowed ? 'outline-1 outline bg-white' : 'border-none'}
          ${isDisabled ? 'bg-white opacity-60' : ''}
          `}
          disabled={isDisabled}
          rows={rows}
          maxLength={maxLength}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={handleOnChange}
        />
      ) : (
        <div className={`relative ${rowed ? 'w-full' : 'w-2/3 mx-auto'}`}>
          {icon && (
            <img
              className={clsx(
                'absolute translate-y-1/2 left-3 h-6 w-full',
                iconClassName
              )}
              src={icon}
              alt=''
            />
          )}
          <input
            className={`!rounded-full border-2 bg-gray-50 !border-gray-100 
                    focus:outline-none focus:ring-none ring-none
                     w-full ${icon ? 'pl-12 pr-3 py-3' : 'p-3'} ${
              error ? '!border-[#FF7878] !bg-[#FFF5DB] text-[#DB0000]' : ''
            }
            ${inputClass ? inputClass : ''}
            ${rowed ? 'border bg-white' : 'border-none'}
            ${isDisabled ? 'bg-white opacity-60' : ''}
            `}
            disabled={isDisabled}
            type={type}
            maxLength={maxLength}
            placeholder={placeholder}
            value={value}
            name={name}
            onChange={handleOnChange}
            autoComplete='off'
            onKeyDown={handleOnKeyDown}
          />
        </div>
      )}

      {error && (
        <div className='flex items-center mt-1 ml-1'>
          {/* <img className='w-3 h-3' src={images.ic_invalid} alt='' /> */}
          <div className='text-error-base text-xs ml-1'>{error}</div>
        </div>
      )}
    </div>
  )
}
