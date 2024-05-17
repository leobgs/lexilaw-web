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

  USER_DETAIL: '/user/app/v1.0.0/user/detail',
}
