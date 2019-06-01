import Mock, { Random } from 'mockjs2'
import { builder, getQueryParameters, getBody } from '../util'

const total = Random.integer(100, 200)
const healthPlans = []
for (let i = 0; i < total; i++) {
  const id = Random.id()
  healthPlans.push({
    id,
    patientId: () => Random.id(),
    doctorId: () => Random.id(),
    createDate: () => Random.date('yyyy-MM-dd'),
    status: 0,
    healthAdvices: [
      {
        healthAdviceId: () => Random.id(),
        healthPlanId: id,
        adviceType: 'food',
        adviceValue: '少盐，戒烟酒',
        reason: null
      },
      {
        healthAdviceId: () => Random.id(),
        healthPlanId: id,
        adviceType: 'exercise',
        adviceValue: '多户外运动',
        reason: null
      }
    ],
    clinicRemind: {
      clinicRemindId: () => Random.id(),
      healthPlanId: id,
      type: '转诊',
      suggestDate: '2个月内',
      relatedDisease: '脑卒中',
      reason: '脑卒中极高危',
      targetHospital: '卫生所',
      status: 0,
      currentHospital: null
    }
  })
}

// 健康方案详情
const planDetail = options => {
  const queryParameters = getQueryParameters(options) || {}
  const healthPlanId = queryParameters.healthPlanId
  const healthPlan = healthPlans.filter(healthPlan => healthPlan.id === healthPlanId)[0]
  return builder(healthPlan, '请求成功', 200)
}

// 历史健康方案列表
const planAll = options => {
  const queryParameters = getQueryParameters(options) || {}
  if (queryParameters && !queryParameters.pageNo) {
    queryParameters.pageNo = 1
  }
  if (queryParameters && !queryParameters.pageSize) {
    queryParameters.pageSize = 5
  }

  const data = {
    total: healthPlans.length,
    healthPlans: healthPlans
      .slice((queryParameters.pageNo - 1) * queryParameters.pageSize, queryParameters.pageNo * queryParameters.pageSize)
      .map(item => ({
        id: item.id,
        patientId: item.patientId,
        doctorId: item.doctorId,
        createDate: item.createDate,
        status: item.createDate
      })),
    page: queryParameters.pageNo
  }
  return builder(data, '请求成功', 200)
}

// 健康方案制定
const planAdd = options => {
  const body = getBody(options) || {}
  const healthPlan = { ...body, id: () => Random.id() }
  healthPlans.push(healthPlans)
  return builder({ id: healthPlan.id }, '新建患者成功！', 200)
}

Mock.mock(/\/plan\/detail/, 'get', planDetail)
Mock.mock(/\/plan\/all/, 'get', planAll)
Mock.mock(/\/plan\/add/, 'post', planAdd)
