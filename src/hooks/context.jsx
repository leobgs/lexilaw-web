import { actionType, alertState } from "config/state";
import { alertReducer } from "helpers/dataReducer";
import React, { useContext, useEffect, useReducer, useState } from "react";
import Reducer from "utils/reducer";
import { localServerData } from "./useLocalServerData";

export const AppContext = React.createContext({
  alert: null,
  openAlert: (e) => {},
  loadingAlert: (e) => {},
  closeAlert: (e) => {},
  registerForm: null,
  registerFormReducer: (name, newValue) => {},
  currentLanguage: null,
  setLanguage: (e) => {},
  showAuthLoader: (e) => {},
  closeAuthLoader: (e) => {},
});

export const AppProvider = ({ children }) => {
  const [alert, dispatchAlert] = useReducer(alertReducer, alertState);
  const [authLoader, dispatchAuthLoader] = useReducer(alertReducer, alertState);
  const [currentLanguage, setLanguage] = useState("id");

  const [registerForm, setRegisterForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirm: "",
    city: "",
    image: null,
    company_name: "",
  });

  useEffect(() => {
    const { CURRENT_LANGUAGE } = localServerData();
    if (CURRENT_LANGUAGE) {
      setLanguage(CURRENT_LANGUAGE);
    }
  }, []);

  useEffect(() => {
    const { setCurrentLanguage } = localServerData();
    setCurrentLanguage(currentLanguage);
  }, [currentLanguage]);

  const registerFormReducer = (fieldName, newValue) => {
    return setRegisterForm({
      ...registerForm,
      [fieldName]: newValue,
    });
  };

  const openAlert = (action) => {
    return new Reducer(alert, dispatchAlert).dispatch({
      ...action,
      type: actionType.OPEN,
    });
  };

  const loadingAlert = (action) => {
    switch (action.showLoading) {
      case true:
        return new Reducer(alert, dispatchAlert).dispatch({
          ...action,
          type: actionType.LOADING,
        });
      default:
        return new Reducer(alert, dispatchAlert).dispatch({
          ...action,
          type: actionType.CLOSE,
        });
    }
  };

  const closeAlert = (a) => {
    if (typeof alert.callback === "function") {
      alert.callback({ isConfirm: a.isConfirm });
    }
    dispatchAlert({ type: actionType.CLOSE });
  };

  const showAuthLoader = (action) => {
    console.log(action);
    return new Reducer(authLoader, dispatchAuthLoader).dispatch({
      ...action,
      type: actionType.OPEN,
    });
  };

  const closeAuthLoader = (a) => {
    console.log(a);
    dispatchAuthLoader({ type: actionType.CLOSE });
  };

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
        showAuthLoader,
        closeAuthLoader,

        setLanguage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
