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
  BookLawyer,
  Account,
  MyLawyer,
  Register,
} from 'views'
import { ModalAlert } from 'components'
import { ToastContainer } from 'react-toastify'
import AuthLayout from 'views/Auth/layouts/AuthLayout'

import RegisterOTP from 'views/Auth/register/RegisterOTP'
import { ThreadPage } from 'views/ThreadPage'
import useVersioning from 'hooks/versioning'
import { Schedule } from 'views/Schedule'
import { useEffect } from 'react'
import { notifyBottomError } from 'hooks/useToas'

export const PrivateRoute = ({ wrapperContent = true }) => {
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
  const authError = localStorage.getItem('errorAuth')
  useVersioning('/version.json')

  useEffect(() => {
    if (authError) {
      notifyBottomError(authError.replace(/["]/g, '').replace(/[,]/g, ''))
      console.log(authError)

      localStorage.removeItem('errorAuth')
    }
  }, [authError])

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path='/auth' element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path='login' element={<Login />} />

            <Route path='register' element={<Register />} />
            <Route path='register/otp' element={<RegisterOTP />} />
            <Route path='forgot-password' element={<ForgotPassword />} />
            <Route
              path='prechanged-password/:uuid'
              element={<PreChangePassword />}
            />
            <Route path='changed-password' element={<ChangePassword />} />
          </Route>
        </Route>

        {/* page without header component */}
        <Route element={<PrivateRoute />}>
          <Route path='/' element={<Chat />}>
            <Route path='/thread/:uuid' element={<ThreadPage />} />
          </Route>
          <Route path='/account' element={<Account />} />
        </Route>

        {/* with header component */}
        <Route element={<PrivateRoute wrapperContent={false} />}>
          <Route path='/book-lawyer' element={<BookLawyer />} />
          <Route path='/my-lawyer' element={<MyLawyer />} />
          <Route path='/schedule' element={<Schedule />} />
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
