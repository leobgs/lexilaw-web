import { actionType, colectionType } from '../config/state'

export const alertReducer = (state, action) => {
  switch (action.type) {
    case actionType.OPEN:
      return {
        ...state,
        isOpen: true,
        title: action.title,
        messages: action.messages,
        icon: action.icon,
        isConfirm: action.isConfirm ?? false,
        showFooter: action.showFooter ?? true,
        showBtnClose: action.showBtnClose ?? true,
        btnCloseText: action.btnCloseText ?? 'Tutup',
        btnConfirmText: action.btnConfirmText ?? 'Ya',
        showLoading: action.showLoading ?? false,
        btnConfirmTextClass: action.btnConfirmTextClass ?? '',
        callback: action.callback,
      }

    case actionType.LOADING:
      return {
        ...state,
        isOpen: true,
        showLoading: action.showLoading ?? false,
      }

    case actionType.CLOSE:
      return {
        ...state,
        isOpen: false,
        showLoading: false,
      }

    case actionType.RESOLVE:
      return {
        ...state,
        callback: action.callback,
      }

    default:
      return state
  }
}

export const colectionReducer = (state, action) => {
  switch (action.type) {
    case colectionType.CLICK:
      return {
        editColection: false,
        clickColection: true,
        deleteColection: false,
        setEditColection: false,
        uuid: action.uuid,
      }

    case colectionType.EDIT:
      return {
        editColection: true,
        clickColection: false,
        deleteColection: false,
        setEditColection: false,
        uuid: action.uuid,
        text: action.text,
      }

    case colectionType.DELETE:
      return {
        editColection: false,
        clickColection: false,
        deleteColection: true,
        setEditColection: false,
        uuid: action.uuid,
      }

    case colectionType.SET_EDIT:
      return {
        ...state,
        editColection: false,
        clickColection: false,
        deleteColection: false,
        setEditColection: true,
        editState: action.editState ?? 'stop',
        uuid: action.uuid,
      }

    default:
      return state
  }
}
