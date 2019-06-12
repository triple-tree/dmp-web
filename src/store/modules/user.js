import Vue from 'vue'
import { login, getInfo, logout } from '@/api/login'
import { ACCESS_TOKEN, ROUTERS, USER_INFO } from '@/store/mutation-types'
import { welcome } from '@/utils/util'
import router from '../../router'
import notification from 'ant-design-vue/es/notification'

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

const user = {
  // namespaced: true,
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {},
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
  },

  actions: {
    // 登录
    Login({ dispatch, commit, getters }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then(response => {
            const token = response.token
            console.info(`actions: Login token ${JSON.stringify(token, null, 2)}`)
            if (!token) {
              return reject(response.message)
            }
            Vue.ls.set(ACCESS_TOKEN, token, 7 * 24 * 60 * 60 * 1000)
            commit('SET_TOKEN', token)
            console.info(`actions: Login with ${JSON.stringify(response, null, 2)}`)
            const result = response.data
            // 调整内部数据结构，role、roleId
            result.roleId = result.role
            result.roleId === 'admin' ? (result.role = adminRoleObj) : (result.role = doctorRoleObj)
            Vue.ls.set(USER_INFO, response, 7 * 24 * 60 * 60 * 1000)
            resolve()
            // if (result.role && result.role.permissions.length > 0) {
            //   const role = result.role
            //   role.permissions = result.role.permissions
            //   role.permissions.map(per => {
            //     if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
            //       const action = per.actionEntitySet.map(action => {
            //         return action.action
            //       })
            //       per.actionList = action
            //     }
            //   })
            //   role.permissionList = role.permissions.map(permission => {
            //     return permission.permissionId
            //   })
            //   commit('SET_ROLES', result.role)
            //   commit('SET_INFO', result)

            //   // dispatch('permission/GenerateRoutes', { roles: role }, { root: true })
            //   dispatch('GenerateRoutes', { roles: role })
            //     .then(() => {
            //       router.addRoutes(getters.addRouters)
            //       resolve()
            //     })
            //     .catch(() => {
            //       notification.error({
            //         message: '错误',
            //         description: '请求用户信息失败，请重试',
            //       })
            //       dispatch('Logout').then(() => {
            //         // next({ path: '/user/login', query: { redirect: to.fullPath } })
            //         router.push({ path: '/user/login' })
            //       })
            //     })
            // }
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        console.info(`GetInfo`)
        const response = Vue.ls.get(USER_INFO)
        const result = response.data
        if (result.role && result.role.permissions.length > 0) {
          const role = result.role
          role.permissions = result.role.permissions
          role.permissions.map(per => {
            if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
              const action = per.actionEntitySet.map(action => {
                return action.action
              })
              per.actionList = action
            }
          })
          role.permissionList = role.permissions.map(permission => {
            return permission.permissionId
          })
          commit('SET_ROLES', result.role)
          commit('SET_INFO', result)
        } else {
          reject(new Error('getInfo: roles must be a non-null array !'))
        }

        commit('SET_NAME', { name: result.name, welcome: welcome() })
        commit('SET_AVATAR', result.avatar)

        resolve(response)
      })
    },

    // 登出
    Logout({ commit, state }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        Vue.ls.remove(ACCESS_TOKEN)
        Vue.ls.remove(USER_INFO)

        logout(state.token)
          .then(() => {
            resolve()
          })
          .catch(() => {
            resolve()
          })
      })
    },
  },
}

export default user
