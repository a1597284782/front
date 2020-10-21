import Vue from 'vue'
import Vuex from 'vuex'
import WebSocktClient from '@/utils/websocket'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 创建随机且唯一的 UUID
    sid: '',
    // 判断是否登陆
    isLogin: false,
    token: '',
    // 用户信息
    userInfo: {},
    ws: null,
    // 未读消息总数
    num: 0
  },
  mutations: {
    // 初始化 WebSocket
    initWebSocket (state, config) {
      state.ws = new WebSocktClient(config)
      state.ws.init()
    },
    // 更新 sid
    setSid (state, value) {
      state.sid = value
    },
    // 更新 token
    setToken (state, value) {
      state.token = value
      // 本地存储用 token
      localStorage.setItem('token', value)
    },
    // 设置用户的基本信息
    setUserInfo (state, value) {
      if (value === '') return
      state.userInfo = value
      // 本地存储用户基本信息
      localStorage.setItem('userInfo', JSON.stringify(value))
    },
    // 设置登陆状态
    setIsLogin (state, value) {
      state.isLogin = value
      console.log('setIsLogin -> value', value)
    },
    // 发送消息
    setMessage (state, value) {
      state.num = value
    }
  },
  actions: {
    // ws 发送消息
    message ({ commit }, msg) {
      commit('setMessage', msg)
    }
  }
})
