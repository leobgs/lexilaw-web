import images from 'assets/images'

import { Modal } from './Modal'
import { useState } from 'react'
import { t } from 'i18next'

export const ModalSearch = ({ show, onHide = () => {} }) => {
  const [search, setSearch] = useState('')
  return (
    <Modal
      show={show}
      onHide={() => void 0}
      contentClassName='bg-white h-full px-4 md:!w-1/2 xl:!w-1/3 lg:!w-1/2 md:!h-[90%] md:rounded-xl overflow-y-auto no-scrollbar md:hidden'
    >
      <div className='bg-white border-b border-neutral-50 pb-4 -mx-4 px-4'>
        <div className='flex justify-between items-center gap-2 mt-4 w-full outline-1 outline-neutral-10 outline rounded-3xl px-2 py-2'>
          <img
            src={images.ic_back}
            alt='back'
            className='!w-[11px] !h-[18px] aspect-square mt-0.5 ml-2'
            onClick={() => {
              onHide()
              setSearch('')
            }}
          />
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            name='search'
            className='w-full !outline-none ml-2'
            placeholder={t('search', {
              keyPrefix: 'chat.chat_text',
            })}
          />
        </div>
      </div>
    </Modal>
  )
}
