import api from './index'
import { axios } from '@/utils/request'

// 全部患者
export function getPatientList (parameter) {
  return axios({
    url: api.Patient,
    method: 'get',
    params: parameter
  })
}
