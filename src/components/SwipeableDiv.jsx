import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useSwipeable } from 'react-swipeable'

export const SwipeableDiv = ({
  children,
  visibility,
  className,
  onChangeVisibility = () => {},
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [translateY, setTranslateY] = useState(0)

  useEffect(() => {
    setIsVisible(visibility)
  }, [visibility])

  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      if (eventData.dir === 'Down') {
        setTranslateY(Math.min(eventData.deltaY, window.innerHeight / 2))
      }
    },
    onSwipedDown: (eventData) => {
      if (eventData.absY > window.innerHeight / 2) {
        setIsVisible(false)
      }
      setTranslateY(0)
      onChangeVisibility()
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  })

  return (
    isVisible && (
      <div
        className={clsx(
          'bg-neutral-40 bg-opacity-50 absolute w-[100vw] h-[100vh] -ml-4 -mt-24 md:hidden',
          className
        )}
      >
        <div
          {...handlers}
          style={{
            transform: `translateY(${translateY}px)`,
            transition: 'transform 0.3s',
          }}
          className='h-[85%] absolute bottom-0 w-full bg-[#EFEDE8] rounded-t-xl'
        >
          {children}
        </div>
      </div>
    )
  )
}
