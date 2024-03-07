import { LocalStorage } from 'utils/LocalStorage'
import { useGlobalContext } from './hooks/context'
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { isLogin } from 'utils/auth'
import { Login, Components } from 'views'
import { ModalAlert } from 'components'
import AuthLayout from 'views/Auth/layouts/AuthLayout'
import Register from 'views/Auth/register/Register'

const storage = new LocalStorage()
const PrivateRoute = ({ wrapperContent = true }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { clearOverview } = useGlobalContext()

  const handleClearStorge = () => {
    storage.clear()
    clearOverview()
    setTimeout(() => {
      navigate('/')
    }, 100)
  }

  if (!isLogin()) {
    return <Navigate to='/' replace />
  }

  return wrapperContent ? (
    <div className={'content'} id='content'>
      <Outlet />
    </div>
  ) : (
    <div className='content_nowrap' id='content_nowrap'>
      <Outlet />
    </div>
  )
}

const ProtectedRoute = ({ wrapperContent = true }) => {
  if (isLogin()) {
    return <Navigate to='/order/overview' replace />
  }

  return wrapperContent ? (
    <div className='content' id='content'>
      <Outlet />
    </div>
  ) : (
    <div className='content_nowrap' id='content_nowrap'>
      <Outlet />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthLayout />}>
          <Route path='login' element={<Login />}/>
          <Route path='register' element={<Register />}/>
        </Route>
        <Route path='/register' element={<AuthLayout />} />
        <Route path='/components' element={<Components />} />
        <Route element={<PrivateRoute />}></Route>
      </Routes>
      <ModalAlert />
    </BrowserRouter>
  )
}

export default App
