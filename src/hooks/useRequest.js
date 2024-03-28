import axios from 'axios'
import { apiURLQuery } from 'config/app'

export const getData = async (URL, config) => {
  const respond = config
    ? await axios
        .post(apiURLQuery + URL, config)
        .then((res) => res)
        .catch((error) => error.response)
    : await axios
        .get(apiURLQuery + URL)
        .then((res) => res)
        .catch((error) => error.response)
  return respond.data
}
