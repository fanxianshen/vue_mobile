<template>
  <transition name="slide">
    <div class="collect-toast" v-if="showToast">{{ msg }}</div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      showToast:false,
      msg: ''
    };
  },
  methods: {
    show(message, duration = 2000) {
      this.msg = message;
      this.showToast = true;
      this.timer && clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.showToast = false;
      }, duration);
    }
  }
};
</script>  
<style lang="scss" scoped>
.collect-toast {
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 0 30px;
  border-radius: 12px;
  color: #fff;
  line-height: 2;
  font-size: 30px;
  white-space:nowrap;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  white-space: nowrap;
}
.slide-enter-active {
  animation: slide-in .5s;
}
.slide-leave-active {
  animation: slide-out .5s;
}
@keyframes slide-in {
  0% {
    left:-50%;
  }
  100% {
    left:50%;
  }
}
@keyframes slide-out {
  0% {
    left:50%;
  }
  100% {
    left:100%;
    transform: translate(0, -50%);
  }
}
</style>