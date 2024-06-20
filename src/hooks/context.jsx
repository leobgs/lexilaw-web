import {
  actionType,
  alertState,
  colectionState,
  colectionType,
} from 'config/state'
import { alertReducer, colectionReducer } from 'helpers/dataReducer'
import React, { useContext, useEffect, useReducer, useState } from 'react'
import Reducer from 'utils/reducer'
import { localServerData } from './useLocalServerData'

export const AppContext = React.createContext({
  alert: null,
  openAlert: (e) => {},
  loadingAlert: (e) => {},
  closeAlert: (e) => {},
  registerForm: null,
  registerFormReducer: (name, newValue) => {},
  currentLanguage: null,
  setLanguage: (e) => {},
  collection: colectionState,
  collectionClick: (e) => {},
  collectionSet: (e) => {},
  collectionDelete: (e) => {},
  collectionEdit: (e) => {},
  collectionSetEdit: (e) => {},
  collectionReset: (e) => {},
  bookingLawyerPayload: null,
  bookingLawyerReducer: (name, newValue) => {},
})

export const AppProvider = ({ children }) => {
  const [alert, dispatchAlert] = useReducer(alertReducer, alertState)
  const [collection, dispatchColection] = useReducer(
    colectionReducer,
    colectionState
  )
  const [authLoader, dispatchAuthLoader] = useReducer(alertReducer, alertState)
  const [currentLanguage, setLanguage] = useState(() => {
    const { CURRENT_LANGUAGE } = localServerData()
    return CURRENT_LANGUAGE || 'id'
  })

  const [registerForm, setRegisterForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirm: '',
    city: '',
    image: null,
    company_name: '',
  })

  const [bookingLawyerPayload, setBookingLawyerPayload] = useState(() => {
    const { BOOKING_LAWYER_PAYLOAD } = localServerData()
    return BOOKING_LAWYER_PAYLOAD || {}
  })

  useEffect(() => {
    const { setCurrentLanguage } = localServerData()
    setCurrentLanguage(currentLanguage)
  }, [currentLanguage])

  const registerFormReducer = (fieldName, newValue) => {
    return setRegisterForm({
      ...registerForm,
      [fieldName]: newValue,
    })
  }

  const openAlert = (action) => {
    return new Reducer(alert, dispatchAlert).dispatch({
      ...action,
      type: actionType.OPEN,
    })
  }

  const loadingAlert = (action) => {
    switch (action.showLoading) {
      case true:
        return new Reducer(alert, dispatchAlert).dispatch({
          ...action,
          type: actionType.LOADING,
        })
      default:
        return new Reducer(alert, dispatchAlert).dispatch({
          ...action,
          type: actionType.CLOSE,
        })
    }
  }

  const closeAlert = (a) => {
    if (typeof alert.callback === 'function') {
      alert.callback({ isConfirm: a.isConfirm })
    }
    dispatchAlert({ type: actionType.CLOSE })
  }

  const collectionClick = (action) => {
    return new Reducer(collection, dispatchColection).dispatch({
      ...action,
      type: colectionType.CLICK,
    })
  }

  const collectionSet = (action) => {
    return new Reducer(collection, dispatchColection).dispatch({
      ...action,
      type: colectionType.SET,
    })
  }

  const collectionEdit = (action) => {
    return new Reducer(collection, dispatchColection).dispatch({
      ...action,
      type: colectionType.EDIT,
    })
  }

  const collectionDelete = (action) => {
    return new Reducer(collection, dispatchColection).dispatch({
      ...action,
      type: colectionType.DELETE,
    })
  }

  const collectionSetEdit = (action) => {
    return new Reducer(collection, dispatchColection).dispatch({
      ...action,
      type: colectionType.SET_EDIT,
    })
  }

  const collectionReset = (action) => {
    return new Reducer(collection, dispatchColection).dispatch({
      ...action,
      type: colectionType.EMPTY,
    })
  }

  useEffect(() => {
    const { setBookingLawyerPayload } = localServerData()
    if (bookingLawyerPayload) {
      setBookingLawyerPayload(bookingLawyerPayload)
    }
  }, [bookingLawyerPayload])

  const bookingLawyerReducer = (fieldName, newValue) => {
    return setBookingLawyerPayload({
      ...bookingLawyerPayload,
      [fieldName]: newValue,
    })
  }

  return (
    <AppContext.Provider
      value={{
        alert,
        openAlert,
        loadingAlert,
        closeAlert,
        registerForm,
        registerFormReducer,
        currentLanguage,
        authLoader,
        setLanguage,
        collection,
        collectionClick,
        collectionSet,
        collectionDelete,
        collectionEdit,
        collectionSetEdit,
        collectionReset,
        bookingLawyerPayload,
        bookingLawyerReducer,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}
