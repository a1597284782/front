<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel" pad20 style="padding-top: 5px">
      <!--<div class="fly-none">没有权限</div>-->
      <div class="layui-form layui-form-pane">
        <div class="layui-tab layui-tab-brief" lay-filter="user">
          <ul class="layui-tab-title">
            <li class="layui-this">
              发表新帖
              <!-- 编辑帖子 -->
            </li>
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
                      <validation-provider
                        name="catalog"
                        rules="is_not:请选择"
                        v-slot="{ errors }"
                      >
                        <div class="layui-row">
                          <label class="layui-form-label">所在专栏</label>
                          <div
                            class="layui-input-block"
                            @click="changeSelect()"
                          >
                            <div
                              class="layui-unselect layui-form-select"
                              :class="{ 'layui-form-selected': isSelect }"
                            >
                              <div class="layui-select-title">
                                <input
                                  type="text"
                                  placeholder="请选择"
                                  readonly
                                  v-model="catalogs[cataIndex].text"
                                  class="layui-input layui-unselect"
                                />
                                <i class="layui-edge"></i>
                              </div>
                              <dl class="layui-anim layui-anim-upbit">
                                <dd
                                  v-for="(item, index) in catalogs"
                                  :key="'catalog' + index"
                                  :class="{ 'layui-this': index === cataIndex }"
                                  @click="chooseCatalog(item, index)"
                                >
                                  {{ item.text }}
                                </dd>
                              </dl>
                            </div>
                          </div>
                        </div>
                        <div class="layui-row">
                          <span style="color: #c00">{{ errors[0] }}</span>
                        </div>
                      </validation-provider>
                    </div>

                    <div class="layui-col-md9">
                      <validation-provider
                        rules="required"
                        v-slot="{ errors }"
                        name="title"
                      >
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
                        <div class="layui-row">
                          <span style="color: #c00">{{ errors[0] }}</span>
                        </div>
                      </validation-provider>
                    </div>
                  </div>

                  <editor @changeContent="add" :initContent="content"></editor>

                  <div class="layui-form-item">
                    <div class="layui-inline">
                      <label class="layui-form-label">悬赏飞吻</label>
                      <div class="layui-input-inline" style="width: 190px">
                        <div
                          class="layui-unselect layui-form-select"
                          :class="{ 'layui-form-selected': isSelect_fav }"
                          @click="changeFav()"
                        >
                          <div class="layui-select-title">
                            <input
                              type="text"
                              placeholder="请选择"
                              readonly
                              v-model="favList[favIndex]"
                              class="layui-input layui-unselect"
                            />
                            <i class="layui-edge"></i>
                          </div>
                          <dl class="layui-anim layui-anim-upbit">
                            <dd
                              v-for="(item, index) in favList"
                              :key="'favList' + index"
                              :class="{ 'layui-this': index === favIndex }"
                              @click="chooseFav(item, index)"
                            >
                              {{ item }}
                            </dd>
                          </dl>
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
import { addPost } from '@/api/content'

export default {
  name: 'add',
  mixins: [CodeMix],
  components: {
    Editor
  },
  data () {
    return {
      // 选择框默认状态
      isSelect: false,
      isSelect_fav: false,
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
    const saveData = localStorage.getItem('addData')
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
        localStorage.setItem('addData', '')
      })
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
        localStorage.setItem('addData', JSON.stringify(saveData))
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
      addPost({
        title: this.title,
        catalog: this.catalogs[this.cataIndex].value,
        content: this.content,
        fav: this.favList[this.favIndex],
        code: this.code,
        sid: this.$store.state.sid
      }).then(res => {
        if (res.code === 200) {
          localStorage.setItem('addData', '')
          this.$pop('', res.msg + '2秒后跳转')
          setTimeout(() => {
            this.$router.push({ name: 'detail', params: { tid: res.data._id } })
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
