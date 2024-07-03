import { useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const AutoScrollingDiv = ({ content }) => {
  const divRef = useRef(null)
  const { pathname } = useLocation()

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight
      console.log(divRef.current.scrollHeight)
    }
  }, [pathname])

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
