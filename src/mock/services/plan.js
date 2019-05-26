import Mock, { Random } from 'mockjs2'
import { builder, getQueryParameters } from '../util'

const total = Random.integer(100, 200)
const healthPlans = [
  ...Mock.mock({
    [`healthPlans|${total}`]: [
      {
        healthPlanId: () => Random.id(),
        patientId: () => Random.id(),
        doctorId: () => Random.id(),
        createDate: () => Random.date('yyyy-MM-dd'),
        status: 0
      }
    ]
  }).healthPlans
]

// 健康方案详情
const planDetail = options => {
  const queryParameters = getQueryParameters(options) || {}
  const healthPlanId = queryParameters.healthPlanId
  const data = {
    doctorId: 'f2dadf3vdsafdsdf',
    patientId: 'ffdfdfw3232f4dd',
    createDate: '2019-05-03',
    healthPlanId: `${healthPlanId}`,
    status: 0,
    healthAdvices: [
      {
        healthAdviceId: 'asdfwersadfs3',
        healthPlanId: `${healthPlanId}`,
        adviceType: 'food',
        adviceValue: '少盐，戒烟酒',
        reason: null
      },
      {
        healthAdviceId: '23eafdsf32sadf',
        healthPlanId: `${healthPlanId}`,
        adviceType: 'exercise',
        adviceValue: '多户外运动',
        reason: null
      }
    ],
    clinicRemind: {
      clinicRemindId: 'dsaf43wfdsvvsfd',
      healthPlanId: `${healthPlanId}`,
      type: '转诊',
      suggestDate: '2个月内',
      relatedDisease: '脑卒中',
      reason: '脑卒中极高危',
      targetHospital: '卫生所',
      status: 0,
      currentHospital: null
    }
  }

  return builder(data, '请求成功', 200)
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
  // see more on http://mockjs.com/examples.html
  const data = {
    total,
    healthPlans,
    page: queryParameters.pageNo
  }
  return builder(data, '请求成功', 200)
}

// 健康方案制定
const planAdd = options => {
  const data = {
    healthPlanId: 'dasfaf23sdaf23'
  }
  return builder(data, '请求成功', 200)
}

Mock.mock(/\/plan\/latest/, 'get', planDetail)
Mock.mock(/\/plan\/all/, 'get', planAll)
Mock.mock(/\/plan\/assess/, 'post', planAdd)
