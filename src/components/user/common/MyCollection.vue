<template>
  <!-- 我收藏的帖 -->
  <div>
    <table class="layui-table">
      <thead>
        <tr>
          <th class="title">
            <div class="layui-table-cell pl0">
              <span>帖子标题</span>
            </div>
          </th>
          <th>
            <div class="layui-table-cell text-right pr0">
              <span>收藏时间</span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list" :key="'mycollection' + item._id">
          <td>
            <router-link
              class="link"
              :to="{ name: 'detail', params: { tid: item.tid } }"
              >{{ item.title }}
            </router-link>
          </td>
          <td>{{ item.created | moment }}</td>
        </tr>
      </tbody>
    </table>

    <imooc-page
      v-show="total > 1"
      :total="total"
      :current="current"
      :align="'left'"
      :hasTotal="true"
      :hasSelect="true"
      @changeCurrent="handleChange"
      @changeLimit="handleLimit"
    ></imooc-page>
  </div>
</template>

<script>
import { getCollect } from '@/api/user'
import Pagination from '@/components/modules/pagination/Index'

export default {
  name: 'my-collection',
  components: {
    'imooc-page': Pagination
  },
  data () {
    return {
      // 信息
      list: [],
      // 每页多少条
      limit: 10,
      // 总条数
      total: 0,
      // 当前页数
      current: 0
    }
  },
  mounted () {
    this.getCollectList()
  },
  methods: {
    // 获取列表
    getCollectList  () {
      getCollect({
        page: this.current,
        limit: this.limit
      }).then(res => {
        if (res.code === 200) {
          this.list = res.data
          this.total = res.total
        }
      })
    },
    // 页码发生变化
    handleChange (val) {
      this.current = val
      this.getCollectList()
    },
    // 条数发送变化
    handleLimit (val) {
      this.limit = val
      this.getCollectList()
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  width: 70%;
}
</style>
