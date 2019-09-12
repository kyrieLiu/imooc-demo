<!--
   User: liuyin
   Date: 2019-09-11 10:44
   Description:
 -->
<template>
    <div class="seconds">
        <div class="seconds-wrap">
          <p class="seconds-wrap-title">京东秒杀</p>
          <!--倒计时-->
          <CountDown :endHours="20"></CountDown>
        </div>
      <div class="seconds-content">
          <div class="seconds-content-item" v-for="(item,index) in dataSource" :key="index">
            <img class="seconds-content-item-icon" :src="item.icon">
            <p class="seconds-content-item-price">¥{{item.price | priceValue}}</p>
            <p class="seconds-content-item-old-price">¥{{item.oldPrice | priceValue}}</p>
          </div>
      </div>
    </div>
</template>

<script>
import CountDown from '@c/seconds/CountDown.vue'
export default {
  props: {
    dataSource: {
      type: Array,
      required: true,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {}
  },
  methods: {},
  components: {
    CountDown
  },
  filters: {
    a: function (value) {
      return value + 'a'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@css/style.scss";
  .seconds{
    background-color: white;
    border-radius: $infoSize;
    margin: $marginSize;

    &-wrap{
      display: flex;
      padding: $marginSize;

      &-title{
        font-size: $titleSize;
        display: inline-block;
      }
    }
    &-content{
      padding: $marginSize 0;
      display: flex;
      overflow: hidden;
      overflow-x: scroll;
      &-item{
        padding: 0 px2rem(12);
        text-align: center;

        &-icon{
          widows: px2rem(66);
          height: px2rem(66);
        }
        &-price{
          color: $mainColor;
          font-size: $titleSize;
          margin-top: px2rem(4);
        }
        &-old-price{
          color: $hintColor;
          font-size: $titleSize;
          margin-top: $marginSize;
          text-decoration: line-through;
        }
      }
    }
  }
</style>
