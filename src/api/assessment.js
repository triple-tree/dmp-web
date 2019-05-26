import api from './index'
import { axios } from '@/utils/request'

export function assessmentLatest (parameter) {
  return axios({
    url: api.AssessmentLatest,
    method: 'get',
    data: parameter
  })
}

export function assessmentAll (parameter) {
  return axios({
    url: api.AssessmentAll,
    method: 'get',
    data: parameter
  })
}

export function assessmentAssess (parameter) {
  return axios({
    url: api.AssessmentAssess,
    method: 'post',
    data: parameter
  })
}
