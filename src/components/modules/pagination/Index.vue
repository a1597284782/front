<template>
  <div
    class="d-flex"
    :class="{
      'flex-center': align === 'center',
      'flex-start': align === 'left',
      'flex-end': align === 'right',
    }"
  >
    <div class="layui-box layui-laypage layui-laypage-default">
      <a
        href="javascript:;"
        class="layui-laypage-prev"
        v-show="showEnd"
        :class="{ 'layui-disabled': current === 0 }"
        @click.prevent="home()"
      >
        <i class="layui-icon layui-icon-prev" v-if="showType === 'icon'"></i>
        <template v-else>首页</template>
      </a>

      <a
        href="javascript:;"
        :class="{ 'layui-disabled': current === 0 }"
        @click.prevent="prev()"
      >
        <i class="layui-icon layui-icon-left" v-if="showType === 'icon'"></i>
        <template v-else>上一页</template>
      </a>

      <!-- current + 2 < pages.length 显示 。。。 -->
      <!-- current - 2 > 1 显示 。。。 -->
      <a
        v-if="pages.length > 5 && current + 1 - 2 > 1"
        href="javascript:;"
        class="layui-disabled"
        >...</a
      >
      <template v-for="(item, index) in pages">
        <a
          @click.prevent="changeIndex(index)"
          v-if="item >= current + 1 - 2 && item <= current + 1 + 2"
          href="javascript:;"
          :key="'page' + index"
          :class="[
            current === index ? theme : '',
            current === index ? 'active' : '',
          ]"
          >{{ item }}</a
        >
      </template>
      <a
        v-if="pages.length > 5 && current + 1 + 2 < pages.length"
        href="javascript:;"
        class="layui-disabled"
        >...</a
      >

      <a
        href="javascript:;"
        :class="{ 'layui-disabled': current === pages.length - 1 }"
        @click.prevent="next()"
      >
        <i class="layui-icon layui-icon-right" v-if="showType === 'icon'"></i>
        <template v-else>下一页</template>
      </a>

      <a
        href="javascript:;"
        class="layui-laypage-next"
        v-show="showEnd"
        :class="{ 'layui-disabled': current === pages.length - 1 }"
        @click.prevent="end()"
      >
        <i class="layui-icon layui-icon-next" v-if="showType === 'icon'"></i>
        <template v-else>尾页</template>
      </a>
    </div>

    <!-- 页码跳转 -->
    <div class="total" v-if="hasTotal">
      到第
      <input type="text" class="imooc-input" @keyup.enter="jumpTo" />
      页 共 {{ totalPages }} 页
    </div>

    <!-- 条数下拉 -->
    <div v-if="hasSelect">
      <div
        class="layui-unselect layui-form-select"
        :class="{ 'layui-form-selected': isSelect }"
        @click="changeFav()"
      >
        <div class="layui-select-title">
          <input
            type="text"
            placeholder="请选择"
            readonly
            v-model="options[optIndex]"
            class="layui-input layui-unselect"
          />
          <i class="layui-edge"></i>
        </div>
        <dl class="layui-anim layui-anim-upbit">
          <dd
            v-for="(item, index) in options"
            :key="'options' + index"
            :class="{ 'layui-this': index === optIndex }"
            @click="chooseFav(item, index)"
          >
            {{ item }}
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'page',
  props: {
    // 对齐方式
    align: {
      type: String,
      default: 'center'
    },
    // 文字形式显示 还是 图标形式
    showType: {
      type: String,
      default: 'icon'
    },
    // 是否显示 首页、尾页按钮
    showEnd: {
      type: Boolean,
      default: false
    },
    // 主题颜色
    theme: {
      type: String,
      default: 'layui-bg-green'
    },
    // 控制跳转页数
    hasTotal: {
      type: Boolean,
      default: false
    },
    // 控制显示条数
    hasSelect: {
      type: Boolean,
      default: false
    },
    // 总条数
    total: {
      type: Number,
      default: 0
    },
    // 当前页数
    current: {
      type: Number,
      default: 0
    },
    // 每一页显示多少条
    size: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      // 下拉框
      isSelect: false,
      optIndex: 0,
      options: [10, 20, 30, 50, 100],

      // 页码
      pages: [],
      // 默认显示的条数
      limit: 10
    }
  },
  watch: {
    // 监听总页数
    total (newval, oldval) {
      this.initPages()
    }
  },
  computed: {
    //  总页数
    totalPages () {
      return Math.ceil(this.total / this.limit)
    }
  },
  mounted () {
    // 初始化分页的长度
    // 设置 select 的内容
    this.limit = this.size
    this.initPages()
    this.options = _.uniq(_.sortBy(_.concat(this.options, this.size)))
    this.optIndex = this.options.indexOf(this.size)
  },
  methods: {
    initPages () {
      // 页数
      const len = this.totalPages
      // 生成 对应页码的数组
      this.pages = _.range(1, len + 1)
      console.log('initPages -> this.pages', this.pages)
    },
    // 显示隐藏下拉
    changeFav () {
      this.isSelect = !this.isSelect
    },
    // 选择下拉项
    chooseFav (item, index) {
      if (this.optIndex !== index) {
        // 当页码 limit 发生变化时，需要调整 current
        this.$emit('changeCurrent', Math.floor(this.limit * this.current / this.options[index]))
        this.$emit('changeLimit', this.options[index])
      }
      this.optIndex = index
      this.limit = this.options[this.optIndex]
      this.initPages()
    },
    // 点击首页
    home () {
      this.$emit('changeCurrent', 0)
    },
    // 点击尾页
    end () {
      this.$emit('changeCurrent', this.pages.length - 1)
    },
    // 点击上一页
    prev () {
      if (this.current - 1 < 0) {
        return
      }
      this.$emit('changeCurrent', this.current - 1)
    },
    // 点击下一页
    next () {
      if (this.current + 1 > this.pages.length - 1) {
        return
      }
      this.$emit('changeCurrent', this.current + 1)
    },
    // 点击页码
    changeIndex (val) {
      if (val === this.current) return
      this.$emit('changeCurrent', val)
    },
    // 按下回车，跳转到指定页码
    jumpTo (event) {
      const result = parseInt(event.target.value)
      let cur = this.current
      console.log('jumpTo -> event', event, typeof result)
      // 判断输入的页码是否合法
      if (result > this.totalPages || result <= 0 || isNaN(result)) {
        this.$pop('shake', '请输入正确的页码')
        return
      }
      cur = result - 1
      if (cur !== this.current) {
        this.$emit('changeCurrent', cur)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.layui-laypage {
  a {
    margin-left: -1px;
    &.active {
      border-radius: 2px;
      position: relative;
      z-index: 100;
    }
  }
  .layui-bg-green {
    border-color: #009688;
  }
}

.total {
  color: rgba(51, 51, 51, 1);
  margin-left: 20px;
  position: relative;
  top: -3px;
}
.imooc-input {
  width: 30px;
  padding: 0 5px;
  height: 28px;
  line-height: 28px;
  border: 1px solid #e2e2e2;
}

.layui-input {
  height: 30px;
  line-height: 30px;
}

.layui-form-select {
  width: 80px;
  position: relative;
  top: -3px;
  margin-left: 10px;
}

// .number-input {
//   -moz-appearance: textfield;

//   &::-webkit-outer-spin-button,
//   &::-webkit-inner-spin-button {
//     -webkit-appearance: none;
//   }
// }
</style>
