<template>
  <div class="tips animation" v-show="isShow" :class="{'shake': type === 'shake'}" ref="tips">
    <div class="content">{{msg}}</div>
  </div>
</template>

<script>
export default {
  name: 'Pop',
  props: {
    // 类型
    type: {
      type: String,
      default: ''
    },
    // 提示信息
    msg: {
      type: String,
      default: ''
    },
    // 显示隐藏
    isShow: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isShow (newval, oldval) {
      if (newval !== oldval && newval === true) {
        setTimeout(() => {
          const height = this.$refs.tips.clientHeight
          const width = this.$refs.tips.clientWidth
          this.$refs.tips.style.marginLeft = -width / 2 + 'px'
          this.$refs.tips.style.marginTop = -height / 2 + 'px'
        }, 0)
        setTimeout(() => {
          this.isShow = false
          this.msg = ''
          this.type = ''
        }, 3000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-10%);
  }
  20%,
  40%,
  60%,
  80% {
    transform: translateX(10%);
  }
}

.tips {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
}
.animation {
  animation-fill-mode: both;
  animation-duration: 0.3s;
}

.content {
  background: rgba($color: #000000, $alpha: 0.4);
  color: #fff;
  border-radius: 6px;
  padding: 10px 15px;
}

.shake {
  animation-name: shake;
}
</style>
