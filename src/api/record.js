import api from './index'
import { axios } from '@/utils/request'

export function recordLatest (parameter) {
  return axios({
    url: api.recordLatest,
    method: 'get',
    data: parameter
  })
}

export function recordAll (parameter) {
  return axios({
    url: api.recordAll,
    method: 'get',
    data: parameter
  })
}

export function recordDetail (parameter) {
  return axios({
    url: api.recordDetail,
    method: 'get',
    data: parameter
  })
}

export function recordAdd (parameter) {
  return axios({
    url: api.recordAdd,
    method: 'post',
    data: parameter
  })
}
