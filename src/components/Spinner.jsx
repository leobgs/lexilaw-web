import clsx from 'clsx'

export const Spinner = ({ className }) => {
  return (
    <div
      className={clsx(
        'w-6 h-6 rounded-full animate-spin border-x-2 border-solid border-neutral-20 border-t-transparent',
        className
      )}
    ></div>
  )
}
