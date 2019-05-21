import Mock, { Random } from 'mockjs2'
import { builder, getQueryParameters } from '../util'

// 3.1.1.	全部患者
const patientAll = options => {
  const queryParameters = getQueryParameters(options) || {}
  if (queryParameters && !queryParameters.page) {
    queryParameters.page = 1
  }
  if (queryParameters && !queryParameters.size) {
    queryParameters.size = 5
  }
  // see more on http://mockjs.com/examples.html
  const data = {
    total: Random.natural(100, 200),
    ...Mock.mock({
      [`patients|${queryParameters.size}`]: [
        {
          id: () => Random.guid(),
          identityNumber: () => Random.id(),
          name: () => () => Random.date('yyyy-MM-dd'),
          gender: () => Random.id(),
          dateOfBirth: () => Random.date('yyyy-MM-dd'),
          phoneNumber: () => Mock.mock({ 'regexp|3': /152\d{9}/ }),
          doctorId: () => Random.id(),
          hospitalId: () => Random.id(),
          hasDiabetes: () => Random.natural(0, 1),
          hasHypertension: () => Random.natural(0, 1),
          hasStroke: () => Random.natural(0, 1),
          hasAscvd: () => Random.natural(0, 1),
          hasCopd: () => Random.natural(0, 1),
          hasDyslipidemia: () => Random.natural(0, 1),
          province: () => Random.province(),
          city: () => Random.city(),
          county: () => Random.county(),
          detailAddress: '天桥大街1号',
          createDate: () => Random.date('yyyy-MM-dd')
        }
      ]
    }),
    page: queryParameters.page
  }
  return builder(data, '请求成功', 200)
}

Mock.mock(/\/patient\/all/, 'get', patientAll)
