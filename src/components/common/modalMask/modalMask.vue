<template>
  <div
    class="modal-mask animated"
    :class="maskAnimate"
    v-if="showSelf"
    @touchmove.prevent
    :style="`background-color:rgba(0,0,0,${opacity})`"
    @click="maskCloseable && $emit('close')"
  >
    <div class="modal-content-wrapper" @click="contentClick" :style="wrapperStyle">
      <div
        class="modal-content animated"
        :class="animateClass"
        @animationend="animationEnd"
        @webkitAnimationEnd="animationEnd"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
const showAnimations = [
  "fadeZoomIn",
  "slideInUp",
  "slideInRight",
  "slideInDown",
  "slideInLeft",
  "flipInX",
  "flipInY"
];
const leaveAnimations = [
  "fadeZoomOut",
  "slideOutUp",
  "slideOutRight",
  "slideOutDown",
  "slideOutLeft",
  "flipOutX",
  "flipOutY"
];
export default {
  data() {
    return {
      showSelf: false,
      animateClass: "",
      maskAnimate: "",
      leaving: false // 关闭窗口
    };
  },
  props: {
    // 是否显示
    show: {
      type: Boolean,
      default: false
    },
    // 点击蒙层是否关闭 , 需监听close事件
    maskCloseable: {
      type: Boolean,
      default: false
    },
    // 背景色透明度
    opacity: {
      type: Number,
      default: 0.7
    },
    /**
     * 进入动画:
     *    可选:[
     *      fadeZoomIn:渐变放大 (默认),
     *      slideInUp: 上方滑入
     *      slideInRight: 右侧滑入
     *      slideInDown: 下方滑入
     *      slideInLeft: 左侧滑入
     *      flipInX: X轴翻转进入
     *      flipInY: Y轴翻转进入
     *    ]
     */
    showAnimation: {
      type: String,
      default: "fadeZoomIn"
    },
    /**
     * 离开动画:
     *    可选:[
     *      fadeZoomOut:渐变缩小 (默认),
     *      slideOutUp: 上方滑出
     *      slideOutRight: 右侧滑出
     *      slideOutDown: 下方滑出
     *      slideOutLeft: 左侧滑出
     *      flipOutX: X轴翻转离开
     *      flipOutY: Y轴翻转离开
     *    ]
     */
    leaveAnimation: {
      type: String,
      default: "fadeZoomOut"
    },
    // 位置: 支持格式 'center','top','bottom','top:200','bottom:200px;','top:10vw'
    position: {
      type: String,
      default: "center"
    }
  },
  methods: {
    contentClick(e) {
      if (this.maskCloseable) e.stopPropagation();
    },
    animationEnd() {
      this.animateClass = "";
      this.maskAnimate = "";
      if (this.leaving) {
        this.leaving = false;
        this.showSelf = this.show;
      }
    }
  },
  watch: {
    show: {
      handler(val) {
        if (val) {
          this.showSelf = true;
          if(showAnimations.indexOf(this.showAnimation) !== -1){
            this.animateClass = this.showAnimation;
            this.maskAnimate = "fadeIn";
          }          
        } else {
          if(!this.showSelf) return ;
          if (leaveAnimations.indexOf(this.leaveAnimation) !== -1) {
            this.leaving = true;
            this.animateClass = this.leaveAnimation;
            this.maskAnimate = "fadeOut";
          } else {
            this.showSelf = false;
          }
        }
      },
      immediate: true
    }
  },
  computed: {
    wrapperStyle() {
      let pos = this.position;
      let res;
      if (/^(top|bottom)$/.test(pos)) {
        // top bottom
        res =  {
          [pos]: 0
        };
      } else if (/^(top|bottom):(\d+)(px;?)?$/.test(pos)) {
        // top:200   bottom:200px
        let m = pos.match(/^(top|bottom):(\d+)(px;?)?$/);
        let attr = m[1];
        let value = m[2];
        res =  {
          [attr]: `${(value / 7.5).toFixed(4)}vw`
        };
      } else {
        res =  {
          top: "50%",
          transform: "translate(-50%,-50%)"
        };
      }
      if((this.showAnimation + this.leaveAnimation).indexOf('slide') !== -1){
        res['overflow'] = 'hidden';
      }
      return res;
    }
  }
};
</script>
<style lang="scss" scoped>
.animated {
  animation-duration: .35s;
  animation-timing-function: ease-out;
  animation-fill-mode: both;
}
.modal-mask {
  position: fixed;
  z-index: 9999;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content-wrapper {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.modal-content {
}
/* begin mask animation */
.fadeIn {
  animation-name: fadeIn;
}
.fadeOut {
  animation-name: fadeOut;
}
@keyframes fadeOut {
  20% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
}
/* end mask animation */
.fadeZoomIn {
  animation-name: fadeZoomIn;
}
.fadeZoomOut {
  animation-name: fadeZoomOut;
}
.slideInUp {
  animation-name: slideInUp;
}
.slideInLeft {
  animation-name: slideInLeft;
}
.slideInDown {
  animation-name: slideInDown;
}
.slideInRight {
  animation-name: slideInRight;
}
.slideOutUp {
  animation-name: slideOutUp;
}
.slideOutRight {
  animation-name: slideOutRight;
}
.slideOutDown {
  animation-name: slideOutDown;
}
.slideOutLeft {
  animation-name: slideOutLeft;
}
.flipInX {
  animation-name: flipInX;
}
.flipInY {
  animation-name: flipInY;
}
.flipOutX {
  animation-name: flipOutX;
}
.flipOutY {
  animation-name: flipOutY;
}
@keyframes fadeZoomIn {
  from {
    opacity: 0.5;
    transform: scale(.3);
  }
}
@keyframes fadeZoomOut {
  to {
    opacity: 0.3;
    transform: scale(.3);
  }
}
@keyframes slideInUp {
  from {
    transform: translateY(100%);
  }
}
@keyframes slideInLeft {
  from {
    transform: translateX(-100%) ;
  }
}
@keyframes slideInDown {
  from {
    transform: translateY(-100%) ;
  }
}
@keyframes slideInRight {
  from {
    transform: translateX(-100%);
  }
}
@keyframes slideOutUp {
  to {
    transform: translateY(-100%);
  }
}
@keyframes slideOutDown {
  to {
    transform: translateY(100%);
  }
}
@keyframes slideOutLeft {
  to {
    transform: translateX(-100%);
  }
}
@keyframes slideOutRight {
  to {
    transform: translateX(100%);
  }
}
@keyframes flipInX {
  0% {
    transform: rotateX(90deg);
    animation-timing-function: ease-in-out;
    opacity: 0.3;
  }

  to {
    animation-timing-function: ease-in-out;
  }
}
@keyframes flipInY {
  0% {
    transform: rotateY(90deg);
    animation-timing-function: ease-in-out;
    opacity: 0.2;
  }

  to {
    animation-timing-function: ease-in-out;
  }
}
@keyframes flipOutX {
  0% {
    transform: rotateX(0deg);
    animation-timing-function: ease-in-out;
  }
  to {
    transform: rotateX(90deg);
    animation-timing-function: ease-in-out;
    opacity: 0;
  }
}
@keyframes flipOutY {
  to {
    transform: rotateY(90deg);
    opacity: 0;
  }
}
</style>
