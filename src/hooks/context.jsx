import { actionType, alertState, colectionState, colectionType } from 'config/state'
import { alertReducer, colectionReducer, lawyerCardReducer } from 'helpers/dataReducer'
import React, { useCallback, useContext, useEffect, useReducer, useState } from 'react'
import Reducer from 'utils/reducer'
import { localServerData } from './useLocalServerData'

export const AppContext = React.createContext({
  alert: null,
  openAlert: (e) => {},
  loadingAlert: (e) => {},
  closeAlert: (e) => {},
  openAlertSelfClosed: (e) => {},
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
  lawyerRecommendationButton: { show: true },
  dispatchLaywerRecommendationButton: () => {},
  showButtonLawyerRecomendation: () => {},
  hideButtonLawyerRecomendation: () => {},
})

export const AppProvider = ({ children }) => {
  const [alert, dispatchAlert] = useReducer(alertReducer, alertState)
  const [collection, dispatchColection] = useReducer(colectionReducer, colectionState)
  const [authLoader, dispatchAuthLoader] = useReducer(alertReducer, alertState)
  const [currentLanguage, setLanguage] = useState(() => {
    const { CURRENT_LANGUAGE } = localServerData()
    return CURRENT_LANGUAGE || 'id'
  })

  const [lawyerRecommendationButton, dispatchLaywerRecommendationButton] = useReducer(lawyerCardReducer, { show: true })

  const [registerForm, setRegisterForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirm: '',
    // city: '',
    image: null,
    company_name: '',
  })

  const [isFirstTime, setIsFirstTime] = useState(false)

  const [bookingLawyerPayload, setBookingLawyerPayload] = useState(() => {
    const { BOOKING_LAWYER_PAYLOAD } = localServerData()
    return BOOKING_LAWYER_PAYLOAD || {}
  })

  useEffect(() => {
    const { setCurrentLanguage } = localServerData()
    setCurrentLanguage(currentLanguage)
  }, [currentLanguage])

  const registerFormReducer = (fieldName, newValue) => {
    if (fieldName === 'RESET') {
      return setRegisterForm({})
    }

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

  const openAlertSelfClosed = (action) => {
    return new Reducer(alert, dispatchAlert).dispatch({
      ...action,
      type: actionType.OPEN_SELF_CLOSED,
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

  const hideButtonLawyerRecomendation = useCallback(() => {
    dispatchLaywerRecommendationButton({
      type: 'hide'
    })
  } , [])

  const showButtonLawyerRecomendation = useCallback(() => {
    dispatchLaywerRecommendationButton({
      type: 'show'
    })
  }, [])

  return (
    <AppContext.Provider
      value={{
        alert,
        openAlert,
        loadingAlert,
        closeAlert,
        openAlertSelfClosed,
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
        isFirstTime,
        setIsFirstTime,
        lawyerRecommendationButton,
        dispatchLaywerRecommendationButton,
        hideButtonLawyerRecomendation,
        showButtonLawyerRecomendation,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}
