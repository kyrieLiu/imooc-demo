<!--
   User: liuyin
   Date: 2019-09-11 17:24
   Description:
 -->
<template>
  <span class="goods-item-name-nohave">缺货</span>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
  @import "@css/style.scss";
  .goods-item-name-nohave{
    padding: 0 px2rem(4);
    font-size: $minInfoSize;
    color: white;
    background-color: #999999;
    border-radius: px2rem(2);
    margin-right: px2rem(2);
  }
</style>
