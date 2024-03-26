import clsx from 'clsx'

export const Spinner = ({ className, innerClassName }) => {
  return (
    <div
      className={clsx(
        'flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-secondary-base to-neutral-20 animate-spin',
        className
      )}
    >
      <div
        className={clsx('h-8 w-8 rounded-full bg-white', innerClassName)}
      ></div>
    </div>
  )
}
