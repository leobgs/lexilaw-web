import { useRef, useEffect } from 'react'

export const AutoScrollingDiv = ({ children, shouldScrol }) => {
  const divRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (shouldScrol && divRef.current && !window.location.hash) {
        divRef.current.scrollTop = divRef.current.scrollHeight
      }
    }, 10)

    return () => clearTimeout(timer)
  }, [children, shouldScrol])

  return (
    <div ref={divRef} className="flex-1 overflow-y-auto h-fit sm:w-full">
      {children}
    </div>
  )
}
