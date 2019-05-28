import api from './index'
import { axios } from '@/utils/request'

export function assessmentLatest (parameter) {
  return axios({
    url: api.assessmentLatest,
    method: 'get',
    data: parameter
  })
}

export function assessmentAll (parameter) {
  return axios({
    url: api.assessmentAll,
    method: 'get',
    data: parameter
  })
}

export function assessmentAssess (parameter) {
  return axios({
    url: api.assessmentAssess,
    method: 'post',
    data: parameter
  })
}
