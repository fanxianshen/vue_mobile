<template>
  <div id="app">
    <div class="test">23123</div>
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'App',
}
</script>

<style lang="scss">
.test{
  width:30px;
  height: 30px;
  background: red;
}
@import "./assets/style/reset";
</style>

