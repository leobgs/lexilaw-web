import { useRef, useEffect, useCallback } from 'react'
import { TextSelectionPopup } from './TextSelectionPopup'

export const AutoScrollingDiv = ({
  children,
  shouldScrol = true,
  onNextScroll = () => {},
}) => {
  const divRef = useRef(null)
  const intersectionRef = useRef(null)

  const callbackObserver = useCallback((entries) => {
    const [target] = entries
    if (target.isIntersecting) {
      onNextScroll()
      // console.log('first')
    }
  }, [])

  useEffect(() => {
    const parentDiv = divRef.current
    const intersect = intersectionRef.current

    if (!intersect || !parentDiv) return
    const observer = new IntersectionObserver(callbackObserver, {
      threshold: 1,
      root: parentDiv,
    })

    if (intersect) {
      observer.observe(intersect)
    }

    return () => {
      if (intersect) {
        observer.unobserve(intersect)
      }
    }
  }, [callbackObserver])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (shouldScrol && divRef.current && !window.location.hash) {
        divRef.current.scrollTop = divRef.current.scrollHeight
      }
    }, 99)

    return () => clearTimeout(timer)
  }, [children, shouldScrol])

  return (
    <div ref={divRef} className="flex-1 overflow-y-auto h-fit sm:w-full relative">
      <div ref={intersectionRef} style={{ height: '2px' }} />
      {children}
      <TextSelectionPopup />
    </div>
  )
}
