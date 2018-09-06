import { login, logout, getInfo, getRouters } from '@/api/login'
import { removeToken } from '@/utils/auth'

const user = {
  state: { // token: getToken(),
    login: false,
    username: '',
    nickname: '',
    avatar: '',
    roles: [],
    roleRouters: []
  },

  mutations: {
    SET_LOGIN: (state, loginState) => {
      state.login = loginState
    },
    SET_NICKNAME: (state, name) => {
      state.nickname = name
    },
    SET_USERNAME: (state, name) => {
      state.username = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_ROLE_ROLTERS: (state, roleRouters) =>  {
      state.roleRouters = roleRouters
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          // const data = response.data
          // setToken(data.token)
          commit('SET_LOGIN', true)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const data = response
          commit('SET_NICKNAME', data.nickName)
          commit('SET_USERNAME', data.userName)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    GetRouters({ commit, state }){
      var p = new Promise((resolve, reject) => {
        getRouters().then(response => {
          console.log(`routers: ${response}`)
          commit('SET_ROLE_ROUTERS', response)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
      return p
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          console.log('logout ....')
          // commit('SET_TOKEN', '')
          // commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_LOGIN', false)
        removeToken()
        resolve()
      })
    }
  }
}

export default user
