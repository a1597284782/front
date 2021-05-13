## 社区PC前端项目

### 项目简介

本项目采用 Vue + Layui + Vue Router + Vuex 开发，为前后端分离的开发模式，基于角色的权限设计，可以发布文章、编辑、评论、签到、采纳、实时消息通知、登录注册、邮箱找回、SVG验证码等。

完整的通用社区业务闭环，企业级开发流程(需求-设计-开发-部署-自动化)

### 项目运行

安装依赖

```
npm install
```

开发环境运行

```
npm run serve
```

线上预览地址： http://1.116.90.169/#/

### 项目核心

* JWT登录设计，用户密码 bcryptjs 加密与解密
* VeeValidate & Vuelidate 数据验证
* 历史消息缓存和实时消息通知
* Websocket 客户端、服务端、断线重连机制
* 动态路由/路由权限控制
* 文章权限控制，按钮级权限控制
* 图片验证码及 Redis 缓存
* 接口设计/Mock 流程/接口开发
* 效率开发环境/Prettier/ESLint
* Sass 进阶设计通用工具类
* 自定义 IconFont 图标库
* 自定义富文本编辑器
* 多屏响应式布局
* 缺陷控制和版本管理
* 长列表筛选/排序/异步加载
* 自定义filter/directives
* Axios 封装/拦截器
* 前端依赖升级方案
* 积分/签到系统设计
* 头像图片上传/静态资源
* 邮件功能 node-mailer 集成
* 评论/收藏/点赞功能
* 编写 Dockerfile 文件，并配置 Jenkins 实现自动化部署 CI/CD

### 其他

本项目的后台管理系统地址：https://github.com/a1597284782/front-admin



