import images from 'assets/images'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { useState, useEffect } from 'react'
import { Modal } from './Modal'
import { Input } from './Input'
import { Button } from './Button/Button'
import { KOLEKSI_CHAT } from 'utils/dummy'

export const NavComponent = ({ item, onClickColection, onEdit, onDelete }) => {
  const [tooltipPlace, setTooltipPlace] = useState('right')
  const [tooltipPlace2, setTooltipPlace2] = useState('right-start')
  const [tooltipOffset, setToolOffset] = useState(10)
  const [tooltipOffset2, setToolOffset2] = useState(10)
  const [show1st, setShow1st] = useState(false)
  const [show2nd, setShow2nd] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [isEdit, setEdit] = useState(false)
  const [text, setText] = useState('')

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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onEdit(e.target.value)
      setEdit(false)
    }
  }

  const onDeleteClick = () => {
    setShow1st(false)
    onDelete(item.id)
  }

  return (
    <div
      className={`h-9 py-2 md:mr-4 md:-mx-2 rounded-lg flex justify-between items-center ${
        item.isActive ? 'bg-blue-dark text-white shadow' : ''
      } ${isEdit ? 'mb-1 px-[1px]' : ' px-2'} `}
    >
      {isEdit ? (
        <input
          name='text'
          onChange={(e) => setText(e.target.value)}
          value={text}
          onBlur={() => {
            onEdit(text)
            setEdit(false)
          }}
          onKeyDown={handleKeyDown}
          className='!py-1 w-full text-neutral-40 rounded-lg px-2 border border-neutral-60 focus:border-neutral-60 focus:border focus:outline-none'
        />
      ) : (
        <>
          <div
            className='line-clamp-1 w-full'
            onClick={() => onClickColection()}
          >
            {item.title}
          </div>
          {item.isActive && (
            <div className=''>
              <img
                src={images.ic_dots}
                alt='dots'
                className='h-3 step-2'
                data-tooltip-id={`tool-tips-${item.id}`}
                onClick={() => setShow1st(true)}
              />
            </div>
          )}
        </>
      )}

      <ReactTooltip
        id={`tool-tips-${item.id}`}
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
        className='shadow-md !bg-white !text-black-lightest font-semi-bold !w-2/3 !rounded-lg mr-2 !mb-2 md:mb-0 md:!w-52'
      >
        <div
          className='border-b border-neutral-20 -mx-4 px-4 py-1 md:hidden'
          onClick={() => {
            setShow1st(false)
            setShowModal(true)
            setText(item.title)
          }}
        >
          Ganti Nama
        </div>
        <div
          className='border-b border-neutral-20 -mx-4 px-4 py-1 hidden md:inline-block w-52'
          onClick={() => {
            setShow1st(false)
            setEdit(true)
            setText(item.title)
          }}
        >
          Ganti Nama
        </div>

        <div
          className='flex -mx-4 px-4 py-1 md:w-52 justify-between'
          onClick={() => setShow2nd(true)}
          data-tooltip-id={`tool-tips2-${item.id}`}
        >
          <div>Pindah ke</div>
          <img src={images.ic_right_toogle} alt='right toogle' />
        </div>
        <div
          className='text-error-base bg-neutral-60 -mx-5 px-4 -mb-2.5 py-1 rounded-b-lg'
          onClick={() => onDeleteClick()}
        >
          Hapus
        </div>
      </ReactTooltip>

      <ReactTooltip
        id={`tool-tips2-${item.id}`}
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
          <div className='!text-neutral-40 text-base'>Koleksi Baru</div>
        </div>
      </ReactTooltip>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        dialogClassName='w-11/12 md:hidden'
      >
        <div className='bg-white !rounded-xl px-4 flex justify-center py-4'>
          <Input
            name='text'
            onChange={(e) => setText(e.value)}
            value={text}
            className='!py-1 w-full -mx-2 text-neutral-40'
            inputClass='!py-1.5'
          />
          <div className='float-end'>
            <Button />
          </div>
        </div>
      </Modal>
    </div>
  )
}
