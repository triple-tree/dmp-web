import api from './index'
import { axios } from '@/utils/request'

export function planAll (parameter) {
  return axios({
    url: api.PlanAll,
    method: 'get',
    data: parameter
  })
}

export function planDetail (parameter) {
  return axios({
    url: api.PlanDetail,
    method: 'get',
    data: parameter
  })
}

export function planAdd (parameter) {
  return axios({
    url: api.PlanAdd,
    method: 'post',
    data: parameter
  })
}
