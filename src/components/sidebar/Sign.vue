<template>
  <div class="fly-panel fly-signin">
    <div class="fly-panel-title">
      签到
      <i class="fly-mid"></i>
      <a href="javascript:;" class="fly-link" id="LAY_signinHelp" @click="showInfo()">说明</a>
      <i class="fly-mid"></i>
      <a href="javascript:;" class="fly-link" id="LAY_signinTop" @click="showTop()">
        活跃榜
        <span class="layui-badge-dot"></span>
      </a>
      <span class="fly-signin-days">
        已连续签到
        <cite>{{count}}</cite>天
      </span>
    </div>
    <div class="fly-panel-main fly-signin-main">
      <template v-if="!isSign">
        <button class="layui-btn layui-btn-danger" id="LAY_signin" @click="sign()">今日签到</button>
        <span>
          可获得
          <cite>{{favs}}</cite>飞吻
        </span>
      </template>

      <!-- 已签到状态 -->
      <template v-else>
        <button class="layui-btn layui-btn-disabled">今日已签到</button>
        <span>
          获得了
          <cite>{{favs}}</cite>飞吻
        </span>
      </template>
    </div>
    <!-- 签到说明 -->
    <sign-info :isShow="isShow" @closeModal="close()"></sign-info>
    <!-- 活跃榜 -->
    <sign-list :isShow="showList" @closeModal="close()"></sign-list>
  </div>
</template>

<script>
import SignInfo from './SignInfo'
import SignList from './SignList'
import moment from 'dayjs'
import { userSign } from '@/api/user'

export default {
  name: 'sign',
  components: {
    SignInfo,
    SignList
  },
  data () {
    return {
      // 控制 说明框 显示隐藏
      isShow: false,
      // 控制 活跃榜 显示隐藏
      showList: false,
      // 活跃榜选项卡 切换值
      current: 0,
      // 控制签到按钮 是否可点击
      isSign: false,
      // 是否已登录
      isLogin: this.$store.state.isLogin
    }
  },
  mounted () {
    // 判断用户上一次的签到时间与签到状态
    // 如果用户上一次签到时间与当天时间相差1天，则允许用户签到
    const isSign = this.$store.state.userInfo.isSign
    const lastSign = this.$store.state.userInfo.lastSign
    const nowDate = moment().format('YYYY-MM-DD')
    const lastDate = moment(lastSign).format('YYYY-MM-DD')
    const diff = moment(nowDate).diff(moment(lastDate), 'day')
    if (diff > 0 && isSign) {
      this.isSign = false
    } else {
      this.isSign = isSign
    }
  },
  computed: {
    // 获得的积分数
    favs () {
      const count = parseInt(this.count)
      let result = 0
      if (count < 5) {
        result = 5
      } else if (count >= 5 && count < 15) {
        result = 10
      } else if (count >= 15 && count < 30) {
        result = 15
      } else if (count >= 30 && count < 100) {
        result = 20
      } else if (count >= 100 && count < 365) {
        result = 30
      } else if (count >= 365) {
        result = 50
      }

      return result
    },
    // 用户签到了多少天
    count () {
      if (this.$store.state.userInfo !== {}) {
        if (typeof this.$store.state.userInfo.count !== 'undefined') {
          return this.$store.state.userInfo.count
        } else {
          return 0
        }
      } else {
        return 0
      }
    }
  },
  methods: {
    // 打开说明框
    showInfo () {
      this.isShow = true
    },
    // 打开活跃榜
    showTop () {
      this.showList = true
    },
    // 关闭说明框和活跃榜
    close () {
      this.isShow = false
      this.showList = false
    },
    // 活跃榜选项卡切换
    choose (val) {
      this.current = val
    },
    // 点击签到
    sign () {
      if (!this.isLogin) {
        this.$pop('shake', '请先登录')
        return
      }
      userSign().then(res => {
        const user = this.$store.state.userInfo
        if (res.code === 200) {
          user.favs = res.favs
          user.count = res.count
          this.$pop('', '签到成功')
        } else {
          // 用户已经签到了
          this.$pop('', '您已经签到过了')
        }
        user.isSign = true
        user.lastSign = res.lastSign
        this.isSign = true
        this.$store.commit('setUserInfo', user)
      })
    }
  }
}
</script>

<style lang="scss">
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.mask {
  background-color: rgba($color: #000000, $alpha: 0.8);
  z-index: 20000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.layui-layer {
  position: fixed;
  width: 300px;
  height: 480px;
  top: 50%;
  left: 50%;
  margin-top: -240px;
  margin-left: -150px;
  background-color: #fff;
  z-index: 21000;
  &.active {
    animation-fill-mode: both;
    animation-duration: 0.2s;
    animation-name: bounceIn;
  }

  .layui-layer-title {
    height: 42px;
    line-height: 42px;
    padding: 0 20px;
    color: #333;
    background-color: #f8f8f8;
    .layui-icon-close {
      cursor: pointer;
    }
  }

  .layui-layer-content {
    padding: 20px;
  }
  .layui-tab-content {
    padding: 0 10px;
  }
  .layui-tab-item {
    line-height: 45px;
    li {
      border-bottom: 1px double #dcdcdc;
      &:last-child {
        border-bottom: none;
      }
    }
    img {
      width: 30px;
      height: 30px;
      border-radius: 2px;
    }
  }
}
</style>
