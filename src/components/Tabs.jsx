import clsx from 'clsx'

export const Tabs = ({
  className,
  textArr = [],
  onTabClick = (e) => {},
  currText = '',
}) => {
  return (
    <div className={clsx('flex md:w-2/3 w-full px-4', className)}>
      {textArr?.map((item, index) => (
        <div
          className={`text-sm px-3 py-1 md:w-1/3 w-full text-center ${
            item === currText
              ? 'bg-black-dark text-white first:rounded-s-2xl last:rounded-e-2xl border border-neutral-30'
              : 'bg-chat text-neutral-40 first:rounded-s-2xl last:rounded-e-2xl border border-neutral-30 '
          }`}
          key={index}
          onClick={() => onTabClick(item)}
        >
          {item}
        </div>
      ))}
    </div>
  )
}
