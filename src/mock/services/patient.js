import Mock, { Random } from 'mockjs2'
import { builder, getQueryParameters, getBody } from '../util'

const total = Random.integer(100, 200)
const patients = Mock.mock({
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
      createDate: () => Random.date('yyyy-MM-dd'),
    },
  ],
}).patients

export { patients }

// 3.1.1.	全部患者
const patientAll = options => {
  const queryParameters = getQueryParameters(options) || {}
  if (queryParameters && !queryParameters.page) {
    queryParameters.page = 1
  }
  if (queryParameters && !queryParameters.size) {
    queryParameters.size = 5
  }
  const data = {
    total: patients.length,
    patients: patients.slice(
      (queryParameters.page - 1) * queryParameters.size,
      queryParameters.page * queryParameters.size
    ),
    page: queryParameters.page,
  }
  return builder(data, '查询成功', 200)
}

// 3.2.1.	ID查询
const patientGetById = options => {
  const queryParameters = getQueryParameters(options) || {}
  const id = queryParameters.id
  const data = patients.filter(patient => patient.id === id)[0]
  return builder(data, '查询成功', 200)
}

// 3.2.2.	复合条件查询
const patientQuery = options => {
  // const queryParameters = getQueryParameters(options) || {}
  // if (queryParameters && !queryParameters.page) {
  //   queryParameters.page = 1
  // }
  // if (queryParameters && !queryParameters.size) {
  //   queryParameters.size = 10
  // }
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
  console.info(`here`)
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
    page: body['page'],
  }
  return builder(data, '查询成功', 200)
}

// 3.3.1.	新建患者
const patientAdd = options => {
  const body = getBody(options) || {}
  const patient = { ...body.patient, id: Random.id() }
  patients.unshift(patient)
  return builder({ id: patient.id }, '新建患者成功！', 200)
}

// 3.1.5.	批量导入患者
const patientUpload = options => {
  // const queryParameters = getQueryParameters(options) || {}
  // const doctorId = queryParameters.doctorId
  // console.info(`patientUpload for doctorId: ${doctorId}`)
  return builder({}, '导入成功。', 200)
}

// 3.2.1.	获取患者慢病管理报告
const patientGetPatientReport = options => {
  const queryParameters = getQueryParameters(options) || {}
  const patientId = queryParameters.patientId
  const patient = patients.filter(patient => patient.id === patientId)
  const data = {
      "patientBaseInfo": {
          "id": "a225901ef3794c558e51f1459ace47a8", 
          "identityNumber": "411526196509093245", 
          "phoneNumber": "13176351707", 
          "name": "张七", 
          "gender": 1, 
          "age": "64", 
          "weight": "60.5", 
          "height": "172.3", 
          "waistline": "90.0"
      }, 
      "doctor": {
          "doctorId": "a225901ef3794c558e51f1459ace47a8", 
          "doctorName": "陈医生", 
          "hospitalName": "天桥医院"
      }, 
      "patientRecord": {
          "id": "74b46b6ea20e4f5d8af3bdd1a801f150", 
          "patientId": "a225901ef3794c558e51f1459ace47a8", 
          "doctorId": "b80c338df2974b58aaf9b51c351169e5", 
          "createDate": "2019-05-10", 
          "patientRecordFactors": {
              "sbp": "124", 
              "dbp": "74", 
              "fbg": "5.0", 
              "serum_tc": "6.0", 
              "ldl_c": "0.3", 
              "hdl_c": "0.4", 
              "previousHistoryDiabetes": "0", 
              "previousHistoryHypertension": "0", 
              "previousHistoryStroke": "1", 
              "previousHistoryAscvd": "0", 
              "previousHistoryCopd": "1", 
              "previousHistoryDyslipidemia": "0", 
              "familyHistoryDiabetes": "0", 
              "familyHistoryHypertension": "1", 
              "familyHistoryStroke": "0", 
              "familyHistoryAscvd": "0", 
              "familyHistoryCopd": "0", 
              "symptomsHeadache": "0", 
              "symptomsStethalgia": "1", 
              "symptomsDyspnea": "0", 
              "symptomsDiuresis": "0", 
              "symptomsDizziness": "0", 
              "smoke": "0", 
              "salt": "0", 
              "alcohol": "1"
          }
      }, 
      "planDetail": {
          "doctorId": "b80c338df2974b58aaf9b51c351169e5", 
          "patientId": "a225901ef3794c558e51f1459ace47a8", 
          "createDate": "2019-05-10", 
          "healthAdvices": {
              "prescriptions": [
                  {
                      "prescription": "1", 
                      "frequency": "1", 
                      "dosage": "1", 
                      "reason": "1", 
                      "remark": "1"
                  }, 
                  {
                      "prescription": "2", 
                      "frequency": "2", 
                      "dosage": "2", 
                      "reason": "2", 
                      "remark": "2"
                  }
              ], 
              "exercise": [
                  {
                      "type": "sport", 
                      "frequency": "frequency", 
                      "degree": "strength", 
                      "reason": "reason", 
                      "remark": "remark"
                  }
              ], 
              "food": [
                  {
                      "food": "diet", 
                      "reason": "reason", 
                      "remark": "2"
                  }
              ], 
              "others": [
                  {
                      "other": "other", 
                      "reason": "reason", 
                      "remark": "2"
                  }
              ], 
              "clinicRemind": {
                  "suggestDate": "两个月内", 
                  "type": "转诊", 
                  "targetHospital": "卫生所", 
                  "relatedDisease": "脑卒中", 
                  "reason": "脑卒中极高危"
              }
          }
      }, 
      "chronicDiseaseAssessment": {
          "id": "749f0cc463784528944b2bdf1490f626", 
          "patientId": "a225901ef3794c558e51f1459ace47a8", 
          "doctorId": "b80c338df2974b58aaf9b51c351169e5", 
          "assessmentDate": "2019-05-09", 
          "chronicDiseaseRisk": "高危", 
          "diabetesRisk": "一般", 
          "hypertensionRisk": "高危", 
          "strokeRisk": "一般", 
          "ascvdRisk": "一般", 
          "copdRisk": "不详"
      },
      "otherAssessment": {
          "睡眠评估": "睡眠评估结果"
      },
  }
  return builder(data, '新建患者成功！', 200)
}

// 3.2.2.	推送患者健康方案
const patientSendHealthPlan = options => {
  const queryParameters = getQueryParameters(options) || {}
  const patientId = queryParameters.patientId
  console.info(`patientSendPlan for patientId: ${patientId}`)
  return builder({}, 'SUCCESS', 200)
}

Mock.mock(/\/api\/patient\/all/, 'get', patientAll)
Mock.mock(/\/api\/patient\/getById/, 'get', patientGetById)
Mock.mock(/\/api\/patient\/query/, 'post', patientQuery)
Mock.mock(/\/api\/patient\/add/, 'post', patientAdd)
Mock.mock(/\/api\/patient\/upload/, 'post', patientUpload)
Mock.mock(/\/api\/patient\/getPatientReport/, 'get', patientGetPatientReport)
Mock.mock(/\/api\/patient\/sendHealthPlan/, 'post', patientSendHealthPlan)
