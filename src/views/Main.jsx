import images from 'assets/images'
import { ChatCard, InputChat } from 'components'
import { DEFAULT_QUESTION } from 'utils/dummy'

export const Main = () => {
  return (
    <div className='pt-4 bg-primary-base h-screen md:p-4'>
      <div className='h-calculate md:flex md:justify-between md:mt-12'>
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
            />
            <div className='flex w-full justify-between items-center'>
              <div className='font-futura-bolds font-bold text-xl'>
                Obrolan Baru
              </div>
              <div className='bg-neutral-20 px-3 py-2 rounded-full'>
                <img
                  src={images.ic_attachment_upload}
                  alt='upload'
                  className=''
                />
              </div>
            </div>
          </div>

          <div className='hidden flex-col justify-center md:my-4 md:flex'>
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
          </div>
        </nav>

        <main className='h-full p-4 md:rounded-xl md:w-10/12 md:bg-white border-t border-neutral-20'>
          <div className='h-[93%]'>
            <ChatCard data={DEFAULT_QUESTION} onClick={(e) => console.log(e)} />
          </div>
          <InputChat onChange={(e) => console.log(e)} className={''} />
        </main>
      </div>
    </div>
  )
}
