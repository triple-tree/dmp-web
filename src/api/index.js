const api = {
  Login: '/api/login',
  Register: '/api/register',
  Logout: '/api/logout',
  // 全部病人
  patientAll: '/api/patient/all',
  patientGetById: '/api/patient/getById',
  patientQuery: '/api/patient/query',
  patientAdd: '/api/patient/add',
  patientUpload: '/api/patient/upload',
  patientGetPatientReport: '/api/patient/getPatientReport',
  patientSendPlan: '/api/patient/sendPlan',
  // 统计报表
  statsAll: '/api/stats/all',
  statsPatients: '/api/stats/patients',
  statsPlans: '/api/stats/plans',
  // 健康档案
  recordLatest: '/api/patientRecord/latest',
  recordAll: '/api/patientRecord/all',
  recordDetail: '/api/patientRecord/detail',
  recordAdd: '/api/patientRecord/add',
  // 评估筛选
  assessmentLatest: '/api/assessment/latest',
  assessmentAll: '/api/assessment/all',
  assessmentDetail: '/api/assessment/detail',
  assessmentForm: '/api/patient/getAssessmentForm',
  ascvdAssessment: '/api/patient/ascvdAssessment',
  ssyAssessment: '/api/patient/SSYAssessment',
  assessmentAssess: '/api/assessment/assess',
  // 健康管理方案
  planAll: '/api/plan/all',
  planDetail: '/api/plan/detail',
  planAdd: '/api/plan/add',
  // 医生管理
  doctorAll: '/api/doctor/all/',
  doctorDetail: '/api/doctor/detail/',
  doctorAudit: '/api/doctor/audit/',
  doctorAdd: '/api/doctor/add/',
  doctorSelectDoctorByName: '/api/doctor/selectDoctorByName/',
  // 其他
  ForgePassword: '/auth/forge-password',
  twoStepCode: '/auth/2step-code',
  SendSms: '/account/sms',
  SendSmsErr: '/account/sms_err',
  UserInfo: '/user/info',
  User: '/user',
  Role: '/role',
  Service: '/service',
  Permission: '/permission',
  PermissionNoPager: '/permission/no-pager',
  OrgTree: '/org/tree',
}
export default api
