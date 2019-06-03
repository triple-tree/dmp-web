import api from './index'
import { axios } from '@/utils/request'
import { searchParasToString } from '@/utils/helper/url'

export function statsAll(data, search) {
  return axios({
    url: `${api.statsAll}${search ? '?' + searchParasToString(search) : ''}`,
    method: 'get',
    data: data,
    search,
  })
}

export function statsPatients(data, search) {
  return axios({
    url: `${api.statsPatients}${search ? '?' + searchParasToString(search) : ''}`,
    method: 'get',
    data: data,
    search,
  })
}

export function statsPlans(data, search) {
  return axios({
    url: `${api.statsPlans}${search ? '?' + searchParasToString(search) : ''}`,
    method: 'get',
    data: data,
    search,
  })
}
