import store from '@/store'
import jwt from 'jsonwebtoken'
import moment from 'dayjs'
import routes from './routers'

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router(routes)

// 全局导航守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  if (token !== '' && token != null) {
    const payload = jwt.decode(token)
    console.log('payload', payload)
    // 判断 token 是否过期， 方法二
    // console.log(JSON.parse(atob(token.split('.')[1])).exp * 1000 > (new Date()).getTime())
    // 判断 token 是否过期， 方法一
    if (moment().isBefore(moment(payload.exp * 1000))) {
      store.commit('setToken', token)
      store.commit('setUserInfo', userInfo)
      store.commit('setIsLogin', true)
      // 鉴权通过则初始化 WebSocket
      if (!store.state.ws) {
        store.commit('initWebSocket', {})
      }
    } else {
      localStorage.clear()
    }
  }
  // 获取 meta 元信息， 如果有则需要登陆鉴权
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const isLogin = store.state.isLogin
    // 需要用户登陆的页面
    if (isLogin) {
      // 已登录
      // 权限的判断
      next()
    } else {
      // 未登录
      next('/login')
    }
  } else {
    // 不需要用户登陆的页面
    next()
  }
})

export default router
