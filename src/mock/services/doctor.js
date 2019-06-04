import Mock, { Random } from 'mockjs2'
import { builder, getQueryParameters, getBody } from '../util'
import { patients } from './patient'

const doctorIds = patients.map(patient => patient.doctorId)
const total = doctorIds.length
const doctors = []
for (const doctorId of doctorIds) {
  doctors.push({
    id: doctorId,
    name: Random.cname(),
    hospitalId: Random.id(),
    role: Mock.mock({
      'data|1': ['医生', '管理员'],
    }).data,
    department: '心脑血管科',
    username: Random.name(),
    password: Random.word(5),
    phoneNumber: Mock.mock({ regexp: /152\d{9}/ }).regexp,
    status: Random.integer(0, 1),
    createDate: Random.date('yyyy-MM-dd'),
    salt: Random.word(),
  })
}

// 5.1.1.	所有医生
const doctorAll = options => {
  const queryParameters = getQueryParameters(options) || {}
  const filteddoctors = doctors
  if (queryParameters && !queryParameters.pageNo) {
    queryParameters.pageNo = 1
  }
  if (queryParameters && !queryParameters.pageSize) {
    queryParameters.pageSize = 5
  }

  const data = {
    total: filteddoctors.length,
    doctors: filteddoctors.slice(
      (queryParameters.pageNo - 1) * queryParameters.pageSize,
      queryParameters.pageNo * queryParameters.pageSize
    ),
    page: queryParameters.pageNo,
  }
  return builder(data, '请求成功', 200)
}

// 医生详情
const doctorDetail = options => {
  const queryParameters = getQueryParameters(options) || {}
  const id = queryParameters.id
  // const doctor = doctors.filter(doctor => doctor.id === id)[0]
  const doctor = doctors[Random.natural(0, total - 1)]
  return builder(doctor, '请求成功', 200)
}

// 5.1.2.	审核医生账户
const doctorAudit = options => {
  const body = getBody(options) || {}
  const { doctorId, accept } = body
  const doctor = doctors.filter(doctor => doctor.id === doctorId)[0]
  doctor.status = accept
  return builder({}, '请求成功', 200)
}

// 5.1.4.	添加医生账户
const doctorAdd = options => {
  const body = getBody(options) || {}
  const doctor = { ...body, id: Random.id() }
  doctors.unshift(doctor)
  console.info(`doctorAdd: ${JSON.stringify(doctor)}`)
  return builder({ id: doctor.id }, '新建医生成功！', 200)
}

// 5.1.3.	根据姓名查找医生
const doctorSelectDoctorByName = options => {
  const body = getBody(options) || {}
  const doctorName = body
  const filteredDoctors = doctors.filter(doctor => doctor.name.includes(doctorName))
  return builder(filteredDoctors, '新建医生成功！', 200)
}

Mock.mock(/\/doctor\/all/, 'get', doctorAll)
Mock.mock(/\/doctor\/detail/, 'get', doctorDetail)
Mock.mock(/\/doctor\/audit/, 'post', doctorAudit)
Mock.mock(/\/doctor\/add/, 'post', doctorAdd)
Mock.mock(/\/doctor\/selectDoctorByName/, 'post', doctorSelectDoctorByName)
