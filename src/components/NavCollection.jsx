import images from 'assets/images'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { Button } from './Button/Button'
import { Modal } from './Modal'
import { Input } from './Input'
import { putData } from 'hooks/useRequest'
import { API } from 'config/api'
import { useMutation, useQueryClient } from 'react-query'
import { notifyError } from 'hooks/useToas'

export const NavCollection = ({
  items,
  onExpand = () => {},
  onDeleteCollection = () => {},
}) => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  const [tooltipPlace, setTooltipPlace] = useState('right')
  const [tooltipOffset, setToolOffset] = useState(10)
  const [show1st, setShow1st] = useState(false)
  const [text, setText] = useState('')
  const [showModalCreateCollection, setShowModalCreateCollection] =
    useState(false)

  const inputRef = useRef(null)

  useEffect(() => {
    if (showModalCreateCollection && inputRef.current) {
      inputRef.current.focus()
    }
  }, [showModalCreateCollection])

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  function handleResize() {
    const screenWidth = window.innerWidth
    if (screenWidth < 768) {
      setTooltipPlace('top-start')
      setToolOffset(15)
    } else {
      setTooltipPlace('right')
      setToolOffset(14)
    }
  }

  const { mutate: createCollection } = useMutation(
    (form) =>
      putData(API.COLLECTION_CHANGE_NAME + form?.threadId, {
        name: form?.name,
      }),
    {
      onSettled: (data) => {
        if (data.status === 'Success') {
          queryClient.invalidateQueries('collection')
          setShowModalCreateCollection(false)
        } else {
          notifyError(data?.message)
        }
      },
    }
  )

  return (
    <div
      className={`flex justify-between gap-2 items-center text-sm text-neutral-40 mb-2 px-2 py-1 cursor-pointer ${
        items.isExpand ? 'bg-blue-sky rounded-lg' : ''
      }`}
    >
      <div
        className="justify-start flex items-center gap-2 w-10/12"
        onClick={() => onExpand(items.uuid)}
      >
        <img
          src={
            items.isExpand
              ? images.ic_folder_colection_active
              : images.ic_folder_colection
          }
          alt="ic_folder_colection"
          className="h-7 w-7"
        />
        <div>{items.name}</div>
      </div>

      {items.isExpand && (
        <div
          className="flex justify-end w-2/12"
          onClick={() => setShow1st(true)}
        >
          <img
            src={images.ic_dots_white}
            alt="dots_white"
            className="h-3.5 w-3.5"
            data-tooltip-id={`tool-tips-${items.uuid}`}
          />
        </div>
      )}

      <ReactTooltip
        id={`tool-tips-${items.uuid}`}
        place={tooltipPlace}
        noArrow
        opacity={1}
        isOpen={show1st}
        openOnClick={true}
        globalCloseEvents={{
          resize: true,
          clickOutsideAnchor: true,
          scroll: true,
        }}
        setIsOpen={(e) => {
          setShow1st(e)
        }}
        clickable={true}
        offset={tooltipOffset}
        className="shadow-md !bg-white !text-black-lightest font-semi-bold !w-2/3 !rounded-lg mr-2 !mb-2 md:mb-0 md:!w-52 z-50"
      >
        <div
          className="border-b border-neutral-20 -mx-4 px-4 py-1 md:hidden"
          onClick={() => {
            setShow1st(false)
            setShowModalCreateCollection(true)
            setText(items.name)
          }}
        >
          {t('change_name', { keyPrefix: 'nav_component' })}
        </div>

        <div
          className="border-b border-neutral-50 -mx-4 px-4 py-1 hidden md:inline-block w-52"
          onClick={() => {
            setShow1st(false)
            setShowModalCreateCollection(true)
            setText(items.name)
          }}
        >
          {t('change_name', { keyPrefix: 'nav_component' })}
        </div>

        <div
          className="text-error-base bg-neutral-60 -mx-4 px-4 -mb-2.5 py-1 rounded-b-lg"
          onClick={() => onDeleteCollection()}
        >
          {t('delete', { keyPrefix: 'nav_component' })}
        </div>
      </ReactTooltip>

      <Modal
        show={showModalCreateCollection}
        onHide={() => {
          setShowModalCreateCollection(false)
          setText('')
        }}
        dialogClassName="w-11/12 md:w-1/2 lg:w-1/3"
      >
        <div className="bg-neutral-10 bg-opacity-95 !rounded-xl flex flex-col px-4 pt-6 w-full">
          <Input
            name="text"
            onChange={(e) => setText(e.value)}
            value={text}
            className="!w-full text-neutral-40"
            placeholder={t('placeholder_create', {
              keyPrefix: 'nav_component',
            })}
            inputClass="!py-2 bg-white !w-full !rounded-lg"
            rowed="w-full"
            ref={inputRef}
          />
          <div className="self-end flex gap-2 mt-4 mb-6">
            <Button
              label={t('cancel', { keyPrefix: 'nav_component' })}
              className="text-black-dark !h-10"
              onClick={() => setShowModalCreateCollection(false)}
            />
            <Button
              label={t('save', { keyPrefix: 'nav_component' })}
              className={`${
                text ? 'bg-green-900' : 'bg-dark-50 bg-opacity-45'
              } rounded-3xl !h-10 text-white`}
              disabled={!text}
              onClick={() =>
                createCollection({ name: text, threadId: items.uuid })
              }
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}
