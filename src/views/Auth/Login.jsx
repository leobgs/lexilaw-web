import images from 'assets/images'

import { useGlobalContext } from 'hooks/context'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
  const navigate = useNavigate()
  return (
    <div className='px-2 pb-2 pt-12 bg-contain bg-center h-screen bg-secondary-base'>
      <img
        src={images.bg_register_login}
        alt='register login'
        className='absolute bottom-0 right-0 h-5/6 w-full'
      />
      <div className='text-neutral-10' onClick={() => navigate('/components')}>
        Click to see All components
      </div>
    </div>
  )
}
