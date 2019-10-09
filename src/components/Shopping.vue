<!--
   User: liuyin
   Date: 2019-09-06 14:35
   Description:
 -->
<template>
    <div class="shopping">
      <navigation-bar
        :pageName="'购物车'"
        :isShowBack="false"></navigation-bar>
      <div class="shopping-content">
        <div class="shopping-content-list">
          <div class="shopping-content-list-item" v-for="(item,index) in shoppingDatas" :key="index">
            <img class="shopping-content-list-item-check" src="@img/no-check.svg">
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import NavigationBar from '@c/currency/NavigationBar.vue'
export default {
  components: {
    NavigationBar
  },
  data () {
    return {
      shoppingDatas: this.$store.state.shoppingDatas
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
  .shopping{
    width: 100%;
    height: 100%;
    font-size: 32px;
  }
</style>
