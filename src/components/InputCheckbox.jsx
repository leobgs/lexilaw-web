import clsx from 'clsx'

export const InputCheckbox = ({
    className,
    inputClass,
    label,
    placeholder,
    type = 'checkbox',
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
            {type === 'text-area' ? (
                <textarea
                    className={`resize-none appearance-none rounded-md bg-neutral-0 ${icon ? 'pl-12 pr-3 py-3' : 'p-3'
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
                <div className={`${rowed ? 'w-full' : ''}`}>
                    <div className='flex items-center relative '>
                        {icon && (
                            <img
                                className={clsx('absolute left-3 h-6 w-full', iconClassName)}
                                src={icon}
                                alt=''
                            />
                        )}
                        <input
                            className={` border-transparent ring-none ${icon ? 'pl-12 pr-3 py-3' : 'p-3'
                                } ${error ? '!border-[#FF7878] !bg-[#FFF5DB] text-[#DB0000]' : ''}
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
                </div>
            )}
            {label && (
                <div
                    className={`text-black-dark ${rowed ? 'w-full' : 'w-1/3'
                        } ${labeblClassName}`}
                >
                    {label}
                </div>
            )}
            {error && (
                <div className='flex items-center mt-1 ml-1'>
                    <div className='text-error-base text-xs ml-1'>{error}</div>
                </div>
            )}
        </div>
    )
}
