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
        <div :class="getBtnStatus(3).cls" @click="getWelfare({id:1,status:3},1)"></div>
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
        <div :class="getBtnStatus(2).cls" @click="getWelfare({id:1,status:2},2)"></div>
      </div>
    </div>
    <modal-mask :show="showMask">
      <template>
        <div class="alert_body">
          <img class="gift" v-if="giftType ==1" src="../assets/img/start_box.png">
          <img class="gift" v-else src="../assets/img/moon_box.png">
          <p class="gift_tip">
            成功領取
            <span v-if="giftType ==1">週年星星禮包</span>
            <span v-else>週年月亮禮包</span>
            ，可喜可賀！
          </p>
          <div class="btn" @click="showMask = !showMask"></div>
        </div>
      </template>
    </modal-mask>
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
      showMask: false,
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
    getWelfare(obj, type) {
      let { status } = obj;
      if (status != 2) return;
      // 防止多点
      if (this.flag) {
        return;
      }
      this.flag = true;
      setTimeout(() => {
        this.flag = false;
        this.showMask = true;
        this.giftType = type;
      }, 500);
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
.alert_body {
  text-align: center;
  width: 680px;
  height: 564px;
  background-image: url(../assets/img/alert_bg.png);
  background-size: 100% 100%;
  padding-top: 120px;
  .gift {
    width: 370px;
    height: 280px;
    display: inline-block;
  }

  .gift_tip {
    font-size: 30px;
    color: #fff;
    span {
      color: #fdff5c;
    }
  }
  .btn {
    background-image: url("../assets/img/sure_btn.png");
    width: 402px;
    height: 96px;
    background-size: 100% 100%;
    position: absolute;
    bottom: -35px;
    left: 50%;
    transform: translateX(-50%);
    display: block;
  }
}
</style>
