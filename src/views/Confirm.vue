<template>
  <div class="layui-container flex">
    <div class="layui-row font pd3">确定更新账号为: {{username}} 吗？</div>
    <div class="layui-row">
      <button type="button" class="layui-btn" :class="{'layui-btn-disabled': isSend }" @click="submit()">确定更新</button>
      <router-link class="layui-btn layui-btn-primary" to="/">返回首页</router-link>
    </div>
  </div>
</template>

<script>
import { updateUsername } from '@/api/user'

let obj = {}
export default {
  name: 'confirm',
  data () {
    return {
      username: '',
      isSend: false
    }
  },
  mounted () {
    const queryStr = window.location.href.replace(/.*\?/, '')
    // Object.fromEntries 把二维数组转化成 对象形式。
    //  如： [ ['0', 'a'], ['1', 'b'], ['2', 'c'] ]  ==》 { 0: "a", 1: "b", 2: "c" }
    obj = Object.fromEntries(queryStr.split('&').map(v => {
      return v.split('=')
    }))
    this.username = decodeURIComponent(obj.username)
  },
  methods: {
    submit () {
      obj.username = this.username
      updateUsername(obj).then(res => {
        if (res.code === 200) {
          this.$alert(res.msg)
          this.isSend = true
          setTimeout(() => {
            this.$router.push('/')
          }, 1000)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  min-height: 300px;
}
.font {
  font-size: 16px;
  color: #333;
}
</style>
