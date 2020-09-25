<template>
  <div class="fly-header layui-bg-black">
    <div class="layui-container">
      <a class="fly-logo hidden" href="javascript: void(0);">
        <img src="../assets/img/logo-3.png" alt="layui" />
      </a>
      <ul class="layui-nav fly-nav layui-hide-xs">
        <li class="layui-nav-item layui-this">
          <a href="/"> <i class="iconfont icon-jiaoliu"></i>交流 </a>
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
            <a class="fly-nav-avatar" href="javascript: void(0);">
              <cite class="layui-hide-xs">{{ userInfo.name }}</cite>
              <!-- <i class="iconfont icon-renzheng layui-hide-xs" title="认证信息：layui 作者"></i> -->
              <i
                class="layui-badge fly-badge-vip layui-hide-xs"
                v-show="userInfo.isVip !== '0'"
                >VIP{{ userInfo.isVip }}</i
              >
              <img :src="userInfo.pic" />
            </a>
            <dl
              class="layui-nav-child layui-anim layui-anim-upbit"
              :class="{ 'layui-show': isHover }"
            >
              <dd v-for="(item, index) in lists" :key="'lists' + index">
                <router-link :to="{ name: item.to }">
                  <i class="layui-icon" :class="item.icon"></i>
                  {{ item.title }}
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
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
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
          to: 'info',
          title: '基本设置',
          icon: 'layui-icon-set'
        },
        {
          to: 'msg',
          title: '我的消息',
          icon: 'layui-icon-notice'
        },
        {
          to: 'home',
          title: '我的主页',
          icon: 'layui-icon-home'
        }
      ]
    }
  },
  computed: {
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
  height: 60px;
  overflow: hidden;
}
</style>
