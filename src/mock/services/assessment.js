import Mock, { Random } from 'mockjs2'
import { builder, getQueryParameters } from '../util'

const total = Random.integer(100, 200)
const assessments = [
  ...Mock.mock({
    [`assessments|${total}`]: [
      {
        assessmentId: () => Random.id(),
        patientId: () => Random.id(),
        doctorId: () => Random.id(),
        assessmentDate: () => Random.date('yyyy-MM-dd'),
        chronicDiseaseRisk: '高危',
        diabetesRisk: '患者',
        hypertensionRisk: '一般群众',
        strokeRisk: '一般群众',
        ascvdRisk: '一般群众',
        copdRisk: '一般群众'
      }
    ]
  }).assessments
]

// 最新评估结果
const assessmentLatest = options => {
  const queryParameters = getQueryParameters(options) || {}
  const patientId = queryParameters.patientId
  const data = {
    assessmentId: 'SEWD23E4234ERWFD',
    patientId: `${patientId}`,
    doctorId: 'S314rdE4234ERWFD',
    assessmentDate: '1964-01-04',
    chronicDiseaseRisk: '高危',
    diabetesRisk: '患者',
    hypertensionRisk: '一般群众',
    strokeRisk: '一般群众',
    ascvdRisk: '一般群众',
    copdRisk: '一般群众'
  }
  return builder(data, '请求成功', 200)
}

// 历史评估记录
const assessmentAll = options => {
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
    assessments,
    page: queryParameters.pageNo
  }
  return builder(data, '请求成功', 200)
}

// 筛查评估
const assessmentAssess = options => {
  const data = {
    assessmentId: () => Random.id(),
    patientId: () => Random.id(),
    doctorId: () => Random.id(),
    assessmentDate: () => Random.date('yyyy-MM-dd'),
    chronicDiseaseRisk: '高危',
    diabetesRisk: '患者',
    hypertensionRisk: '一般群众',
    strokeRisk: '一般群众',
    ascvdRisk: '一般群众',
    copdRisk: '一般群众'
  }

  return builder(data, '请求成功', 200)
}

Mock.mock(/\/assessment\/latest/, 'get', assessmentLatest)
Mock.mock(/\/assessment\/all/, 'get', assessmentAll)
Mock.mock(/\/assessment\/assess/, 'get', assessmentAssess)
