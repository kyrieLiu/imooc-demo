<!--
   User: liuyin
   Date: 2019-09-11 15:22
   Description:
 -->
<template>
    <div class="goods" :class="layoutClass" :style="{height:goodsViewHeight}">
        <div class="goods-item goods-waterfall-item" ref="goodsItem"
        v-for="(item,index) in dataSource" :key="index" :style="goodsItemStyles[index]">
              <img class="goods-item-img" :style="imgStyles[index]" :src="item.img">
          <div class="goods-item-desc">
            <p class="goods-item-desc-name text-line-2" :class="{'goods-item-desc-name-hint':!item.isHave}">
              <direct v-if="item.isDirect"></direct>
              <no-have v-if="!item.isHave"></no-have>
              {{item.name}}
              </p>
            <div class="goods-item-desc-data">
              <p class="goods-item-desc-data-price">¥{{item.price | priceValue}}</p>
              <p class="goods-item-desc-data-volume">销量:{{item.volume}}</p>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import Direct from '@c/goods/Direct.vue'
import NoHave from '@c/goods/NoHave.vue'
export default {

  props: {
    type: String,
    default: 1
  },

  components: {
    Direct,
    NoHave
  },
  data () {
    return {
      dataSource: [
      ],
      MAX_IMG_HEIGHT: 230,
      MIN_IMG_HEIGHT: 178,
      imgStyles: [],
      ITEM_MARGIN_SIZE: 8,
      goodsItemStyles: [],
      goodsViewHeight: 0,
      layoutClass:'goods-list',
      layoutItemClass:'goods-list-item'

    }
  },
  created: function () {
    this.initData()
  },
  methods: {
    initData: function () {
      this.$http.get('/goods')
        .then(data => {
          console.log(data.list)
          this.dataSource = data.list
          this.initImgStyles()
          this.$nextTick(() => {
            this.initWaterfall()
          })
        })
    },
    imgHeight: function () {
      let result = Math.random() * (this.MAX_IMG_HEIGHT - this.MIN_IMG_HEIGHT) + this.MIN_IMG_HEIGHT
      return result
    },
    initImgStyles: function () {
      this.dataSource.forEach(item => {
        let imgHeight = this.imgHeight() + 'px'
        this.imgStyles.push({
          height: imgHeight
        })
      })
    },
    initWaterfall: function () {
      let $goodsItems = this.$refs.goodsItem
      if (!$goodsItems) return
      let leftHeightTotal = 0; let rightHeightTotal = 0
      $goodsItems.forEach(($el, index) => {
        let goodsItemStyle = {}
        let elHeight = $el.clientHeight + this.ITEM_MARGIN_SIZE
        if (leftHeightTotal <= rightHeightTotal) {
          goodsItemStyle = {
            left: '0px',
            top: leftHeightTotal + 'px'
          }
          leftHeightTotal += elHeight
        } else {
          goodsItemStyle = {
            right: '0px',
            top: rightHeightTotal + 'px'
          }
          rightHeightTotal += elHeight
        }
        this.goodsItemStyles.push(goodsItemStyle)
      })
      this.goodsViewHeight = (leftHeightTotal > rightHeightTotal ? leftHeightTotal : rightHeightTotal) + 'px'
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@css/style.scss";
  .goods{
    background-color: $bgColor;

    &-item{
      background-color: white;
      padding: $marginSize;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;

      &-desc{
        width: 100%;

        &-name{
          font-size: $infoSize;
          line-height: px2rem(18);

          &-hint{
            color: #999999;
          }
        }
        &-data{
          width: 100%;
          display: flex;
          align-items:center;
          justify-content: space-between;
          margin-top: $marginSize;

          &-price{
            font-size: $titleSize;
            color: $mainColor;
            font-weight: 500;
          }
          &-volume{
            font-size: $infoSize;
            color: $hintColor;
          }
        }
      }
    }
  }
  .goods-waterfall{
    position: relative;
    margin: $marginSize;

    &-item{
      position: absolute;
      width:49%;
      border-radius: $radiusSize;
      .goods-item-img{
        width: 100%;
      }
    }
  }
</style>
