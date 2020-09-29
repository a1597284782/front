<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel" pad20 style="padding-top: 5px">
      <!--<div class="fly-none">没有权限</div>-->
      <div class="layui-form layui-form-pane">
        <div class="layui-tab layui-tab-brief" lay-filter="user">
          <ul class="layui-tab-title">
            <li class="layui-this">编辑帖子</li>
          </ul>
          <div
            class="layui-form layui-tab-content"
            id="LAY_ucm"
            style="padding: 20px 0"
          >
            <div class="layui-tab-item layui-show">
              <form>
                <validation-observer ref="observer" v-slot="{ validate }">
                  <div class="layui-row layui-col-space15 layui-form-item">
                    <div class="layui-col-md3">
                      <div class="layui-row">
                        <label class="layui-form-label">所在专栏</label>
                        <div class="layui-input-block">
                          <div class="layui-unselect layui-form-select">
                            <div class="layui-select-title">
                              <input
                                type="text"
                                placeholder="请选择"
                                readonly
                                v-model="catalogs[cataIndex].text"
                                class="layui-input layui-unselect layui-disabled"
                              />
                              <i class="layui-edge"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="layui-col-md9">
                      <div class="layui-row">
                        <label for="L_title" class="layui-form-label"
                          >标题</label
                        >
                        <div class="layui-input-block">
                          <input
                            type="text"
                            v-model="title"
                            autocomplete="off"
                            class="layui-input"
                          />
                          <!-- <input type="hidden" name="id" value="{{d.edit.id}}"> -->
                        </div>
                      </div>
                    </div>
                  </div>

                  <editor @changeContent="add" :initContent="content"></editor>

                  <div class="layui-form-item">
                    <div class="layui-inline">
                      <label class="layui-form-label">悬赏飞吻</label>
                      <div class="layui-input-inline" style="width: 190px">
                        <div class="layui-unselect layui-form-select">
                          <div class="layui-select-title">
                            <input
                              type="text"
                              placeholder="请选择"
                              readonly
                              v-model="favList[favIndex]"
                              class="layui-input layui-unselect layui-disabled"
                            />
                            <i class="layui-edge"></i>
                          </div>
                        </div>
                      </div>
                      <div class="layui-form-mid layui-word-aux">
                        发表后无法更改飞吻
                      </div>
                    </div>
                  </div>

                  <div class="layui-form-item">
                    <validation-provider
                      rules="required|length:4"
                      v-slot="{ errors }"
                      name="code"
                      ref="codefield"
                    >
                      <div class="layui-row">
                        <label for="L_vercode" class="layui-form-label"
                          >验证码</label
                        >
                        <div class="layui-input-inline">
                          <input
                            type="text"
                            name="code"
                            v-model="code"
                            placeholder="请输入验证码"
                            autocomplete="off"
                            class="layui-input"
                          />
                        </div>
                        <div class>
                          <span
                            class="svg"
                            style="color: #c00"
                            v-html="svg"
                            @click="_getCode"
                          ></span>
                        </div>
                      </div>
                      <div class="layui-form-mid">
                        <span style="color: #c00">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <button
                      class="layui-btn"
                      type="button"
                      @click="validate().then(submit)"
                    >
                      立即发布
                    </button>
                  </div>
                </validation-observer>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Editor from '../modules/editor/Index'
import CodeMix from '@/mixin/code'
import { updatePost } from '@/api/content'

export default {
  name: 'edit',
  mixins: [CodeMix],
  // page 页面信息
  props: ['tid', 'page'],
  components: {
    Editor
  },
  data () {
    return {
      // 默认激活状态
      cataIndex: 0,
      favIndex: 0,
      // 分类
      catalogs: [
        {
          text: '请选择',
          value: ''
        },
        {
          text: '提问',
          value: 'ask'
        },
        {
          text: '分享',
          value: 'share'
        },
        {
          text: '讨论',
          value: 'discuss'
        },
        {
          text: '建议',
          value: 'advise'
        }
      ],
      // 积分列表
      favList: [20, 30, 50, 60, 80],
      // 验证码
      code: '',
      svg: '',
      // 编辑器内容
      content: '',
      // 文章标题
      title: ''
    }
  },
  mounted () {
    if (this.page) {
      this.content = this.page.content
      this.title = this.page.title
      this.favIndex = this.favList.indexOf(parseInt(this.page.fav))
      this.cataIndex = this.catalogs.indexOf(this.catalogs.filter(item => item.value === this.page.catalog)[0])
      // 缓存内容
      localStorage.setItem('editData', JSON.stringify(this.page))
    } else {
      // 页面无信息内容， 可能用户刷新了页面，可以取缓存内容
      const saveData = localStorage.getItem('editData')
      if (saveData && saveData !== '') {
        this.$confirm('是否加载未编辑完的内容？', () => {
          // 点击 是
          const obj = JSON.parse(saveData)
          this.content = obj.content
          this.title = obj.title
          this.cataIndex = obj.cataIndex
          this.favIndex = obj.favIndex
        }, () => {
          // 点击 否
          localStorage.setItem('editData', '')
        })
      }
    }
  },
  methods: {
    // 选择所在专栏
    chooseCatalog (item, index) {
      this.cataIndex = index
    },
    // 点击所在专栏
    changeSelect () {
      this.isSelect = !this.isSelect
    },
    // 选择悬赏飞吻
    chooseFav (item, index) {
      this.favIndex = index
    },
    // 点击悬赏飞吻
    changeFav () {
      this.isSelect_fav = !this.isSelect_fav
    },
    // 监听 文本框 数据变化
    add (val) {
      // 保村文本框 数据
      this.content = val

      // 将整个表单保存到 localStorage 中
      const saveData = {
        title: this.title,
        cataIndex: this.cataIndex,
        content: this.content,
        favIndex: this.favIndex
      }
      if (this.title.trim() !== '' && this.content.trim() !== '') {
        const editData = localStorage.getItem('editData')
        let newObj = { ...saveData }
        if (editData && editData !== '') {
          newObj = { ...JSON.parse(editData), ...newObj }
        }
        localStorage.setItem('editData', JSON.stringify(newObj))
      }
    },
    // 提交发布
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }

      if (this.content.trim() === '') {
        this.$alert('文章内容不得为空')
        return
      }
      // 添加新的文章
      updatePost({
        tid: this.tid,
        title: this.title,
        content: this.content,
        code: this.code,
        sid: this.$store.state.sid
      }).then(res => {
        console.log('submit -> res', res)
        if (res.code === 200) {
          localStorage.setItem('editData', '')
          this.$pop('', res.msg + '2秒后跳转')
          setTimeout(() => {
            this.$router.push({ name: 'detail', params: { tid: this.tid } })
          }, 2000)
        } else {
          this.$alert(res.msg)
        }
      })
    }

  }
}
</script>

<style lang="scss" scoped>
</style>
