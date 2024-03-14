import images from 'assets/images'
import { useState } from 'react'
import { KOLEKSI_CHAT } from 'utils/dummy'
import { Input } from './Input'
import { NavComponent } from './NavComponent'

export const NavChat = ({
  onHeaderClick,
  dataLatest = [],
  onClickColection,
  onEdit,
  onDelete,
}) => {
  const [search, setSearch] = useState('')
  const [showNav, setShowNav] = useState(false)
  const [showSearchNav, setShowSearchNav] = useState(false)

  return (
    <nav className='pb-4 md:w-3/12 md:pt-4 lg:pt-4'>
      <img
        src={images.logo_lexilaw}
        alt='LexiLaw'
        className='hidden md:inline'
      />
      <div className='md:hidden flex justify-between px-4 items-center gap-4'>
        <img
          src={images.ic_navbar_hidden}
          alt='navbar hide'
          className='h-4 w-6'
          onClick={() => setShowNav(!showNav)}
        />
        <div className='flex w-full justify-between items-center'>
          <div className='font-futura-bolds font-bold text-xl'>
            Obrolan Baru
          </div>
          <div className='bg-neutral-20 px-3 py-2 rounded-full'>
            <img src={images.ic_attachment_upload} alt='upload' className='' />
          </div>
        </div>
      </div>

      <div className='hidden flex-col justify-center md:my-4 md:flex'>
        <div className='flex justify-between gap-2 mr-4'>
          <Input
            onChange={(e) => setSearch(e.value)}
            value={search}
            name='search'
            className='w-10/12'
            inputClass='!rounded-full'
            placeholder={'Cari'}
            icon={images.ic_search}
          />
          <div
            className='bg-neutral-20 w-2/12 rounded-full outline outline-neutral-30 py-1 flex items-center'
            onClick={() => onHeaderClick()}
          >
            <img
              src={images.ic_add_convo}
              alt='add converstaion'
              className='mx-auto'
            />
          </div>
        </div>

        {KOLEKSI_CHAT.length !== 0 && (
          <div className='flex justify-between items-end mr-2 my-4'>
            <div className='text-neutral-40'>Koleksi</div>
            <img src={images.ic_menu_down} alt='dropdown' className='h-6' />
          </div>
        )}

        {KOLEKSI_CHAT?.map((item, index) => (
          <div
            key={index}
            className='flex justify-start gap-2 items-center text-base text-neutral-40 mb-2'
          >
            <img
              src={images.ic_folder_colection}
              alt='ic_folder_colection'
              className='h-7 w-7'
            />
            {item.label}
          </div>
        ))}

        {dataLatest.length !== 0 && (
          <div className='text-neutral-40 mt-4'>Terkini</div>
        )}

        {dataLatest.length !== 0 ? (
          dataLatest?.map((item, index) => (
            <NavComponent
              item={{ ...item, id: index }}
              key={index}
              onClickColection={() => onClickColection(item.text)}
              onEdit={(e) => onEdit(e)}
              onDelete={(e) => {
                onDelete(e)
              }}
            />
          ))
        ) : (
          <div className='mt-20 flex-col justify-center hidden md:flex'>
            <img
              src={images.ic_chat_bubbles}
              alt='chat bubbles'
              className='w-24 h-20 mx-auto'
            />
            <div className='mx-auto mt-2 text-center md:w-4/5'>
              Kamu belum memiliki topik apapun,{' '}
              <span className='font-semi-bold'>Mulai Obrolan Baru!</span>
            </div>
          </div>
        )}
      </div>

      {showNav && (
        <div className='md:hidden h-full w-full absolute -mt-14 flex'>
          <div className='bg-neutral-50 w-3/4 h-full px-2 pt-4'>
            <div className='h-[92%]'>
              <div className='flex justify-between items-center'>
                <img
                  src={images.logo_lexilaw}
                  alt='LexiLaw'
                  className='my-4 w-1/2'
                />
                <div
                  className='p-2 bg-white rounded-full flex justify-center border border-neutral-20'
                  onClick={() => setShowSearchNav(!showSearchNav)}
                >
                  <img src={images.ic_search} alt='search' className='h-4' />
                </div>
              </div>

              {showSearchNav && (
                <div className='flex justify-between gap-2'>
                  <Input
                    onChange={(e) => setSearch(e.value)}
                    value={search}
                    name='search'
                    className='w-10/12'
                    inputClass='!rounded-full'
                    placeholder={'Cari'}
                    icon={images.ic_search}
                  />
                  <div
                    className='bg-neutral-20 w-2/12 rounded-xl'
                    onClick={() => onHeaderClick(true)}
                  >
                    <img
                      src={images.ic_add_convo}
                      alt='add converstaion'
                      className='my-2 mx-auto'
                    />
                  </div>
                </div>
              )}

              {KOLEKSI_CHAT.length !== 0 && (
                <div className='flex justify-between items-end mr-2 my-4'>
                  <div className='text-neutral-40'>Koleksi</div>
                  <img
                    src={images.ic_menu_down}
                    alt='dropdown'
                    className='h-6'
                  />
                </div>
              )}

              {KOLEKSI_CHAT?.map((item, index) => (
                <div
                  key={index}
                  className='flex justify-start gap-2 items-center text-base text-neutral-40 mb-2'
                >
                  <img
                    src={images.ic_folder_colection}
                    alt='ic_folder_colection'
                    className='h-7 w-7'
                  />
                  {item.label}
                </div>
              ))}

              {dataLatest.length !== 0 && (
                <div className='text-neutral-40 mt-4'>Terkini</div>
              )}

              {dataLatest.length !== 0 ? (
                dataLatest?.map((item, index) => (
                  <NavComponent
                    item={{ ...item, id: index }}
                    key={index}
                    onClickColection={() => onClickColection(item.text)}
                    onEdit={(e) => onEdit(e)}
                    onDelete={(e) => {
                      onDelete(e)
                    }}
                  />
                ))
              ) : (
                <div className='mt-20 flex-col justify-center hidden md:flex'>
                  <img
                    src={images.ic_chat_bubbles}
                    alt='chat bubbles'
                    className='w-24 h-20 mx-auto'
                  />
                  <div className='mx-auto mt-2 text-center md:w-4/5'>
                    Kamu belum memiliki topik apapun,{' '}
                    <span className='font-semi-bold'>Mulai Obrolan Baru!</span>
                  </div>
                </div>
              )}
            </div>

            <div className='h-[8%] -mx-2 bg-white flex items-center px-2 justify-between top-shadow'>
              <div className='font-semi-bold'>Prima Kusumo</div>
              <div>
                <img src={images.ic_thumbnail_profile} alt='profile' />
              </div>
            </div>
          </div>

          <div
            className='bg-black-lightest bg-opacity-70 w-1/4 h-full'
            onClick={() => setShowNav(false)}
          />
        </div>
      )}
    </nav>
  )
}
