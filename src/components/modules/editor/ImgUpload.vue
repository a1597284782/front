<template>
  <!-- 插入图片 -->
  <transition name="fade">
    <div class="layui-layer-page layui-layer-border edit-content" v-show="isShow">
      <div class="layui-layer-title">插入图片</div>
      <div class="layui-layer-content">
        <ul class="layui-form layui-form-pane">
          <li class="layui-form-item">
            <label class="layui-form-label">URL</label>
            <div class="layui-input-inline">
              <input
                type="text"
                id="fileInput"
                v-model="pic"
                placeholder="粘贴图片地址或者点击上传"
                class="layui-input"
              />
            </div>
            <button type="button" class="layui-btn layui-btn-primary">
              <label for="uploadImg">
                <i class="layui-icon layui-icon-upload"></i>上传图片
              </label>
            </button>
            <input
              type="file"
              name="file"
              id="uploadImg"
              accept="image/png, image/gif, image/jpeg"
              class="layui-upload-file"
              @change="upload"
            />
          </li>
          <li class="layui-form-item">
            <button type="button" class="layui-btn" @click="submit">确认</button>
          </li>
        </ul>
      </div>
      <span class="layui-layer-setwin" @click.stop="close()">
        <a href="javascript:void(0)" class="layui-layer-ico layui-layer-close layui-layer-close1"></a>
      </span>
    </div>
  </transition>
</template>

<script>
import { uploadImg } from '@/api/content'
import config from '@/config'

export default {
  name: 'Imgupload',
  props: ['isShow'],
  data () {
    return {
      // 图片路径
      pic: ''
    }
  },
  methods: {
    // 点击叉号
    close () {
      this.$emit('closeEvent')
      // 清空输入框
      this.pic = ''
    },
    // 上传图片
    upload (e) {
      console.log('upload -> e', e)
      const file = e.target.files
      const formData = new FormData()
      if (file.length > 0) {
        formData.append('file', file[0])
      }
      // 请求上传
      uploadImg(formData).then(res => {
        if (res.code === 200) {
          const baseUrl = process.env.NODE_ENV === 'production' ? config.baseUrl.pro : config.baseUrl.dev
          this.pic = baseUrl + res.data
        }
      })
      document.getElementById('uploadImg').value = ''
    },
    // 确定按钮
    submit () {
      if (this.pic.trim() === '') {
        document.getElementById('fileInput').focus()
        this.$pop('shake', '请上传图片或者粘贴图片链接')
        return
      }
      this.$emit('addEvent', this.pic)
      // 恢复初始
      setTimeout(() => {
        this.pic = ''
        this.$emit('closeEvent')
      }, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.layui-form-item {
  text-align: center;
}
.layui-form-pane {
  margin: 20px;
}
</style>
