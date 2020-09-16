<template>
  <!-- 表情 -->
  <transition name="fade">
    <div class="layui-layer layui-layer-tips layui-edit-face edit-content" v-show="isShow">
      <div class="layui-layer-content">
        <ul class="layui-clear">
          <li v-for="(value, key) in lists" :key="'face' + key" @click="handleFaceClick(key)">
            <img :src="value" alt />
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
import faces from '@/assets/js/face'

export default {
  name: 'Face',
  props: ['isShow', 'ctrl'],
  data () {
    return {
      // 表情
      lists: faces
    }
  },
  mounted () {
    // 点击 表情框以外的区域
    this.$nextTick(() => {
      document.querySelector('body').addEventListener('click', this.handleBodyClick)
    })
  },
  methods: {
    // 点击 表情
    handleFaceClick (item) {
      this.$emit('addEvent', item)
      this.$emit('closeEvent')
    },
    // 触发隐藏本组件的关闭事件，改变 isShow 状态
    handleBodyClick (e) {
      e.stopPropagation()

      if (typeof this.ctrl === 'undefined') {
        return
      }

      // 判断是否点击 表情之外的区域
      // contains 方法可以判断 dom 结构的包含关系
      if (!this.ctrl.contains(e.target)) {
        this.$emit('closeEvent')
      }
    }
  },
  beforeDestroy () {
    document.querySelector('body').removeEventListener('click', this.handleBodyClick)
  }

}
</script>

<style lang="scss" scoped>

</style>
