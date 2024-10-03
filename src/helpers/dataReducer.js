import { Storage } from 'utils/LocalStorage'
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

    case actionType.OPEN_SELF_CLOSED:
      return {
        ...state,
        isOpenSelfClosed: true,
        delayTime: 1000,
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
        isOpenSelfClosed: false,
        delayTime: 0,
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
        clicked_uuid: action.clicked_uuid,
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

/**
 * @typedef {Object} LawyerRecommendationState
 * @property {boolean} show
 */

/**
 * @typedef {Object} HideCard
 * @property {'hide'} type
 */

/**
 * @typedef {Object} ShowCard
 * @property {'show'} type
 */

/**
 * @typedef {ShowCard | HideCard} ActionLawyerRecommendation
 */

/**
 *
 * @param {LawyerRecommendationState} state
 * @param {ActionLawyerRecommendation} action
 *
 * @returns {LawyerRecommendationState}
 */
export const lawyerCardReducer = (state, action) => {
  switch (action.type) {
    case 'hide':
      return { ...state, show: false }
    case 'show':
      return { ...state, show: true }
    default:
      return state
  }
}

/**
 * @typedef {Object} CountryCode
 * @property {string} name
 * @property {string} flag
 * @property {string} code
 * @property {string} dial_code
 */

/**
 * @typedef {Object} WhatsappActivationState
 * @property {string} maskedPhoneNumber
 * @property {string} phoneNumber
 * @property {CountryCode} countryCode
 */

/**
 * @typedef {Object} SetMaskedPhoneNumber
 * @property {'setMasked'} type
 * @property {string} payload
 */

/**
 * @typedef {Object} ResetMaskedPhoneNumber
 * @property {'resetMasked'} type
 */

/**
 * @typedef {Object} SetPhoneNumber
 * @property {'setPhoneNumber'} type
 * @property {string} payload
 */

/**
 * @typedef {Object} ResetPhoneNumber
 * @property {'resetPhoneNumber'} type
 */

/**
 * @typedef {Object} SetCountryCode
 * @property {'setCountryCode'} type
 * @property {CountryCode} payload
 */

/**
 * @typedef {Object} ResetCountryCode
 * @property {'resetCountryCode'} type
 */

/**
 * @typedef {SetMaskedPhoneNumber | ResetMaskedPhoneNumber | SetPhoneNumber | ResetPhoneNumber | SetCountryCode | ResetCountryCode} WhatsappActivationAction
 */

/**
 * @param {WhatsappActivationState} state
 * @param {WhatsappActivationAction} action
 *
 * @returns {WhatsappActivationState}
 */
export const whatsappActivationReducer = (state, action) => {
  switch (action.type) {
    case 'resetMasked':
      return { ...state, maskedPhoneNumber: '' }

    case 'resetPhoneNumber':
      return { ...state, phoneNumber: '', maskedPhoneNumber: '' }

    case 'setMasked':
      return { ...state, maskedPhoneNumber: action.payload }

    case 'setPhoneNumber':
      // Hapus ketika API sudah siap
      Storage.setItem('phone-number', action.payload)
      return { ...state, phoneNumber: action.payload }
    case 'setCountryCode':
      return { ...state, countryCode: action.payload }
    case 'resetCountryCode': {
      return {
        ...state,
        countryCode: {
          name: 'Indonesia',
          flag: '🇮🇩',
          code: 'ID',
          dial_code: '+62',
        },
      }
    }
    default:
      return state
  }
}
