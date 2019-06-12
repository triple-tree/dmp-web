import Mock, { Random } from 'mockjs2'
import { builder, getQueryParameters, getBody } from '../util'
import { patients } from './patient'

const patientIds = patients.map(patient => patient.id)
const doctorIds = patients.map(patient => patient.doctorId)

const total = patientIds.length * 5
const records = []
for (let i = 0; i < total; i++) {
  for (let j = 0; j < 5; j++) {
    const id = Random.id()
    records.push({
      id: `${id}`,
      patientId: patientIds[Random.natural(0, patientIds.length - 1)],
      doctorId: doctorIds[Random.natural(0, doctorIds.length - 1)],
      createDate: `${Random.date('yyyy-MM-dd')}`,
      patientRecordFactors: [
        {
          patientRecordId: `${id}`,
          factorName: 'previousHistoryDiabetes',
          factorValue: Random.natural(0, 1),
        },
        {
          patientRecordId: `${id}`,
          factorName: 'previousHistoryHypertension',
          factorValue: Random.natural(0, 1),
        },
        {
          patientRecordId: `${id}`,
          factorName: 'previousHistoryStroke',
          factorValue: Random.natural(0, 1),
        },
        {
          patientRecordId: `${id}`,
          factorName: 'previousHistoryAscvd',
          factorValue: Random.natural(0, 1),
        },
        {
          patientRecordId: `${id}`,
          factorName: 'previousHistoryCopd',
          factorValue: Random.natural(0, 1),
        },
        {
          patientRecordId: `${id}`,
          factorName: 'previousHistoryDyslipidemia',
          factorValue: Random.natural(0, 1),
        },
        {
          patientRecordId: `${id}`,
          factorName: 'familyHistoryDiabetes',
          factorValue: Random.natural(0, 1),
        },
        {
          patientRecordId: `${id}`,
          factorName: 'familyHistoryHypertension',
          factorValue: Random.natural(0, 1),
        },
        {
          patientRecordId: `${id}`,
          factorName: 'familyHistoryStroke',
          factorValue: Random.natural(0, 1),
        },
        {
          patientRecordId: `${id}`,
          factorName: 'familyHistoryAscvd',
          factorValue: Random.natural(0, 1),
        },
        {
          patientRecordId: `${id}`,
          factorName: 'familyHistoryCopd',
          factorValue: Random.natural(0, 1),
        },
        {
          patientRecordId: `${id}`,
          factorName: 'symptomsHeadache',
          factorValue: Random.natural(0, 1),
        },
        {
          patientRecordId: `${id}`,
          factorName: 'symptomsStethalgia',
          factorValue: Random.natural(0, 1),
        },
        {
          patientRecordId: `${id}`,
          factorName: 'symptomsDyspnea',
          factorValue: Random.natural(0, 1),
        },
        {
          patientRecordId: `${id}`,
          factorName: 'symptomsDiuresis',
          factorValue: Random.natural(0, 1),
        },
        {
          patientRecordId: `${id}`,
          factorName: 'symptomsDizziness',
          factorValue: Random.natural(0, 1),
        },
        {
          patientRecordId: `${id}`,
          factorName: 'smoke',
          factorValue: Random.natural(0, 1),
        },
        {
          patientRecordId: `${id}`,
          factorName: 'sbp',
          factorValue: Random.natural(0, 1),
        },
        {
          patientRecordId: `${id}`,
          factorName: 'dbp',
          factorValue: Random.natural(0, 1),
        },
        {
          patientRecordId: `${id}`,
          factorName: 'fbg',
          factorValue: Random.natural(0, 1),
        },
        {
          patientRecordId: `${id}`,
          factorName: 'serumTc',
          factorValue: Random.natural(0, 1),
        },
        {
          patientRecordId: `${id}`,
          factorName: 'weight',
          factorValue: Random.natural(0, 1),
        },
        {
          patientRecordId: `${id}`,
          factorName: 'height',
          factorValue: Random.natural(0, 1),
        },
        {
          patientRecordId: `${id}`,
          factorName: 'waistline',
          factorValue: Random.natural(0, 1),
        },
      ],
    })
  }
}

// 最新健康档案
const recordLatest = options => {
  console.info(`recordLatest`)
  const queryParameters = getQueryParameters(options) || {}
  const { patientId } = queryParameters
  const filtedRecords = records.filter(record => record.patientId === patientId)
  const record = filtedRecords.sort((record1, record2) => {
    return new Date(record2.createDate).getTime() - new Date(record1.createDate).getTime()
  })[0]
  return builder(record, '请求成功', 200)
}

// 历史健康档案
const recordAll = options => {
  console.info(`recordAll`)
  const queryParameters = getQueryParameters(options) || {}
  const { patientId } = queryParameters
  const filtedRecords = records.filter(record => record.patientId === patientId)
  if (queryParameters && !queryParameters.page) {
    queryParameters.page = 1
  }
  if (queryParameters && !queryParameters.size) {
    queryParameters.size = 10
  }

  const data = {
    total: filtedRecords.length,
    records: filtedRecords.slice(
      (queryParameters.page - 1) * queryParameters.size,
      queryParameters.page * queryParameters.size
    ),
    page: queryParameters.page,
  }
  return builder(data, '请求成功', 200)
}

// 健康档案详情
const recordDetail = options => {
  const queryParameters = getQueryParameters(options) || {}
  const id = queryParameters.id
  const record = records.filter(record => record.id === id)[0]
  return builder(record, '请求成功', 200)
}

// 更新健康档案
const recordAdd = options => {
  const body = getBody(options) || {}
  const record = { ...body, id: Random.id() }
  records.unshift(record)
  return builder({ id: record.id }, '新建患者成功！', 200)
}

Mock.mock(/\/api\/patientRecord\/latest/, 'get', recordLatest)
Mock.mock(/\/api\/patientRecord\/all/, 'get', recordAll)
Mock.mock(/\/api\/patientRecord\/detail/, 'get', recordDetail)
Mock.mock(/\/api\/patientRecord\/add/, 'post', recordAdd)
