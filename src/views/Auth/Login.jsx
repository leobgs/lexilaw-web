// import images from '../../assets/images/bg_register_login.png'

import images from 'assets/images'
import { Button } from 'components/Button/Button'
import { useGlobalContext } from 'hooks/context'

export const Login = () => {
  const { openAlert } = useGlobalContext()
  return (
    <div className='px-2 pb-2 pt-12 bg-contain bg-center h-screen bg-secondary-base'>
      <img
        src={images.bg_register_login}
        alt='register login'
        className='absolute bottom-0 h-5/6 w-full'
      />
      <Button
        onClick={() => openAlert({ messages: 'Aloha' })}
        label={'OpenAlert'}
        className={'btn-primary'}
      />
    </div>
  )
}
