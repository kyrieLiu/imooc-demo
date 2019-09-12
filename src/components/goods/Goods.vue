<!--
   User: liuyin
   Date: 2019-09-11 15:22
   Description:
 -->
<template>
    <div class="goods goods-waterfall" :style="{height:goodsViewHeight}">
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
  components: {
    Direct,
    NoHave
  },
  data () {
    return {
      dataSource: [
        {
          swiperImgs: [
            require('@img/goods/goods-detail-1-1.jpg'),
            require('@img/goods/goods-detail-1-2.jpg'),
            require('@img/goods/goods-detail-1-3.jpg'),
            require('@img/goods/goods-detail-1-4.jpg'),
            require('@img/goods/goods-detail-1-5.jpg'),
            require('@img/goods/goods-detail-1-6.jpg')
          ],
          detailImgs: [
            require('@img/goods/goods-swiper-1-1.webp.jpg'),
            require('@img/goods/goods-swiper-1-2.webp.jpg'),
            require('@img/goods/goods-swiper-1-3.webp.jpg'),
            require('@img/goods/goods-swiper-1-4.webp.jpg')
          ],
          img: require('@img/goods/goods-1.jpg'),
          isDirect: false,
          isHave: false,
          name: '劳力士  日志型系列  大促销520直销 现货  领券后购买',
          price: '38000',
          volume: 143
        },
        {
          swiperImgs: [
            require('@img/goods/goods-detail-2-1.jpg'),
            require('@img/goods/goods-detail-2-2.jpg'),
            require('@img/goods/goods-detail-2-3.jpg'),
            require('@img/goods/goods-detail-2-4.jpg'),
            require('@img/goods/goods-detail-2-5.jpg'),
            require('@img/goods/goods-detail-2-6.jpg')
          ],
          detailImgs: [
            require('@img/goods/goods-swiper-2-1.webp.jpg'),
            require('@img/goods/goods-swiper-2-2.webp.jpg'),
            require('@img/goods/goods-swiper-2-3.webp.jpg'),
            require('@img/goods/goods-swiper-2-4.webp.jpg')
          ],
          img: require('@img/goods/goods-2.jpg'),
          isDirect: true,
          isHave: false,
          name: '劳力士  日志型系列',
          price: '38000',
          volume: 143
        },
        {
          swiperImgs: [
            require('@img/goods/goods-detail-3-1.jpg'),
            require('@img/goods/goods-detail-3-2.jpg'),
            require('@img/goods/goods-detail-3-3.jpg'),
            require('@img/goods/goods-detail-3-4.gif'),
            require('@img/goods/goods-detail-3-5.jpg'),
            require('@img/goods/goods-detail-3-6.jpg')

          ],
          detailImgs: [
            require('@img/goods/goods-swiper-3-1.webp.jpg'),
            require('@img/goods/goods-swiper-3-2.webp.jpg'),
            require('@img/goods/goods-swiper-3-3.webp.jpg'),
            require('@img/goods/goods-swiper-3-4.webp.jpg')
          ],
          img: require('@img/goods/goods-3.jpg'),
          isDirect: true,
          isHave: true,
          name: '劳力士  日志型系列',
          price: '38000',
          volume: 143
        }
      ],
      MAX_IMG_HEIGHT: 230,
      MIN_IMG_HEIGHT: 178,
      imgStyles: [],
      ITEM_MARGIN_SIZE: 8,
      goodsItemStyles: [],
      goodsViewHeight: 0
    }
  },
  created: function () {
    this.initData()
    this.initImgStyles()
    this.$nextTick(() => {
      this.initWaterfall()
    })
  },
  methods: {
    initData: function () {
      this.$http.get('/goods')
        .then(data => {
          console.log(data.list)
          // this.dataSource = data.list
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
