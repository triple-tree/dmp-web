import api from './index'
import { axios } from '@/utils/request'
import { searchParasToString } from '@/utils/helper/url'

export function recordLatest (data, search) {
  return axios({
    url: api.recordLatest,
    method: 'get',
    data
  })
}

export function recordAll (data, search) {
  return axios({
    url: `${api.recordAll}${search ? '?' + searchParasToString(search) : ''}`,
    method: 'get',
    data
  })
}

export function recordDetail (data, search) {
  return axios({
    url: `${api.recordDetail}${search ? '?' + searchParasToString(search) : ''}`,
    method: 'get',
    data
  })
}

export function recordAdd (data, search) {
  return axios({
    url: `${api.recordAdd}${search ? '?' + searchParasToString(search) : ''}`,
    method: 'post',
    data
  })
}
