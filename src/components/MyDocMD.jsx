import images from 'assets/images'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal } from './Modal'
import { localServerData } from 'hooks/useLocalServerData'

export const MyDocMD = ({ children, handleClick }) => {
  const { t } = useTranslation()
  const { CURRENT_LANGUAGE } = localServerData()

  const [showModal, setShowModal] = useState(false)
  const closeModal = () => {
    setShowModal(false)
  }
  const openModal = () => {
    setShowModal(true)
  }

  return (
    <div className="bg-white rounded-md shadow-lg my-4">
      {/* header */}
      <div className="border-b-1 shadow mb-4 flex justify-between items-center px-4 py-2 bg-neutral-80/50">
        <span className="px-2 py-1 font-bold">DOC</span>

        {/* Action Button */}
        <div className="flex space-x-4">
          <div className="flex items-center space-x-1 px-2 py-1 hover:cursor-pointer" onClick={handleClick}>
            <img src={images.ic_copy} alt="ic_copy" className="h-4 w-4" />
            <span>{t('text_copy')}</span>
          </div>

          <div className="flex items-center space-x-1 px-2 py-1 hover:cursor-pointer" onClick={openModal}>
            <img src={images.ic_save} alt="ic_save" className="" />
            <span>{t('text_save')}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">{children}</div>

      <Modal show={showModal} onHide={closeModal}>
        <div className="w-[400px] mx-auto bg-white">
          {/* Header */}
          <div className="border-b-1 shadow mb-4 flex justify-between items-center px-4 py-2 bg-neutral-80">
            <span className="px-2 py-1 font-bold text-base">
              {CURRENT_LANGUAGE === 'en' ? 'Confirm' : 'Konfirmasi'}
            </span>

            {/* Action Button */}
            <div className="flex items-center space-x-1 px-2 py-1 hover:cursor-pointer" onClick={closeModal}>
              <img src={images.ic_cross} alt="ic_cross" className="h-4 w-4" />
            </div>
          </div>

          {/* Content / Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              closeModal()
            }}
            className="bg-white px-4 py-2"
          >
            <div className="flex flex-col space-y-2">
              <input className="border rounded-full px-4 py-2" placeholder={t('chat.save_document.placeholder')} />
            </div>

            <div className="mt-4 mb-2 flex justify-end">
              <button className="rounded-full px-4 py-2 btn-secondary-otp">{t('chat.save_document.button')}</button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  )
}
