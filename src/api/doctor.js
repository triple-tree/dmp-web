import api from './index'
import { axios } from '@/utils/request'
import { searchParasToString } from '@/utils/helper/url'

export function doctorAll(data, search) {
  console.info(`doctorAll: data: ${JSON.stringify(data)}, search: ${JSON.stringify(search)}`)
  return axios({
    url: `${api.doctorAll}${search ? '?' + searchParasToString(search) : ''}`,
    method: 'get',
    data,
  })
}

export function doctorDetail(data, search) {
  return axios({
    url: `${api.doctorDetail}${search ? '?' + searchParasToString(search) : ''}`,
    method: 'get',
    data,
  })
}

export function doctorAudit(data, search) {
  return axios({
    url: `${api.doctorAudit}${search ? '?' + searchParasToString(search) : ''}`,
    method: 'post',
    data,
  })
}

export function doctorAdd(data, search) {
  return axios({
    url: `${api.doctorAdd}${search ? '?' + searchParasToString(search) : ''}`,
    method: 'post',
    data,
  })
}

export function doctorSelectDoctorByName(data, search) {
  return axios({
    url: `${api.doctorSelectDoctorByName}${search ? '?' + searchParasToString(search) : ''}`,
    method: 'post',
    data,
  })
}
