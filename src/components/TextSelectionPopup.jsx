import React, { useEffect, useRef, useState } from 'react'
import images from 'assets/images'
import { copyToClipboard } from 'utils'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

export const TextSelectionPopup = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [selectedText, setSelectedText] = useState('')
  const popupRef = useRef(null)
  const { t } = useTranslation()
  const location = useLocation()

  useEffect(() => {
    const handleMouseUp = () => {
      setTimeout(() => {
        const selection = window.getSelection()
        let text = selection?.toString().trim()
        text = text.replace(/\n+/g, '\n')

        // Check if selection starts in an input or textarea
        const activeElement = document.activeElement
        const isInputElement =
          activeElement.tagName === 'INPUT' ||
          activeElement.tagName === 'TEXTAREA' ||
          activeElement.isContentEditable

        // Get the element where selection started
        const selectionStartElement = selection?.anchorNode?.parentElement

        // Check if selection starts in an input-like element
        const isSelectionInInput = selectionStartElement?.closest(
          'input, textarea, [contenteditable="true"]'
        )

        if (text.length > 0 && !isInputElement && !isSelectionInInput) {
          setSelectedText(text)

          const range = selection.getRangeAt(0)
          const rects = range.getClientRects()
          const lastRect = rects[rects.length - 1]

          let offsetParent = range.startContainer
          while (offsetParent && !(offsetParent instanceof Element)) {
            offsetParent = offsetParent.parentNode
          }
          while (
            offsetParent &&
            window.getComputedStyle(offsetParent).position === 'static'
          ) {
            offsetParent = offsetParent.offsetParent
          }

          const parentRect = offsetParent
            ? offsetParent.getBoundingClientRect()
            : { left: 0, top: 0 }

          const newPosition = {
            x:
              lastRect?.right -
              parentRect.left +
              (offsetParent ? offsetParent.scrollLeft : window.scrollX),
            y:
              lastRect?.bottom -
              parentRect.top +
              (offsetParent ? offsetParent.scrollTop : window.scrollY),
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

  return isVisible && location.pathname !== '/' ? (
    <div
      ref={popupRef}
      className="absolute bg-white shadow-lg rounded-lg p-2 z-50"
      style={{
        left: `${position.x - 70}px`,
        top: `${position.y + 40}px`,
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
