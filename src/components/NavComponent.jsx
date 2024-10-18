import images from 'assets/images'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { useState, useEffect, useRef } from 'react'
import { Modal } from './Modal'
import { Input } from './Input'
import { Button } from './Button/Button'
import { useGlobalContext } from 'hooks/context'
import { useMutation, useQueryClient } from 'react-query'
import { API } from 'config/api'
import { deleteData, getData, patchData, putData } from 'hooks/useRequest'
import { notifyError } from 'hooks/useToas'
import { useTranslation } from 'react-i18next'
import { Typewriter } from './Typewriter'
import { useParams } from 'react-router-dom'

export const NavComponent = ({
  item,
  onDeleted,
  isActivated,
  typeClick,
  onClick,
}) => {
  const queryClient = useQueryClient()
  const collectionList = queryClient.getQueryData('collection')
  const {
    collectionClick,
    collectionDelete,
    collectionSetEdit,
    collection,
    setIsFirstTime,
    isFirstTime,
  } = useGlobalContext()
  const [tooltipPlace, setTooltipPlace] = useState('right')
  const [tooltipPlace2, setTooltipPlace2] = useState('right-start')
  const [tooltipOffset, setToolOffset] = useState(10)
  const [tooltipOffset2, setToolOffset2] = useState(10)
  const [show1st, setShow1st] = useState(false)
  const [show2nd, setShow2nd] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [text, setText] = useState('')
  const [showModalCreateCollection, setShowModalCreateCollection] =
    useState(false)
  const { t } = useTranslation()
  const { uuid } = useParams()

  const inputRef = useRef(null)
  const collectionInputRef = useRef(null)

  useEffect(() => {
    if (showModal && inputRef.current) {
      inputRef.current.focus()
    }
  }, [showModal])

  useEffect(() => {
    if (showModalCreateCollection && collectionInputRef.current) {
      collectionInputRef.current.focus()
    }
  }, [showModalCreateCollection])

  const { mutate: updateTitle } = useMutation(
    (text) =>
      patchData(API.THREAD_EDIT + collection.uuid + '/edit', { title: text }),
    {
      onSettled: (data) => {
        if (data.status === 'Success') {
          queryClient.invalidateQueries('collection')
          queryClient.invalidateQueries('newest_thread')
          collectionSetEdit({ ...item, editState: 'stop' })
          setShowModal(false)
        } else {
          notifyError(data?.message)
        }
      },
    }
  )

  const { mutate: createCollection } = useMutation(
    (form) => getData(API.COLLECTION_CREATE, form),
    {
      onSettled: (data) => {
        if (data.status === 'Success') {
          queryClient.invalidateQueries('collection')
          queryClient.invalidateQueries('newest_thread')
          setShowModalCreateCollection(false)
          setText('')
        } else {
          setText('')
          notifyError(data?.message)
        }
      },
    }
  )

  const { mutate: deleteThread } = useMutation(
    (uuid) => deleteData(API.THREAD_LIST_DELETE + uuid),
    {
      onSettled: (data) => {
        if (data.status === 'Success') {
          queryClient.invalidateQueries('newest_thread')
          queryClient.invalidateQueries('collection')
          collectionSetEdit({ ...item, editState: 'stop' })
          collectionDelete(item)
          onDeleted()
        } else {
          notifyError(data?.message)
        }
      },
    }
  )

  const { mutate: deleteThreadCollection } = useMutation(
    (formDelete) =>
      deleteData(API.COLLECTION_DELETE_THREAD, { data: formDelete }),
    {
      onSettled: (data) => {
        if (data.status === 'Success') {
          queryClient.invalidateQueries('collection')
          collectionSetEdit({ ...item, editState: 'stop' })
          collectionDelete(item)
          onDeleted()
        } else {
          notifyError(data?.message)
        }
      },
    }
  )

  const { mutate: assignCollection } = useMutation(
    (form) => putData(API.COLLECTION_CREATE_ASSIGN, form),
    {
      onSettled: (data) => {
        if (data?.status === 'Success') {
          queryClient.invalidateQueries('collection')
        } else {
          notifyError(data?.message)
        }
      },
    }
  )

  useEffect(() => {
    const currentRef = collectionInputRef.current
    if (collectionInputRef.current) {
      const onKeyEnter = (e) => {
        if (e?.key === 'Enter') {
          createCollection({
            name: collectionInputRef.current.value,
            threadId: item.uuid,
          })
        }
      }

      collectionInputRef.current?.addEventListener('keypress', onKeyEnter)

      return () => {
        currentRef?.removeEventListener('keypress', onKeyEnter)
      }
    }
  }, [createCollection, item.uuid])

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
      setTooltipPlace2('top')
      setToolOffset(18)
      setToolOffset2(-54)
    } else {
      setTooltipPlace('right')
      setTooltipPlace2('right-start')
      setToolOffset(6)
      setToolOffset2(1)
    }
  }

  const onDeleteClick = () => {
    if (collection.activeBy === 'thread') {
      deleteThread(item.uuid)
    } else if (collection.activeBy === null) {
      deleteThread(item.uuid)
    } else {
      deleteThreadCollection({
        thread_uuid: item.uuid,
        collection_uuid: collection.collection_from,
      })
    }
    setShow1st(false)
  }

  return (
    <>
      <div
        className={`h-9 rounded-lg flex justify-between items-center text-sm pl-2 cursor-pointer
      ${
        item.isActive
          ? isActivated && item.type === collection.activeBy
            ? 'bg-blue-dark text-white shadow pl-1 bg-selected-lawyer-left'
            : item?.uuid === uuid
            ? 'bg-blue-dark text-white shadow pl-1 bg-selected-lawyer-left'
            : 'border-blue-dark border pl-2'
          : ''
      }`}
        onClick={() => {
          item.isActive && isActivated
            ? void 0
            : collectionClick({ ...item, activeBy: typeClick })
          setIsFirstTime(false)

          if (onClick) {
            onClick()
          }
        }}
      >
        <>
          <div className={`line-clamp-1 w-full`}>
            {item.isActive && isActivated && isFirstTime ? (
              <Typewriter
                text={
                  item.title === ''
                    ? t('new_chat', {
                        keyPrefix: 'chat',
                      })
                    : item.title
                }
              />
            ) : item.title === '' ? (
              t('new_chat', {
                keyPrefix: 'chat',
              })
            ) : (
              item.title
            )}
          </div>

          {item.isActive && isActivated && item.type === collection.activeBy ? (
            <div
              className="pl-3 -py-2"
              onClick={() => {
                setShow1st(true)
                collectionClick({ ...item, activeBy: typeClick })
              }}
            >
              <img
                src={images.ic_dots}
                alt="dots"
                className="h-3 step-2 pr-2"
                data-tooltip-id={`tool-tips-${item.uuid}`}
              />
            </div>
          ) : item?.uuid === uuid ? (
            <div
              className="pl-3 -py-2"
              onClick={() => {
                setShow1st(true)
                collectionClick({ ...item, activeBy: typeClick })
              }}
            >
              <img
                src={images.ic_dots}
                alt="dots"
                className="h-3 step-2 pr-2"
                data-tooltip-id={`tool-tips-${item.uuid}`}
              />
            </div>
          ) : null}
        </>
      </div>

      <ReactTooltip
        id={`tool-tips-${item.uuid}`}
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
        className="shadow-md !bg-white !text-black-lightest mx-auto font-semi-bold !w-[70%] !rounded-lg !mb-2 md:mb-0 md:!w-52 z-50"
      >
        <div
          className="border-b border-neutral-20 -mx-4 px-4 py-1 md:hidden"
          onClick={() => {
            setShow1st(false)
            setShowModal(true)
            setText(item.title)
          }}
        >
          {t('change_name', { keyPrefix: 'nav_component' })}
        </div>
        <div
          className="border-b border-neutral-50 -mx-4 px-4 py-1 hidden md:inline-block w-52"
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
          className="flex -mx-4 px-4 py-1 md:w-52 justify-between"
          onClick={() => {
            setShow2nd(true)
          }}
          data-tooltip-id={`tool-tips2-${item.uuid}`}
        >
          <div>{t('move_to', { keyPrefix: 'nav_component' })}</div>
          <img src={images.ic_right_toogle} alt="right toogle" />
        </div>
        <div
          className="text-error-base bg-neutral-60 -mx-4 px-4 -mb-2.5 py-1 rounded-b-lg"
          onClick={() => onDeleteClick()}
        >
          {t('delete', { keyPrefix: 'nav_component' })}
        </div>
      </ReactTooltip>

      <ReactTooltip
        id={`tool-tips2-${item.uuid}`}
        noArrow
        place={tooltipPlace2}
        opacity={1}
        isOpen={show2nd}
        openOnClick={true}
        globalCloseEvents={{
          resize: true,
          clickOutsideAnchor: true,
          scroll: true,
          escape: true,
        }}
        setIsOpen={(e) => {
          setShow2nd(e)
        }}
        clickable={true}
        offset={tooltipOffset2}
        className="shadow-md !bg-white font-semi-bold !w-[70%] !rounded-lg md:mb-0 md:!w-52 z-50 mb-2"
      >
        {collectionList?.data?.length !== 0 &&
          collectionList?.data?.map((items, index) => {
            const exist = items.threads.find(
              (thread) => thread.uuid === item.uuid
            )
            if (!exist) {
              return (
                <div
                  key={index}
                  className="flex justify-start gap-2 items-center text-base text-neutral-40 mb-2 border-b border-b-neutral-50 -mx-4 px-4 pb-1"
                  onClick={() => {
                    collection.collection_from === null
                      ? assignCollection({
                          collection_uuid_to: items.uuid,
                          thread_uuid: collection.uuid,
                        })
                      : assignCollection({
                          collection_uuid_from: collection.collection_from,
                          collection_uuid_to: items.uuid,
                          thread_uuid: collection.uuid,
                        })
                  }}
                >
                  <img
                    src={images.ic_folder_colections}
                    alt="ic_folder_colection"
                    className="h-3 w-[13.76px]"
                  />
                  <div className="text-[#121212] text-xs">{items.name}</div>
                </div>
              )
            } else {
              return null
            }
          })}
        <div
          className="flex justify-start gap-2 items-center"
          onClick={() => setShowModalCreateCollection(true)}
        >
          <img
            src={images.ic_new_collection}
            alt="ic_folder_colection"
            className="h-3.5 w-4"
          />
          <div className="text-[#121212] text-xs">
            {t('new_collection', { keyPrefix: 'nav_component' })}
          </div>
        </div>
      </ReactTooltip>

      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false)
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
            inputClass="!py-2 bg-white !w-full !rounded-lg"
            rowed="w-full"
            ref={inputRef}
            onKeyEnter={(e) => {
              if (e.key === 'Enter' && text) {
                updateTitle(text)
              }
            }}
          />
          <div className="self-end flex gap-2 mt-4 mb-6">
            <Button
              label={t('cancel', { keyPrefix: 'nav_component' })}
              className="text-black-dark !h-10"
              onClick={() => setShowModal(false)}
            />
            <Button
              label={t('save', { keyPrefix: 'nav_component' })}
              className={`${
                text ? 'bg-green-900' : 'bg-dark-50 bg-opacity-45'
              } rounded-3xl !h-10 text-white`}
              disabled={!text}
              onClick={() => updateTitle(text)}
            />
          </div>
        </div>
      </Modal>

      <Modal
        show={showModalCreateCollection}
        onHide={() => {
          setShowModalCreateCollection(false)
          setText('')
        }}
        dialogClassName="w-11/12 md:w-1/2 lg:w-1/3"
      >
        <form
          className="bg-neutral-10 bg-opacity-95 !rounded-xl flex flex-col px-4 pt-6 w-full"
          onSubmit={(e) => {
            e.preventDefault()
            createCollection({ name: text, threadId: item.uuid })
            setText('')
          }}
        >
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
            ref={collectionInputRef}
            createCollection
          />
          <div className="self-end flex gap-2 mt-4 mb-6">
            <Button
              label={t('cancel', { keyPrefix: 'nav_component' })}
              className="text-black-dark !h-10"
              onClick={(e) => {
                e.preventDefault()
                setText('')
                setShowModalCreateCollection(false)
              }}
            />
            <Button
              label={t('create', { keyPrefix: 'nav_component' })}
              className={`${
                text ? 'bg-green-900' : 'bg-dark-50 bg-opacity-45'
              } rounded-3xl !h-10 text-white`}
              disabled={!text}
              onClick={(e) => {
                e.preventDefault()
                createCollection({ name: text, threadId: item.uuid })
              }}
            />
          </div>
        </form>
      </Modal>
    </>
  )
}
