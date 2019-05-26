import Mock, { Random } from 'mockjs2'
import { builder, getQueryParameters } from '../util'

const total = Random.integer(100, 200)
const records = [
  ...Mock.mock({
    [`records|${total}`]: [
      {
        patientId: () => Random.id(),
        doctorId: () => Random.id(),
        patientRecordId: () => Random.id(),
        createDate: () => Random.date('yyyy-MM-dd')
      }
    ]
  }).records
]

// 最新健康档案
const recordLatest = options => {
  const queryParameters = getQueryParameters(options) || {}
  const patientId = queryParameters.patientId
  const data = {
    patientId: 'dfwerwerwer2343',
    doctorId: 'S314rdE4234ERWFD ',
    patientRecordId: 'DEafsdfqwer23f343',
    createDate: '2019-05-09 ',
    factors: {
      previousHistoryDiabetes: 0,
      previousHistoryHypertension: 0,
      previousHistoryStroke: 0,
      previousHistoryAscvd: 0,
      previousHistoryCopd: 0,
      previousHistoryDyslipidemia: 0,
      familyHistoryDiabetes: 0,
      familyHistoryHypertension: 0,
      familyHistoryStroke: 0,
      familyHistoryAscvd: 0,
      familyHistoryCopd: 0,
      symptomsHeadache: 0,
      symptomsStethalgia: 0,
      symptomsDyspnea: 0,
      symptomsDiuresis: 0,
      symptomsDizziness: 0,
      smoke: 0,
      sbp: 67,
      dbp: 128,
      fbg: 4.8,
      serumTc: 4.3,
      weight: 60.5,
      height: 172.1,
      waistline: 0
    }
  }
  return builder(data, '请求成功', 200)
}

// 历史健康档案
const recordAll = options => {
  const queryParameters = getQueryParameters(options) || {}
  if (queryParameters && !queryParameters.pageNo) {
    queryParameters.pageNo = 1
  }
  if (queryParameters && !queryParameters.pageSize) {
    queryParameters.pageSize = 5
  }
  // see more on http://mockjs.com/examples.html
  const data = {
    total,
    records,
    page: queryParameters.pageNo
  }
  return builder(data, '请求成功', 200)
}

// 健康档案详情
const recordDetail = options => {
  const queryParameters = getQueryParameters(options) || {}
  const patientId = queryParameters.patientId
  const data = {
    patientId: 'dfwerwerwer2343',
    doctorId: 'S314rdE4234ERWFD',
    patientRecordId: 'DEafsdfqwer23f343',
    createDate: '2019-05-09 ',
    factors: {
      previousHistoryDiabetes: 0,
      previousHistoryHypertension: 0,
      previousHistoryStroke: 0,
      previousHistoryAscvd: 0,
      previousHistoryCopd: 0,
      previousHistoryDyslipidemia: 0,
      familyHistoryDiabetes: 0,
      familyHistoryHypertension: 0,
      familyHistoryStroke: 0,
      familyHistoryAscvd: 0,
      familyHistoryCopd: 0,
      symptomsHeadache: 0,
      symptomsStethalgia: 0,
      symptomsDyspnea: 0,
      symptomsDiuresis: 0,
      symptomsDizziness: 0,
      smoke: 0,
      sbp: 67,
      dbp: 128,
      fbg: 4.8,
      serumTc: 4.3,
      weight: 60.5,
      height: 172.1,
      waistline: 0
    }
  }

  return builder(data, '请求成功', 200)
}

// 更新健康档案
const recordUpdate = options => {
  const data = {
    healthRecordId: 'a4ddsdf34wrwer3'
  }

  return builder(data, '请求成功', 200)
}

Mock.mock(/\/assessment\/latest/, 'get', recordLatest)
Mock.mock(/\/assessment\/all/, 'get', recordAll)
Mock.mock(/\/assessment\/detail/, 'get', recordDetail)
Mock.mock(/\/assessment\/update/, 'get', recordUpdate)
