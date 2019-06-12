import api from './index'
import { axios } from '@/utils/request'
import { searchParasToString } from '@/utils/helper/url'

// 全部患者
export function patientAll(data, search) {
  return axios({
    url: `${api.patientAll}${search ? '?' + searchParasToString(search) : ''}`,
    method: 'get',
    data,
  })
}

export function patientGetById(data, search) {
  return axios({
    url: `${api.patientGetById}${search ? '?' + searchParasToString(search) : ''}`,
    method: 'get',
    data,
  })
}

export function patientQuery(data, search) {
  console.info(`api.patientQuery`)
  return axios({
    url: `${api.patientQuery}`,
    method: 'post',
    data: { ...data, ...search },
  })
}

export function patientAdd(data, search) {
  return axios({
    url: `${api.patientAdd}${search ? '?' + searchParasToString(search) : ''}`,
    method: 'post',
    data,
  })
}

export function patientGetPatientReport(data, search) {
  return axios({
    url: `${api.patientGetPatientReport}${search ? '?' + searchParasToString(search) : ''}`,
    method: 'get',
    data,
  })
}
