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

export function assessmentAssess(data, search) {
  return axios({
    url: `${api.assessmentAssess}${search ? '?' + searchParasToString(search) : ''}`,
    method: 'post',
    data: data,
  })
}
