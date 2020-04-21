<template>
<div class="miz-countdown">
  <ul>
    <li><span class="remain">{{showTime.days || 0}}</span><span class="unit">天</span></li>
    <li><span class="remain">{{showTime.hours || 0}}</span><span class="unit">时</span></li>
    <li><span class="remain">{{showTime.minutes || 0}}</span><span class="unit">分</span></li>
    <li><span class="remain">{{showTime.seconds || 0}}</span><span class="unit">秒</span></li>
  </ul>
</div>
</template>

<script>
import { formatDuring } from '@/utils/utils';
export default {
  props: {
    endTime: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      showTime: {},
      timer: null
    };
  },
  mounted () {
    this.handleTimer();
  },
  methods: {
    // 活动倒计时
    handleTimer() {
      if(this.endTime <= 0){
        return {
          days: '0',
          hours: '0',
          minutes: '0',
          seconds: '0'
        };
      }

      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        const nowTime = new Date().getTime();
        let offsetTime = this.endTime - nowTime;
        this.showTime = formatDuring(offsetTime);
        if(offsetTime > 0){
          this.handleTimer();
        } else {
          this.$emit('mizCountdownTimeout');
        }
      }, 1000);
    },
  },
  watch: {
    endTime (val) {
      this.handleTimer();
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer);
  }
};
</script>

<style lang="scss">
.miz-countdown{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  ul{
    display: flex;
    li{
      position: relative;
      flex: 0 0 111px;
      min-width: 111px;
      height: 111px;
    }
    .remain{
      display: block;
      width: 100%;
      height: 100%;
      font-size: 64px;
      font-weight: 600;
      text-align: center;
    }
    .unit{
      position: absolute;
    }
  }
}
</style>
