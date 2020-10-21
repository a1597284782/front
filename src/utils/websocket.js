import store from '@/store'

class WebSocktClient {
  constructor (config = {}) {
    const defautConfig = {
      url: '127.0.0.1',
      port: '3001',
      protocol: 'ws',
      timeInterval: 5 * 1000
    }
    const finalConfig = { ...defautConfig, ...config }
    this.ws = {}
    this.port = finalConfig.port
    this.url = finalConfig.url
    this.protocol = finalConfig.protocol
    this.handle = null
    this.timeInterval = finalConfig.timeInterval
  }

  // 初始化
  init () {
    this.ws = new WebSocket(`${this.protocol}://${this.url}:${this.port}`)
    this.ws.onopen = () => this.onOpen()
    // this 指向问题
    this.ws.onmessage = msg => this.onMessage(msg)
    this.ws.onclose = () => this.onClose()
    this.ws.onerror = () => this.onError()
  }

  // 发送
  send (msg) {
    this.ws.send(msg)
  }

  // 链接开始时触发
  onOpen () {
    console.log('开始', this.handle)
    // 发起鉴权
    this.send(
      JSON.stringify({
        event: 'auth',
        message: 'Bearer ' + store.state.token
      })
    )
    // 断线重连
    // this.checkServer()
  }

  // 接受服务端消息时触发
  onMessage (event) {
    var obj = JSON.parse(event.data)

    switch (obj.event) {
      case 'noauth':
        // 鉴权失败
        // 路由跳转
        console.log('鉴权失败')
        break

      case 'heartbeat':
        this.checkServer()

        // 心跳监测
        this.ws.send(
          JSON.stringify({
            event: 'heartbeat',
            message: 'pong'
          })
        )
        break

      default:
        store.dispatch(obj.event, obj)
    }
  }

  // 监听关闭
  onClose () {
    console.log('关闭')
    this.ws.close()
  }

  // 监听报错
  onError () {
    console.log('报错')
    // 当连接失败时，触发error事件
    // 连接失败之后，1s进行断线重连！
    setTimeout(() => {
      this.init()
    }, 500)
  }

  // 断线重连
  checkServer () {
    console.log('心跳')
    clearTimeout(this.handle)

    this.handle = setTimeout(() => {
      this.onClose()
      this.onError()
    }, this.timeInterval + 1000)
  }
}

export default WebSocktClient
