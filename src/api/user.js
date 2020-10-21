import axios from '@/utils/request'
import qs from 'qs'

// 用户签到接口
const userSign = () => {
  return axios.get('/user/fav')
}

// 查询用户上一次签到的时间
const userSignCreated = () => {
  return axios.get('/user/fav-created')
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

// 设置收藏
const addCollect = data => {
  return axios.get('/user/set-collect?' + qs.stringify(data))
}

// 获取收藏列表
const getCollect = data => {
  return axios.get('/user/collect?' + qs.stringify(data))
}

// 用户发帖记录
const getPostListByUid = data => {
  return axios.get('/user/post?' + qs.stringify(data))
}

// 删除指定的文章
const deletePostByUid = data => {
  return axios.get('/user/delete-post?' + qs.stringify(data))
}

// 获取用户基本信息
const getInfo = data => {
  return axios.get('/public/info?' + qs.stringify(data))
}

// 获取用户最近评论
const getCommentList = data => {
  return axios.get('/public/latest-comment?' + qs.stringify(data))
}

// 获取用户最近发帖
const getPostListPublic = data => {
  return axios.get('/public/latest-post?' + qs.stringify(data))
}

// 获取用户未读消息
const getMsg = data => {
  return axios.get('/user/getmsg?' + qs.stringify(data))
}

// 设置用户未读消息
const setMsg = data => {
  return axios.get('/user/setmsg?' + qs.stringify(data))
}

export {
  userSign,
  userSignCreated,
  updateUserInfo,
  updateUsername,
  changePasswd,
  addCollect,
  getCollect,
  getPostListByUid,
  deletePostByUid,
  getInfo,
  getCommentList,
  getPostListPublic,
  getMsg,
  setMsg
}
