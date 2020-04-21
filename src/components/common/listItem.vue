<template>
  <!--S item -->
  <div class="pb_list_item_v1">
    <div class="ranking">
      <span :class="cls">{{ itemNo ? itemNo: '99+' }}</span>
    </div>
    <div class="info">
      <div class="avatar" @click="showNamCardHandle(item.id)">
        <img :src="item.icon">
      </div>
      <div class="nickname">
        <p>{{ item[nameStr] }}</p>
        <p>ID:{{ item.id2 > 0 ? item.id2 : item.id }}</p>
      </div>
    </div>
    <div class="power">{{ item.gold }}</div>
  </div>
  <!--E item -->
</template>
<script>
export default {
  props: {
    itemNo: {
      // 序号
      type: [String, Number],
      default: "",
    },
    item: {
      // 子数据
      type: Object,
      default() {
        return {};
      },
    },
    cls: {
      // 扩展类名
      type: String,
      default: "",
    },
    nameStr: {
      // 获取的名称字段
      type: String,
      default: "name",
    },
  },
  methods: {
    // 显示名片
    showNamCardHandle(playerId) {
      // jsBridgeClient.getPlayerData(playerId);
    },
  },
};
</script>
<style scoped lang="scss">
// 榜单头像
.pb_list_item_v1 {
  position: relative;
  display: flex;
  align-items: center;
  color: #000;
  font-size: 30px;
  min-height: 120px;
  box-sizing: border-box;
  // border-bottom: 1px solid #9bd8a3;
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    background-image: url(../../assets/img/line.png);
    background-size: 100% 100%;
    bottom: 0;
    right: 0;
    height: 13px;
    display: inline-block;
  }
  .ranking {
    flex-shrink: 0;
    min-width: 100px;
    text-align: center;
    span {
      width: 48px;
      height: 48px;
      background: #7397ff;
      display: inline-block;
      line-height: 48px;
      border-radius: 50%;
      font-size: 26px;
    }
    .top1,
    .top2,
    .top3 {
      position: relative;
      display: inline-block;
      width: 87px;
      height: 87px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      font-size: 0;
      top: -10px;
      background-color: transparent;
    }
    .top1 {
      background-image: url(../../assets/img/1.png);
    }
    .top2 {
      background-image: url(../../assets/img/2.png);
    }
    .top3 {
      background-image: url(../../assets/img/3.png);
    }
  }
  .info {
    display: flex;
    flex-grow: 1;
    align-items: center;
    .avatar {
      flex-shrink: 0;
      min-width: 72px;
      max-width: 72px;
      height: 76px;
      margin-right: 17px;
      img {
        width: 100%;
        height: 100%;
        display: block;
        border-radius: 50%;
      }
    }
    .nickname {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 262px;
      font-size: 28px;
      p {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 5px 0;
        text-align: left;
        &:nth-child(2) {
          color: #d8e2ff;
          font-size: 22px;
        }
      }
    }
  }
  .power {
    flex-shrink: 0;
    min-width: 156px;
    color: #ffffff;
    font-weight: 500;
    padding-right: 30px;
    text-align: right;
  }
}
</style>