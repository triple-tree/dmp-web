import Mock, { Random } from 'mockjs2'
import { builder, getQueryParameters, getBody } from '../util'

const total = Random.integer(100, 200)
const records = [
  ...Mock.mock({
    [`records|${total}`]: [
      {
        patientId: () => Random.id(),
        doctorId: () => Random.id(),
        patientRecordId: () => Random.id(),
        createDate: () => Random.date('yyyy-MM-dd'),
        factors: {
          previousHistoryDiabetes: () => Random.natural(0, 1),
          previousHistoryHypertension: () => Random.natural(0, 1),
          previousHistoryStroke: () => Random.natural(0, 1),
          previousHistoryAscvd: () => Random.natural(0, 1),
          previousHistoryCopd: () => Random.natural(0, 1),
          previousHistoryDyslipidemia: () => Random.natural(0, 1),
          familyHistoryDiabetes: () => Random.natural(0, 1),
          familyHistoryHypertension: () => Random.natural(0, 1),
          familyHistoryStroke: () => Random.natural(0, 1),
          familyHistoryAscvd: () => Random.natural(0, 1),
          familyHistoryCopd: () => Random.natural(0, 1),
          symptomsHeadache: () => Random.natural(0, 1),
          symptomsStethalgia: () => Random.natural(0, 1),
          symptomsDyspnea: () => Random.natural(0, 1),
          symptomsDiuresis: () => Random.natural(0, 1),
          symptomsDizziness: () => Random.natural(0, 1),
          smoke: () => Random.natural(0, 1),
          sbp: Random.float(100, 200),
          dbp: Random.float(100, 200),
          fbg: () => Random.float(0, 10),
          serumTc: () => Random.float(0, 10),
          weight: () => Random.float(100, 200),
          height: () => Random.float(50, 100),
          waistline: () => Random.natural(0, 1)
        }
      }
    ]
  }).records
]

// 最新健康档案
const recordLatest = options => {
  const record = records.sort((record1, record2) => {
    return new Date(record2.createDate).getTime() - new Date(record1.createDate).getTime()
  })[0]
  return builder(record, '请求成功', 200)
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

  const data = {
    total: records.length,
    records: records.slice(
      (queryParameters.pageNo - 1) * queryParameters.pageSize,
      queryParameters.pageNo * queryParameters.pageSize
    ),
    page: queryParameters.pageNo
  }
  return builder(data, '请求成功', 200)
}

// 健康档案详情
const recordDetail = options => {
  const queryParameters = getQueryParameters(options) || {}
  const patientId = queryParameters.patientId
  const record = records.filter(record => record.patientId === patientId)
  return builder(record, '请求成功', 200)
}

// 更新健康档案
const recordAdd = options => {
  const body = getBody(options) || {}
  const record = { ...body, id: () => Random.id() }
  records.push(record)
  return builder({ id: record.id }, '新建患者成功！', 200)
}

Mock.mock(/\/record\/latest/, 'get', recordLatest)
Mock.mock(/\/record\/all/, 'get', recordAll)
Mock.mock(/\/record\/detail/, 'get', recordDetail)
Mock.mock(/\/record\/add/, 'get', recordAdd)
