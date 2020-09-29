import axios from '@/utils/request'
import qs from 'qs'
import store from '@/store'

// 获取文章中的评论列表
const getComents = parms => {
  const token = store.state.token
  let headers = {}
  if (token !== '') {
    headers = {
      Authorization: 'Bearer ' + token
    }
  }
  return axios.get('/public/comments?' + qs.stringify(parms), headers)
}

// 发表评论
const addComment = data => {
  return axios.post('/comments/reply', { ...data })
}

// 编辑评论
const updateComment = data => {
  return axios.post('/comments/update', { ...data })
}

// 采纳评论
const setCommentBest = params => {
  return axios.get('/comments/accept?' + qs.stringify(params))
}
// 评论点赞
const setHands = params => {
  return axios.get('/comments/hands?' + qs.stringify(params))
}

export { getComents, addComment, updateComment, setCommentBest, setHands }
