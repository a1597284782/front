<template>
  <div class="edit-wrap">
    <div class="layui-form-item layui-form-text">
      <div class="layui-input-block">
        <div class="layui-unselect fly-edit" ref="icons">
          <!-- 表情 -->
          <span @click="choose(0)">
            <i class="layui-icon layui-icon-face-smile"></i>
          </span>
          <!-- 图片 -->
          <span @click="choose(1)">
            <i class="layui-icon layui-icon-picture"></i>
          </span>
          <!-- 链接 -->
          <span @click="choose(2)">
            <i class="layui-icon layui-icon-link"></i>
          </span>
          <!-- 引用 -->
          <span class="quote" @click="choose(3)">“</span>
          <!-- 代码 -->
          <span @click="choose(4)">
            <i class="layui-icon layui-icon-fonts-code"></i>
          </span>
          <!-- 水平线 -->
          <span @click="addHr">hr</span>
          <!-- 预览 -->
          <span @click="choose(6)">
            <i class="layui-icon layui-icon-screen-full"></i>
          </span>
        </div>
        <textarea
          id="edit"
          class="layui-textarea fly-editor"
          name="content"
          ref="textEdit"
          v-model="content"
          @focus="focusEvent()"
          @blur="blurEvent()"
        ></textarea>
      </div>
    </div>

    <div ref="modal">
      <!-- 表情组件 -->
      <face
        :isShow="current === 0"
        @closeEvent="closeModal"
        @addEvent="addFace"
      ></face>

      <!-- 上传图片组件 -->
      <img-upload
        :isShow="current === 1"
        @closeEvent="closeModal"
        @addEvent="addPic"
      ></img-upload>

      <!-- 插入链接 -->
      <link-add
        :isShow="current === 2"
        @closeEvent="closeModal"
        @addEvent="addLink"
      ></link-add>

      <!-- 插入引用 -->
      <quote
        :isShow="current === 3"
        @closeEvent="closeModal"
        @addEvent="addQuote"
      ></quote>

      <!-- 插入代码 -->
      <code-input
        :isShow="current === 4"
        :width="codeWidth"
        :height="codeHeight"
        @closeEvent="closeModal"
        @addEvent="addCode"
      ></code-input>

      <!-- 预览 -->
      <preview
        :isShow="current === 6"
        :content="content"
        @closeEvent="closeModal()"
      ></preview>
    </div>
  </div>
</template>

<script>
// 表情
import Face from './Face'
// 插入图片
import ImgUpload from './ImgUpload'
// 插入链接
import LinkAdd from './LinkAdd'
// 插入代码
import CodeInput from './Code'
// 插入引用
import Quote from './Quote'
// 预览
import Preview from './Preview'

export default {
  name: 'Editor',
  props: ['initContent'],
  components: {
    Face,
    ImgUpload,
    LinkAdd,
    CodeInput,
    Quote,
    Preview
  },
  data () {
    return {
      // 控制组件显示隐藏
      current: '',
      codeWidth: 400,
      codeHeight: 200,
      // 内容
      content: '',
      // 光标默认的位置
      pos: ''
    }
  },
  watch: {
    // 监听文本框内容变化
    initContent (newval, oldval) {
      this.content = newval
    }
  },
  mounted () {
    // 点击 表情框以外的区域
    this.$nextTick(() => {
      document.querySelector('body').addEventListener('click', this.handleBodyClick)
    })
    // 监听窗口大小发生变化
    this.codeWidth = this.$refs.textEdit.offsetWidth - 60
    this.codeHeight = this.$refs.textEdit.offsetHeight - 80
    window.addEventListener('resize', this.watchResize)
  },
  // 监听 文本框 数据变化
  updated () {
    this.$emit('changeContent', this.content)
  },
  // 销毁监听
  beforeDestroy () {
    document.querySelector('body').removeEventListener('click', this.handleBodyClick)
    window.removeEventListener('resize', this.watchResize)
  },
  methods: {
    // 监听窗口大小发生变化
    watchResize () {
      this.codeWidth = this.$refs.textEdit.offsetWidth - 60
      this.codeHeight = this.$refs.textEdit.offsetHeight - 80
    },
    // 关闭组件框
    closeModal () {
      this.current = ''
    },
    // 点击 icons 图标
    choose (index) {
      if (index === this.current) {
        this.closeModal()
      } else {
        this.current = index
      }
    },
    // 触发隐藏组件的关闭事件，改变 isShow 状态
    handleBodyClick (e) {
      e.stopPropagation()

      // 判断是否点击到了非控制ICON以外 + 本组件 的地方
      // contains 方法可以判断 dom 结构的包含关系
      if (!(this.$refs.icons.contains(e.target) || this.$refs.modal.contains(e.target))) {
        this.closeModal()
      }
    },
    // 文本框聚焦时
    focusEvent () {
      this.getPos()
    },
    // 文本框失去焦点时
    blurEvent () {
      this.getPos()
    },
    // 保存最新的光标位置
    getPos () {
      let cursorPos = 0
      const elem = document.getElementById('edit')
      if (document.selection) {
        // IE 获取光标的位置
        const selectRange = document.selection.createRange()
        selectRange.moveStart('character', -elem.value.length)
        cursorPos = selectRange.text.length
        console.log('getPos -> cursorPos1', cursorPos)
      } else if (elem.selectionStart || elem.selectionStart === '0') {
        // 其他浏览器
        cursorPos = elem.selectionStart
        console.log('getPos -> cursorPos2', cursorPos)
      }
      this.pos = cursorPos
    },
    // 添加表情
    addFace (item) {
      console.log('addFace -> item', item)
      const inserContent = ` face${item}`
      this.insert(inserContent)
      this.pos += inserContent.length
    },
    // 插入图片
    addPic (item) {
      const inserContent = ` img[${item}]`
      this.insert(inserContent)
      this.pos += inserContent.length
    },
    // 插入链接
    addLink (item) {
      const inserContent = ` a(${item})[${item}]`
      this.insert(inserContent)
      this.pos += inserContent.length
    },
    // 插入代码
    addCode (item) {
      const inserContent = ` \n[pre]\n${item}\n[/pre]`
      this.insert(inserContent)
      this.pos += inserContent.length
    },
    // 插入引用
    addQuote (item) {
      const inserContent = ` \n[quote]\n${item}\n[/quote]`
      this.insert(inserContent)
      this.pos += inserContent.length
    },
    // 插入 hr
    addHr () {
      this.insert('\n[hr]')
      this.pos += 5
    },
    // 插入
    insert (val) {
      if (typeof this.content === 'undefined') {
        return
      }
      const tmp = this.content.split('')
      tmp.splice(this.pos, 0, val)
      this.content = tmp.join('')
    }

  }
}
</script>

<style lang="scss">
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
  z-index: 1;
  background-color: #fff;
}
.layui-layer-page {
  box-shadow: 0 0 20px rgba($color: #000000, $alpha: 0.2);
}
</style>
