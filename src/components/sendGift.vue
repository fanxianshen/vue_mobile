<template>
  <div class="gift_content">
    <div class="day_one"></div>
    <div class="day_two"></div>
    <div class="day_three"></div>
    <div class="day_four"></div>
    <div class="day_five"></div>
    <div class="day_six"></div>
  </div>
</template>

<script>
export default {
  name: "SendGif",
};
</script>

<style scoped lang="scss">
.gift_content {
  .day_one {
    background-image: url("../assets/img/gift_day01.jpg");
    height: 604px;
  }
  .day_two {
    background-image: url("../assets/img/gift_day02.jpg");
    height: 366px;
  }
  .day_three {
    background-image: url("../assets/img/gift_day03.jpg");
    height: 364px;
  }
  .day_four {
    background-image: url("../assets/img/gift_day04.jpg");
    height: 365px;
  }
  .day_five {
    background-image: url("../assets/img/gift_day05.jpg");
    height: 365px;
  }
  .day_six {
    background-image: url("../assets/img/gift_day06.jpg");
    height: 194px;
  }
  .day_one,
  .day_two,
  .day_three,
  .day_four,
  .day_five,
  .day_six {
    width: 100%;
    background-size: 100%;
  }
  .selected {
    position: relative;
    &::after {
      position: absolute;
      content: "";
      display: inline-block;
      width: 130px;
      height: 130px;
      background-image: url("../assets/img/selected.png");
      background-size: 100% 100%;
      right: 88px;
      bottom: -15px;
      z-index: 2;
    }
    &:nth-child(n + 2) {
      &::after {
        bottom: 5px;
      }
    }
  }
}
</style>
