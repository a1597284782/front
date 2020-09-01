import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import jwt from 'jsonwebtoken'
import moment from 'dayjs'

import Home from './views/Home.vue'

const Login = () => import('./views/Login.vue')
const Reg = () => import('./views/Reg.vue')
const Forget = () => import('./views/Forget.vue')
const Index = () => import('./views/channels/Index.vue')
const Template1 = () => import('./views/channels/Template1.vue')
const Center = () => import('./views/Center.vue')
const User = () => import('./views/User.vue')
const UserCenter = () => import('./components/user/Center.vue')
const Settings = () => import('./components/user/Settings.vue')
const Posts = () => import('./components/user/Posts.vue')
const Msg = () => import('./components/user/Msg.vue')
const Others = () => import('./components/user/Others.vue')
const MyInfo = () => import('./components/user/common/MyInfo.vue')
const PicUpload = () => import('./components/user/common/PicUpload.vue')
const Passwd = () => import('./components/user/common/Passwd.vue')
const Accounts = () => import('./components/user/common/Accounts.vue')
const MyPost = () => import('./components/user/common/MyPost.vue')
const MyCollection = () => import('./components/user/common/MyCollection.vue')

Vue.use(Router)

const router = new Router({
  linkExactActiveClass: 'layui-this',
  // linkActiveClass: 'layui-this',
  routes: [
    {
      path: '/',
      name: '',
      component: Home,
      children: [
        {
          path: '',
          name: 'index',
          component: Index
        },
        {
          path: '/index/:catalog',
          name: 'catalog',
          component: Template1
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/reg',
      name: 'reg',
      component: Reg,
      beforeEnter: (to, from, next) => {
        if (from.name === 'login') {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/forget',
      name: 'forget',
      component: Forget,
      beforeEnter: (to, from, next) => {
        if (from.name === 'login') {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/user/:uid',
      name: 'home',
      props: true,
      component: User
    },
    {
      path: '/center',
      component: Center,
      meta: { requiresAuth: true },
      linkActiveClass: 'layui-this',
      children: [
        {
          path: '',
          name: 'center',
          component: UserCenter
        },
        {
          path: 'set',
          component: Settings,
          children: [
            {
              path: '',
              name: 'info',
              component: MyInfo
            },
            {
              path: 'pic',
              name: 'pic',
              component: PicUpload
            },
            {
              path: 'passwd',
              name: 'passwd',
              component: Passwd
            },
            {
              path: 'account',
              name: 'account',
              component: Accounts
            }
          ]
        },
        {
          path: 'posts',
          component: Posts,
          children: [
            {
              path: '',
              name: 'mypost',
              component: MyPost
            },
            {
              path: 'mycollection',
              name: 'mycollection',
              component: MyCollection
            }
          ]
        },
        {
          path: 'msg',
          name: 'msg',
          component: Msg
        },
        {
          path: 'others',
          name: 'others',
          component: Others
        }
      ]
    }
  ]
})

// 全局导航守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  if (token !== '' && token !== null) {
    const payload = jwt.decode(token)
    console.log('payload', payload)
    // 判断 token 是否过期， 方法二
    // console.log(JSON.parse(atob(token.split('.')[1])).exp * 1000 > (new Date()).getTime())
    // 判断 token 是否过期， 方法一
    if (moment().isBefore(moment(payload.exp * 1000))) {
      store.commit('setToken', token)
      store.commit('setUserInfo', userInfo)
      store.commit('setIsLogin', true)
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
