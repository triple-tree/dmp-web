import api from './index'
import { axios } from '@/utils/request'

/**
 * login func
 * parameter: {
      username: '',
      password: '',
      usertype: "doctor"
  }
 * @param parameter
 * @returns {*}
 */
export function login (parameter) {
  return axios({
    url: api.Login,
    method: 'post',
    data: parameter
  })
}

/**
 * login func
 * parameter: {
      name: "测试1",
      hospital: "潢川县人民医院",
      role: "医生",
      department: "心脑血管科",
      province: "河南",
      city: "信阳市",
      county: "潢川县",
      town: "双柳树镇",
      phoneNumber: "18771070034",
      username: "ceshi1",
      password: "123456"
  }
 * @param parameter
 * @returns {*}
 */
export function register (parameter) {
  return axios({
    url: api.Register,
    method: 'post',
    data: parameter
  })
}

export function getSmsCaptcha (parameter) {
  return axios({
    url: api.SendSms,
    method: 'post',
    data: parameter
  })
}

export function getInfo () {
  return axios({
    url: api.UserInfo,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function logout () {
  return axios({
    url: api.Logout,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/**
 * get user 2step code open?
 * @param parameter {*}
 */
export function get2step (parameter) {
  return axios({
    url: api.twoStepCode,
    method: 'post',
    data: parameter
  })
}
