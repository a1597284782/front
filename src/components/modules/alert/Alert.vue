<template>
  <div v-show="isShow">
    <div class="alert">
      <div class="flex">{{ msg }}</div>
      <div v-if="type === 'alert'">
        <div class="btnCommon success" @click="close()">确定</div>
      </div>
      <div v-else class="space-round">
        <div class="btnCommon cancel" @click="cancelEvent()">取消</div>
        <div class="btnCommon success" @click="successEvent()">确定</div>
      </div>
    </div>
    <div class="mask" @click="closeMask()"></div>v
  </div>
</template>

<script>
/* eslint-disable */
export default {
  props: {
    type: {
      type: String,
      default: 'alert'
    },
    msg: {
      type: String,
      default: ''
    },
    isShow: {
      type: Boolean,
      default: false
    },
    success: {
      type: Function,
      default: () => {}
    },
    cancel: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    // 确定按钮
    close () {
      this.isShow = false
    },
    // 点击遮罩层
    closeMask () {
      if (this.type === 'alert') {
        this.close()
      }
    },
    // 取消按钮
    cancelEvent () {
      this.cancel()
      this.close()
    },
    // 确定按钮
    successEvent () {
      this.success()
      this.close()
    }
  }

}
</script>

<style lang="scss" scoped>
$btn-main: #009688;
// 颜色变深 5%
$btn-dark: darken($btn-main, 5%);
.alert {
  width: 300px;
  height: 150px;
  position: fixed;
  background-color: #fff;
  border-radius: 6px;
  left: 50%;
  top: 50%;
  padding: 20px 10px;
  box-shadow: 0 5px 8px rgba($color: #000000, $alpha: 0.5);
  transform: translate(-50%, -50%);
  z-index: 9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.flex {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.space-round {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding: 0 10px;

}
.btnCommon {
  width: 105px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  border-radius: 6px;
  cursor: pointer;

  &.success {
    background: $btn-main;
    color: #fff;
    cursor: pointer;
    &:hover {
      background: $btn-dark;
    }
  }
  &.cancel {
    background: #ededed;
    color: #333;
  }
}
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba($color: #000000, $alpha: 0.4);
  left: 0;
  top: 0;
  overflow: hidden;
  z-index: 8;
}
</style>
