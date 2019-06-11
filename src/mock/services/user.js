import Mock from 'mockjs2'
import { builder } from '../util'

const info = options => {
  console.log('options', options)
  const userInfo = {
    id: '4291d7da9005377ec9aec4a71ea837f',
    name: '陈医生',
    username: 'admin',
    password: '',
    avatar: '/avatar2.jpg',
    status: 1,
    telephone: '',
    lastLoginIp: '27.154.74.117',
    lastLoginTime: 1534837621348,
    creatorId: 'admin',
    createTime: 1497160610259,
    merchantCode: 'TLif2btpzg079h15bk',
    deleted: 0,
    roleId: 'admin',
    role: {},
  }
  // role
  const roleObj = {
    id: 'admin',
    name: '管理员',
    permissions: [
      {
        roleId: 'admin',
        permissionId: 'stat',
        permissionName: '患者报表',
      },
      {
        roleId: 'admin',
        permissionId: 'patients',
        permissionName: '全部患者',
      },
      {
        roleId: 'admin',
        permissionId: 'patient',
        permissionName: '患者详情',
      },
      {
        roleId: 'admin',
        permissionId: 'doctors',
        permissionName: '全部医生',
      },
    ],
  }

  const doctorRoleObj = {
    id: 'doctor',
    name: '医生',
    permissions: [
      {
        roleId: 'admin',
        permissionId: 'stat',
        permissionName: '患者报表',
      },
      {
        roleId: 'admin',
        permissionId: 'patients',
        permissionName: '全部患者',
      },
      {
        roleId: 'admin',
        permissionId: 'patient',
        permissionName: '患者详情',
      },
    ],
  }

  roleObj.permissions.push({
    roleId: 'admin',
    permissionId: 'support',
    permissionName: '超级模块',
    actions:
      '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"import","defaultCheck":false,"describe":"导入"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"},{"action":"export","defaultCheck":false,"describe":"导出"}]',
    actionEntitySet: [
      {
        action: 'add',
        describe: '新增',
        defaultCheck: false,
      },
      {
        action: 'import',
        describe: '导入',
        defaultCheck: false,
      },
      {
        action: 'get',
        describe: '详情',
        defaultCheck: false,
      },
      {
        action: 'update',
        describe: '修改',
        defaultCheck: false,
      },
      {
        action: 'delete',
        describe: '删除',
        defaultCheck: false,
      },
      {
        action: 'export',
        describe: '导出',
        defaultCheck: false,
      },
    ],
    actionList: null,
    dataAccess: null,
  })

  userInfo.role = roleObj
  return builder(userInfo)
}

Mock.mock(/\/user\/info/, 'get', info)
