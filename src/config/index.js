export default {
  baseUrl: {
    // 开发环境
    dev: 'http://localhost:3000',
    // 生产环境
    pro: 'http://localhost:3000'
  },
  // 白名单
  publicPath: [/^\/public/, /^\/login/]
}
