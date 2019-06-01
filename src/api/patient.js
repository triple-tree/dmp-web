import api from './index'
import { axios } from '@/utils/request'

// 全部患者
export function patientAll (parameter) {
  return axios({
    url: api.patientAll,
    method: 'get',
    params: parameter
  })
}

export function patientQueryById (parameter) {
  return axios({
    url: api.patientQueryById,
    method: 'get',
    params: parameter
  })
}

export function patientQuery (parameter) {
  return axios({
    url: api.patientQuery,
    method: 'post',
    params: parameter
  })
}

export function patientAdd (parameter) {
  return axios({
    url: api.patientAdd,
    method: 'post',
    params: parameter
  })
}

export function patientGetPatientReport (parameter) {
  return axios({
    url: api.patientGetPatientReport,
    method: 'get',
    params: parameter
  })
}
