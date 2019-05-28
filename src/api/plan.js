import api from './index'
import { axios } from '@/utils/request'

export function planAll (parameter) {
  return axios({
    url: api.planAll,
    method: 'get',
    data: parameter
  })
}

export function planDetail (parameter) {
  return axios({
    url: api.planDetail,
    method: 'get',
    data: parameter
  })
}

export function planAdd (parameter) {
  return axios({
    url: api.planAdd,
    method: 'post',
    data: parameter
  })
}
