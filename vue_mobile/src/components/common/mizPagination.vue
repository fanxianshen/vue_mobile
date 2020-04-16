<template>
<div class="miz-pagination" :class="cls">
  <slot :handleChange="handleChange" :curentPage="curentPage">
  <div class="pagination_btn prev" @click="handleChange(curentPage - 1)">上一頁</div>
  <div class="pagination_btn first" @click="handleChange(1)">首頁</div>
  <div class="pagination_btn next" @click="handleChange(curentPage + 1)">下一頁</div>
  </slot>
</div>
</template>

<script>
export default {
  // 当前页, 展示量, 总数据量, 点击事件(跳转页), 样式, 到底提示
  props: ['curentPage', 'pageSize', 'total', 'handleChangePage', 'cls', 'msg'],
  data() {
    return { selected: ''};
  },
  computed: {
    pages () {
      return Math.ceil(this.total / this.pageSize);
    }
  },
  methods: {
    handleChange(page){
      if(page < 1){
        this.$toast('到頂了~')
        return;
      }
      if(page > this.pages){
        this.$toast('到底了~')
        return;
      }

      this.handleChangePage && this.handleChangePage(page);
    }
  }
};
</script>
<style lang="scss">
.miz-pagination{
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 30px;
  padding: 30px 0;
  font-size: 30px;
  .pagination_btn{
    padding: 30px;
    cursor: pointer;
  }
}
</style>
