import images from 'assets/images'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { useState, useEffect } from 'react'
import { Modal } from './Modal'
import { Input } from './Input'
import { Button } from './Button/Button'
import { KOLEKSI_CHAT } from 'utils/dummy'
import { useGlobalContext } from 'hooks/context'
import { useMutation, useQueryClient } from 'react-query'
import { API } from 'config/api'
import { deleteData, patchData } from 'hooks/useRequest'
import { notifyError } from 'hooks/useToas'
import { useTranslation } from 'react-i18next'

export const NavComponent = ({ item, onClick }) => {
  const queryClient = useQueryClient()
  const { collectionClick, collectionDelete, collectionSetEdit, collection } =
    useGlobalContext()
  const [tooltipPlace, setTooltipPlace] = useState('right')
  const [tooltipPlace2, setTooltipPlace2] = useState('right-start')
  const [tooltipOffset, setToolOffset] = useState(10)
  const [tooltipOffset2, setToolOffset2] = useState(10)
  const [show1st, setShow1st] = useState(false)
  const [show2nd, setShow2nd] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [text, setText] = useState('')
  const { t } = useTranslation()

  const { mutate: updateTitle } = useMutation(
    (text) =>
      patchData(API.THREAD_EDIT + collection.uuid + '/edit', { title: text }),
    {
      onSettled: (data) => {
        if (data.status === 'Success') {
          queryClient.invalidateQueries('newest_thread')
          collectionSetEdit({ ...item, editState: 'stop' })
          setShowModal(false)
        } else {
          notifyError(data?.message)
        }
      },
    }
  )

  const { mutate: deleteThread } = useMutation(
    (uuid) => deleteData(API.THREAD_DETAIL + uuid),
    {
      onSettled: (data) => {
        if (data.status === 'Success') {
          queryClient.invalidateQueries('newest_thread')
          collectionSetEdit({ ...item, editState: 'stop' })
          setShowModal(false)
        } else {
          notifyError(data?.message)
        }
      },
    }
  )

  useEffect(() => {
    function handleResize() {
      const screenWidth = window.innerWidth
      if (screenWidth < 768) {
        setTooltipPlace('top-start')
        setTooltipPlace2('top')
        setToolOffset(15)
        setToolOffset2(-52)
      } else {
        setTooltipPlace('right')
        setTooltipPlace2('right-start')
        setToolOffset(14)
        setToolOffset2(1)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const onDeleteClick = () => {
    deleteThread(item.uuid)
    setShow1st(false)
    collectionDelete(item)
  }

  return (
    <div
      className={`h-9 rounded-lg flex justify-between items-center text-sm 
      ${item.isActive ? 'bg-blue-dark text-white shadow px-2' : ''}`}
    >
      <>
        <div
          className='line-clamp-1 w-full'
          onClick={() => {
            collectionClick(item)
          }}
        >
          {item.title}
        </div>
        {item.isActive && (
          <div className=''>
            <img
              src={images.ic_dots}
              alt='dots'
              className='h-3 step-2'
              data-tooltip-id={`tool-tips-${item.uuid}`}
              onClick={() => setShow1st(true)}
            />
          </div>
        )}
      </>

      <ReactTooltip
        id={`tool-tips-${item.uuid}`}
        place={tooltipPlace}
        effect='solid'
        noArrow
        isOpen={show1st}
        openOnClick={true}
        globalCloseEvents={{ resize: true, clickOutsideAnchor: true }}
        setIsOpen={(e) => {
          setShow1st(e)
        }}
        clickable={true}
        offset={tooltipOffset}
        className='shadow-md !bg-white !text-black-lightest font-semi-bold !w-2/3 !rounded-lg mr-2 !mb-2 md:mb-0 md:!w-52 z-50'
      >
        <div
          className='border-b border-neutral-20 -mx-4 px-4 py-1 md:hidden'
          onClick={() => {
            setShow1st(false)
            setShowModal(true)
            setText(item.title)
          }}
        >
          {t('change_name', { keyPrefix: 'nav_component' })}
        </div>
        <div
          className='border-b border-neutral-20 -mx-4 px-4 py-1 hidden md:inline-block w-52'
          onClick={() => {
            setShow1st(false)
            collectionSetEdit({ ...item, editState: 'start' })
            setShowModal(true)
            setText(item.title)
          }}
        >
          {t('change_name', { keyPrefix: 'nav_component' })}
        </div>

        <div
          className='flex -mx-4 px-4 py-1 md:w-52 justify-between'
          onClick={() => setShow2nd(true)}
          data-tooltip-id={`tool-tips2-${item.uuid}`}
        >
          <div>{t('move_to', { keyPrefix: 'nav_component' })}</div>
          <img src={images.ic_right_toogle} alt='right toogle' />
        </div>
        <div
          className='text-error-base bg-neutral-60 -mx-4 px-4 -mb-2.5 py-1 rounded-b-lg'
          onClick={() => onDeleteClick()}
        >
          {t('delete', { keyPrefix: 'nav_component' })}
        </div>
      </ReactTooltip>

      <ReactTooltip
        id={`tool-tips2-${item.uuid}`}
        place={tooltipPlace2}
        effect='solid'
        noArrow
        isOpen={show2nd}
        openOnClick={true}
        globalCloseEvents={{ resize: true, clickOutsideAnchor: true }}
        setIsOpen={(e) => {
          setShow2nd(e)
        }}
        clickable={true}
        offset={tooltipOffset2}
        className='shadow-md !bg-white font-semi-bold !w-2/3 !rounded-lg md:mb-0 md:!w-52'
      >
        {KOLEKSI_CHAT?.map((item, index) => (
          <div
            key={index}
            className='flex justify-start gap-2 items-center text-base text-neutral-40 mb-2'
          >
            <img
              src={images.ic_folder_colections}
              alt='ic_folder_colection'
              className='h-4'
            />
            {item.label}
          </div>
        ))}
        <div>
          <div className='!text-neutral-40 text-base'>
            {t('new_collection', { keyPrefix: 'nav_component' })}
          </div>
        </div>
      </ReactTooltip>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        dialogClassName='w-11/12 md:w-1/2 lg:w-1/3'
      >
        <div className='bg-neutral-10 bg-opacity-95 !rounded-xl flex flex-col px-4 pt-6 w-full'>
          <Input
            name='text'
            onChange={(e) => setText(e.value)}
            value={text}
            className='!w-full text-neutral-40'
            inputClass='!py-2 bg-white !w-full !rounded-lg'
            rowed='w-full'
          />
          <div className='self-end flex gap-2 mt-4 mb-6'>
            <Button
              label={t('cancel', { keyPrefix: 'nav_component' })}
              className='text-black-dark !h-10'
              onClick={() => setShowModal(false)}
            />
            <Button
              label={t('save', { keyPrefix: 'nav_component' })}
              className={`${
                text ? 'bg-green-900' : 'bg-dark-50 bg-opacity-45'
              } rounded-3xl !h-10`}
              disabled={!text}
              onClick={() => updateTitle(text)}
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}
