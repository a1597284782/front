 <template>
  <div class="fly-panel" style="margin-bottom: 0;">
    <div class="fly-panel-title fly-filter">
      <a :class="{ 'layui-this': status === '' && tag === '' }" @click.prevent="search()">综合</a>
      <span class="fly-mid"></span>
      <a :class="{ 'layui-this': status === '0' }" @click.prevent="search(0)">未结</a>
      <span class="fly-mid"></span>
      <a :class="{ 'layui-this': status === '1' }" @click.prevent="search(1)">已结</a>
      <span class="fly-mid"></span>
      <a :class="{ 'layui-this': status === '' && tag === '精华' }" @click.prevent="search(2)">精华</a>
      <span class="fly-filter-right layui-hide-xs">
        <a :class="{ 'layui-this': sort === 'created' }" @click.prevent="search(3)">按最新</a>
        <span class="fly-mid"></span>
        <a :class="{ 'layui-this': sort === 'answer' }" @click.prevent="search(4)">按热议</a>
      </span>
    </div>
    <list-item :lists="lists" :isEnd="isEnd" @nextpage="nextPage()"></list-item>
  </div>
</template>

<script>
import { getList } from '@/api/content'
import ListItem from './ListItem'

export default {
  name: 'list',
  components: {
    ListItem
  },
  data () {
    return {
      // 是否到最后一页了
      isEnd: false,
      // 请求状态量
      isRepeat: false,
      // 点击分类状态
      current: '',
      // 未结，已结
      status: '',
      // 标签，如：精华
      tag: '',
      // 按最新 或 按热议 排序
      sort: '',
      // 当前页码
      page: 0,
      // 一页多少条数据
      limit: 20,
      // 具体分类
      catalog: '',
      // 数据列表
      lists: []
    }
  },
  watch: {
    // 监听 点击分类状态
    current (newval, oldval) {
      console.log('current:' + oldval + ',' + newval)

      this.init()
    },
    '$route' (newval, oldval) {
      const catalog = this.$route.params.catalog
      console.log('mounted -> catalog', catalog)
      if (typeof catalog !== 'undefined' && catalog !== '') {
        this.catalog = catalog
      }
      this.init()
    }
  },
  mounted () {
    const catalog = this.$route.params.catalog
    console.log('mounted -> catalog2', catalog)
    if (typeof catalog !== 'undefined' && catalog !== '') {
      this.catalog = catalog
    }
    this._getList()
  },
  methods: {
    // 初始化 且重新请求
    init () {
      this.page = 0
      this.lists = []
      this.isEnd = false
      this._getList()
    },
    // 获取数据列表
    _getList () {
      // 阻止重复请求
      // if (this.isRepeat) return
      // 判断是否为最后一页
      if (this.isEnd) return

      this.isRepeat = true
      const options = {
        catalog: this.catalog,
        isTop: 0,
        page: this.page,
        limit: this.limit,
        sort: this.sort,
        tag: this.tag,
        status: this.status
      }
      getList(options).then(res => {
        // console.log('_getList -> res', res)
        // 请求锁，防止用户多次点击，等待数据返回再打开
        // this.isRepeat = false

        if (res.code === 200) {
          // 如果 data 的数据小于 limit，则是最后一页了
          if (res.data.length < this.limit) {
            this.isEnd = true
          }

          // 判断 lists 长度为 0, 直接赋值；否则 合并 lists 列表
          if (this.lists.length === 0) {
            this.lists = res.data
          } else {
            this.lists = this.lists.concat(res.data)
          }
        }
      }).catch((err) => {
        // this.isRepeat = false
        if (err) {
          console.log('_getList -> err', err)
          this.$alert(err.message)
        }
      })
    },
    nextPage () {
      this.page++
      this._getList()
    },
    // 点击分类
    search (val) {
      if (typeof val === 'undefined' && this.current === '') {
        return
      }
      this.current = val
      console.log('search -> val', val)

      switch (val) {
        // 未结
        case 0:
          this.status = '0'
          this.tag = ''
          break
        // 已结
        case 1:
          this.status = '1'
          this.tag = ''
          break
        // 精华
        case 2:
          this.status = ''
          this.tag = '精华'
          break
        // 按最新
        case 3:
          this.sort = 'created'
          break
        // 按热议
        case 4:
          this.sort = 'answer'
          break
        // 综合
        default:
          this.status = ''
          this.tag = ''
          this.current = ''
      }
    }
  }
}
</script>

 <style lang="scss" scoped>
a {
  cursor: pointer;
}
</style>
