<template>
  <div class="fly-header layui-bg-black">
    <div class="layui-container">
      <a class="fly-logo hidden" href="/">
        <img src="../assets/img/logo-3.png" alt="大前端logo" />
      </a>
      <ul class="layui-nav fly-nav layui-hide-xs">
        <li class="layui-nav-item layui-this">
          <router-link :to="{path: '/'}"><i class="iconfont icon-jiaoliu"></i>交流</router-link>
        </li>
        <li class="layui-nav-item">
          <a href="javascript: void(0);">
            <i class="iconfont icon-iconmingxinganli"></i>案例
          </a>
        </li>
        <li class="layui-nav-item">
          <a href="javascript: void(0);">
            <i class="iconfont icon-ui"></i>框架
          </a>
        </li>
      </ul>

      <ul class="layui-nav fly-nav-user">
        <!-- 未登入的状态 -->
        <template v-if="!isShow">
          <li class="layui-nav-item">
            <a
              class="iconfont icon-touxiang layui-hide-xs"
              href="javascript: void(0);"
            ></a>
          </li>
          <li class="layui-nav-item">
            <router-link :to="{ name: 'login' }">登录</router-link>
          </li>
          <li class="layui-nav-item">
            <router-link :to="{ name: 'reg' }">注册</router-link>
          </li>
          <li class="layui-nav-item layui-hide-xs">
            <a
              href="javascript: void(0);"
              title="QQ登入"
              class="iconfont icon-qq"
            ></a>
          </li>
          <li class="layui-nav-item layui-hide-xs">
            <a
              href="javascript: void(0);"
              title="微博登入"
              class="iconfont icon-weibo"
            ></a>
          </li>
        </template>

        <!-- 登入后的状态 -->
        <template v-else>
          <li class="layui-nav-item" @mouseover="show()" @mouseout="hide()">
            <router-link class="fly-nav-avatar" :to="{ name: 'center' }">
              <cite class="layui-hide-xs">{{ userInfo.name }}</cite>
              <!-- <i class="iconfont icon-renzheng layui-hide-xs" title="认证信息：layui 作者"></i> -->
              <i
                class="layui-badge fly-badge-vip layui-hide-xs"
                v-show="userInfo.isVip !== '0'"
                >VIP{{ userInfo.isVip }}</i
              >
              <img :src="userInfo.pic" />
            </router-link>
            <dl
              class="layui-nav-child layui-anim layui-anim-upbit"
              :class="{ 'layui-show': isHover }"
            >
              <dd v-for="(item, index) in lists" :key="'lists' + index">
                <router-link :to="item.to">
                  <i class="layui-icon" :class="item.icon"></i>
                  {{ item.title }}
                </router-link>
              </dd>
              <dd>
                <router-link
                  :to="{ name: 'home', params: { uid: userInfo._id } }"
                >
                  <i class="layui-icon layui-icon-home"></i>
                  我的主页
                </router-link>
              </dd>

              <hr style="margin: 5px 0" />
              <dd>
                <a
                  href="javascript: void(0);"
                  style="text-align: center"
                  @click="logout"
                  >退出</a
                >
              </dd>
            </dl>
          </li>
          <div class="fly-nav-msg" v-show="num.message && num.message !== 0">
            {{ num.message }}
          </div>
          <transition name="fade">
            <div class="layui-layer-tips" v-show="hasMsg && num.message !== 0">
              <div class="layui-layer-content">
                您有{{ num.message }}条未读消息
                <i class="layui-layer-TipsG layui-layer-TipsB"></i>
              </div>
            </div>
          </transition>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Header',
  data () {
    return {
      // 是否显示 菜单
      isHover: false,
      hoverCtrl: {},
      // 菜单数据
      lists: [
        {
          to: { name: 'info' },
          title: '基本设置',
          icon: 'layui-icon-set'
        },
        {
          to: { name: 'msg' },
          title: '我的消息',
          icon: 'layui-icon-notice'
        }
      ],
      // 是否显示未读消息
      hasMsg: false
    }
  },
  watch: {
    // 监听 未读消息 数量发送变化则显示弹窗
    num (newval, oldval) {
      if (newval.event && newval !== oldval) {
        this.hasMsg = true
        setTimeout(() => {
          this.hasMsg = false
        }, 2000)
      }
    }
  },
  computed: {
    ...mapState({
      num: state => state.num
    }),
    isShow () {
      return this.$store.state.isLogin
    },
    userInfo () {
      return this.$store.state.userInfo || {
        name: '',
        pic: '',
        isVip: 0
      }
    }
  },
  methods: {
    // 鼠标移入时，显示菜单
    show () {
      clearTimeout(this.hoverCtrl)
      this.hoverCtrl = setTimeout(() => {
        this.isHover = true
      }, 200)
    },
    // 鼠标移出时，隐藏菜单
    hide () {
      clearTimeout(this.hoverCtrl)
      this.hoverCtrl = setTimeout(() => {
        this.isHover = false
      }, 500)
    },
    // 退出登陆
    logout () {
      this.$confirm('确定退出码？', () => {
        localStorage.clear()
        this.$store.commit('setToken', '')
        this.$store.commit('setUserInfo', '')
        this.$store.commit('setIsLogin', false)
        this.$router.push({ name: 'index' }, () => { })
      }, () => { })
    }
  }
}
</script>

<style lang="scss" scoped>
.fly-logo {
  position: absolute;
  left: -15px;
  top: -10px;
}
.hidden {
  height: 70px;
  overflow: hidden;
}
.layui-layer-tips {
  position: fixed;
  white-space: nowrap;
  right: 0;
  top: 60px;
  z-index: 2000;
}
</style>
