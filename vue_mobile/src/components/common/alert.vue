<template>
  <div class="pop" @click="eventHandel()">
    <div class="pop_body" @click.stop>
      <div>
        <slot name="content"></slot>
      </div>
      <div class="btn" @click="eventHandel()"></div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    eventHandel(){
      this.$emit('childFn',{})
    }
  }
};
</script>
<style lang="scss" scoped>
.pop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  .pop_body {
    width: 680px;
    height: 564px;
    background-image: url(../../img/alert_bg.png);
    background-size: 100% 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    padding-top:150px;
    .btn {
      background-image: url("../../img/sure_btn.png");
      width: 402px;
      height: 96px;
      background-size: 100% 100%;
      position: absolute;
      bottom:-35px;
      left:50%;
      transform: translateX(-50%);
      display: block;
    }
  }
}
</style>
