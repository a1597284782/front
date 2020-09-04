"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _store = _interopRequireDefault(require("@/store"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dayjs = _interopRequireDefault(require("dayjs"));

var _Home = _interopRequireDefault(require("./views/Home.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Login = function Login() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./views/Login.vue'));
  });
};

var Reg = function Reg() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./views/Reg.vue'));
  });
};

var Forget = function Forget() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./views/Forget.vue'));
  });
};

var Index = function Index() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./views/channels/Index.vue'));
  });
};

var Template1 = function Template1() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./views/channels/Template1.vue'));
  });
};

var Center = function Center() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./views/Center.vue'));
  });
};

var User = function User() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./views/User.vue'));
  });
};

var UserCenter = function UserCenter() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./components/user/Center.vue'));
  });
};

var Settings = function Settings() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./components/user/Settings.vue'));
  });
};

var Posts = function Posts() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./components/user/Posts.vue'));
  });
};

var Msg = function Msg() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./components/user/Msg.vue'));
  });
};

var Others = function Others() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./components/user/Others.vue'));
  });
};

var MyInfo = function MyInfo() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./components/user/common/MyInfo.vue'));
  });
};

var PicUpload = function PicUpload() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./components/user/common/PicUpload.vue'));
  });
};

var Passwd = function Passwd() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./components/user/common/Passwd.vue'));
  });
};

var Accounts = function Accounts() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./components/user/common/Accounts.vue'));
  });
};

var MyPost = function MyPost() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./components/user/common/MyPost.vue'));
  });
};

var MyCollection = function MyCollection() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./components/user/common/MyCollection.vue'));
  });
};

var NoFound = function NoFound() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./views/NoFound.vue'));
  });
};

_vue["default"].use(_vueRouter["default"]);

var router = new _vueRouter["default"]({
  linkExactActiveClass: 'layui-this',
  // linkActiveClass: 'layui-this',
  routes: [{
    path: '/',
    name: '',
    component: _Home["default"],
    children: [{
      path: '',
      name: 'index',
      component: Index
    }, {
      path: '/index/:catalog',
      name: 'catalog',
      component: Template1
    }]
  }, {
    path: '/login',
    name: 'login',
    component: Login
  }, {
    path: '/reg',
    name: 'reg',
    component: Reg,
    beforeEnter: function beforeEnter(to, from, next) {
      if (from.name === 'login') {
        next();
      } else {
        next('/login');
      }
    }
  }, {
    path: '/forget',
    name: 'forget',
    component: Forget,
    beforeEnter: function beforeEnter(to, from, next) {
      if (from.name === 'login') {
        next();
      } else {
        next('/login');
      }
    }
  }, {
    path: '/user/:uid',
    name: 'home',
    props: true,
    component: User
  }, {
    path: '/center',
    component: Center,
    meta: {
      requiresAuth: true
    },
    linkActiveClass: 'layui-this',
    children: [{
      path: '',
      name: 'center',
      component: UserCenter
    }, {
      path: 'set',
      component: Settings,
      children: [{
        path: '',
        name: 'info',
        component: MyInfo
      }, {
        path: 'pic',
        name: 'pic',
        component: PicUpload
      }, {
        path: 'passwd',
        name: 'passwd',
        component: Passwd
      }, {
        path: 'account',
        name: 'account',
        component: Accounts
      }]
    }, {
      path: 'posts',
      component: Posts,
      children: [{
        path: '',
        name: 'mypost',
        component: MyPost
      }, {
        path: 'mycollection',
        name: 'mycollection',
        component: MyCollection
      }]
    }, {
      path: 'msg',
      name: 'msg',
      component: Msg
    }, {
      path: 'others',
      name: 'others',
      component: Others
    }]
  }, {
    path: '/404',
    component: NoFound
  }, {
    path: '*',
    redirect: '/404'
  }]
}); // 全局导航守卫

router.beforeEach(function (to, from, next) {
  var token = localStorage.getItem('token');
  var userInfo = JSON.parse(localStorage.getItem('userInfo'));

  if (token !== '' && token !== null) {
    var payload = _jsonwebtoken["default"].decode(token);

    console.log('payload', payload); // 判断 token 是否过期， 方法二
    // console.log(JSON.parse(atob(token.split('.')[1])).exp * 1000 > (new Date()).getTime())
    // 判断 token 是否过期， 方法一

    if ((0, _dayjs["default"])().isBefore((0, _dayjs["default"])(payload.exp * 1000))) {
      _store["default"].commit('setToken', token);

      _store["default"].commit('setUserInfo', userInfo);

      _store["default"].commit('setIsLogin', true);
    } else {
      localStorage.clear();
    }
  } // 获取 meta 元信息， 如果有则需要登陆鉴权


  if (to.matched.some(function (record) {
    return record.meta.requiresAuth;
  })) {
    var isLogin = _store["default"].state.isLogin; // 需要用户登陆的页面

    if (isLogin) {
      // 已登录
      // 权限的判断
      next();
    } else {
      // 未登录
      next('/login');
    }
  } else {
    // 不需要用户登陆的页面
    next();
  }
});
var _default = router;
exports["default"] = _default;