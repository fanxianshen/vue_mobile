<template>
  <!--S loading -->
  <div class="pb-lds-spinner" :class="cls">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
  <!--E loading -->
</template>

<script>
export default {
  name: "loading",
  props: {
    isCenter: {
      type: Boolean,
      default: false,
    },
    customCls: {
      type: String,
      default: "",
    },
  },
  computed: {
    cls() {
      let styleClass = this.isCenter ? "lds-spinner-center" : "";
      styleClass += ` ${this.customCls}`;

      return styleClass;
    },
  },
};
</script>

<style lang="scss">
.pb-lds-spinner {
  font-size: 0;
  display: block;
  position: relative;
  width: 64px;
  height: 64px;
  div {
    transform-origin: 64px 64px;
    animation: pb-lds-spinner 1.2s linear infinite;
    &:after {
      content: " ";
      display: block;
      position: absolute;
      top: 32px;
      left: 62px;
      width: 4px;
      height: 16px;
      border-radius: 8px;
      background: #c5c5c5;
      transform: translateZ(0);
    }

    @for $i from 1 through 12 {
      &:nth-child(#{$i}) {
        transform: rotate(#{($i - 1) * 30}deg);
        animation-delay: #{-1.1 + $i * 0.1}s;
      }
    }
  }
  &.lds-spinner-center {
    left: 50%;
    top: 50%;
    margin-left: -64px;
    padding-bottom: 64px;
  }
}
@keyframes pb-lds-spinner {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
