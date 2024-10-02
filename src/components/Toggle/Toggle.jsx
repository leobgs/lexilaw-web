import clsx from 'clsx'
import './Toggle.scss'
import { useTranslation } from 'react-i18next'
import { useGlobalContext } from 'hooks/context'
import { useEffect, useState } from 'react'
import './Toggle.scss'
import { localServerData } from '../../hooks/useLocalServerData'

export const Toggle = ({ className, labelClassName, hideText }) => {
  const { currentLanguage, setLanguage } = useGlobalContext()
  const { i18n } = useTranslation()

  const isEnglish = currentLanguage === 'en'

  const handleToggle = () => {
    if (isEnglish) {
      i18n.changeLanguage('id')
      setLanguage('id')
    } else {
      i18n.changeLanguage('en')
      setLanguage('en')
    }
  }

  return (
    // <div className="my-4 flex justify-end align-center"
    <div
      className={clsx(
        'my-4 flex justify-end align-center items-center font-semi-bold',
        className
      )}
    >
      {!hideText && (
        <p className="text-white font-semi-bold me-2 text-xs">
          {isEnglish ? 'English (EN)' : 'Indonesia (ID)'}
        </p>
      )}

      <div className="flex mt-5 bg-transparent w-fit">
        <div className="button r" id="button-1">
          <input
            type="checkbox"
            className="checkbox"
            onChange={handleToggle}
            checked={isEnglish}
          />
          <div className={`knobs before:content-['ID']`} />
          <div className="layer !bg-neutral-20" />
        </div>
      </div>
    </div>
  )
}
