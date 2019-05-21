import Mock from 'mockjs2'
import { builder, getQueryParameters } from '../util'

// 患者报表 ->	患者分布
const statsAll = options => {
  const data = {
    all: 7,
    ascvdPatients: 2,
    copdPatients: 0,
    diabetesAndHypertensionPatients: 0,
    diabetesPatients: 3,
    strokePatients: 0,
    hypertensionPatients: 1
  }
  return builder(data, '请求成功', 200)
}

// 患者报表 ->	五病患者数
const statsPatients = options => {
  const data = {
    diabetesAndHypertension: {
      patients: 0,
      danger: 7
    },
    ascvd: {
      patients: 2,
      danger: 2
    },
    diabetes: {
      patients: 3,
      danger: 1
    },
    hypertension: {
      patients: 1,
      danger: 1
    },
    stroke: {
      patients: 0,
      danger: 4
    },
    copd: {
      patients: 0,
      danger: 2
    }
  }
  return builder(data, '请求成功', 200)
}
// 健康管理方案报表 ->	健康管理方案分布
const statsPlans = options => {
  const data = {
    diabetesAndHypertension: {
      patients: 0,
      danger: 4
    },
    ascvd: {
      patients: 6,
      danger: 0
    },
    diabetes: {
      patients: 3,
      danger: 4
    },
    hypertension: {
      patients: 4,
      danger: 13
    },
    stroke: {
      patients: 0,
      danger: 7
    },
    copd: {
      patients: 0,
      danger: 0
    }
  }
  return builder(data, '请求成功', 200)
}

Mock.mock(/\/stats\/all/, 'get', statsAll)
Mock.mock(/\/stats\/patients/, 'get', statsPatients)
Mock.mock(/\/stats\/plans/, 'get', statsPlans)
