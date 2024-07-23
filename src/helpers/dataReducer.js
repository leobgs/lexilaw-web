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
        activeBy: action.activeBy,
        editColection: false,
        clickColection: true,
        deleteColection: false,
        setEditColection: false,
        uuid: action.uuid,
        thread_id: action.open_thread_id ?? action.thread_id,
      }

    case colectionType.SET:
      return {
        ...state,
        editColection: false,
        clickColection: false,
        deleteColection: false,
        setEditColection: false,
        uuid: action.uuid,
        thread_id: action.open_thread_id ?? action.thread_id,
      }

    case colectionType.EDIT:
      return {
        ...state,
        editColection: true,
        clickColection: false,
        deleteColection: false,
        setEditColection: false,
        uuid: action.uuid,
        text: action.text,
      }

    case colectionType.DELETE:
      return {
        activeBy: null,
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

    case colectionType.EMPTY:
      return {
        clickColection: false,
        editColection: false,
        deleteColection: false,
        setEditColection: false,
        editState: 'stop',
        uuid: null,
        thread_id: null,
        text: '',
        activeBy: 'thread',
      }

    default:
      return state
  }
}
