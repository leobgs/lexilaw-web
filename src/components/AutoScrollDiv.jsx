import { useRef, useEffect } from 'react'

export const AutoScrollingDiv = ({ content, shouldScrol }) => {
  const divRef = useRef(null)

  useEffect(() => {
    if (shouldScrol && divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight
    }
  }, [content, shouldScrol])

  return (
    <div
      ref={divRef}
      className='flex-1 overflow-y-auto h-full'
      style={{ flexDirection: 'column-reverse' }}
    >
      {content}
    </div>
  )
}
