import { Header, ModalDetailLawyer, MyLawyerCard } from 'components'
import { API } from 'config/api'
import { getData } from 'hooks/useRequest'
import { notifyError } from 'hooks/useToas'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { chunkArray } from 'utils'

export const MyLawyer = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [currentUUID, setCurrentUUID] = useState(null)
  let [showModal, setShowModal] = useState(false)
  const [tmpMyLawyer, setTmpMyLawyer] = useState([])
  const [dataMyLawyer, setDataMyLawyer] = useState([])
  const [dataCaseList, setDataCaseList] = useState([])

  useQuery(['mylawyer_list'], () => getData(API.MY_LAWYER_LIST), {
    onSettled: async (data) => {
      if (data?.status === 'Success') {
        const lawyers = data?.data || []
        setTmpMyLawyer(lawyers)

        const allThreadUuids = lawyers.flatMap((lawyer) => lawyer.thread_uuid)
        onGetCase(allThreadUuids)
      } else {
        notifyError(data?.message)
      }
    },
  })

  const { mutate: onGetCase } = useMutation(
    (arrUuid) => getData(API.MY_LAWYER_CASE, { thread_uuid: arrUuid }),
    {
      onSettled: (data) => {
        if (data?.status === 'Success') {
          const caseList = data?.data || []
          const threadDetailsMap = caseList.reduce((acc, thread) => {
            acc[thread.uuid] = thread
            return acc
          }, {})

          setDataCaseList(threadDetailsMap)
        } else {
          notifyError(data?.message)
        }
      },
    }
  )

  useEffect(() => {
    if (tmpMyLawyer.length > 0 && Object.keys(dataCaseList).length > 0) {
      const updatedLawyers = tmpMyLawyer?.map((lawyer) => ({
        ...lawyer,
        thread_uuid: lawyer.thread_uuid?.map((uuid) => ({
          uuid,
          name: dataCaseList[uuid]?.name || 'Unknown',
        })),
      }))
      setDataMyLawyer(chunkArray(updatedLawyers))
    }
  }, [dataCaseList])

  return (
    <div className='h-full'>
      <Header
        label={t('header', { keyPrefix: 'my_lawyer' })}
        onBackClick={() => navigate(-1)}
        className='shadow-sm'
      />

      <div className='w-full h-full px-4 gap-4 grid grid-cols-1 pt-4 md:grid-cols-3 md:px-0'>
        {dataMyLawyer &&
          dataMyLawyer?.map((item, index) => (
            <div className='row-span-1' key={index}>
              {item?.map((items) => (
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

      {showModal && <ModalDetailLawyer
        show={showModal && currentUUID}
        onHide={() => {
          setShowModal(!showModal)
          setCurrentUUID(null)
        }}
      />}
    </div>
  )
}
