// 封装 axios 的请求， 返回重新封装的数据格式
// 对错误的统一处理

import axios from 'axios'
import errorHandle from './errorHandle'

class HttpRequest {
  constructor (baseURL) {
    this.baseURL = baseURL
  }

  // 获取配置
  getInsideConfig () {
    const config = {
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      timeout: 10000
    }
    return config
  }

  // 设定拦截器
  interceptors (instance) {
    // 添加请求拦截器
    instance.interceptors.request.use(
      config => {
        // 在发送请求之前做些什么
        // console.log('config:', config)
        return config
      },
      err => {
        errorHandle(err)
        // 对请求错误做些什么
        return Promise.reject(err)
      }
    )

    // 添加响应拦截器
    instance.interceptors.response.use(
      res => {
        // console.log('res:', res)
        // 对响应数据做点什么
        if (res.status === 200) {
          return Promise.resolve(res.data)
        } else {
          return Promise.reject(res)
        }
      },
      err => {
        // 对响应错误做点什么
        errorHandle(err)
        return Promise.reject(err)
      }
    )
  }

  // 创建实例
  request (options) {
    const instance = axios.create()
    // Object.assign()对象的合并
    const newOpitons = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance)
    return instance(newOpitons)
  }

  // 封装 get 请求
  get (url, config) {
    const options = Object.assign({ method: 'get', url: url }, config)
    return this.request(options)
  }

  // 封装 post 请求
  post (url, data) {
    return this.request({
      method: 'post',
      url: url,
      data: data
    })
  }
}

export default HttpRequest
