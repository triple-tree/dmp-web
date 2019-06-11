import Mock from 'mockjs2'
import { builder, getBody } from '../util'

const username = ['admin', 'user', 'super']
const password = ['21232f297a57a5a743894a0e4a801fc3', '8914de686ab28dc22f30d3d8e107ff6c'] // admin, ant.design

const login = options => {
  const body = getBody(options)
  console.log('mock: body', body)
  // if (!username.includes(body.username) || !password.includes(body.password)) {
  //   return builder({ isLogin: true }, '账户或密码错误', 401)
  // }

  return builder(
    {
      id: Mock.mock('@guid'),
      name: Mock.mock('@name'),
      username: body.username,
      hospitalId: '4152f57a5fce4b4a8323e2d8ac9a96b5',
      role: body.usertype,
      department: '心脑血管科',
      password: '',
      phoneNumber: '18771072421',
      status: 1,
      createDate: '2019-05-05',

      // the following should remove
      // avatar: 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
      // telephone: '',
      // lastLoginIp: '27.154.74.117',
      // lastLoginTime: 1534837621348,
      // creatorId: 'admin',
      // createTime: 1497160610259,
      // deleted: 0,
      // roleId: 'admin',
      // lang: 'zh-CN',
    },
    '登录成功！',
    200,
    {},
    {
      token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTc5MDQzOTIsInVzZXJuYW1lIjoiY2VzaGkyIn0.9IlluiJvvuiFfwMmnRI9bTwsosslpmJCfpVPpJNexc8',
    }
  )
}
const register = options => {
  const body = getBody(options)
  if (body.username && body.password) {
    return builder({}, '账户或密码错误', 500)
  }

  return builder(
    {
      doctorId: Mock.mock('@guid'),
    },
    '医生已注册，请尽快通知管理员审核账号！',
    200
  )
}

const logout = () => {
  return builder({}, '[测试接口] 注销成功')
}

const smsCaptcha = () => {
  return builder({ captcha: Mock.mock('@integer(10000, 99999)') })
}

const twofactor = () => {
  return builder({ stepCode: Mock.mock('@integer(0, 1)') })
}

Mock.mock(/\/api\/login/, 'post', login)
Mock.mock(/\/api\/register/, 'post', register)
Mock.mock(/\/logout/, 'post', logout)
Mock.mock(/\/account\/sms/, 'post', smsCaptcha)
Mock.mock(/\/auth\/2step-code/, 'post', twofactor)
