<template>
<!--=S 礼物item -->
<div class="exchange_items">
  <!-- 需要的尋寶次數 -->
  <div class="exchange_num">
    <p>纍計尋寶<br /><span>{{item.triggerNum}}次</span></p>
  </div>
  <!-- 可以領取的禮物 -->
  <div class="exchange_gifts">
    <div class="gift" v-for="(subItme,index) in item.giftList" :key="index">
      <div class="gift_bg" :style="giftBgStyles(subItme)"></div>
      <div class="gift_num" v-text="subItme.giftName + FucGiftNum(subItme)"></div>
    </div>
    <!-- <div class="gift">
      <div class="gift_bg" :style="giftBgStyles"></div>
      <div class="gift_num">{{item.gift.name}}</div>
    </div>
    <div class="gift">
      <div class="gift_bg" :style="giftBgStyles"></div>
      <div class="gift_num">{{item.gift.name}}</div>
    </div> -->
  </div>
  <div class="exchange_btn" :class="getBtnStatus(item).cls" @click="getWelfare(item)">{{getBtnStatus(item).txt}}</div>
</div>
<!--=E 礼物item -->
</template>

<script>
import { apiReceiveWelfare } from "../../api";
import { parsingGiftPath } from 'UTILS/utils';

export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      flag: false //防多点,false: 可点击
    };
  },
  computed: {
   
  },
  methods: { 
    // 礼物图
    giftBgStyles (item) {
      return `background-image: url(${item.giftImg})`;
    },    
    // 奖励的礼物数量
    FucGiftNum (item) {
      let name = '';
      // giftNumType  （0：个数，1：小时，2：天数）
      switch (item.giftNumType) {
        case 0:
          name = item.giftNum+'個';
          break;
        case 1:
          if(item.giftNum === 439200) { // 永久勋章
            name = '';
          }else {
            name = item.giftNum/24+'天';
          }
          break;
      }
      return name;
    },
    // 获取按钮状态
    getBtnStatus(item) {
      let { status } = item;
      switch (status) {
        case 2:  // 待完成
          return {
            txt: "点击领取",
            cls: "active"
          }; 
        case 3:  // 已完成
          return {
            txt: "已领取",
            cls: "actived"
          };
        default:
          return {
            txt: "领取",
            cls: "actived"
          };
      }
    },
    // 领取福利
    getWelfare(item) {
      let { welfareId, status } = item;
      let params = {
        welfareId: welfareId
      };

      // 不能领取
      if (status !== 2) {
        return;
      }

      // 防止多点
      if (this.flag) {
        return;
      }
      this.flag = true;

      apiReceiveWelfare(params)
        .then(res => {
          this.$toast("成功領取禮包~");
          // 更新福利的领取状态
          this.$store.dispatch("getWelfareList");
          this.flag = false; //恢复可点击
        })
        .catch(err => {
          const { description } = err;

          this.$toast(description);
          this.flag = false; //恢复可点击

          console.log(err);
        });
    }
  }
};
</script>
