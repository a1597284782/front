<template>
  <div class="edit-wrap">
    <div class="layui-form-item layui-form-text">
      <div class="layui-input-block">
        <div class="layui-unselect fly-edit">
          <!-- 表情 -->
          <span @click="() => {this.faceStatus = !this.faceStatus}" ref="face">
            <i class="layui-icon layui-icon-face-smile"></i>
          </span>
          <span @click="() => {this.imgStatus = !this.imgStatus}" ref="img">
            <i class="layui-icon layui-icon-picture"></i>
          </span>
          <span>
            <i class="layui-icon layui-icon-link"></i>
          </span>
          <span class="quote">“</span>
          <span>
            <i class="layui-icon layui-icon-fonts-code"></i>
          </span>
          <span>hr</span>
          <span>
            <i class="layui-icon layui-icon-screen-full"></i>
          </span>
        </div>
        <textarea class="layui-textarea fly-editor" name="content"></textarea>
      </div>
      <!-- 表情组件 -->
      <face
        :isShow="faceStatus"
        :ctrl="this.$refs.face"
        @closeEvent="()=>{this.faceStatus = false}"
      ></face>

      <!-- 上传图片组件 -->
      <img-upload
        :isShow="imgStatus"
        :ctrl="this.$refs.img"
        @closeEvent="()=>{this.imgStatus = false}"
      ></img-upload>
    </div>
  </div>
</template>

<script>
// 表情
import Face from './Face'
// 上传图片
import ImgUpload from './ImgUpload'

export default {
  name: 'Editor',
  components: {
    Face,
    ImgUpload
  },
  data () {
    return {
      // 表情组件 状态
      faceStatus: false,
      // 上传图片组件 状态
      imgStatus: false
    }
  }
}
</script>

<style lang="scss">
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes bounceOut {
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.05);
  }
  100% {
    opacity: 0;
    transform: scale(0.7);
  }
}

.fade-leave-active {
  animation: bounceOut 0.3s;
}

.fade-enter-active,
.fade-enter-to {
  animation: bounceIn 0.3s;
}

.fly-editor {
  height: 260px;
}
.quote {
  font-size: 22px;
  vertical-align: middle;
  position: relative;
  top: 4px;
}
.edit-wrap {
  position: relative;
}
.edit-content {
  position: absolute;
  top: 45px;
  left: 0;
}
</style>
