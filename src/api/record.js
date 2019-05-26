import api from './index'
import { axios } from '@/utils/request'

export function recordLatest (parameter) {
  return axios({
    url: api.RecordLatest,
    method: 'get',
    data: parameter
  })
}

export function recordAll (parameter) {
  return axios({
    url: api.RecordAll,
    method: 'get',
    data: parameter
  })
}

export function recordDetail (parameter) {
  return axios({
    url: api.RecordDetail,
    method: 'get',
    data: parameter
  })
}

export function recordUpdate (parameter) {
  return axios({
    url: api.RecordUpdate,
    method: 'post',
    data: parameter
  })
}
