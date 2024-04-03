import { Button } from 'components'
import { useNavigate } from 'react-router-dom'

export const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className='text-neutral-40 text-center absolute top-1/3 w-full'>
      <div className='text-center w-full'>
        <div className='font-semi-bold text-5xl'>404</div>
        <div>Not Found tidak dapat menemukan laman yang anda maksud</div>
        <Button
          onClick={() => navigate('/auth', { replace: true })}
          label='Kembali ke LexiWeb'
          className='mx-auto btn-secondary rounded-3xl mt-4'
        />
      </div>
    </div>
  )
}
