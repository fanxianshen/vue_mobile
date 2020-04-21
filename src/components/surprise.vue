<template>
  <div class="surprise">
    <div class="start_gift">
      <p>
        首次儲值400金幣可以獲得
        <span class="yellow">週年星星禮包</span>一個
      </p>
      <img class="gift_box" src="../assets/img/start_box_big.png">
      <div class="gift_content start_gift_content">
        <ul>
          <li v-for="(item,index) in starImg" :key="`star_${index}`">
            <img :src="item" alt="" title="">
          </li>
        </ul>
        <div :class="getBtnStatus(3).cls" @click="getWelfare(1,3)"></div>
      </div>
    </div>
    <div class="moon_gift">
      <p>
        首次儲值2000金幣可以獲得
        <span class="yellow">週年月亮禮包</span>一個
      </p>
      <img class="gift_box" src="../assets/img/moon_box_big.png">
      <div class="gift_content moon_gift_content">
        <ul>
          <li v-for="(item,index) in moonImg" :key="`moon_${index}`">
            <img :src="item" alt="" title="">
          </li>
        </ul>
        <div :class="getBtnStatus(2).cls" @click="getWelfare(1,2)"></div>
      </div>
    </div>
    <modal-mask :show="false">11111</modal-mask>
  </div>
</template>

<script>
import ModalMask from "@/components/common/modalMask";
export default {
  name: "Surprise",
  components: {
    ModalMask,
  },
  data() {
    return {
      showGift: false,
      flag: false,
      isLoading: false,
      giftType: 1,
      moonImg: [
        require("../assets/img/moon/1.png"),
        require("../assets/img/moon/2.png"),
        require("../assets/img/moon/3.png"),
        require("../assets/img/moon/4.png"),
        require("../assets/img/moon/5.png"),
      ],
      starImg: [
        require("../assets/img/star/1.png"),
        require("../assets/img/star/2.png"),
        require("../assets/img/star/3.png"),
      ],
    };
  },
  methods: {
    // 获取按钮状态
    getBtnStatus(status) {
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
    getWelfare(id, type) {
      if (type != 2) return;
      console.log(333);
    },
  },
};
</script>

<style scoped lang="scss">
.surprise {
  background-image: url("../assets/img/surprise_bg.jpg");
  background-size: 100% 100%;
  height: 2134px;
  padding-top: 200px;
  text-align: center;
  font-size: 30px;

  .yellow {
    color: #fdff5c;
  }

  .gift_box {
    width: 456px;
    height: 294px;
    display: inline-block;
    margin-top: 20px;
  }
  .gift_content {
    width: 670px;
    height: 283px;
    margin: 0 auto;
    padding-top: 24px;
    position: relative;
    margin-top: 20px;
    .img_content {
      width: 100%;
      height: 150px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 110px;
        max-height: 110px;
        display: block;
      }
    }

    ul li {
      display: inline-block;
      background-image: url("../assets/img/surprise_gift_bg.png");
      background-size: 100% 100%;
      width: 154px;
      height: 200px;
      margin-left: 6px;
      img {
        width: 100%;
      }
    }
  }
  .start_gift {
    margin-top: 30px;
    .start_gift_content {
      background-image: url("../assets/img/start_gift_content.png");
      background-size: 100% 100%;
    }
  }

  .moon_gift {
    margin-top: 112px;
    .moon_gift_content {
      background-image: url("../assets/img/moon_gift_content.png");
      background-size: 100% 100%;
      width: 670px;
      height: 514px;
    }
  }

  .get_btn {
    background-image: url("../assets/img/get_gift.png");
    width: 396px;
    height: 112px;
    background-size: 100% 100%;
    position: absolute;
    bottom: -73px;
    left: 50%;
    margin-left: -198px;
  }

  .active {
    background-image: url("../assets/img/get_gift_actived.png");
  }

  .actived {
    background-image: url("../assets/img/get_gift_read.png");
  }
}
</style>
