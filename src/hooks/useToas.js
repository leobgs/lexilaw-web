import { Bounce, toast } from 'react-toastify'

export const notifySuccess = (messages) => {
  toast.success(messages, {
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  })
}

export const notifyError = (messages) => {
  toast.error(messages, {
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  })
}

export const notifyInfo = (messages) => {
  toast.info(messages, {
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  })
}

export const notify = (messages) => {
  toast.info(messages, {
    position: 'bottom-center',
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
  })
}

export const notifyBottomError = (messages) => {
  toast.error(messages, {
    position: 'bottom-right',
    autoClose: 4000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Bounce,
  })
}
