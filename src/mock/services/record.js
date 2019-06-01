import Mock, { Random } from 'mockjs2'
import { builder, getQueryParameters, getBody } from '../util'

const total = Random.integer(100, 200)
const records = []
for (let i = 0; i < total; i++) {
  const id = Random.id()
  records.push({
    id: `${id}`,
    patientId: `${Random.id()}`,
    doctorId: `${Random.id()}`,
    createDate: `${Random.date('yyyy-MM-dd')}`,
    patientRecordFactors: [
      {
        patientRecordId: `${id}`,
        factorName: 'previousHistoryDiabetes',
        factorValue: Random.natural(0, 1)
      },
      {
        patientRecordId: `${id}`,
        factorName: 'previousHistoryHypertension',
        factorValue: Random.natural(0, 1)
      },
      {
        patientRecordId: `${id}`,
        factorName: 'previousHistoryStroke',
        factorValue: Random.natural(0, 1)
      },
      {
        patientRecordId: `${id}`,
        factorName: 'previousHistoryAscvd',
        factorValue: Random.natural(0, 1)
      },
      {
        patientRecordId: `${id}`,
        factorName: 'previousHistoryCopd',
        factorValue: Random.natural(0, 1)
      },
      {
        patientRecordId: `${id}`,
        factorName: 'previousHistoryDyslipidemia',
        factorValue: Random.natural(0, 1)
      },
      {
        patientRecordId: `${id}`,
        factorName: 'familyHistoryDiabetes',
        factorValue: Random.natural(0, 1)
      },
      {
        patientRecordId: `${id}`,
        factorName: 'familyHistoryHypertension',
        factorValue: Random.natural(0, 1)
      },
      {
        patientRecordId: `${id}`,
        factorName: 'familyHistoryStroke',
        factorValue: Random.natural(0, 1)
      },
      {
        patientRecordId: `${id}`,
        factorName: 'familyHistoryAscvd',
        factorValue: Random.natural(0, 1)
      },
      {
        patientRecordId: `${id}`,
        factorName: 'familyHistoryCopd',
        factorValue: Random.natural(0, 1)
      },
      {
        patientRecordId: `${id}`,
        factorName: 'symptomsHeadache',
        factorValue: Random.natural(0, 1)
      },
      {
        patientRecordId: `${id}`,
        factorName: 'symptomsStethalgia',
        factorValue: Random.natural(0, 1)
      },
      {
        patientRecordId: `${id}`,
        factorName: 'symptomsDyspnea',
        factorValue: Random.natural(0, 1)
      },
      {
        patientRecordId: `${id}`,
        factorName: 'symptomsDiuresis',
        factorValue: Random.natural(0, 1)
      },
      {
        patientRecordId: `${id}`,
        factorName: 'symptomsDizziness',
        factorValue: Random.natural(0, 1)
      },
      {
        patientRecordId: `${id}`,
        factorName: 'smoke',
        factorValue: Random.natural(0, 1)
      },
      {
        patientRecordId: `${id}`,
        factorName: 'sbp',
        factorValue: Random.natural(0, 1)
      },
      {
        patientRecordId: `${id}`,
        factorName: 'dbp',
        factorValue: Random.natural(0, 1)
      },
      {
        patientRecordId: `${id}`,
        factorName: 'fbg',
        factorValue: Random.natural(0, 1)
      },
      {
        patientRecordId: `${id}`,
        factorName: 'serumTc',
        factorValue: Random.natural(0, 1)
      },
      {
        patientRecordId: `${id}`,
        factorName: 'weight',
        factorValue: Random.natural(0, 1)
      },
      {
        patientRecordId: `${id}`,
        factorName: 'height',
        factorValue: Random.natural(0, 1)
      },
      {
        patientRecordId: `${id}`,
        factorName: 'waistline',
        factorValue: Random.natural(0, 1)
      }
    ]
  })
}

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
  const record = records.filter(record => record.patientId === patientId)[0]
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
