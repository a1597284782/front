<template>
  <div id="app">
    <imooc-header></imooc-header>
    <router-view></router-view>
    <imooc-footer></imooc-footer>
  </div>
</template>
<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  name: 'app',
  components: {
    'imooc-header': Header,
    'imooc-footer': Footer
  }
}
</script>

<style lang="scss" scoped>
@import url("./assets/layui/css/layui.css");
@import url("./assets/css/global.css");
@import url("./assets/layui/css/modules/layer/default/layer.css");
</style>
