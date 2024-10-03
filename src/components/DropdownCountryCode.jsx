import { useGlobalContext } from 'hooks/context'
import { useEffect, useRef, useState } from 'react'
import { countryCodeData } from 'utils/country-code-data'
import { useTranslation } from 'react-i18next'

export const DropdownCountryCode = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const { setCountryCode, phoneNumberObj } = useGlobalContext()
  const [selectedCountry, setSelectedCountry] = useState(
    phoneNumberObj?.countryCode
  )
  const { i18n } = useTranslation()

  const dropdownRef = useRef(null)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  const filteredCountries = countryCodeData.filter((item) => {
    return (
      item.name.toLocaleLowerCase().includes(searchTerm.toLowerCase()) ||
      item.dial_code.includes(searchTerm.toLowerCase())
    )
  })

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
        setSearchTerm('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  useEffect(() => {
    setSelectedCountry(phoneNumberObj?.countryCode)
  }, [phoneNumberObj?.countryCode])

  const handleCountrySelect = (country) => {
    setSelectedCountry(country)
    setIsOpen(false)
    setSearchTerm('')
    setCountryCode(country)
  }

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value?.trim())
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false)
      setSearchTerm('')
    } else if (!isOpen) {
      setIsOpen(true)
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={(e) => {
          e.preventDefault()
          setIsOpen(!isOpen)
        }}
        className="p-2 text-left font-semi-bold"
      >
        {selectedCountry ? selectedCountry.dial_code : 'Select'}
      </button>
      <input
        ref={inputRef}
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="opacity-0 absolute top-0 left-0 w-full h-full cursor-default"
        style={{ zIndex: isOpen ? 1 : -1 }}
      />

      {isOpen && (
        <div
          ref={listRef}
          className="absolute mt-1 w-[300px] max-h-[400px] overflow-auto border rounded bg-white shadow-lg z-10"
          style={{
            maxHeight: '300px',
            overflowY: 'auto',
          }}
        >
          {filteredCountries.length === 0 ? (
            <p className="m-2 text-center">
              <span className="font-bold">"{searchTerm}"</span> {i18n.language === 'en' ? 'Not Found' : 'Tidak Ditemukan'}
            </p>
          ) : (
            filteredCountries.map((country, index) => (
              <div
                key={country.code}
                onClick={() => handleCountrySelect(country)}
                className="p-3 hover:bg-gray-100 cursor-pointer"
              >
                {country.name} ({country.dial_code})
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
