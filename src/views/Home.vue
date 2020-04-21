<template>
  <div class="home">
    <div class="mod_banner">
      <img src="../assets/img/header_bg.gif" alt="">
    </div>
    <main>
      <!--=S tab -->
      <ul class="mod_pagetab">
        <router-link tag="li" to="/rank" replace></router-link>
        <router-link tag="li" to="/gift" replace></router-link>
        <router-link tag="li" to="/surprise" replace></router-link>
      </ul>
      <!--=E tab -->
      <div class="mod_countdown">
        <mizCountdown :endTime="1587525261000" :startTime="1587438861000" class="bg_setting"/>
      </div>
      <!--=S 路由 -->
      <!-- <keep-alive> -->
      <router-view></router-view>
      <!-- </keep-alive> -->
      <!--=E 路由 -->
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import mizCountdown from "@/components/common/mizCountdown";
import axios from "axios";
export default {
  name: "Home",
  components: {
    mizCountdown,
  },
  created() {
    this.$store.dispatch('user/world')
  },
};
</script>
<style lang="scss">
.home {
  .mod_banner {
    height: 736px;
    line-height: 0;
    font-size: 0;
    img {
      width: 100%;
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
      background-image: url(../assets/img/bg_countdown.jpg);
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
}
</style>
