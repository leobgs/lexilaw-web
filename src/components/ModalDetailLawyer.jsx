import images from 'assets/images'
import { Modal } from './Modal'
import { Tabs } from './Tabs'
import { useEffect, useState } from 'react'
import { DOCUMMENT_HASIL, LAWYER_SCHEDULE } from 'utils/dummy'
import { Link } from 'react-router-dom'
import { copyToClipboard } from 'utils'
import { Button } from './Button/Button'

export const ModalDetailLawyer = ({
  data,
  show = false,
  onHide = () => {},
}) => {
  const [currText, setCurrText] = useState('Hasil')
  const [dataDocumment, setDataDocumment] = useState([])

  useEffect(() => {
    DOCUMMENT_HASIL?.forEach((item, index) => {
      if (index === 0) {
        item.isActive = true
      } else {
        item.isActive = false
      }
    })
    setDataDocumment(DOCUMMENT_HASIL)
  }, [])

  const handleShowHideDiv = (id) => {
    dataDocumment?.forEach((item) => {
      if (item.uuid === id) {
        item.isActive = !item.isActive
      }
    })
    setDataDocumment([...dataDocumment])
  }

  return (
    <Modal
      show={show}
      onHide={() => void 0}
      contentClassName='bg-screen h-full px-4 md:!w-1/2 xl:!w-1/3 lg:!w-1/2 md:!h-[90%] md:rounded-xl overflow-y-auto no-scrollbar'
      className='bg-neutral-40 h-full'
    >
      <div className='md:hidden'>
        <div className='bg-neutral-60 -mx-4 px-4 py-4 flex items-center gap-2 top fixed w-full'>
          <img
            src={images.ic_back}
            alt='back'
            onClick={() => onHide()}
            className='h-6 w-4'
          />
          <div className='flex items-center'>
            <img
              src='https://picsum.photos/id/64/200/200'
              alt='images'
              className='rounded-full w-12 h-12'
            />
            <div className='ml-2'>
              <div className='font-semi-bold text-secondary-base'>
                {'Umabachi'}
              </div>
              <div className='text-xs text-neutral-40'>{'Medan'}</div>
            </div>
          </div>
        </div>

        <div
          className={`bg-neutral-60 -mx-4 px-4 py-4 ${
            currText === 'Hasil' ? '' : 'hidden'
          }`}
        >
          <div className='line-clamp-5 text mt-20'>{`Berkomitmen untuk Menyelesaikan Perselisihan | Konsultasi Hukum dan Penyelesaian SengketaBerkomitmen untuk Menyelesaikan Perselisihan | Konsultasi Hukum dan Penyelesaian Sengketa Advokat Hukum | Hukum Perdata | ....`}</div>
          <div className={`grid grid-cols-10 mt-4 gap-2`}>
            {['Hukum Pertanahan', 'Hukum Keluarga', 'Hukum Perdata']?.map(
              (item, index) => (
                <div
                  className='bg-[#D9D9D9] rounded-lg py-1 px-2 text-center text-neutral-40 my-auto line-clamp-1 text-xs col-span-4 first:col-span-5'
                  key={index}
                >
                  {item}
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <div className='hidden md:inline-block pb-4 bg-neutral-60 overflow-y-auto -mx-4 relative'>
        <div className='bg-neutral-60 px-4 py-4 flex items-center gap-2 justify-between rounded-t-2xl fixed md:!w-1/2 xl:!w-1/3 lg:!w-1/2 bg-img-detail'>
          <div className='flex items-center'>
            <img
              src='https://picsum.photos/id/64/200/200'
              alt='images'
              className='rounded-full w-12 h-12'
            />
            <div className='ml-2'>
              <div className='font-semi-bold text-secondary-base'>
                {'Umabachi'}
              </div>
              <div className='text-xs text-neutral-40'>{'Medan'}</div>
            </div>
          </div>
          <img
            src={images.ic_close}
            alt='back'
            onClick={() => onHide()}
            className='h-4 w-4'
          />
        </div>

        <div className='line-clamp-5 text px-4 mt-20'>{`Berkomitmen untuk Menyelesaikan Perselisihan | Konsultasi Hukum dan Penyelesaian SengketaBerkomitmen untuk Menyelesaikan Perselisihan | Konsultasi Hukum dan Penyelesaian Sengketa Advokat Hukum | Hukum Perdata | ....`}</div>
        <div className={`grid grid-cols-10 mt-4 gap-2 mx-4`}>
          {['Hukum Pertanahan', 'Hukum Keluarga', 'Hukum Perdata']?.map(
            (item, index) => (
              <div
                className='bg-[#D9D9D9] rounded-lg py-1 px-2 text-center text-neutral-40 my-auto line-clamp-1 text-xs col-span-4 first:col-span-5'
                key={index}
              >
                {item}
              </div>
            )
          )}
        </div>
      </div>

      <Tabs
        className={`${currText === 'Hasil' ? 'md:mt-4' : 'mt-24 md:mt-2 mb-4'}`}
        textArr={['Hasil', 'Jadwal']}
        onTabClick={(e) => setCurrText(e)}
        currText={currText}
      />

      {currText === 'Hasil' ? (
        <div className='md:h-3/5 h-4/6 overflow-y-auto'>
          {dataDocumment?.map((item) => (
            <div
              className='bg-white p-4 rounded-2xl mb-4 last:mb-4 first:mt-4 '
              key={item.uuid}
            >
              <div
                className='flex justify-between'
                onClick={() => handleShowHideDiv(item.uuid)}
              >
                <div className='text-sm'>{item.title}</div>

                <img
                  src={images.ic_menu_down_darker}
                  alt='updown'
                  className={`${item.isActive ? 'rotate-180' : ''}`}
                />
              </div>
              {item.isActive && (
                <div className='flex flex-wrap gap-3 my-4'>
                  {item?.documments?.map((itm, index) => (
                    <div key={index}>
                      <img
                        src={itm.image_url}
                        alt='documment attached'
                        className='w-24 h-24 md:h-32 md:w-32 rounded-md'
                      />
                      <div className='text-neutral-40 text-xs mt-1'>
                        {itm.title}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className='md:h-3/5 h-full overflow-y-auto'>
          {LAWYER_SCHEDULE?.map((item) => (
            <div className='bg-white mb-4 p-4 rounded-2xl shadow-md'>
              <div className='font-bold text-2xl md:text-base md:font-semi-bold mb-3'>
                {item.title}
              </div>
              <div className='font-light'>Dijadwalkan Pada</div>
              <div className='font-semi-bold'>
                {item.scheduled_at}|{item.time_at}
              </div>

              <div className='bg-screen -mx-4 -mb-4 px-4 py-4 rounded-b-2xl mt-4'>
                <div>Ruang Pertemuan</div>
                <div className='flex justify-between items-center'>
                  <Link to={item.url} className='a-link'>
                    {item.url}
                  </Link>
                  <img
                    src={images.ic_copy_button}
                    alt='copy'
                    onClick={() => copyToClipboard(item.url)}
                  />
                </div>
                <div className='flex justify-end mt-2'>
                  <Button
                    onClick={() => console.log('g call')}
                    label='Join Call'
                    iconRight={images.ic_handycam}
                    iconClassName='!w-4 !h-2.5'
                    className='bg-blue-sky rounded-full'
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Modal>
  )
}
