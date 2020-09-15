import axios from '@/utils/request'
import qs from 'qs'

// 用户签到接口
const userSign = () => {
  return axios.get('/user/fav')
}

// 更新用户基本资料
const updateUserInfo = data => {
  return axios.post('/user/basic', data)
}

// 确认修改用户名
const updateUsername = data => {
  return axios.get('/public/reset-email?' + qs.stringify(data))
}

// 修改密码
const changePasswd = data => {
  return axios.post('/user/change-password', data)
}

export { userSign, updateUserInfo, updateUsername, changePasswd }
