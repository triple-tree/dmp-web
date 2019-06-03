import api from './index'
import { axios } from '@/utils/request'
import { searchParasToString } from '@/utils/helper/url'

// 全部患者
export function patientAll(data, search) {
  return axios({
    url: `${api.patientAll}${search ? '?' + searchParasToString(search) : ''}`,
    method: 'get',
    params: data,
  })
}

export function patientQueryById(data, search) {
  return axios({
    url: `${api.patientQueryById}${search ? '?' + searchParasToString(search) : ''}`,
    method: 'get',
    params: data,
  })
}

export function patientQuery(data, search) {
  return axios({
    url: `${api.patientQuery}${search ? '?' + searchParasToString(search) : ''}`,
    method: 'get',
    params: data,
  })
}

export function patientAdd(data, search) {
  return axios({
    url: `${api.patientAdd}${search ? '?' + searchParasToString(search) : ''}`,
    method: 'post',
    params: data,
  })
}

export function patientGetPatientReport(data, search) {
  return axios({
    url: `${api.patientGetPatientReport}${search ? '?' + searchParasToString(search) : ''}`,
    method: 'get',
    params: data,
  })
}
