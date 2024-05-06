import { useEffect, useState } from 'react'

export const useWidthSize = () => {
  const [currWidth, setCurrWidth] = useState(window.innerWidth)

  useEffect(() => {
    const windowWidthSize = () => {
      return setCurrWidth(window.innerWidth)
    }
    window.addEventListener('resize', windowWidthSize)

    return () => {
      window.removeEventListener('resize', windowWidthSize)
    }
  }, [])

  return currWidth
}
