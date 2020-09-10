<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li>
            <router-link :to="{ name: 'login' }">登录</router-link>
          </li>
          <li class="layui-this">找回密码</li>
        </ul>
        <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
          <validation-observer ref="observer" v-slot="{ validate }">
            <div class="layui-tab-item layui-show">
              <div class="layui-form layui-form-pane">
                <form method="post">
                  <div class="layui-form-item">
                    <label for="L_email" class="layui-form-label">用户名</label>
                    <validation-provider name="email" rules="required|email" v-slot="{ errors }">
                      <div class="layui-input-inline">
                        <input
                          type="text"
                          name="username"
                          v-model="username"
                          placeholder="请输入用户名"
                          autocomplete="off"
                          class="layui-input"
                        />
                      </div>
                      <div class="layui-form-mid">
                        <span style="color: #c00;">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <validation-provider
                      name="code"
                      rules="required|length:4"
                      v-slot="{ errors }"
                      ref="codefield"
                    >
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
                        <span style="color: #c00;">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <button type="button" class="layui-btn" alert="1" @click="validate().then(submit)">提交</button>
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
import { getCode, forget } from '@/api/login'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
export default {
  name: 'forget',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      username: '',
      code: '',
      svg: ''
    }
  },
  mounted () {
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
      forget({
        username: this.username,
        code: this.code,
        sid: this.$store.state.sid
      }).then((res) => {
        // console.log('submit -> res', res)
        if (res.code === 200) {
          this.$alert(res.msg)
        } else if (res.code === 401) {
          this.$refs.codefield.setErrors([res.msg])
        } else {
          this.$alert('邮件发送失败！')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
// 公用样式可以放在App.vue中
</style>
