import { useRef, useEffect } from 'react'

export const AutoScrollingDiv = ({ children, shouldScrol }) => {
  const divRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (shouldScrol && divRef.current) {
        divRef.current.scrollTop = divRef.current.scrollHeight
      }
    }, 10) // Adjust delay if necessary

    return () => clearTimeout(timer)
  }, [children, shouldScrol])

  return (
    <div ref={divRef} className='flex-1 overflow-y-auto h-full'>
      {children}
    </div>
  )
}
