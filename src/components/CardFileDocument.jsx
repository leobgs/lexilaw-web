import images from 'assets/images'
import { useTranslation } from 'react-i18next'
import { CardDocument } from './CardDocument'
import clsx from 'clsx'
import { HashLink } from 'react-router-hash-link'
import { notifyInfo } from 'hooks/useToas'
import { useDeleteDocument } from 'hooks/useDeleteDocument'
import { Modal } from './Modal'
import { useState } from 'react'

/**
 * @typedef {Object} System
 * @property {string} thread_chat_uuid
 * @property {string} thread_uuid
 * @property {string} name
 */

/**
 * @typedef {Object} Lawyer
 * @property {string} uuid
 * @property {string} thread_uuid
 * @property {string} service_name_indonesia
 * @property {string} service_name_english
 * @property {string} url
 */

/**
 *
 * @param {{
 * system_data: System[]
 * lawyer_data: Lawyer[]
 * }}
 * @returns
 */
export const CardFileDocument = ({
  data,
  lawyer,
  lawyer_data,
  className,
  system_data,
}) => {
  const { t, i18n } = useTranslation()
  const { mutateAsyncDeleteDocument } = useDeleteDocument()

  const [showModal, setShowModal] = useState(false)
  const [doc, setDoc] = useState(null)
  const openModal = (doc) => {
    setShowModal(true)
    setDoc(doc)
  }
  const closeModal = () => {
    setShowModal(false)
    setDoc(null)
  }

  const isEnglish = i18n.language === 'en'

  return (
    <div
      className={clsx(
        'bg-gradient-card-file h-[99%] w-[320px] mt-2 shadow-lg rounded-xl md:flex flex-col px-4',
        className
      )}
    >
      <div className="overflow-y-auto no-scrollbar">
        <div className="flex items-center my-4 gap-2 sticky">
          <img src={images.ic_info_file} alt="upload" className="h-5 w-5" />
          <p className="text-xs">
            {t('lawyer_detail', {
              keyPrefix: 'lawyer_document',
            })}{' '}
          </p>
        </div>

        {/* Hasil Dari AI / System */}
        <div>
          {system_data && (
            <p className="text-secondary-base text-sm mb-2.5">
              {t('ai_result', {
                keyPrefix: 'lawyer_document',
              })}
            </p>
          )}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-2 gap-y-1">
            {system_data?.map((item) => (
              <HashLink
                smooth
                key={item.thread_chat_uuid}
                className="hover:cursor-pointer w-full"
                to={`thread/${item.thread_uuid}#${item.thread_chat_uuid}`}
              >
                {/* Icon */}
                <div className="border-2 border-[#000] flex justify-center items-center w-full aspect-square rounded-md bg-white flex-shrink-0 relative">
                  <img src={images.ic_files} alt="ic_files" />
                  {/* Icon Delete */}
                  <div
                    className="absolute top-1 right-2"
                    onClick={(e) => {
                      e.stopPropagation()
                      e.preventDefault()

                      openModal(item)
                    }}
                  >
                    <img
                      src={images.ic_cross}
                      alt="ic_cross"
                      className="w-4 h-4"
                    />
                  </div>
                </div>
                <p className="text-xs font-medium mt-2 truncate">{item.name}</p>
              </HashLink>
            ))}
          </div>
        </div>

        {/* Hasil Dari Lawyer */}
        <div className="mt-5">
          {lawyer_data && (
            <p className="text-secondary-base text-sm mb-2.5 font-medium">
              {t('lawyer_result', {
                keyPrefix: 'lawyer_document',
              })}
            </p>
          )}

          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-x-2 gap-y-1">
            {lawyer_data?.map((item) => (
              <CardDocument key={item.uuid} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="hidden md:block flex-1" />

      {lawyer && (
        <>
          <div className="bg-[#585858] w-full flex justify-between items-center px-3 py-2 rounded-md">
            <div className="text-white">
              <p className="font-semi-bold">
                {lawyer?.first_name
                  ? lawyer.first_name + ' ' + lawyer.last_name
                  : 'Calvin Koss .SH'}
              </p>
              <p className="text-xs font-regular text-[#969090]">
                {lawyer?.city_name ? lawyer.city_name : 'Jakarta'}
              </p>
            </div>
            {/* Untuk saat ini button cek jadwal di hide dulu */}
            {/* <div className="bg-blue-sky text-xs items-center flex rounded-3xl p-2 h-7">
          {t('check_schedule', {
            keyPrefix: 'lawyer_document',
          })}
        </div> */}
          </div>
          <p className="text-xs text-secondary-base font-thin text-center mt-1 mb-2">
            {t('lawyer_reommend', {
              keyPrefix: 'lawyer_document',
            })}
          </p>
        </>
      )}

      {/* Modal Delete Document confirmation */}
      <Modal show={showModal} onHide={closeModal}>
        <div className="w-[400px] mx-auto bg-white">
          {/* Header */}
          <div className="border-b-1 shadow mb-4 flex justify-between items-center px-4 py-2 bg-neutral-80">
            <span className="px-2 py-1 font-bold text-base">
              {i18n.language === 'en' ? 'Confirm' : 'Konfirmasi'}
            </span>

            {/* Action Button */}
            <div
              className="flex items-center space-x-1 px-2 py-1 hover:cursor-pointer"
              onClick={closeModal}
            >
              <img src={images.ic_cross} alt="ic_cross" className="h-4 w-4" />
            </div>
          </div>

          {/* Content / Form */}
          <div className="bg-white px-4 py-2">
            {/* text */}
            <p className="text-center text-sm">
              {t('system_document.delete_confirmation')}
            </p>
            <p className="truncate font-bold my-2 text-center text-sm">
              "{doc?.name}"
            </p>

            {/* Action Button */}
            <div className="mt-4 mb-2 flex justify-center items-center gap-x-4">
              <button
                className="rounded-full px-4 py-2 border  disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={closeModal}
              >
                {isEnglish ? 'Cancel' : 'Batal'}
              </button>
              <button
                className="rounded-full px-4 py-2 btn-secondary-otp disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={async () => {
                  mutateAsyncDeleteDocument({
                    thread_chat_id: doc?.thread_chat_uuid,
                    thread_id: doc?.thread_uuid,
                  })

                  closeModal()
                }}
              >
                {isEnglish ? 'Delete' : 'Hapus'}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
