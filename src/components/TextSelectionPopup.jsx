import React, { useEffect, useRef, useState } from 'react'
import images from 'assets/images'
import { copyToClipboard } from 'utils'
import { useTranslation } from 'react-i18next'

export const TextSelectionPopup = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [selectedText, setSelectedText] = useState('')
  const popupRef = useRef(null)
  const {t} = useTranslation()

  useEffect(() => {
    const handleMouseUp = () => {
      setTimeout(() => {
        const selection = window.getSelection()
        let text = selection?.toString().trim()
        text = text.replace(/\n+/g, '\n')

        if (text.length > 0) {
          setSelectedText(text)

          const range = selection.getRangeAt(0)
          const rects = range.getClientRects()
          const firstRect = rects[0]

          let offsetParent = range.startContainer
          while (offsetParent && !(offsetParent instanceof Element)) {
            offsetParent = offsetParent.parentNode
          }
          while (offsetParent && window.getComputedStyle(offsetParent).position === 'static') {
            offsetParent = offsetParent.offsetParent
          }

          const parentRect = offsetParent ? offsetParent.getBoundingClientRect() : { left: 0, top: 0 }

          const newPosition = {
            x: firstRect.left - parentRect.left + (offsetParent ? offsetParent.scrollLeft : window.scrollX),
            y: firstRect.top - parentRect.top + (offsetParent ? offsetParent.scrollTop : window.scrollY),
          }

          setPosition(newPosition)
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
      }, 100)
    }

    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsVisible(false)
      }
    }

    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return isVisible ? (
    <div
      ref={popupRef}
      className="absolute bg-white shadow-lg rounded-lg p-2 z-50"
      style={{
        left: `${position.x}px`,
        top: `${position.y - 10}px`,
        transform: 'translateY(-100%)',
      }}
    >
      <button
        onClick={() => {
          copyToClipboard({
            text: selectedText,
            title: t('copy_to_clipboard'),
          })
        }}
        className="flex items-center space-x-1 text-sm text-gray-700 hover:text-gray-900"
      >
        <img src={images.ic_copy} alt="ic_copy" />
        <span>{t('text_copy')}</span>
      </button>
    </div>
  ) : null
}
