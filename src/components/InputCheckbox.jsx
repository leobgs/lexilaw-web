import clsx from 'clsx';

export const InputCheckbox = ({
    className,
    inputBoxClass,
    label,
    type = 'checkbox',
    name,
    value,
    maxLength,
    error,
    rowed,
    labeblClassName,
    isDisabled,
    onChange,
}) => {
    const handleOnChange = (e) => {
        const { name, checked } = e.target;
        onChange({ name: name, value: checked });
    }; 

    return (
        <div className={clsx('text-sm flex items-center justify-stretch', className)}>
            <div className={`${rowed ? 'w-full' : ''}`}>
                <div className={clsx('input-checkbox', inputBoxClass)} >
                    <input
                        className={`border-transparent ring-none p-3 
                            ${error ? '!border-[#FF7878] !bg-[#FFF5DB] text-[#DB0000]' : ''}
                            ${rowed ? 'border bg-white' : 'border-none'}
                            ${isDisabled ? 'bg-white opacity-60' : ''}
                        `}
                        disabled={isDisabled}
                        type={type}
                        maxLength={maxLength}
                        value={value}
                        name={name}
                        onChange={handleOnChange} 
                        checked={value}
                    />
                    <span></span>
                </div>
            </div>
            {label && (
                <div className={`text-black-dark ${rowed ? 'w-full' : 'w-1/3'} ${labeblClassName}`}>
                    {label}
                </div>
            )}
            {error && (
                <div className='flex items-center mt-1 ml-1'>
                    <div className='text-error-base text-xs ml-1'>{error}</div>
                </div>
            )}
        </div>
    );
};
