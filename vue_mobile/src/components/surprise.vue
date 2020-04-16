<template>
  <div>
    <div class="page_surprise">
      <div class="start_gift" v-if="startGift && startGift.welfareId && startGift.giftList">
        <p>
          首次儲值400金幣可以獲得
          <span class="yellow">週年星星禮包</span>一個
        </p>
        <img class="gift_box" src="../img/start_box_big.png">
        <div class="start_gift_content">
          <ul>
            <li v-for="(item,index) in startGift.giftList" :key="`star_${index}`">
              <div class="img_content">
                <img :src="item.giftImg" alt="" title="">
              </div>
              <p>{{item.giftName}}</p>
            </li>
          </ul>
          <div :class="getBtnStatus(startGift).cls" @click="getWelfare(startGift,1)"></div>
        </div>
      </div>
      <div class="moon_gift" v-if="startGift && startGift.welfareId && startGift.giftList">
        <p>
          首次儲值2000金幣可以獲得
          <span class="yellow">週年月亮禮包</span>一個
        </p>
        <img class="gift_box" src="../img/moon_box.png">
        <div class="moon_gift_content" v-if="moonGift && moonGift.welfareId && moonGift.giftList">
          <ul>
            <li v-for="(item,index) in moonGift.giftList" :key="`moon_${index}`">
              <div class="img_content">
                <img :src="item.giftImg" alt="" title="">
              </div>
              <p>{{item.giftName}}</p>
            </li>
          </ul>
          <div :class="getBtnStatus(moonGift).cls" @click="getWelfare(moonGift,2)"></div>
        </div>
      </div>
    </div>
    <div class="loading_content" v-show="flag">
      <loading :isCenter="true"/>
    </div>
    <Alert v-if="showGift" @childFn="showGift=!showGift">
      <template v-slot:content>
        <div class="alert_body">
          <img class="gift" v-if="giftType ==1" src="../img/start_box.png">
           <img class="gift" v-else src="../img/moon_box.png">
          <p class="gift_tip">
            成功領取
            <span v-if="giftType ==1">週年星星禮包</span>
            <span v-else>週年月亮禮包</span>
            ，可喜可賀！
          </p>
        </div>
      </template>
    </Alert>
  </div>
</template>
<script>
import Alert from "./common/alert";
import { mapState } from "vuex";
import { apiReceiveWelfare } from "../api/index";
import loading from "CMT/loading";
export default {
  components: {
    Alert,
    loading,
  },
  data() {
    return {
      showGift: false,
      flag: false,
      isLoading: false,
      giftType: 1,
    };
  },
  computed: {
    ...mapState({
      welfareList: (state) => state.mizData.welfareList, // 活动数据
    }),
    startGift() {
      let newList = [];
      newList[0] = { status: 0 };
      if (this.welfareList.length > 0) {
        newList = this.welfareList.filter((item) => {
          return item.remark == 2;
        });
      }
      return newList[0];
    },
    moonGift() {
      let newList = [];
      newList[0] = { status: 0 };
      if (this.welfareList.length > 0) {
        newList = this.welfareList.filter((item) => {
          return item.remark == 3;
        });
      }
      return newList[0];
    },
  },
  mounted() {},
  methods: {
    getGift(id) {
      this.showGift = true;
    },
    // 获取按钮状态
    getBtnStatus(item) {
      if (!item) {
        return {
          txt: "未获得",
          cls: "get_btn",
        };
      }
      let { status } = item;
      switch (status) {
        case 3: // 待完成
          return {
            txt: "已完成",
            cls: "get_btn actived",
          };
        case 2: // 已完成
          return {
            txt: "待领取",
            cls: "get_btn active",
          };
        default:
          return {
            txt: "未获得",
            cls: "get_btn",
          };
      }
    },
    // 领取福利
    getWelfare(item,type) {
      this.giftType = type
      let { welfareId, status } = item;
      let params = {
        welfareId: welfareId,
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
        .then((res) => {
          this.showGift = true;
          // 更新福利的领取状态
          this.$store.dispatch("getWelfareList");
          this.flag = false; //恢复可点击
        })
        .catch((err) => {
          const { description } = err;

          this.$toast(description);
          this.flag = false; //恢复可点击

          console.log(err);
        });
    },
  },
  watch: {
    giftList() {},
  },
};
</script>
<style lang="scss">
@import "../style/surprise";
</style>
