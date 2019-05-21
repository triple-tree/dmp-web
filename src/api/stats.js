import api from './index'
import { axios } from '@/utils/request'

export function statsAll (parameter) {
  return axios({
    url: api.StatsAll,
    method: 'get',
    data: parameter
  })
}

export function statsPatients (parameter) {
  return axios({
    url: api.StatsPatients,
    method: 'get',
    data: parameter
  })
}

export function statsPlans (parameter) {
  return axios({
    url: api.StatsPlans,
    method: 'get',
    data: parameter
  })
}
