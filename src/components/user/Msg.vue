<template>
  <div class="fly-panel fly-panel-user" pad20>
    <div
      class="layui-tab layui-tab-brief"
      lay-filter="user"
      id="LAY_msg"
      style="margin-top: 15px"
    >
      <button
        class="layui-btn layui-btn-danger"
        id="LAY_delallmsg"
        @click="clearAll"
      >
        清空全部消息
      </button>
      <div id="LAY_minemsg" style="margin-top: 10px">
        <!--<div class="fly-none">您暂时没有最新消息</div>-->
        <ul class="mine-msg">
          <li v-for="(item, index) in lists" :key="'comments' + index">
            <blockquote class="layui-elem-quote">
              <a href="/jump?username=Absolutely" target="_blank">
                <cite>{{ item.cuid.name }}</cite>
              </a>
              回答了您的求解
              <a
                target="_blank"
                href="/jie/8153.html/page/0/#item-1489505778669"
              >
                <cite>{{ item.title }}</cite>
              </a>
            </blockquote>
            <div v-richtext="item.content"></div>
            <p>
              <span>{{ item.created | moment }}</span>
              <a
                class="layui-btn layui-btn-small layui-btn-danger fly-delete"
                @click.stop="clear(item)"
                >删除
              </a>
            </p>
          </li>
        </ul>

        <!-- 分页 -->
        <imooc-page
          v-show="total > 0"
          :total="total"
          :current="page"
          :align="'left'"
          :hasTotal="true"
          :hasSelect="true"
          @changeCurrent="handleChange"
          @changeLimit="handleLimit"
        ></imooc-page>
      </div>
    </div>
  </div>
</template>

<script>
import { getMsg, setMsg } from '@/api/user'
import Pagination from '@/components/modules/pagination/Index'
import { mapState } from 'vuex'

export default {
  name: 'user-msg',
  components: {
    'imooc-page': Pagination
  },
  data () {
    return {
      // 消息数据
      lists: [],
      // 页码
      page: 0,
      // 每页条数
      limit: 10,
      // 总数
      total: 0,
      ws: {}
    }
  },
  mounted () {
    this.getMsgAll()
  },
  computed: {
    ...mapState({
      // 总条数
      num: state => state.num.message ? state.num.message : 0
    })
  },
  methods: {

    // 获取历史消息
    getMsgAll () {
      getMsg({
        page: this.page,
        limit: this.limit
      }).then(res => {
        if (res.code === 200) {
          this.lists = res.data
          this.total = res.total
        }
      })
    },
    // 页码发生变化
    handleChange (val) {
      this.page = val
      this.getMsgAll()
    },
    // 条数发送变化
    handleLimit (val) {
      this.limit = val
      this.getMsgAll()
    },

    // 清空消息
    clearAll () {
      setMsg().then(res => {
        if (res.code === 200) {
          this.lists = []
          this.$store.commit('setMessage', { message: 0 })
          this.total = 0
        }
      })
    },
    // 删除一条
    clear (item) {
      setMsg({ id: item._id }).then(res => {
        if (res.code === 200) {
          // 删除一条
          this.getMsgAll()
          this.$store.commit('setMessage', { message: this.num - 1 })
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
