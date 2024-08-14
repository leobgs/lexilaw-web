import { AppContext } from 'hooks/context'
import React, { useState, useEffect, useContext } from 'react'

/**
 *
 * Merupakan komponent yang digunakan untuk membuat animasi mengetik
 *
 * @param {Object} props
 * @param {string} props.text
 * @param {number} [props.delay=100]
 *
 * @returns {JSX.Element}
 */
const Typewriter = ({ text, delay = 100 }) => {
  const [currentText, setCurrentText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  const { isFirstTime } = useContext(AppContext)

  useEffect(() => {
    if (!isFirstTime) {
      setCurrentText(text)
      return
    }

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex])
        setCurrentIndex((prevIndex) => prevIndex + 1)
      }, delay)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, delay, text, isFirstTime])

  return <span>{currentText}</span>
}

export { Typewriter }
