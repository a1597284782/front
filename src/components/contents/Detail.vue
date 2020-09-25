<template>
  <div class="layui-container">
    <imooc-panel></imooc-panel>

    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8 content detail">
        <div class="fly-panel detail-box">
          <h1>{{ page.title }}</h1>
          <div class="fly-detail-info">
            <!-- <span class="layui-badge">审核中</span> -->
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-if="page.catalog === 'logs'"
              >动态</span
            >
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-else-if="page.catalog === 'share'"
              >分享</span
            >
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-else-if="page.catalog === 'ask'"
              >提问</span
            >
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-else-if="page.catalog === 'advise'"
              >建议</span
            >
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-else-if="page.catalog === 'discuss'"
              >交流</span
            >
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-else-if="page.catalog === 'notice'"
              >公告</span
            >

            <span
              class="layui-badge"
              style="background-color: #999"
              v-if="page.isEnd === '0'"
              >未结</span
            >
            <span class="layui-badge" style="background-color: #5fb878" v-else
              >已结</span
            >

            <span class="layui-badge layui-bg-black" v-show="page.isTop === '1'"
              >置顶</span
            >
            <span
              class="layui-badge"
              :class="tag.class"
              v-for="(tag, index) in page.tags"
              :key="'tag' + index"
              >{{ tag.name }}</span
            >

            <!-- <div class="fly-admin-box" data-id="123">
              <span class="layui-btn layui-btn-xs jie-admin" type="del">删除</span>

              <span class="layui-btn layui-btn-xs jie-admin" type="set" field="stick" rank="1">置顶</span>
              <span class="layui-btn layui-btn-xs jie-admin" type="set" field="stick" rank="0" style="background-color:#ccc;">取消置顶</span>

              <span class="layui-btn layui-btn-xs jie-admin" type="set" field="status" rank="1">加精</span>
              <span class="layui-btn layui-btn-xs jie-admin" type="set" field="status" rank="0" style="background-color:#ccc;">取消加精</span>
            </div>-->
            <span class="fly-list-nums">
              <a href="#comment">
                <i class="iconfont" title="回答">&#xe60c;</i>
                {{ page.answer }}
              </a>
              <i class="iconfont" title="人气">&#xe60b;</i>
              {{ page.reads }}
            </span>
          </div>

          <!-- 收藏 -->
          <div class="detail-about">
            <a class="fly-avatar" href>
              <img :src="page.uid ? page.uid.pic : ''" />
            </a>
            <div class="fly-detail-user">
              <a href class="fly-link">
                <cite>{{ page.uid ? page.uid.name : '' }}</cite>
                <!-- <i class="iconfont icon-renzheng" title="认证信息"></i> -->
                <i
                  class="layui-badge fly-badge-vip mr1"
                  v-if="
                    page.uid && page.uid.isVip !== '0' ? page.uid.isVip : false
                  "
                  >VIP{{ page.uid.isVip }}</i
                >
              </a>
              <span>{{ page.created | moment }}</span>
            </div>
            <div class="detail-hits">
              <span style="padding-right: 10px; color: #ff7200"
                >悬赏：{{ page.fav }}</span
              >
            </div>
          </div>

          <div class="layui-btn-container fly-detail-admin pt1">
            <a href class="layui-btn layui-btn-sm jie-admin">编辑</a>
            <a href class="layui-btn layui-btn-sm jie-admin jie-admin-collect"
              >收藏</a
            >
          </div>

          <div class="detail-body photos" v-html="content"></div>
        </div>

        <!-- 回帖 -->
        <div class="fly-panel detail-box" id="flyReply">
          <fieldset
            class="layui-elem-field layui-field-title"
            style="text-align: center"
          >
            <legend>回帖</legend>
          </fieldset>

          <ul class="jieda" id="jieda">
            <li
              class="jieda-daan"
              v-for="(item, index) in comments"
              :key="'comments' + item._id"
            >
              <div class="detail-about detail-about-reply">
                <a class="fly-avatar" href>
                  <img :src="item.cuid ? item.cuid.pic : ''" />
                </a>
                <div class="fly-detail-user">
                  <a href class="fly-link">
                    <cite>{{ item.cuid ? item.cuid.name : '' }}</cite>
                    <!-- <i class="iconfont icon-renzheng" title="认证信息：XXX"></i> -->
                    <i
                      class="layui-badge fly-badge-vip"
                      v-if="
                        item.cuid && item.cuid.isVip !== '0'
                          ? item.cuid.isVip
                          : false
                      "
                      >VIP{{ item.cuid.isVip }}</i
                    >
                  </a>

                  <span v-if="index === 0">(楼主)</span>
                  <!--
                  <span style="color:#5FB878">(管理员)</span>
                  <span style="color:#FF9E3F">（社区之光）</span>
                  <span style="color:#999">（该号已被封）</span>
                  -->
                </div>

                <div class="detail-hits">
                  <span>{{ item.created | moment }}</span>
                </div>

                <i
                  class="iconfont icon-caina"
                  title="最佳答案"
                  v-show="item.isBest === '1'"
                ></i>
              </div>
              <div
                class="detail-body jieda-body photos"
                v-richtext="item.content"
              ></div>
              <div class="jieda-reply">
                <span
                  class="jieda-zan"
                  :class="{ zanok: item.handed === '1' }"
                  type="zan"
                >
                  <i class="iconfont icon-zan"></i>
                  <em>{{ item.hands }}</em>
                </span>
                <span type="reply">
                  <i class="iconfont icon-svgmoban53"></i>
                  回复
                </span>
                <div class="jieda-admin">
                  <span
                    v-show="page.isEnd === '0' && item.cuid._id === user._id"
                    @click="editComment(item)"
                    >编辑
                  </span>
                  <!-- <span type="del">删除</span> -->
                  <span
                    class="jieda-accept"
                    v-show="page.isEnd === '0' && item.cuid._id === user._id"
                    @click="setBest(item)"
                    >采纳
                  </span>
                </div>
              </div>
            </li>

            <!-- 无数据时 -->
            <li class="fly-none" v-if="comments.length === 0">消灭零回复</li>
          </ul>

          <!-- 分页 -->
          <imooc-page
            :showType="'icon'"
            :hasTotal="true"
            :hasSelect="true"
            :showEnd="true"
            :total="total"
            :size="size"
            :current="current"
            @changeCurrent="handleChange"
            @changeLimit="handleLimit"
          ></imooc-page>

          <div class="layui-form layui-form-pane">
            <form>
              <validation-observer ref="observer" v-slot="{ validate }">
                <imooc-editor
                  @changeContent="addContent"
                  :initContent="editInfo.content"
                ></imooc-editor>
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
                    提交回复
                  </button>
                </div>
              </validation-observer>
            </form>
          </div>
        </div>
      </div>
      <div class="layui-col-md4">
        <imooc-hotList></imooc-hotList>

        <imooc-ads></imooc-ads>

        <imooc-links></imooc-links>
      </div>
    </div>
  </div>
</template>

<script>
import { getDetail } from '@/api/content'
import { getComents, addComment, updateComment } from '@/api/comments'
import HotList from '@/components/sidebar/HotList'
import Ads from '@/components/sidebar/Ads'
import Links from '@/components/sidebar/Links'
import Panel from '@/components/Panel'
import Editor from '../modules/editor/Index'
import CodeMix from '@/mixin/code'
import Pagination from '@/components/modules/pagination/Index'
import { escapeHtml } from '@/utils/escapeHtml'
// 滚动动画
import { scrollToElem } from '@/utils/common'

export default {
  name: 'Detail',
  mixins: [CodeMix],
  components: {
    'imooc-hotList': HotList,
    'imooc-ads': Ads,
    'imooc-links': Links,
    'imooc-panel': Panel,
    'imooc-editor': Editor,
    'imooc-page': Pagination
  },
  // 路由中的参数
  props: ['tid'],
  data () {
    return {
      // 总条数
      total: 0,
      // 每一页显示多少条
      size: 10,
      // 当前页数
      current: 0,
      // 页面信息
      page: {},
      // 评论列表
      comments: [],
      // 添加评论
      editInfo: {
        // 回复的内容
        content: '',
        // 图片验证码
        code: '',
        // 唯一值
        sid: ''
      }
    }
  },
  mounted () {
    // window.vue = scrollToElem
    this.getPostDetail()
    this.getCommentsList()
  },
  computed: {
    // 转义 富文本内容
    content () {
      if (this.page.content == null || this.page.content.trim() === '') {
        return ''
      }
      return escapeHtml(this.page.content)
    },
    // 用户信息
    user () {
      return this.$store.state.userInfo
    }
  },
  methods: {
    // 页码发生变化
    handleChange (val) {
      this.current = val
      this.getCommentsList()
    },
    // 条数发送变化
    handleLimit (val) {
      this.size = val
      this.getCommentsList()
    },
    // 获取文章详情
    getPostDetail () {
      getDetail(this.tid).then(res => {
        console.log('getPostDetail -> res', res)
        if (res.code === 200) {
          this.page = res.data
        }
      })
    },
    // 获取评论
    getCommentsList () {
      getComents({
        tid: this.tid,
        page: this.current,
        limit: this.size
      }).then(res => {
        console.log('getComents -> res', res)
        if (res.code === 200) {
          this.comments = res.data
          this.total = res.total
        }
      })
    },
    // 监听 文本框 数据变化
    addContent (val) {
      this.editInfo.content = val
    },
    // 提交评论
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }

      const isLogin = this.$store.state.isLogin
      // 用户登录
      if (!isLogin) {
        this.$pop('shake', '请先登录')
        return
      }

      // 用户是否禁用
      const user = this.$store.state.userInfo
      if (user.status !== '0') {
        this.$pop('shake', '已被禁言，请联系管理员')
        return
      }

      // 请求
      this.editInfo.code = this.code
      this.editInfo.tid = this.tid
      this.editInfo.sid = this.$store.state.sid

      // 添加评论成功并没有返回用户信息，则需将 $store 中的用户信息添加到 评论列表中
      const cuid = {
        _id: user._id,
        pic: user.pic,
        isVip: user.isVip,
        name: user.name
      }

      // 编辑评论
      console.log('submit -> this.editInfo.cid', this.editInfo.cid)
      if (this.editInfo.cid != null && this.editInfo.cid !== '') {
        const obj = { ...this.editInfo }
        delete obj.item
        // 判断内容是否相同
        if (this.editInfo.content.trim() === this.editInfo.item.content.trim()) {
          this.$pop('shake', '请编辑内容~~')
          return
        }
        // 更新评论
        updateComment(obj).then(res => {
          if (res.code === 200) {
            const temp = this.editInfo.item
            temp.content = this.editInfo.content
            this.$pop('', '更新评论成功')
            // 清空输入框
            this.code = ''
            this.editInfo.content = ''
            // 方法一： 只更新指定的一条 content created。需要 $set
            // 方法二： 更新整个数组中的这一条
            this.comments.splice(this.comments.indexOf(this.editInfo.item), 1, temp)

            // 清空表单验证
            requestAnimationFrame(() => {
              this.$refs.observer && this.$refs.observer.reset()
            })
            // 重新获取图片验证码
            this._getCode()
          } else {
            this.$alert(res.msg)
          }
        })
        return
      }

      // 添加评论
      addComment(this.editInfo).then(res => {
        if (res.code === 200) {
          this.$pop('', '发表评论成功')

          // 清空输入框
          this.code = ''
          this.editInfo.content = ''

          res.data.cuid = cuid

          // 将新的评论添加到评论列表
          this.comments.push(res.data)

          // 清空表单验证
          requestAnimationFrame(() => {
            this.$refs.observer && this.$refs.observer.reset()
          })
          // 重新获取图片验证码
          this._getCode()
        } else {
          this.$alert(res.msg)
        }
      })
    },

    // 编辑评论
    editComment (item) {
      this.editInfo.content = item.content
      // 动态滚动
      scrollToElem('.layui-input-block', 500, -65)
      document.querySelector('#edit').focus()
      // 确定需要编辑的记录
      this.editInfo.cid = item._id
      this.editInfo.item = item
    },

    // 采纳
    setBest (item) {
      this.$confirm('确定采纳为最佳答案吗？', () => {
        // 确定
        console.log('setBest -> item', item._id)
      }, () => { })
    }

  }
}
</script>

<style lang="scss" scoped>
.fly-detail-admin {
  text-align: right;
  border-top: 1px dotted #eaeaea;
  background: #f8f8f8;
}
.fly-detail-info {
  span {
    margin-right: 5px;
  }
}
.jieda-body {
  margin: 25px 0 20px !important;
}
</style>
