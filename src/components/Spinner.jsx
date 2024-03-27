import clsx from 'clsx'
import "./Spinner.scss"

export const Spinner = ({ className, innerClassName }) => {
  return (
    <div
      className={clsx(
        'loader flex size-14 items-center justify-center rounded-full animate-spin',
        className
      )}
    >
    </div>
  )
}
