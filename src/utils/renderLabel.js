import clsx from 'clsx'
import { numberSeparator } from './numberSeparator'

export const renderLabel = ({
  text,
  value,
  indx,
  prefix = 'Rp',
  noSparator = false,
  className,
}) => {
  return (
    <div
      className={clsx('flex items-center justify-between mb-2', className)}
      key={indx}
    >
      <span>{text}</span>

      <span className=''>
        {noSparator ? value : numberSeparator(value, prefix)}
      </span>
    </div>
  )
}
