"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vuex["default"]);

var _default = new _vuex["default"].Store({
  state: {
    // 创建随机且唯一的 UUID
    sid: '',
    // 判断是否登陆
    isLogin: false,
    token: '',
    // 用户信息
    userInfo: {}
  },
  mutations: {
    // 更新 sid
    setSid: function setSid(state, value) {
      state.sid = value;
    },
    // 更新 token
    setToken: function setToken(state, value) {
      state.token = value; // 本地存储用 token

      localStorage.setItem('token', value);
    },
    // 设置用户的基本信息
    setUserInfo: function setUserInfo(state, value) {
      if (value === '') return;
      state.userInfo = value; // 本地存储用户基本信息

      localStorage.setItem('userInfo', JSON.stringify(value));
    },
    // 设置登陆状态
    setIsLogin: function setIsLogin(state, value) {
      state.isLogin = value;
      console.log('setIsLogin -> value', value);
    }
  },
  actions: {}
});

exports["default"] = _default;