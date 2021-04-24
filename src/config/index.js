const isDev = process.env.NODE_ENV === 'development'

export default {
  baseUrl: {
    // 开发环境
    dev: 'http://localhost:3000',
    // 生产环境
    pro: 'http://1.116.90.169:22000'
  },
  // 白名单
  publicPath: [/^\/public/, /^\/login/],
  wsconfig: {
    url: isDev ? '127.0.0.1' : '1.116.90.169',
    port: isDev ? '3001' : 22001
  }
}
