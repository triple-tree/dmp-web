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
  const adminRoleObj = {
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

  return builder(userInfo)
}

Mock.mock(/\/user\/info/, 'get', info)
