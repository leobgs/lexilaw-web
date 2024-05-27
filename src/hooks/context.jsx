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
  collectionDelete: (e) => {},
  collectionEdit: (e) => {},
  collectionSetEdit: (e) => {},
  collectionReset: (e) => {},
})

export const AppProvider = ({ children }) => {
  const [alert, dispatchAlert] = useReducer(alertReducer, alertState)
  const [collection, dispatchColection] = useReducer(
    colectionReducer,
    colectionState
  )
  const [authLoader, dispatchAuthLoader] = useReducer(alertReducer, alertState)
  const [currentLanguage, setLanguage] = useState('id')

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

  useEffect(() => {
    const { CURRENT_LANGUAGE } = localServerData()
    if (CURRENT_LANGUAGE) {
      setLanguage(CURRENT_LANGUAGE)
    }
  }, [])

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
        collectionDelete,
        collectionEdit,
        collectionSetEdit,
        collectionReset,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}
