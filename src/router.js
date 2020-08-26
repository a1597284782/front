import Vue from 'vue'
import Router from 'vue-router'

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

Vue.use(Router)

export default new Router({
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
      linkActiveClass: 'layui-this',
      children: [
        {
          path: '',
          name: 'center',
          component: UserCenter
        },
        {
          path: 'set',
          name: 'set',
          component: Settings
        },
        {
          path: 'posts',
          name: 'posts',
          component: Posts
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
