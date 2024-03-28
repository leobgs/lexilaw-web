import { apiURLQuery } from 'config/app'

const axios = require('axios')

export const request = axios.create({
  baseURL: apiURLQuery,
  headers: {
    'Content-Type': 'application/json',
  },
})
