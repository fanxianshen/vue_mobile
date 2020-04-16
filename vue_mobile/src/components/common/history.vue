<template>
  <div class="mod_history" >
    <div class="mod_history_list">
      <div v-if="!list || list.length === 0" class="onData">暂无记录</div>
      <ul>
        <li
          v-for="(item,index) in list"
          :key="index"
        >{{item.created}} 进行了1次春季尋寶，获得{{item.giftName}}×1</li>
      </ul>
    </div>
    <div class="pop_close" @click="ChangeMaskHandle">知道了</div>
  </div>
</template>

<script>
export default {
  props: ["list", "handleClose"],
  methods: {
    ChangeMaskHandle() {
      this.handleClose && this.handleClose();
    }
  }
};
</script>
<style lang="scss">
@import "../../style/history";

</style>