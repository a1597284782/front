<template>
  <div class="fly-panel" v-show="lists.length > 0">
    <div class="fly-panel-title fly-filter">
      <a>置顶</a>
      <a
        href="#signin"
        class="layui-hide-sm layui-show-xs-block fly-right"
        id="LAY_goSignin"
        style="color: #ff5722;"
      >去签到</a>
    </div>
    <list-item :lists="lists" :isShow="false"></list-item>
  </div>
</template>

<script>
import ListItem from './ListItem'
import { getList } from '@/api/content'

export default {
  name: 'top',
  components: {
    ListItem
  },
  data () {
    return {
      // 当前页码
      page: 0,
      // 一页多少条数据
      limit: 5,
      // 数据列表
      lists: []
    }
  },
  mounted () {
    this._getList()
  },
  methods: {
    // 获取数据列表
    _getList () {
      this.isRepeat = true
      const options = {
        catalog: this.catalog,
        isTop: 1,
        sort: 1,
        page: this.page,
        limit: this.limit
      }
      getList(options).then(res => {
        if (res.code === 200) {
          this.lists = res.data.slice(0, 5)
        }
      }).catch((err) => {
        if (err) {
          console.log('_getList -> err', err)
          this.$alert(err.message)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
