<!--
   User: liuyin
   Date: 2019-09-11 09:59
   Description:
 -->
<template>
    <div class="mode-options">
      <div class="mode-options-item" v-for="(item,index) in dataSource" :key="index"
      @click="onItemClick(item)">
            <img class="mode-options-item-icon" :src="item.icon">
            <p class="mode-options-item-title">{{item.title}}</p>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      dataSource: [
        {
          id: '1',
          icon: require('@img/jingDongChaoShi.png'),
          title: '京东超市'
        },
        {
          id: '2',
          icon: require('@img/jingDongChaoShi.png'),
          title: '京东超市'
        },
        {
          id: '3',
          icon: require('@img/jingDongChaoShi.png'),
          title: '京东超市'
        },
        {
          id: '4',
          icon: require('@img/jingDongChaoShi.png'),
          title: '京东超市'
        },
        {
          id: '5',
          icon: require('@img/jingDongChaoShi.png'),
          title: '京东超市'
        }, {
          id: '6',
          icon: require('@img/jingDongChaoShi.png'),
          title: '京东超市'
        },
        {
          id: '7',
          icon: require('@img/jingDongChaoShi.png'),
          title: '京东超市'
        },
        {
          id: '8',
          icon: require('@img/jingDongChaoShi.png'),
          title: '京东超市'
        }

      ]
    }
  },
  methods: {
    onItemClick: function (item) {
      this.$router.push({
        name: 'goodsList'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@css/style.scss";
  .mode-options{
    display: flex;
    flex-wrap: wrap;
    background-color: white;
    padding-bottom: px2rem(14);

    &-item{
      width: 20%;
      text-align: center;
      margin-top: px2rem(10);
      &-icon{
        width: px2rem(40);
        height: px2rem(40);
      }
      &-title{
        font-size: $minInfoSize;
        margin-top: px2rem(6);
      }
    }
  }

</style>
