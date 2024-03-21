import { actionType } from '../config/state'

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
