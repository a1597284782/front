<template>
  <div class="layui-container flex">
    <img src="../assets/img/icon-404.png" alt="">
    <p>找不到页面了</p>
    <router-link class="layui-btn" to="/">回到首页</router-link>
  </div>
</template>

<script>
export default {
  name: 'NoFound'
}
</script>

<style lang="scss" scoped>
.flex {
  width: 100%;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

p {
  padding-bottom: 15px;
  padding-top: 10px;
  color: #666;
}
</style>
