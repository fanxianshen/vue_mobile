<template>
  <div class="hello">
    <!--=S banner -->
    <div class="mod_banner">
      <img src="../assets/img/header_bg.gif" alt="">
    </div>
    <!--=E banner -->
    <!--=S tab -->
    <ul class="mod_pagetab">
      <router-link tag="li" to="/rank" replace></router-link>
      <router-link tag="li" to="/gift" replace></router-link>
      <router-link tag="li" to="/surprise" replace></router-link>
    </ul>
    <!--=E tab -->
    <div class="mod_countdown">
      <mizCountdown :endTime="1587377296000" :startTime="1588154896000" class="bg_setting"/>
      <!-- <div class="act_over" v-if="isOver">活动已结束</div> -->
    </div>
    <!--=S 路由 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <!--=E 路由 -->
  </div>
</template>

<script>
import mizCountdown from "../components/common/mizCountdown";
export default {
  name: "HelloWorld",
  components: {
    mizCountdown,
  },
  data() {
    return {
      isOver: false,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.mod_banner {
  font-size: 0;
  line-height: 0;
  img {
    width: 100%;
    display: block;
  }
}
.mod_pagetab {
  display: flex;
  justify-content: center;
  height: 126px;
  background: url("../assets/img/tab_bg.jpg") no-repeat;
  background-size: 100% 100%;
  li {
    width: 226px;
    height: 110px;
    margin: 0 5px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: bottom;
    &:nth-child(1) {
      background-image: url("../assets/img/tab1.png");
      &.router-link-active {
        background-image: url("../assets/img/tab1_active.png");
      }
    }
    &:nth-child(2) {
      background-image: url("../assets/img/tab2.png");
      &.router-link-active {
        background-image: url("../assets/img/tab2_active.png");
      }
    }
    &:nth-child(3) {
      background-image: url("../assets/img/tab3.png");
      &.router-link-active {
        background-image: url("../assets/img/tab3_active.png");
      }
    }
  }
}

// 倒计时
.mod_countdown {
  position: relative;
  width: 100%;
  height: 280px;
  margin: 0 auto;
  .miz-countdown {
    padding: 116px 0 0 60px;
    height: 280px;
    background-image: url('../assets/img/bg_countdown.jpg');
    li {
      margin-right: 51px;
      width: 120px;
      height: 120px;
      line-height: 120px;
    }
    .remain {
      color: #ffffff;
      font-size: 50px;
      -webkit-text-fill-color: #ffffff; /*文字的填充色*/
      -webkit-text-stroke: 1.2px #789bff;
    }
    .unit {
      color: #825002;
      font-size: 30px;
      font-weight: 600;
      right: -36px;
      bottom: -48px;
      display: none;
    }
  }
  .act_over {
    position: absolute;
    width: 100%;
    text-align: center;
    bottom: 8px;
    left: 0;
    font-size: 28px;
    color: #825002;
    font-weight: 600;
  }
}
</style>
