<!--
   User: liuyin
   Date: 2019-09-16 10:58
   Description:
 -->
<template>
    <div class="goods-list-page">
          <navigation-bar
          @onLeftClick="onBackClick"
          :pageName="'商品列表'">
            <template v-slot:nav-right>
              <img :src="layoutType.icon" @click="onChangeLayoutTypeClick()">
            </template>
          </navigation-bar>
      <div class="goods-list-page-content" :class="{'iphonex-bottom':$store.state.isIphoneX}">
         <goods-options
         @optionsChange="onGoodsOptionsChange"
         ></goods-options>
        <goods :layoutType="layoutType.type"
        :sort="sortType"></goods>
      </div>
    </div>
</template>

<script>
import NavigationBar from '@c/currency/NavigationBar.vue'
import GoodsOptions from '@c/goods/GoodsOptions.vue'
import Goods from '@c/goods/Goods.vue'
export default {
  name: 'goodsList',
  created: function () {
    this.layoutType = this.layoutTypeDatas[0]
  },
  data () {
    return {
      sortType: '1',
      layoutTypeDatas: [
        {
          type: '1',
          icon: require('@img/list-type.svg')
        },
        {
          type: '2',
          icon: require('@img/grid-type.svg')
        },
        {
          type: '3',
          icon: require('@img/waterfall-type.svg')
        }
      ],
      layoutType: {}
    }
  },
  methods: {
    /*
    后退按钮
    */
    onBackClick: function () {
      this.$router.go(-1)
    },
    onChangeLayoutTypeClick: function () {
      if (this.layoutType.type === '1') {
        this.layoutType = this.layoutTypeDatas[1]
      } else if (this.layoutType.type === '2') {
        this.layoutType = this.layoutTypeDatas[2]
      } else {
        this.layoutType = this.layoutTypeDatas[0]
      }
    },
    onGoodsOptionsChange: function (sortType) {
      this.sortType = sortType
    }
  },
  components: {
    NavigationBar,
    GoodsOptions,
    Goods
  }
}
</script>

<style lang="scss" scoped>
  @import "@css/style.scss";

  .goods-list-page {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: $bgColor;
    display: flex;
    flex-direction: column;
    position: absolute;
    &-content {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  }
</style>
