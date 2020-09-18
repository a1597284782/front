<template>
  <!-- 预览 -->
  <transition name="fade">
    <div id="preview" class="layui-layer-page layui-layer-prompt edit-content" v-show="isShow">
      <div class="layui-layer-title">预览</div>
      <div class="layui-layer-content">
        <div class="detail-body" v-html="replaceContent"></div>
      </div>
      <span class="layui-layer-setwin" @click="cancel()">
        <a class="layui-layer-ico layui-layer-close layui-layer-close1"></a>
      </span>
    </div>
  </transition>
</template>

<script>
import { escapeHtml } from '@/utils/escapeHtml'

export default {
  name: 'Preview',
  props: ['isShow', 'content'],
  data () {
    return {
    }
  },
  computed: {
    // 转义成 html 代码
    replaceContent () {
      if (typeof this.content === 'undefined' || this.content.trim() === '') {
        return
      }
      return escapeHtml(this.content)
    }
  },
  methods: {
    cancel () {
      this.$emit('closeEvent')
    }
  }
}
</script>

<style lang="scss" scoped>
#preview {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #fff;
  top: 0;
  left: 0;
  z-index: 10000;
}
</style>
