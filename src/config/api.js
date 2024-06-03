export const API = {
  LOGIN: '/user/app/v1.0.0/user/login',
  LOGOUT: '/user/app/v1.0.0/user/logout',
  REGISTER: '/user/app/v1.0.0/user/registration',
  OTP_CHECK: '/user/app/v1.0.0/otp/check',
  OTP_RESEND: '/user/app/v1.0.0/otp/resend',
  APPLE_LOGIN: '/user/app/v1.0.0/user/apple/validate-token',
  GOOGLE_LOGIN: '/user/app/v1.0.0/user/google/validate-token',

  RESET_PASSWORD_CHECK_EMAIL: '/user/app/v1.0.0/user/request/reset-password',
  RESET_PASSWORD: '/user/app/v1.0.0/user/reset-password',

  UPDATE_PASSWORD: '/user/app/v1.0.0/user/password',

  LIST_CITY: '/user/app/v1.0.0/city?search=',

  THREAD_LIST: '/api/app/v1.0.0/chat/threads',
  THREAD_DETAIL: '/api/app/v1.0.0/chat/threads/',
  THREAD_EDIT: '/api/app/v1.0.0/threads/',

  MESSAGE_SEND: '/api/app/v1.0.0/chat/conversation',
  MESSAGE_RESPONSE: '/api/app/v1.0.0/chat/conversation/',
  MESSAGE_STATUS: '/api/app/v1.0.0/chat/',

  USER_DETAIL: '/user/app/v1.0.0/user/detail',
  UPDATE_NAME: '/user/app/v1.0.0/user/request/change-name',
  UPDATE_PROFIL: '/user/app/v1.0.0/user/info',

  // TRANSACTION
  LAWYER_RECOMMENDATION: '/user/app/v1.0.0/lawyer/recommendation',
  BOOK_LAWYER_SERVICES: '/user/app/v1.0.0/lawyer/service/',
  BOOKING_LAWYER: '/transaction/app/v1.0.0/booking',

  //MY LAWYER
  MY_LAWYER_LIST: '/user/app/v1.0.0/user/lawyer/list',
  MY_LAWYER_CASE: '/api/app/v1.0.0/user/lawyer/thread',
}
