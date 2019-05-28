import api from './index'
import { axios } from '@/utils/request'

export function statsAll (parameter) {
  return axios({
    url: api.statsAll,
    method: 'get',
    data: parameter
  })
}

export function statsPatients (parameter) {
  return axios({
    url: api.statsPatients,
    method: 'get',
    data: parameter
  })
}

export function statsPlans (parameter) {
  return axios({
    url: api.statsPlans,
    method: 'get',
    data: parameter
  })
}
