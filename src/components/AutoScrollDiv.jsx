import { useGlobalContext } from 'hooks/context'
import { useRef, useEffect } from 'react'

export const AutoScrollingDiv = ({ children, shouldScrol }) => {
  const divRef = useRef(null)
  const { collection } = useGlobalContext()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (shouldScrol && divRef.current) {
        if (collection?.clicked_uuid) {
          // Scroll to the element with the specific UUID
          const elementToScrollTo = divRef.current.querySelector(`#${CSS.escape(collection.clicked_uuid)}`)
          if (elementToScrollTo) {
            elementToScrollTo.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        } else {
          // kalau tidak ada uuid, scroll to the bottom
          divRef.current.scrollTop = divRef.current.scrollHeight
        }
      }
    }, 10)

    return () => clearTimeout(timer)
  }, [children, shouldScrol, collection.clicked_uuid])

  return (
    <div ref={divRef} className="flex-1 overflow-y-auto h-fit sm:w-full">
      {children}
    </div>
  )
}
