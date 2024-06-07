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

export const putData = async (URL, config) => {
  const respond = await axios
    .put(apiURLQuery + URL, config)
    .then((res) => res)
    .catch((error) => error.response)
  return respond.data
}

export const deleteData = async (URL, config) => {
  const respond = config
    ? await axios
        .delete(apiURLQuery + URL, config)
        .then((res) => res)
        .catch((error) => error.response)
    : await axios
        .delete(apiURLQuery + URL)
        .then((res) => res)
        .catch((error) => error.response)
  return respond.data
}

export const patchData = async (URL, config) => {
  const respond = await axios
    .patch(apiURLQuery + URL, config)
    .then((res) => res)
    .catch((error) => error.response)

  return respond.data
}

export const putformData = async (URL, formData) => {
  const respond = await axios
    .put(apiURLQuery + URL, formData)
    .then((res) => res)
    .catch((error) => error.response)

  return respond.data
}
