import clsx from 'clsx'
import './Toggle.scss'
import { useTranslation } from 'react-i18next'
import { useGlobalContext } from 'hooks/context'

export const Toggle = ({ className, labelClassName }) => {
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
    <div className={clsx('my-4 flex justify-end align-center', className)}>
      <p className='text-white font-light me-2'>
        {isEnglish ? 'English (EN)' : 'Indonesia (ID)'}
      </p>
      <div className='toggle'>
        <input
          id='check1'
          className='toggle-checkbox hidden'
          type='checkbox'
          onChange={handleToggle}
          checked={isEnglish}
        />
        <label
          htmlFor='check1'
          className={clsx(
            'toggle-label block w-[53px] h-6 rounded-full transition-color duration-150 ease-out',
            labelClassName
          )}
        />
      </div>
    </div>
  )
}
