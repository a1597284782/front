import axios from '@/utils/request'
import qs from 'qs'

// 获取文章中的评论列表
const getComents = parms => {
  return axios.get('/public/comments?' + qs.stringify(parms))
}

// 发表评论
const addComment = data => {
  return axios.post('/comments/reply', { ...data })
}

// 编辑评论
const updateComment = data => {
  return axios.post('/comments/update', { ...data })
}

export { getComents, addComment, updateComment }
