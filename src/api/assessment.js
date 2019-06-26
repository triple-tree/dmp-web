import api from './index'
import { axios } from '@/utils/request'
import { searchParasToString } from '@/utils/helper/url'

export function assessmentLatest(data, search) {
  return axios({
    url: `${api.assessmentLatest}${search ? '?' + searchParasToString(search) : ''}`,
    method: 'get',
    data: data,
    search,
  })
}

export function assessmentAll(data, search) {
  return axios({
    url: `${api.assessmentAll}${search ? '?' + searchParasToString(search) : ''}`,
    method: 'get',
    data: data,
    search,
  })
}

export function assessmentDetail(data, search) {
  return axios({
    url: `${api.assessmentDetail}${search ? '?' + searchParasToString(search) : ''}`,
    method: 'get',
    data: data,
  })
}

export function assessmentForm(data, search) {
  return axios({
    url: `${api.assessmentForm}${search ? '?' + searchParasToString(search) : ''}`,
    method: 'post',
    data: data,
  })
}

export function ascvdAssessment(data, search) {
  return axios({
    url: `${api.ascvdAssessment}${search ? '?' + searchParasToString(search) : ''}`,
    method: 'post',
    data: data,
  })
}

export function ssyAssessment(data, search) {
  return axios({
    url: `${api.ssyAssessment}${search ? '?' + searchParasToString(search) : ''}`,
    method: 'post',
    data: data,
  })
}

export function assessmentAssess(data, search) {
  return axios({
    url: `${api.assessmentAssess}${search ? '?' + searchParasToString(search) : ''}`,
    method: 'post',
    data: data,
  })
}

export function otherLatest(data, search) {
  return axios({
    url: `${api.otherLatest}${search ? '?' + searchParasToString(search) : ''}`,
    method: 'get',
    data: data,
  })
}
