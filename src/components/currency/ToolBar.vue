<!--
   User: liuyin
   Date: 2019-09-04 16:52
   Description:
 -->
<template>
    <div class="tool-bar">
        <div class="tool-bar-item" v-for="(item,index) in toolBarData" :key="index" @click="onChangeFragment(item,index)">
          <img class="tool-bar-item-img" :src="[index===selectItemIndex?item.hIcon:item.nIcon]" alt="">
          <p class="tool-bar-item-name" :class="{'tool-bar-item-name-h':index===selectItemIndex}">{{item.name}}</p>
        </div>
    </div>
</template>

<script>
/**
   *ToolBar
   * */
export default {
  data () {
    return {
      toolBarData: [
        {
          // 默认状态下的图片
          nIcon: require('@img/home-n.svg'),
          hIcon: require('@img/home-h.svg'),
          name: '首页',
          componentName: 'home'
        },
        {
          // 默认状态下的图片
          nIcon: require('@img/shopping-n.svg'),
          hIcon: require('@img/shopping-h.svg'),
          name: '购物车',
          componentName: 'shopping'
        },
        {
          // 默认状态下的图片
          nIcon: require('@img/my-n.svg'),
          hIcon: require('@img/my-h.svg'),
          name: '我的',
          componentName: 'my'
        }
      ],
      selectItemIndex: 0
    }
  },

  methods: {
    onChangeFragment: function (item, index) {
      this.selectItemIndex = index
      this.$emit('onChangeFragment', item.componentName)
    },
    pushFragment (index) {
      this.onChangeFragment(this.toolBarData[index], index)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@css/style.scss';
  .tool-bar {
    width: 100%;
    height: px2rem(46);
    display: flex;
    justify-content: space-around;
    background-color: white;
    box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.2);
    border-top: 1px solid $lineColor;

    &-item {
      text-align: center;
      padding: px2rem(4) px2rem(12);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      &-img {
        width: px2rem(22);
        height: px2rem(22);
      }

      &-name {
        font-size: $infoSize;
        margin-top: px2rem(4);

        &-h {
          color: $mainColor;
        }
      }
    }

  }

</style>
