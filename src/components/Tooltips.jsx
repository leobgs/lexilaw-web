import clsx from 'clsx'
import { Tooltip as ReactTooltip } from 'react-tooltip'

export const Tooltips = ({
  idToolTips,
  tooltipPlace = 'top',
  tooltipEffect = 'solid',
  className,
  children,
}) => {
  return (
    <ReactTooltip
      id={idToolTips}
      place={tooltipPlace}
      effect={tooltipEffect}
      noArrow
      openOnClick={true}
      globalCloseEvents={{ resize: true, clickOutsideAnchor: true }}
      clickable={true}
      offset={10}
      className={clsx(
        'shadow-md !bg-white !w-2/3 !rounded-lg md:mb-0 md:!w-52',
        className
      )}
    >
      {children}
    </ReactTooltip>
  )
}
