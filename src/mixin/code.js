import { getCode } from '@/api/login'
import uuid from 'uuid/v4'
import { ValidationProvider, ValidationObserver } from 'vee-validate'

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      code: '',
      svg: ''
    }
  },
  mounted () {
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
    this._getCode()
  },
  methods: {
    // 获取验证码
    _getCode () {
      const sid = this.$store.state.sid
      getCode(sid).then((res) => {
        if (res.code === 200) {
          this.svg = res.data
        }
      })
    }
  }
}
