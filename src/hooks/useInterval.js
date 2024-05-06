import { useRef, useEffect } from 'react'

/**
 * hooks setInterval
 * @url https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 *
 * @param   {function}  callback
 * @param   {integer}  delay
 *
 * @return  {void}
 */
const useInterval = (callback, delay) => {
  const savedCallback = useRef()

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = window.setInterval(tick, delay)
      return () => window.clearInterval(id)
    }
  }, [delay])
}

export default useInterval
