import { escapeHtml } from '@/utils/escapeHtml'
import store from '@/store'

export default {
  // 转义 富文本内容
  richtext: {
    bind: function (el, binding, vnode) {
      el.innerHTML = escapeHtml(binding.value)
    },
    componentUpdated: function (el, binding, vnode) {
      el.innerHTML = escapeHtml(binding.value)
    }
  },
  hasRole: {
    inserted: function (el, binding, vnode) {
      const roles = store.state.userInfo.roles || ['user']
      if (!roles.includes(binding.value)) {
        el.parentNode.removeChild(el)
      }
    }
  },
  hasPermission: {
    inserted: function (el, binding, vnode) {
      console.log('🚀 ~ file: directives.js ~ line 23 ~ el', el, el.parentNode)
      const types = vnode.context.$route.meta.types
      const values = binding.value
      let flag = true
      for (const v of values) {
        if (!types.includes(v)) {
          flag = false
        }
      }
      if (!flag) {
        el.parentNode.removeChild(el)
      }
    }
  }
}
