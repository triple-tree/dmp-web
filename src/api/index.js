const api = {
  Login: '/login',
  Logout: '/logout',
  // 统计报表
  StatsAll: '/stats/all',
  StatsPatients: '/stats/patients',
  StatsPlans: '/stats/plans',
  // 健康档案
  RecordLatest: '/record/latest',
  RecordAll: '/record/all',
  RecordDetail: '/record/detail',
  RecordUpdate: '/record/update',
  // 评估筛选
  AssessmentLatest: '/assessment/latest',
  AssessmentAll: '/assessment/all',
  AssessmentAssess: '/assessment/assess',
  // 健康管理方案
  PlanAll: '/plan/all',
  PlanDetail: '/plan/detail',
  PlanAdd: '/plan/add',
  // 其他
  ForgePassword: '/auth/forge-password',
  Register: '/register',
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
  Patient: '/patient/all'
}
export default api
