<template>
    <div class="section_christmas">
        <!--=S banner -->
        <div class="mod_banner">
            <!-- <div class="time">活动时间11月9-11月15日 23点59分</div> -->
            <img src="../assets/img/header_bg.gif" alt="">
            <div class="pay_now" @click="payNow()"></div>
        </div>
        <!--=E banner -->
        <!-- s main -->
        <main>
            <!--=S tab -->
            <ul class="mod_pagetab">
                <router-link tag="li" to="/rank" replace></router-link>
                <router-link tag="li" to="/gift" replace></router-link>
                <router-link tag="li" to="/surprise" replace></router-link>
            </ul>
            <!--=E tab -->
            <!-- <div class="mod_countdown">
                <mizCountdown :endTime="0" :startTime="0" class="bg_setting"/>
                <div class="act_over" v-if="isOver">活动已结束</div>
            </div>-->

            <!--=S 路由 -->
            <keep-alive include="index">
                <router-view></router-view>
            </keep-alive>
            <!--=E 路由 -->
        </main>
    </div>
</template>

<script>
// import { miyaParsingPath, cleanCache } from "UTILS/utils";
// import mizCountdown from "CMT/mizUI/mizCountdown";
export default {
  data() {
    return {
      isOver: false,
    };
  },
};
</script>
<style lang="scss">
.mod_banner {
  width: 100%;
  img {
    width: 100%;
  }
}
</style>


