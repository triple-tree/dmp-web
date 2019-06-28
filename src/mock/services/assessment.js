import Mock, { Random } from 'mockjs2'
import { builder, getQueryParameters, getBody } from '../util'
import { patients } from './patient'
import { ssyAssessmentList, ascvdAssessmentList} from './assessmentList'
 
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
      'status|1': ['患者', '一般群众', '低危',  '高危', '不详'],
    }).status,
    diabetesRisk: Mock.mock({
      'status|1': ['患者', '一般群众', '低危',  '高危', '不详'],
    }).status,
    hypertensionRisk: Mock.mock({
      'status|1': ['患者', '一般群众', '低危',  '高危', '不详'],
    }).status,
    strokeRisk: Mock.mock({
      'status|1': ['患者', '一般群众', '低危',  '高危', '不详'],
    }).status,
    ascvdRisk: Mock.mock({
      'status|1': ['患者', '一般群众', '低危',  '高危', '不详'],
    }).status,
    copdRisk: Mock.mock({
      'status|1': ['患者', '一般群众', '低危',  '高危', '不详'],
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

// 获得各种评估问卷
const assessmentForm = options => {
  const queryParameters = getQueryParameters(options) || {}
  const id = queryParameters.id
  const body = getBody(options) || {}
  const assessment = body.type === "getSSY" ? ssyAssessmentList : ascvdAssessmentList
  return builder(assessment, '请求成功', 200)
}

// 提交Ascvd评估问卷
const ascvdAssessment = options => {
  const data =  [ 
    "• 您10年内患心脑血管病（冠心病、脑梗死等）的风险是<i class=\"level_01\">22.6%</i>（同龄人理想值是13%），为同龄人理想值的<i class=\"level_01\">1.7</i>倍", 
    "• 您目前属于冠心病、脑梗死等动脉粥样硬化疾病的<i class=\"level_01\">高危人群</i>"
  ];
  return builder(data, '提交成功', 200)
}

// 提交SSY评估问卷
const ssyAssessment = options => {
  const data = { 
    "level": "中度", 
    "suggestion": "您有中度抑郁症状，建议寻找医生进行诊疗"
}
  return builder(data, '提交成功', 200)
}

// 获取筛查评估
const assessmentAll = options => {
  const queryParameters = getQueryParameters(options) || {}
  if (queryParameters && !queryParameters.page) {
    queryParameters.page = 1
  }
  if (queryParameters && !queryParameters.size) {
    queryParameters.size = 5
  }

  const data = {
    total: assessments.length,
    assessments: assessments.slice(
      (queryParameters.page - 1) * queryParameters.size,
      queryParameters.page * queryParameters.size
    ),
    page: queryParameters.page,
  }
  return builder(data, '请求成功', 200)
}

// 获取ssy,Ascvd评估最新评估结果
const otherLatest = options => {
  const data = { 
    "id": "5e6a7f98ba184a7890c6ac2e3cfcd603", 
    "type": "Ascvd", 
    "patientId": "00399d0800c94f508b3d906c44c08d8d", 
    "createDate": "2019-06-17", 
    "result": "[\"• 您10年内患心脑血管病（冠心病、脑梗死等）的风险是<i class=\\\"level_01\\\">22.6%</i>（同龄人理想值是13%），为同龄人理想值的<i class=\\\"level_01\\\">1.7</i>倍\",\"• 您目前属于冠心病、脑梗死等动脉粥样硬化疾病的<i class=\\\"level_01\\\">高危人群</i>\"]", 
    "descriptions": null
  }
  return builder(data, '请求成功', 200)
}

// 筛查评估
const assessmentAssess = options => {
  // const data = {
  //   id: Random.id(),
  //   patientId: Random.id(),
  //   doctorId: Random.id(),
  //   assessmentDate: Random.date('yyyy-MM-dd'),
  //   chronicDiseaseRisk: () =>
  //     Mock.mock({
  //       'status|1': ['患者', '一般群众', '高危', '不详'],
  //     }).status,
  //   diabetesRisk: () =>
  //     Mock.mock({
  //       'status|1': ['患者', '一般群众', '高危', '不详'],
  //     }).status,
  //   hypertensionRisk: () =>
  //     Mock.mock({
  //       'status|1': ['患者', '一般群众', '高危', '不详'],
  //     }).status,
  //   strokeRisk: () =>
  //     Mock.mock({
  //       'status|1': ['患者', '一般群众', '高危', '不详'],
  //     }).status,
  //   ascvdRisk: () =>
  //     Mock.mock({
  //       'status|1': ['患者', '一般群众', '高危', '不详'],
  //     }).status,
  //   copdRisk: () =>
  //     Mock.mock({
  //       'status|1': ['患者', '一般群众', '高危', '不详'],
  //     }).status,
  // }
  const assessment = assessments[Random.natural(0, total - 1)]
  return builder(assessment, '请求成功', 200)
}

Mock.mock(/\/api\/assessment\/latest/, 'get', assessmentLatest)
Mock.mock(/\/api\/assessment\/detail/, 'get', assessmentDetail)
Mock.mock(/\/api\/patient\/getAssessmentForm/, 'post', assessmentForm)
Mock.mock(/\/api\/patient\/ascvdAssessment/, 'post', ascvdAssessment)
Mock.mock(/\/api\/patient\/SSYAssessment/, 'post', ssyAssessment)
Mock.mock(/\/api\/assessment\/all/, 'get', assessmentAll)
Mock.mock(/\/api\/assessment\/assess/, 'post', assessmentAssess)
Mock.mock(/\/api\/assessment\/other\/latest/, 'get', otherLatest)
