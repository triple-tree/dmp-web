import Mock, { Random } from 'mockjs2'
import { builder, getQueryParameters } from '../util'

const total = Random.integer(100, 200)
const patients = [
  ...Mock.mock({
    [`patients|${total}`]: [
      {
        id: () => Random.id(),
        identityNumber: () => Random.id(),
        name: () => Random.cname(),
        gender: () => Random.integer(0, 1),
        dateOfBirth: () => Random.date('yyyy-MM-dd'),
        phoneNumber: () => Mock.mock({ regexp: /152\d{9}/ }).regexp,
        doctorId: () => Random.id(),
        hospitalId: () => Random.id(),
        hasDiabetes: () => Random.integer(0, 1),
        hasHypertension: () => Random.integer(0, 1),
        hasStroke: () => Random.integer(0, 1),
        hasAscvd: () => Random.integer(0, 1),
        hasCopd: () => Random.integer(0, 1),
        hasDyslipidemia: () => Random.integer(0, 1),
        province: () => Random.province(),
        city: () => Random.city(),
        county: () => Random.county(),
        detailAddress: '天桥大街1号',
        createDate: () => Random.date('yyyy-MM-dd')
      }
    ]
  }).patients
]

// 3.1.1.	全部患者
const patientAll = options => {
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
    patients,
    page: queryParameters.pageNo
  }
  return builder(data, '请求成功', 200)
}

Mock.mock(/\/patient\/all/, 'get', patientAll)
