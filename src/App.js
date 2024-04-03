import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom'
import { isLogin } from 'utils/auth'
import {
  Login,
  Components,
  Chat,
  NotFound,
  ForgotPassword,
  ChangePassword,
  PreChangePassword,
} from 'views'
import { ModalAlert } from 'components'
import { ToastContainer } from 'react-toastify'
import AuthLayout from 'views/Auth/layouts/AuthLayout'
import Register from 'views/Auth/register/Register'
import RegisterOTP from 'views/Auth/register/RegisterOTP'

const PrivateRoute = ({ wrapperContent = true }) => {
  if (!isLogin()) {
    return <Navigate to='/auth' replace />
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
    return <Navigate to='/' replace />
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
        <Route element={<ProtectedRoute wrapperContent={false} />}>
          <Route path='/auth' element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path='login' Component={Login} />
            <Route path='register' Component={Register} />
            <Route path='register/otp' element={<RegisterOTP />} />
            <Route path='forgot-password' element={<ForgotPassword />} />
            <Route path='prechanged-password' element={<PreChangePassword />} />
            <Route path='changed-password' element={<ChangePassword />} />
          </Route>
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path='/' element={<Chat />} />
        </Route>

        <Route path='/components' element={<Components />} />
        <Route path='/404' element={<NotFound />} />
        <Route path='*' element={<Navigate to='/404' />} />
      </Routes>
      <ModalAlert />
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
