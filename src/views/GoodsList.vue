<!--
   User: liuyin
   Date: 2019-09-16 10:58
   Description:
 -->
<template>
    <div class="goods-list-page">
          <navigation-bar
          @onLeftClick="onBackClick"
          :pageName="'商品列表'"></navigation-bar>
      <div class="goods-list-page-content">
         <goods-options></goods-options>
      </div>
    </div>
</template>

<script>
import NavigationBar from '@c/currency/NavigationBar.vue'
import GoodsOptions from '@c/goods/GoodsOptions.vue'
export default {
  data () {
    return {}
  },
  methods: {
    /*
    后退按钮
    */
    onBackClick: function () {
      this.$router.go(-1)
    }
  },
  components: {
    NavigationBar,
    GoodsOptions
  }
}
</script>

<style lang="scss" scoped>
  @import "@css/style.scss";

  .goods-list-page{
    height: 100%;
    width: 100%;
    background-color: $bgColor;
    display: flex;
    flex-direction: column;
    &-content{
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  }

</style>
