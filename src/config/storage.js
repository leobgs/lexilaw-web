import { env } from 'utils'

export const StorageKey = {
  ACCESS_TOKEN: env('REACT_APP_ACCESS_TOKEN', 'access_token'),
  IS_LOGIN: 'is_login',
  DISCLAIMER_POPUP: 'disclaimer_popup',
  CURRENT_LANGUAGE: 'CURRENT_LANGUAGE',
  LAST_UUID: 'u_idlex',

  BOOKING_LAWYER_PAYLOAD: 'BOOKING_LAWYER_PAYLOAD',
}

export default { StorageKey }
