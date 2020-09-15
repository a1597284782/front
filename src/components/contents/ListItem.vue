<template>
  <div>
    <ul class="fly-list">
      <li v-for="(item, index) in items" :key="'listitem' + index">
        <a href="user/home.html" class="fly-avatar">
          <img
            :src="item.uid.pic"
            alt="贤心"
          />
        </a>
        <h2>
          <a class="layui-badge">{{ item.catalog }}</a>
          <a href="jie/detail.html">{{ item.title }}</a>
        </h2>
        <div class="fly-list-info">
          <a href="user/home.html" link>
            <cite>{{ item.uid.name }}</cite>
            <!--<i class="iconfont icon-renzheng" title="认证信息：XXX"></i>-->
            <i
              class="layui-badge fly-badge-vip"
              v-if="item.uid.isVip !== '0'"
            >{{ 'VIP' + item.uid.isVip }}</i>
          </a>
          <span>{{ item.created | moment }}</span>

          <span class="fly-list-kiss layui-hide-xs" title="悬赏飞吻">
            <i class="iconfont icon-kiss"></i>
            {{ item.fav }}
          </span>
          <span class="layui-badge fly-badge-accept layui-hide-xs" v-show="item.status !== '0'">已结</span>
          <span class="fly-list-nums">
            <i class="iconfont icon-pinglun1" title="回答"></i>
            {{ item.answer }}
          </span>
        </div>
        <div class="fly-list-badge" v-show="item.tags.length > 0">
          <span
            class="layui-badge"
            v-for="(tag, index) in item.tags"
            :key="'tag' + index"
            :class="tag.class"
          >{{tag.name}}</span>
        </div>
      </li>
    </ul>
    <div style="text-align: center;" v-show="isShow">
      <div class="laypage-main" v-if="!isEnd">
        <a class="laypage-next" @click.prevent="more()">更多求解</a>
      </div>
      <div class="nomore gray" v-else>没有更多了</div>
    </div>
  </div>
</template>

<script>
// 是一个一致性、模块化、高性能的 JavaScript 实用工具库
import _ from 'lodash'

// 时间格式化库
import moment from 'moment'
// 时间格式化库 中文显示
import 'moment/locale/zh-cn'

export default {
  name: 'listitem',
  props: {
    lists: {
      type: Array,
      default: () => []
    },
    isShow: {
      default: true,
      type: Boolean
    },
    isEnd: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    items () {
      _.map(this.lists, item => {
        switch (item.catalog) {
          case 'ask':
            item.catalog = '提问'
            break
          case 'share':
            item.catalog = '分享'
            break
          case 'logs':
            item.catalog = '动态'
            break
          case 'notice':
            item.catalog = '公告'
            break
          case 'advise':
            item.catalog = '建议'
            break
          case 'discuss':
            item.catalog = '交流'
            break
        }
      })
      return this.lists
    }
  },
  methods: {
    // 更多信息
    more () {
      this.$emit('nextpage')
    }
  },
  filters: {
    // 过滤时间
    moment (data) {
      // 超过 7 天显示日期
      if (moment(data).isBefore(moment().subtract(7, 'days'))) {
        return moment(data).format('YYYY-MM-DD')
      } else {
        // 小于 7 天，显示 xx 小时或 xx 天前
        return moment(data).from(moment())
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.nomore {
  font-size: 16px;
  padding: 30px 0;
}
</style>
