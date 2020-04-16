<template>
  <!--S item -->
  <div class="pb_list_item_v1">
    <div class="ranking">
      <span :class="cls">{{ itemNo ? itemNo: '99+' }}</span>
    </div>
    <div class="info">
      <div class="avatar" @click="showNamCardHandle(item.id)">
        <img :src="icon">
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
import { miyaParsingPath, formatDuring } from "UTILS/utils";
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
  computed: {
    icon() {
      return miyaParsingPath(this.item.icon, 0);
    },
  },
  methods: {
    // 显示名片
    showNamCardHandle(playerId) {
      jsBridgeClient.getPlayerData(playerId);
    },
  },
};
</script>
