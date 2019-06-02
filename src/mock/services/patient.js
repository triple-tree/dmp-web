import Mock, { Random } from 'mockjs2'
import { builder, getQueryParameters, getBody } from '../util'

const total = Random.integer(100, 200)
let patients = []

// 3.1.1.	全部患者
const patientAll = options => {
  patients = Mock.mock({
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
  const queryParameters = getQueryParameters(options) || {}
  if (queryParameters && !queryParameters.pageNo) {
    queryParameters.pageNo = 1
  }
  if (queryParameters && !queryParameters.pageSize) {
    queryParameters.pageSize = 5
  }
  const data = {
    total: patients.length,
    patients: patients.slice(
      (queryParameters.pageNo - 1) * queryParameters.pageSize,
      queryParameters.pageNo * queryParameters.pageSize
    ),
    page: queryParameters.pageNo
  }
  return builder(data, '查询成功', 200)
}

// 3.2.1.	ID查询
const patientQueryById = options => {
  const queryParameters = getQueryParameters(options) || {}
  const patientId = queryParameters.patientId
  const data = patients.filter(patient => patient.id === patientId)[0]
  return builder(data, '查询成功', 200)
}

// 3.2.2.	复合条件查询
const patientQuery = options => {
  /**
   * The data structure passed in
  {
    "and": [
        {
            "columnName": "hasDiabetes",
            "method": "eq",
            "value": 1
        },
        {
            "columnName": "hasAscvd",
            "method": "eq",
            "value": 1
        }
    ],
    "page": 1,
    "size": 2
  }
   */
  const body = getBody(options) || {}
  const filteredPatients = patients.filter(patient => {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
    if ('and' in body) {
      return body['and'].every(({ columnName, method, value }) => {
        if (method === 'eq') {
          return patient[columnName] === value
        } else if (method === 'lt') {
          return patient[columnName] < value
        } else if (method === 'gt') {
          return patient[columnName] > value
        }
        return false
      })
    } else if ('or' in body) {
      return body['or'].some(({ columnName, method, value }) => {
        if (method === 'eq') {
          return patient[columnName] === value
        } else if (method === 'lt') {
          return patient[columnName] < value
        } else if (method === 'gt') {
          return patient[columnName] > value
        }
        return false
      })
    }
  })
  const data = {
    total: filteredPatients.length,
    patients: filteredPatients.slice((body['page'] - 1) * body['size'], body['page'] * body['size']),
    page: body['page']
  }
  return builder(data, '查询成功', 200)
}

// simple test
// const data = patientQuery({
//   body: JSON.stringify({
//     and: [
//       {
//         columnName: 'hasDiabetes',
//         method: 'eq',
//         value: 1
//       },
//       {
//         columnName: 'hasAscvd',
//         method: 'eq',
//         value: 1
//       }
//     ],
//     page: 1,
//     size: 2
//   })
// })
// console.info(`data: ${JSON.stringify(data, null, 2)}`)

// 3.3.1.	新建患者
const patientAdd = options => {
  /**
   * The data structure passed in
  {
    "patient": {
        "identityNumber": "411526195904111056",
        "name": "测试",
        "gender": "1",
        "phoneNumber": "13771070311",
        "doctorId": "b80c338df2974b58aaf9b51c351169e5",
        "hasDiabetes": 1,
        "hasHypertension": 0,
        "hasStroke": 0,
        "hasAscvd": 0,
        "hasCopd": 0,
        "hasDyslipidemia": 0,
        "province": "河南",
        "city": "信阳市",
        "county": "潢川县",
        "town": "天河街道",
        "detailAddress": "航空路2号"
    },
    "factors": {
        "familyHistoryDiabetes": 0,
        "familyHistoryHypertension": 0,
        "familyHistoryStroke": 0,
        "familyHistoryAscvd": 0,
        "familyHistoryCopd": 0,
        "symptomsHeadache": 0,
        "symptomsStethalgia": 0,
        "symptomsDyspnea": 0,
        "symptomsDiuresis": 0,
        "symptomsDizziness": 0,
        "smoke": 0,
        "sbp": 67,
        "dbp": 128,
        "fbg": 4.8,
        "serumTc": 4.3,
        "weight": 60.5,
        "height": 172.1,
        "waistline": 0
    }
  }
   */
  const body = getBody(options) || {}
  const patient = { ...body.patient, id: () => Random.id() }
  patients.push(patient)
  return builder({ id: patient.id }, '新建患者成功！', 200)
}

const patientGetPatientReport = options => {
  const queryParameters = getQueryParameters(options) || {}
  const patientId = queryParameters.patientId
  const patient = patients.filter(patient => patient.id === patientId)
  const data = {
    patient,
    patientRecord: {
      id: 'ce8b28a37138485a81e727a95cd4a884',
      patientId: 'a225901ef3794c558e51f1459ace47a8',
      doctorId: 'b80c338df2974b58aaf9b51c351169e5',
      createDate: '2019-05-15',
      patientRecordFactors: [
        {
          patientRecordId: 'ce8b28a37138485a81e727a95cd4a884',
          factorName: 'dbp',
          factorValue: '0'
        },
        {
          patientRecordId: 'ce8b28a37138485a81e727a95cd4a884',
          factorName: 'familyHistoryAscvd',
          factorValue: '0'
        },
        {
          patientRecordId: 'ce8b28a37138485a81e727a95cd4a884',
          factorName: 'familyHistoryDiabetes',
          factorValue: '0'
        },
        {
          patientRecordId: 'ce8b28a37138485a81e727a95cd4a884',
          factorName: 'familyHistoryHypertension',
          factorValue: '0'
        },
        {
          patientRecordId: 'ce8b28a37138485a81e727a95cd4a884',
          factorName: 'familyHistoryStroke',
          factorValue: '0'
        },
        {
          patientRecordId: 'ce8b28a37138485a81e727a95cd4a884',
          factorName: 'previousHistoryAscvd',
          factorValue: '0'
        },
        {
          patientRecordId: 'ce8b28a37138485a81e727a95cd4a884',
          factorName: 'previousHistoryCopd',
          factorValue: '0'
        },
        {
          patientRecordId: 'ce8b28a37138485a81e727a95cd4a884',
          factorName: 'previousHistoryDiabetes',
          factorValue: '0'
        },
        {
          patientRecordId: 'ce8b28a37138485a81e727a95cd4a884',
          factorName: 'previousHistoryDyslipidemia',
          factorValue: '0'
        },
        {
          patientRecordId: 'ce8b28a37138485a81e727a95cd4a884',
          factorName: 'previousHistoryHypertension',
          factorValue: '0'
        },
        {
          patientRecordId: 'ce8b28a37138485a81e727a95cd4a884',
          factorName: 'previousHistoryStroke',
          factorValue: '0'
        }
      ]
    },
    planDetail: {
      doctorId: 'c5a7ac3958554e0da76d6db850611fff',
      patientId: 'a225901ef3794c558e51f1459ace47a8',
      createDate: '2019-05-15',
      healthAdvices: [
        {
          id: '556205a69c9a427ab4c00dcb215955e5',
          healthPlanId: 'ef50c0f9db934fd3af948723c8b88072',
          adviceType: 'food',
          adviceValue: '少盐，戒烟酒',
          reason: '高血压'
        },
        {
          id: 'aa7a95d6e7e546fc9dedd1b8d7da1c5d',
          healthPlanId: 'ef50c0f9db934fd3af948723c8b88072',
          adviceType: 'exercise',
          adviceValue: '多户外运动',
          reason: '高血压'
        }
      ],
      clinicRemind: {
        id: 'cbb42157d805482ba4688268b208d881',
        healthPlanId: 'ef50c0f9db934fd3af948723c8b88072',
        type: '转诊',
        suggestDate: '2个月内',
        relatedDisease: '脑卒中',
        reason: '脑卒中极高危',
        status: 0,
        targetHospital: '卫生所',
        currentHospital: null
      }
    },
    chronicDiseaseAssessment: {
      id: '749f0cc463784528944b2bdf1490f626',
      patientId: 'a225901ef3794c558e51f1459ace47a8',
      doctorId: 'b80c338df2974b58aaf9b51c351169e5',
      assessmentDate: '2019-05-09',
      chronicDiseaseRisk: '高危',
      diabetesRisk: '一般',
      hypertensionRisk: '高危',
      strokeRisk: '一般',
      ascvdRisk: '一般',
      copdRisk: '不详'
    }
  }
  return builder(data, '新建患者成功！', 200)
}

Mock.mock(/\/patient\/all/, 'get', patientAll)
Mock.mock(/\/patient\/queryById/, 'get', patientQueryById)
Mock.mock(/\/patient\/query/, 'post', patientQuery)
Mock.mock(/\/patient\/add/, 'post', patientAdd)
Mock.mock(/\/patient\/getPatientReport/, 'get', patientGetPatientReport)
