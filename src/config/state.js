export const initState = {
  isLoading: true,
  data: null,
  error: null,
}

export const actionType = {
  SUCCESS: 'SUCCESS',
  LOADING: 'LOADING',
  ERROR: 'ERROR',
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  UNPROCESSABLE_ENTITY: 422,
  NOT_FOUND: 404,
  NOT_ACCEPTABLE: 406,
  INTERNAL_SERVER_ERROR: 500,
  OPEN: 'OPEN',
  CLOSE: 'CLOSE',
  RESOLVE: 'RESOLVE',
}

export const alertState = {
  isOpen: false,
  title: null,
  messages: '',
  icon: '',
  isConfirm: false,
  showBtnClose: true,
  btnCloseText: 'Tutup',
  btnConfirmText: 'OK',
  showLoading: false,
  autoHide: false,
  btnConfirmTextClass: '',
}

export const localesState = {
  UPDATE: 'UPDATE',
}

export const colectionType = {
  CLICK: 'CLICK',
  EDIT: 'EDIT',
  DELETE: 'DELETE',
  SET_EDIT: 'SET_EDIT',
  EMPTY: 'EMPTY',
  SET: 'SET',
}

export const colectionState = {
  clickColection: false,
  editColection: false,
  deleteColection: false,
  setEditColection: false,
  editState: 'stop',
  uuid: null,
  thread_id: null,
  text: '',
}
