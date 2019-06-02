import api from './index'
import { axios } from '@/utils/request'
import { searchParasToString } from '@/utils/helper/url'

export function planAll (data, search) {
  return axios({
    url: `${api.planAll}${search ? '?' + searchParasToString(search) : ''}`,
    method: 'get',
    data: data
  })
}

export function planDetail (data, search) {
  return axios({
    url: `${api.planDetail}${search ? '?' + searchParasToString(search) : ''}`,
    method: 'get',
    data: data
  })
}

export function planAdd (data, search) {
  return axios({
    url: `${api.planAdd}${search ? '?' + searchParasToString(search) : ''}`,
    method: 'post',
    data: data
  })
}
