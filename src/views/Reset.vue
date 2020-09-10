<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li>
            <router-link :to="{name: 'login'}">登录</router-link>
          </li>
          <li class="layui-this">重置密码</li>
        </ul>
        <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
          <validation-observer ref="observer" v-slot="{ validate }">
            <div class="layui-tab-item layui-show">
              <div class="layui-form layui-form-pane">
                <form method="post">
                  <div class="layui-form-item">
                    <validation-provider
                      name="password"
                      rules="required|min:6|max:16|confirmed:confirmation"
                      v-slot="{errors}"
                    >
                      <div class="layui-row">
                        <label for="L_pass" class="layui-form-label">新密码</label>
                        <div class="layui-input-inline">
                          <input
                            type="password"
                            name="password"
                            v-model="password"
                            placeholder="请输入密码"
                            autocomplete="off"
                            class="layui-input"
                          />
                        </div>
                        <div class="layui-form-mid layui-word-aux">6到16个字符</div>
                      </div>
                      <div class="layui-row">
                        <span style="color: #c00;">{{errors[0]}}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <validation-provider v-slot="{ errors }" vid="confirmation">
                      <div class="layui-row">
                        <label for="L_repass" class="layui-form-label">确认密码</label>
                        <div class="layui-input-inline">
                          <input
                            type="password"
                            name="repassword"
                            v-model="repassword"
                            placeholder="请输入密码"
                            autocomplete="off"
                            class="layui-input"
                          />
                        </div>
                      </div>
                      <div class="layui-row">
                        <span style="color: #c00;">{{errors[0]}}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <validation-provider name="code" rules="required|length:4" v-slot="{errors}">
                      <div class="layui-row">
                        <label for="L_vercode" class="layui-form-label">验证码</label>
                        <div class="layui-input-inline">
                          <input
                            type="text"
                            name="code"
                            v-model="code"
                            placeholder="请输入验证码"
                            autocomplete="off"
                            class="layui-input"
                          />
                        </div>
                        <div class>
                          <span class="svg" style="color: #c00;" @click="_getCode()" v-html="svg"></span>
                        </div>
                      </div>
                      <div class="layui-form-mid">
                        <span style="color: #c00;">{{errors[0]}}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <button class="layui-btn" type="button" @click="validate().then(submit)">立即重置</button>
                  </div>
                  <div class="layui-form-item fly-form-app">
                    <span>或者直接使用社交账号快捷注册</span>
                    <a
                      href
                      onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
                      class="iconfont icon-qq"
                      title="QQ登入"
                    ></a>
                    <a
                      href
                      onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
                      class="iconfont icon-weibo"
                      title="微博登入"
                    ></a>
                  </div>
                </form>
              </div>
            </div>
          </validation-observer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { getCode, updatePassword } from '@/api/login'
// 创建随机且唯一的 UUID
import { v4 as uuid } from 'uuid'

let key = ''
export default {
  name: 'reset',
  data () {
    return {
      password: '',
      repassword: '',
      code: '',
      svg: ''
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  mounted () {
    // 正则 拼接 url 获取 key 值
    const queryStr = window.location.href.replace(/.*\?/, '').split('&')
    queryStr.forEach(item => {
      if (item.indexOf('key=') !== -1) {
        key = item.slice(4)
      }
    })

    // 创建随机且唯一的 UUID，并保存到 vuex 和 缓存中
    let sid = ''
    if (localStorage.getItem('sid')) {
      sid = localStorage.getItem('sid')
    } else {
      sid = uuid()
      localStorage.setItem('sid', sid)
    }
    // 更新 vuex 的 sid
    this.$store.commit('setSid', sid)

    // 获取验证码
    this._getCode()
  },
  methods: {
    // 获取验证码
    _getCode () {
      const sid = this.$store.state.sid
      getCode(sid).then((res) => {
        // console.log('_getCode -> res', res)
        if (res.code === 200) {
          this.svg = res.data
        }
      })
    },
    // 提交按钮
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      // console.log('submit')
      updatePassword({
        key: key,
        password: this.password
      }).then(res => {
        if (res.code === 200) {
          this.$alert(res.msg)
          this.isSend = true
          setTimeout(() => {
            this.$router.push('/')
          }, 1000)
        } else {
          this.$alert(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
