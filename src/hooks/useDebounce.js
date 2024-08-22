import React from 'react'

/**
 * hooks yang digunakan untuk debounce
 *
 * @param {string} value
 * @param {number} timeMS
 * @returns {string}
 */
const useDebounce = (value, timeMS = 500) => {
  const [debounceValue, setDebounceValue] = React.useState(value)

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value)
    }, timeMS)

    return () => {
      clearTimeout(handler)
    }
  }, [value, timeMS])

  return debounceValue
}

export { useDebounce }
