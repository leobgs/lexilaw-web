import images from 'assets/images'
import clsx from 'clsx'
import Select from 'react-select'

export const InputSelect = ({
  className,
  label,
  placeholder = 'Select',
  value,
  options,
  isSearchable = false,
  onChange,
  noOptionsMessage,
  error,
  isDisable,
  menuPlacement = 'bottom',
}) => {
  return (
    <div className={clsx('text-sm', className)}>
      {label && (
        <div className='font-semi-bold text-black-darker mb-2'>{label}</div>
      )}
      <Select
        placeholder={placeholder}
        value={value}
        options={options}
        noOptionsMessage={noOptionsMessage}
        styles={styleReactSelect}
        isSearchable={isSearchable}
        onChange={onChange}
        isDisabled={isDisable}
        menuPlacement={menuPlacement}
      />
      {error && (
        <div className='flex items-center mt-1 ml-1'>
          <img className='w-3 h-3' src={images.ic_invalid} alt='' />
          <div className='text-error text-xs ml-1'>{error}</div>
        </div>
      )}
    </div>
  )
}

const styleReactSelect = {
  control: (state) => ({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    border: `solid ${state.isFocused ? '#5E5E5E 2px' : '#5E5E5E 1px'}`,
    borderRadius: '1rem',
    height: '46px',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#2c2829',
    fontSize: '.875rem',
    fontFamily: 'Inter Regular',
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: '0px 12px',
  }),
  dropdownIndicator: () => ({
    padding: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  option: (provided, state) => ({
    cursor: 'default',
    padding: '10px',
    backgroundColor:
      state.isFocused && state.isSelected
        ? '#029FB0'
        : state.isFocused
        ? '#c2ebed'
        : state.isSelected && '#029FB0',
    color: state.isSelected ? '#FFFFFF' : '#2c2829',
    fontSize: '.875rem',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#B3B3B3',
    fontSize: '.875rem',
    fontFamily: 'Inter Regular',
  }),
  indicatorSeparator: () => {},
  menu: (provided) => ({
    ...provided,
    zIndex: '10',
  }),
}
