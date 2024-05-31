import { Header, ModalDetailLawyer, MyLawyerCard } from 'components'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { chunkArray } from 'utils'
import { MY_LAWYER } from 'utils/dummy'

export const MyLawyer = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [currentUUID, setCurrentUUID] = useState(null)
  let [showModal, setShowModal] = useState(false)
  let chunkedArray = chunkArray(MY_LAWYER)

  return (
    <div className='h-full'>
      <Header
        label={t('header', { keyPrefix: 'my_lawyer' })}
        onBackClick={() => navigate(-1)}
        className='shadow-sm'
      />

      <div className='w-full h-full px-4 gap-4 grid grid-cols-1 pt-4 md:grid-cols-3 md:px-0'>
        {chunkedArray.map((item, index) => (
          <div className='row-span-1' key={index}>
            {item.map((items) => (
              <MyLawyerCard
                data={items}
                className='mb-4 shadow-sm'
                key={items.uuid}
                onClick={() => {
                  setCurrentUUID(items.uuid)
                  setShowModal(!showModal)
                }}
              />
            ))}
          </div>
        ))}
      </div>

      <ModalDetailLawyer
        show={showModal && currentUUID}
        onHide={() => {
          setShowModal(!showModal)
          setCurrentUUID(null)
        }}
      />
    </div>
  )
}
