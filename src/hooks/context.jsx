import { actionType, alertState } from 'config/state'
import { alertReducer } from 'helpers/dataReducer'
import React, { useContext, useReducer } from 'react'
import Reducer from 'utils/reducer'

export const AppContext = React.createContext({
  alert: null,
  openAlert: (e) => {},
  loadingAlert: (e) => {},
  closeAlert: (e) => {},
})

export const AppProvider = ({ children }) => {
  const [alert, dispatchAlert] = useReducer(alertReducer, alertState)

  const openAlert = (action) => {
    console.log(action)
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

  return (
    <AppContext.Provider
      value={{
        alert,
        openAlert,
        loadingAlert,
        closeAlert,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}
