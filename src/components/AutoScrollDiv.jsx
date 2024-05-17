import { useRef, useEffect } from 'react'

export const AutoScrollingDiv = ({ content }) => {
  const divRef = useRef(null)

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight
    }
  }, [content])

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
