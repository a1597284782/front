import axios from '@/utils/request'
// 具有一些附加安全性的querystring解析和字符串化库
import qs from 'qs'

/**
 * 获取文章列表
 * @param {Object} options 接口参数对象
 */
const getList = options => {
  return axios.get('/public/list?' + qs.stringify(options))
}

// 温馨提醒
const getTips = () => {
  return axios.get('/public/tips')
}

// 友情链接
const getLinks = () => {
  return axios.get('/public/links')
}

// 本周热议
const getTop = () => {
  return axios.get('/public/topWeek')
}

// 上传图片接口
const uploadImg = formData => {
  return axios.post('/content/upload', formData)
}

// 发帖接口
const addPost = data => {
  return axios.post('/content/add', { ...data })
}

export { getList, getTips, getLinks, getTop, uploadImg, addPost }
