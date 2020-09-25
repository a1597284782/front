import { escapeHtml } from '@/utils/escapeHtml'

export default {
  // 转义 富文本内容
  richtext: {
    bind: function (el, binding, vnode) {
      el.innerHTML = escapeHtml(binding.value)
    },
    componentUpdated: function (el, binding, vnode) {
      el.innerHTML = escapeHtml(binding.value)
    }
  }
}
