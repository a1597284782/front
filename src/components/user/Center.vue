<template>
  <!-- 用户中心 -->
  <div class="panel main pd20">
    <div class="msg">Hi, Admin, 你已经是我们的正式会员</div>
    <div class="layui-row layui-col-space20">
      <div class="layui-col-md6">
        <div class="panel border">
          <div class="title">我的会员信息</div>
          <div class="content">
            <p>
              积分经验值：
              <cite class="color">{{ userInfo.favs }}</cite>
            </p>
            <p>
              您当前为：
              <cite class="color">{{
                userInfo.isVip === '0' ? '非VIP' : 'VIP' + userInfo.isVip
              }}</cite>
            </p>
          </div>
        </div>
      </div>
      <div class="layui-col-md6">
        <sign class="border"></sign>
      </div>
      <div class="layui-col-md12 mt20">
        <div class="panel">
          <div class="title">快捷方式</div>
          <div class="content" style="height: auto">
            <ul class="layui-row layui-col-space10">
              <li
                class="layui-col-sm3 layui-col-xs4"
                v-for="(item, index) in lists"
                :key="index"
              >
                <router-link :to="{ name: item.to }">
                  <div class="layui-icon shortcut" :class="item.icon"></div>
                  <span>{{ item.title }}</span>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getInfo } from '@/api/user'
import Sign from '@/components/sidebar/Sign'

export default {
  name: 'user-center',
  components: {
    Sign
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  data () {
    return {
      lists: [
        {
          to: 'info',
          title: '修改信息',
          icon: 'layui-icon-set'
        },
        {
          to: 'pic',
          title: '修改头像',
          icon: 'layui-icon-face-smile'
        },
        {
          to: 'passwd',
          title: '修改密码',
          icon: 'layui-icon-password'
        },
        {
          to: 'account',
          title: '账号绑定',
          icon: 'layui-icon-app'
        },
        {
          to: '',
          title: '发表新帖',
          icon: 'layui-icon-add-circle'
        },
        {
          to: '',
          title: '查看分享',
          icon: 'layui-icon-share'
        },
        {
          to: 'mypost',
          title: '我的帖子',
          icon: 'layui-icon-username'
        },
        {
          to: 'mycollection',
          title: '我的收藏',
          icon: 'layui-icon-rate-solid'
        },
        {
          to: 'others',
          title: '其他资料',
          icon: 'layui-icon-template-1'
        },
        {
          to: '',
          title: '关注公众号',
          icon: 'layui-icon-login-wechat'
        },
        {
          to: '',
          title: '文档',
          icon: 'layui-icon-read'
        },
        {
          to: '',
          title: '后台管理',
          icon: 'layui-icon-user'
        }
      ]
    }
  },
  mounted () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      getInfo({ uid: this.userInfo._id }).then(res => {
        if (res.code === 200) {
          this.$store.commit('setUserInfo', res.data)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 768px) {
  .panel {
    &.main {
      margin: 0 !important;
    }
  }
}

.panel {
  color: #333;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba($color: #000000, $alpha: 0.05);
  transition: all 0.2s;
  &.main {
    margin: 0 0 10px 225px;
  }
}

.msg {
  background-color: #f8f8f8;
  color: #666;
  padding: 10px 15px;
  margin-bottom: 20px;
}

.border {
  border: 1px solid #e6e6e6;
}

.pd20 {
  padding: 20px;
}

.title {
  height: 50px;
  line-height: 50px;
  padding: 0 15px;
  color: #333;
  border-bottom: 1px dotted #e9e9e9;
  font-size: 14px;
}

.content {
  padding: 18px 15px;
  height: 50px;
  line-height: 26px;
  font-size: 14px;
  color: #666;
}

.mt20 {
  margin-top: -20px;
}

li {
  text-align: center;
  padding: 5px;
}

.shortcut {
  background-color: #2f9688;
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: #fff;
  border-radius: 2px;
  font-size: 30px;
}

.color {
  color: #ff5722;
}
</style>
