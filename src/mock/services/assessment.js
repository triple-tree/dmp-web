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
      },
    ],
  }).assessments,
]

// 最新评估结果
const assessmentLatest = options => {
  const queryParameters = getQueryParameters(options) || {}
  const patientId = queryParameters.patientId
  const assessment = assessments[Random.natural(0, total - 1)]
  return builder(assessment, '请求成功', 200)
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
    assessmentId: () => Random.id(),
    patientId: () => Random.id(),
    doctorId: () => Random.id(),
    assessmentDate: () => Random.date('yyyy-MM-dd'),
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

Mock.mock(/\/assessment\/latest/, 'get', assessmentLatest)
Mock.mock(/\/assessment\/all/, 'get', assessmentAll)
Mock.mock(/\/assessment\/assess/, 'get', assessmentAssess)
