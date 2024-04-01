import clsx from 'clsx'
import useInterval from 'hooks/useInterval'
import { useEffect, useState } from 'react'
import { padWithZeroes, secondsToTime } from 'utils/conversion'

export const CounterDown = ({
  className,
  time = 30,
  timeReminder = 30,
  isStart = true,
  showReminder = () => {},
  format = 'hour',
  timesUp = (e) => e,
}) => {
  const [timer, setTimer] = useState(time)
  const [alreadyReminder, setReminder] = useState(false)

  useEffect(() => {
    if (time === 0) {
      timesUp(true)
    } else {
      setTimer(time)
      timesUp(false)
    }
  }, [time])

  useInterval(
    () => {
      if (isStart && timer !== null) {
        if (timer > 0) setTimer(timer - 1)
        if (timer === 1) {
          timesUp(true)
        } else if (
          showReminder &&
          timer <= timeReminder + 1 &&
          !alreadyReminder
        ) {
          setReminder(true)
          showReminder()
        }
      }
    },
    timer !== null && timer > 0 ? 1000 : null
  )

  const times = secondsToTime(timer || 0)

  return (
    <div className={clsx(className)}>
      {`${
        format === 'hour'
          ? `${padWithZeroes(times.h, 2)} : ${padWithZeroes(
              times.m,
              2
            )} : ${padWithZeroes(times.s, 2)}`
          : format === 'minutes'
          ? `${padWithZeroes(times.m, 2)} : ${padWithZeroes(times.s, 2)}`
          : `${padWithZeroes(times.s, 2)}`
      } `}
    </div>
  )
}
