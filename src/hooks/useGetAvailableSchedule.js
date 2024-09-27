import { API } from 'config/api'
import { useQuery } from 'react-query'
import { getData } from './useRequest'

/**
 * @typedef {Object} IAvailableSchedule
 * @property {number} code
 * @property {string} status
 * @property {"Success get data" | "Done"} message
 * @property {Data} data
 * @property {Meta} meta
 */

/**
 * @typedef {Object} Meta
 * @property {number} page
 * @property {number} limit
 * @property {number} total
 */

/**
 * @typedef {Object} Data
 * @property {string} scheduling_url_event
 * @property {Availabilityschedule[]} availability_schedules
 */

/**
 * @typedef {Object} Availabilityschedule
 * @property {string} status
 * @property {number} invitees_remaining
 * @property {string} start_time
 * @property {string} start_time_formatted_eng
 * @property {string} start_time_formatted_ind
 * @property {string} scheduling_url
 */

/**
 *
 * @param {string | undefined} laywer_uuid
 * @param {string} thread_uuid
 *
 * @returns {{
 *  dataAvailableSchedule: IAvailableSchedule
 * isPendingAvailableSchedule: boolean
 * }}
 */
export const useGetAvailableSchedule = (laywer_uuid, thread_uuid) => {
  const { data: dataAvailableSchedule, isLoading: isPendingAvailableSchedule } =
    useQuery(
      ['available_schedules', thread_uuid],
      () =>
        getData(
          API.AVAILABLE_SCHEDULES +
            `/${laywer_uuid}/${thread_uuid}?page=1&limit=5`
        ),
      {
        enabled: Boolean(laywer_uuid),
      }
    )

  return {
    dataAvailableSchedule,
    isPendingAvailableSchedule,
  }
}
