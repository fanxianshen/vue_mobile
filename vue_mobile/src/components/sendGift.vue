<template>
  <!--=S 累计寻宝返礼 -->
  <div class="gift_content">
    <div
      :class="['day_one',(giftList.length>0 &&giftList[0]&& giftList[0].status==3)?'selected':'']"
    ></div>
    <div
      :class="['day_two', (giftList.length>0 && giftList[1]&& giftList[1].status==3)?'selected':'']"
    ></div>
    <div
      :class="['day_three', (giftList.length>0 && giftList[2]&& giftList[2].status==3)?'selected':'']"
    ></div>
    <div
      :class="['day_four', (giftList.length>0&& giftList[3] && giftList[3].status==3)?'selected':'']"
    ></div>
    <div
      :class="['day_five', (giftList.length>0 && giftList[4]&& giftList[4].status==3)?'selected':'']"
    ></div>
    <div class="day_six"></div>
  </div>
  <!--=E 累计寻宝返礼 -->
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      welfareList: (state) => state.mizData.welfareList, // 活动数据
    }),
    giftList() {
      let newList = this.welfareList.filter((item) => {
        return item.remark == 1;
      });
      return newList;
    },
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss">
@import "../style/sendGift";
</style>
