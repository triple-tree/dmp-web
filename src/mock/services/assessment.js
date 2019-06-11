import Mock, { Random } from 'mockjs2'
import { builder, getQueryParameters } from '../util'
import { patients } from './patient'

const doctorIds = patients.map(patient => patient.doctorId)
const total = doctorIds.length
const assessments = []
for (const doctorId of doctorIds) {
  assessments.push({
    id: Random.id(),
    patientId: Random.id(),
    doctorId: doctorId,
    assessmentDate: Random.date('yyyy-MM-dd'),
    chronicDiseaseRisk: Mock.mock({
      'status|1': ['患者', '一般群众', '高危', '不详'],
    }).status,
    diabetesRisk: Mock.mock({
      'status|1': ['患者', '一般群众', '高危', '不详'],
    }).status,
    hypertensionRisk: Mock.mock({
      'status|1': ['患者', '一般群众', '高危', '不详'],
    }).status,
    strokeRisk: Mock.mock({
      'status|1': ['患者', '一般群众', '高危', '不详'],
    }).status,
    ascvdRisk: Mock.mock({
      'status|1': ['患者', '一般群众', '高危', '不详'],
    }).status,
    copdRisk: Mock.mock({
      'status|1': ['患者', '一般群众', '高危', '不详'],
    }).status,
  })
}

// 获取最新筛查评估
const assessmentLatest = options => {
  const queryParameters = getQueryParameters(options) || {}
  const patientId = queryParameters.patientId
  const assessment = assessments[Random.natural(0, total - 1)]
  return builder(assessment, '请求成功', 200)
}

// 获取某条筛查评估
const assessmentDetail = options => {
  const queryParameters = getQueryParameters(options) || {}
  const id = queryParameters.id
  const assessment = assessments.filter(assessment => assessment.id === id)[0]
  return builder(assessment, '请求成功', 200)
}

// 获取筛查评估
const assessmentAll = options => {
  const queryParameters = getQueryParameters(options) || {}
  if (queryParameters && !queryParameters.pageNo) {
    queryParameters.pageNo = 1
  }
  if (queryParameters && !queryParameters.pageSize) {
    queryParameters.pageSize = 5
  }

  const data = {
    total: assessments.length,
    assessments: assessments.slice(
      (queryParameters.pageNo - 1) * queryParameters.pageSize,
      queryParameters.pageNo * queryParameters.pageSize
    ),
    page: queryParameters.pageNo,
  }
  return builder(data, '请求成功', 200)
}

// 筛查评估
const assessmentAssess = options => {
  const data = {
    id: Random.id(),
    patientId: Random.id(),
    doctorId: Random.id(),
    assessmentDate: Random.date('yyyy-MM-dd'),
    chronicDiseaseRisk: () =>
      Mock.mock({
        'status|1': ['患者', '一般群众', '高危', '不详'],
      }).status,
    diabetesRisk: () =>
      Mock.mock({
        'status|1': ['患者', '一般群众', '高危', '不详'],
      }).status,
    hypertensionRisk: () =>
      Mock.mock({
        'status|1': ['患者', '一般群众', '高危', '不详'],
      }).status,
    strokeRisk: () =>
      Mock.mock({
        'status|1': ['患者', '一般群众', '高危', '不详'],
      }).status,
    ascvdRisk: () =>
      Mock.mock({
        'status|1': ['患者', '一般群众', '高危', '不详'],
      }).status,
    copdRisk: () =>
      Mock.mock({
        'status|1': ['患者', '一般群众', '高危', '不详'],
      }).status,
  }

  return builder(data, '请求成功', 200)
}

Mock.mock(/\/api\/assessment\/latest/, 'get', assessmentLatest)
Mock.mock(/\/api\/assessment\/detail/, 'get', assessmentDetail)
Mock.mock(/\/api\/assessment\/all/, 'get', assessmentAll)
Mock.mock(/\/api\/assessment\/assess/, 'get', assessmentAssess)
